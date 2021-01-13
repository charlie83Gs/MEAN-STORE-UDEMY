import { Db } from "mongodb";

// cointext for db requests
export interface IContextData{
    db: Db;
}
