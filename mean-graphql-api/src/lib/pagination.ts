import { countElements } from './db-operations';
import { Db } from "mongodb";

export async function pagination(
  db: Db,
  collection: string,
  page: number = 1,
  items: number = 20
){
    
    const total = await countElements(db,collection);
    const pages = Math.ceil(total/items);

    //  items validation
    if(items < 1){
        items = 1;
    }

    if(items > 50){
        items = 50;
    }
    //page validation
    if(page < 1){
        page = 1;
    }

    if(page > pages){
        page = pages;
    }

    return {
        page,
        skip: (page - 1) * items,
        items,
        total,
        pages
    }
}
