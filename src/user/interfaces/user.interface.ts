import { Document } from "mongoose";
// Escribir datos para autocompletado
export interface User extends Document{
    name: string;
    mail: string;
    password: string;
    securityqOp: string;
    securityqAn:string;
    newAccount:boolean;
}