import { findOneElement, getNewDocumentId } from './../../lib/db-operations';
import { COLLECTIONS } from './../../config/constants';
import { IContextData } from '../../interfaces/contextdata.interface';
import ResolverOperationsSerivce from './resolver-operations.service';
import slugify from 'slugify';

class GenreSerivce extends ResolverOperationsSerivce {
  collection = COLLECTIONS.GENRES;
  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  async items() {
    const result = await this.list(this.collection, 'Genre');
    return {
      status: result.status,
      message: result.message,
      genres: result.items,
    };
  }

  async item() {
    const result = await this.get(this.collection, 'Genre');
    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async addItem() {
    var genre = this.getVariables().genre;
    //check item validity
    if (!this.checkData(genre || '')) {
      return {
        status: false,
        message: 'Genre not specified correctly',
        genre: null,
      };
    }

    //check if it is duplicated
    if (await this.checkinDatabase(genre || '')) {
      return {
        status: false,
        message: 'Genre already exists in database',
        genre: null,
      };
    }
    //build item to insert
    var item = {
      id: await getNewDocumentId(this.getDb(), this.collection, { id: -1 }),
      name: genre,
      slug: slugify(genre || '', { lower: true }),
    };
    const result = await this.add(this.collection, item, 'genre');
    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async modify() {
    var genre = this.getVariables().genre;
    var id = String(this.getVariables().id);

    if (!this.checkData(genre || '')) {
      return {
        status: false,
        message: 'Genre not specified correctly',
        genre: null,
      };
    }


    //check if it is duplicated
    if (await this.checkinDatabase(genre || '')) {
      return {
        status: false,
        message: 'A genre with the specified value already exits',
        genre: null,
      };
    }

     //check if it exist
     if (!(await this.checkinDatabase(genre || ''))) {
      return {
        status: false,
        message: 'The genre that you are trying to modify does not exist',
        genre: null,
      };
    }

    const filter = { id };
    const newValue = {
      name: genre,
      slug: slugify(genre || '', { lower: true }),
    };
    const result = await this.update(
      this.collection,
      filter,
      newValue,
      'Genre'
    );
    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  async delete() {
    var id = String(this.getVariables().id);



    const filter = { id };

    const result = await this.remove(
      this.collection,
      filter,
      'Genre'
    );

    return {
      status: result.status,
      message: result.message,
      genre: result.item,
    };
  }

  private checkData(value: string) {
    return value !== '' && value !== undefined;
  }
  private async checkinDatabase(value: string) {
    return await findOneElement(this.getDb(), this.collection, {
      name: value,
    });
  }

  private async checkExistanceInDatabase(value: string) {
    return await findOneElement(this.getDb(), this.collection, {
      id: value,
    });
  }
}

export default GenreSerivce;
