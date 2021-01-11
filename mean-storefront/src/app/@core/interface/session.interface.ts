import { IUser } from "./user.interface";

export interface ISession{
    expiresIn : string;
    token?: string;
}

export interface IAuthData{
    status: boolean;
    message?: string;
    user?: IUser
}