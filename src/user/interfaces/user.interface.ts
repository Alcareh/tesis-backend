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
    puntos:number,
    puntosLvl1Old:number ;
    puntosLvl1New: number;
    puntosLvl2Old: number;
    puntosLvl2New: number;
    notify:boolean[],
    notify2:boolean,
    logros:boolean[]
}