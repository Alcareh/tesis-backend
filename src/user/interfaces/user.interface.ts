import { Document } from "mongoose";
// Escribir datos para autocompletado
export interface User extends Document{
    name: string;
    mail: string;
    password: string;
    securityq: string;
}