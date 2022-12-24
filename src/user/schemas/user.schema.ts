import { isObjectIdOrHexString, Schema } from 'mongoose'
//Esquema de la bd para Mongo
// acá se tiene que poner el default
export const UserSchema=new Schema({
    name: String,
    mail: String,
    password: String,
    securityqOp: String,
    securityqAn:String
})