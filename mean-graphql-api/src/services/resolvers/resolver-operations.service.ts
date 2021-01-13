import { Db } from "mongodb";
import { deleteOneElement, insertOneElement, updateOneElement } from "./../../lib/db-operations";
import { IVariablesData } from "./../../interfaces/variablesdata.interface";
import { IContextData } from "./../../interfaces/contextdata.interface";
import { COLLECTIONS } from "../../config/constants";
import { findManyElements, findOneElement } from "../../lib/db-operations";

export default class ResolverOperationsSerivce {
  private root: object;
  private variables: IVariablesData;
  private context: IContextData;
  constructor(root: object, variables: object, context: IContextData) {
    this.root = root;
    this.variables = variables;
    this.context = context;
  }

  protected getVariables(): IVariablesData {
    return this.variables;
  }
  protected getDb(): Db {
    return this.context.db;
  }
  // Retrieve list
  protected async list(collection: string, listElement: string) {
    // console.log(root,args,context,info);
    try {
      var users = await findManyElements(this.context.db, collection);
      return {
        status: true,
        message: `${listElement} list loaded succesfully`,
        items: users,
      };
    } catch (error) {
      console.log(error);
      return {
        status: true,
        message: `Error loading ${listElement} list`,
        items: [],
      };
    }
  }
  // Get item details
  protected async get(collection: string, listElement: string) {
    const filter = this.variables;
    try {
      var item = await findOneElement(this.context.db, collection, filter);

      if (!item) {
        return {
          status: false,
          message: `${listElement} for filter ${JSON.stringify(
            filter
          )} not found`,
          item: null,
        };
      }
      return {
        status: true,
        message: `${listElement} for filter ${JSON.stringify(
          filter
        )} found correctly`,
        item: item,
      };
    } catch (error) {
      return {
        status: true,
        message: `Failed to find ${listElement} for filter ${JSON.stringify(
          filter
        )}. This is probably a error with the backend. Error: ${error}`,
        item: null,
      };
    }
  }
  // Add item
  protected async add(collection: string, document: object, item: string) {
    // const document = this.variables;
    try {
      var res = await insertOneElement(this.context.db, collection, document);

      if (res.result.ok === 1) {
        return {
          status: true,
          message: `${item} added correctly`,
          item: document,
        };
      }
      return {
        status: true,
        message: `Failed to add ${item}`,
        item: null,
      };
    } catch (error) {
      return {
        status: true,
        message: `Unexpected error. Failed to add ${item}`,
        item: null,
      };
    }
  }
  // Modify item
  protected async update(collection: string, filter: object, newDocument : object, item: string) {
    // const document = this.variables;
    try {
      var newElement =  Object.assign({},filter,newDocument);
      var res = await updateOneElement(this.context.db, collection, filter,newElement);

      if (res.result.ok === 1) {
        return {
          status: true,
          message: `${item} updated correctly`,
          item: newElement,
        };
      }
      return {
        status: true,
        message: `Failed to update ${item}. Verify that the id provided is correct.`,
        item: null,
      };
    } catch (error) {
      return {
        status: true,
        message: `Unexpected error. Failed to update ${item}. ${error} . ${JSON.stringify(filter)}`,
        item: null,
      };
    }
  }
  // Remove item
  protected async remove(collection: string, filter: object, item: string) {
    // const document = this.variables;
    try {
      var res = await deleteOneElement(this.context.db, collection, filter);

      if (res.deletedCount === 1) {
        return {
          status: true,
          message: `${item} removed correctly`,
          item: null,
        };
      }
      return {
        status: true,
        message: `Failed to removed ${item}. Verify that the id provided belongs to an existing item.`,
        item: null,
      };
    } catch (error) {
      return {
        status: true,
        message: `Unexpected error. Failed to removed ${item}. ${error} . ${JSON.stringify(filter)}`,
        item: null,
      };
    }
  }
}
