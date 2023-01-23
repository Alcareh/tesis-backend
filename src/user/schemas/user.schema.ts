import { Schema } from 'mongoose'
//Esquema de la bd para Mongo
// acá se tiene que poner el default
export const UserSchema=new Schema({
    name: String,
    mail: String,
    password: String,
    securityqOp: String,
    securityqAn:String,
    newAccount: {type: Boolean, default: true},
    fondoAvatar:{type: String, default: 0},
    avatarUser:{type: String, default: 0},
    progreso:{type: String, default: 0},
    habilidad:{type: String, default: 0},
    nivel:{type: String, default: 1},
    puntos:{type: Number, default: 0},
    puntosLvl1Old:{type: Number, default: 0} ,
    puntosLvl1New: {type: Number, default: 0},
    puntosLvl2Old: {type: Number, default: 0},
    puntosLvl2New: {type: Number, default: 0},
    notify:{type: [Boolean], default: [false, false, false, false, false]},
    notify2:{type: Boolean, default: false},
    logros:{type: [Boolean], default: [false, false, false, false, false]}
},
{
  versionKey: false,
})