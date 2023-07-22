import { Types,Document } from "mongoose";

export interface Data extends Document{
    artro: string,
    palpa: string,
    target: string,
    timer: string,
    fecha: string,
    tratado:boolean;
    user: Types.ObjectId;
}