import { isObjectIdOrHexString, Schema } from 'mongoose'
//Esquema de la bd para Mongo
export const UserSchema=new Schema({
    name: String,
    mail: String,
    password: String,
    securityq: String    
})