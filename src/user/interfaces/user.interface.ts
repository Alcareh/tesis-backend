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
    progreso:string,
    habilidad:string,
    nivel:string,
    puntos:string,
    notify:boolean,
    notify2:boolean,
    logros:string
}
/*
export interface Game extends Document{
    lvl:string,
    fecha:string,
    tiempo:string,
    user:{
        _id:string,
        puntos:string
    }
}*/