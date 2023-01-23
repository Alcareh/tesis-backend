import { Schema } from 'mongoose'
//Esquema de la bd para Mongo
// acá se tiene que poner el default
export const GameSchema=new Schema({
    puntos: {type: Number, default: 0},
    lvl:String,
    fecha:String,
    tiempo:String,
    user:{
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
},
{
  versionKey: false,
})