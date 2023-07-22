import { Schema } from 'mongoose'
//Esquema de la bd para Mongo
// acá se tiene que poner el default
export const DataSchema=new Schema({
    artro:String,
    palpa:String,
    target:String,
    timer:String,
    fecha:String,
    tratado: {type: Boolean, default: false},
    user:{
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
},
{
  versionKey: false,
})