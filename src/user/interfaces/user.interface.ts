import { Document } from "mongoose";
// Escribir datos para autocompletado
export interface User extends Document{
    name: string;
    mail: string;
    password: string;
    securityqOp: string;
    securityqAn:string;
    newAccount:boolean;
    fondoAvatar:string,
    avatarUser:string,
    avatarLote:string,
    progreso:string,
    habilidad:string,
    nivel:string,
    puntos:string,
    notify:boolean,
    logros:string
}