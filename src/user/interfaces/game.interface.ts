import { Types,Document } from "mongoose";

export interface Game extends Document{
    puntos: number,
    lvl:string,
    fecha:string,
    tiempo:string,
    user: Types.ObjectId;
}