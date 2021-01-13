import { Db } from "mongodb";

// cointext for db requests
export interface IVariablesData{
    id?: string | number;
    genre?: string ;
    email?: string ;
    password?: string ;
    token?: string ;
}
