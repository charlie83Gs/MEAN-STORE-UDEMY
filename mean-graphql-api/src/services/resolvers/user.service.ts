import { findOneElement, getNewDocumentId } from './../../lib/db-operations';
import { COLLECTIONS, MESSAGES } from './../../config/constants';
import { IContextData } from '../../interfaces/contextdata.interface';
import ResolverOperationsSerivce from './resolver-operations.service';
import slugify from 'slugify';
import bcrypt from 'bcrypt';
import { userInfo } from 'os';
import JWT from '../../lib/jwt';

class UserService extends ResolverOperationsSerivce {
  collection = COLLECTIONS.USERS;
  itemName = 'User';
  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  async items() {
    const result = await this.list(this.collection, this.itemName);
    return {
      status: result.status,
      message: result.message,
      users: result.items,
    };
  }

  async item() {
    const result = await this.get(this.collection, this.itemName);
    return {
      status: result.status,
      message: result.message,
      user: result.item,
    };
  }

  async addItem() {
    var email = this.getVariables().email;
    var id = String(this.getVariables().id);
    //check item validity
    if (!this.checkData(email || '')) {
      return {
        status: false,
        message: `${this.itemName} not specified correctly`,
        genre: null,
      };
    }

    //check if it is duplicated
    if (await this.checkinDatabase(email || '')) {
      return {
        status: false,
        message: `${this.itemName} already exists in database`,
        genre: null,
      };
    }
    //build item to insert
    var variables = this.getVariables();
    delete variables['id'];
    var item = {
      id: await getNewDocumentId(this.getDb(), this.collection, { id: -1 }),
      ...variables,
      registerDate: new Date().toISOString(),
      slug: slugify(id || '', { lower: true }),
    };

    //encrypt password
    //@ts-ignore
    item.password = bcrypt.hashSync(item.password, 10);

    const result = await this.add(this.collection, item, 'user');
    return {
      status: result.status,
      message: result.message,
      user: result.item,
    };
  }

  async modify() {
    var email = this.getVariables().email;
    var id = String(this.getVariables().id);

    if (!this.checkData(id || '')) {
      return {
        status: false,
        message: `${this.itemName}  not specified correctly`,
        user: null,
      };
    }

    //check if it exist
    if (!(await this.checkinDatabaseByID(id || ''))) {
      return {
        status: false,
        message: `$The {this.itemName} that you are trying to modify does not exist`,
        user: null,
      };
    }

    //check if the email is not already in use it is duplicated
    var dbUser = await this.checkinDatabase(email || '');
    if (dbUser && dbUser.id != id) {
      return {
        status: false,
        message: `${this.itemName} with the specified email already exits`,
        user: null,
      };
    }

    const filter = { id };
    var newValue = {
      ...this.getVariables(),
      slug: slugify(id || '', { lower: true }),
    };
    // const newValue = {
    //   name: genre,
    //   slug: slugify(genre || '', { lower: true }),
    // };
    const result = await this.update(
      this.collection,
      filter,
      newValue,
      this.itemName
    );
    return {
      status: result.status,
      message: result.message,
      user: result.item,
    };
  }

  async delete() {
    var id = String(this.getVariables().id);

    const filter = { id };

    const result = await this.remove(this.collection, filter, this.itemName);

    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async login() {
    var email = this.getVariables().email;
    var password = this.getVariables().password;
    var db = this.getDb();
    try {
      var user = await findOneElement(db, COLLECTIONS.USERS, { email });
      if (!user) {
        return {
          status: false,
          message: MESSAGES.LOGIN_FAILED,
          token: null,
        };
      }
      // var verified = password === user.password;
      var verified = bcrypt.compareSync(password, user.password);
      //remove password from token and other PII
      delete user.password;
      delete user.birthday;
      delete user.registerDate;

      var token = new JWT().sign({ user });
      return {
        status: true,
        message: verified ? MESSAGES.LOGIN_SUCCESFULL : MESSAGES.LOGIN_FAILED,
        token: verified ? token : null,
        user,
      };
    } catch (error) {
      console.log(error);
      return {
        status: true,
        message: 'Login Failed',
        user: null,
      };
    }
  }

  async auth(){
    let token = this.getVariables().token;

    if (!this.checkData(token || '')) {
      return {
        status: false,
        message: `Error: Invalid token`,
        user: null,
      };
    }

    let info = new JWT().verify(token || '');
    if(info === MESSAGES.TOKEN_VERIFICATION_FAILED){
        return {
            status: false,
            message: info
        }
    }

    return {
        status: true,
        message: 'User authenticated correctly using jwt token',
        user: Object.values(info)[0]
    }
}

  private checkData(value: string) {
    return value !== '' && value !== undefined;
  }
  private async checkinDatabase(value: string) {
    return await findOneElement(this.getDb(), this.collection, {
      email: value,
    });
  }

  private async checkinDatabaseByID(value: string) {
    return await findOneElement(this.getDb(), this.collection, {
      id: value,
    });
  }

  private async checkExistanceInDatabase(value: string) {
    return await findOneElement(this.getDb(), this.collection, {
      id: value,
    });
  }
}

export default UserService;
