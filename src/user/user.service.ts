import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from "mongodb"
import { InjectModel } from '@nestjs/mongoose/dist';
import { User } from './interfaces/user.interface';
import { Game } from './interfaces/game.interface';
import { PostUserMethod } from './dto/user.dto';
import { PostGameMethod } from './dto/game.dto';
import { json } from 'node:stream/consumers';
import { userInfo } from 'os';
//Métodos para endpoints

@Injectable()
export class UserService {
constructor(@InjectModel('User') private readonly userModel:Model<User>){}

    //Select *  from Users
   async getUsers():Promise<User[]>{
        const users= await this.userModel.find();
        return users;
    }

    // Get a single User by ID
    async getUserID(userID: string): Promise<User> {
        const user = await this.userModel.findById(userID); 
        return user;
    }

    //Select a specific User by name
   async getUserName(userName:string):Promise<User>{
        const user=  await this.userModel.findOne({name:userName});
        return user;
    }
    //Select an user with their password
    async getLoginUser(userName:string,pass:string):Promise<User>{
        const user=  await this.userModel.findOne({
            name:userName,
            password:pass
        });
        return user;
    }

    //Check the user with the email, securityqOp and securityqAn
    async getCheckRecover(email:string,securityqOpci:string,securityqAnsw:string):Promise<User>{
        const user=  await this.userModel.findOne({
            mail: email,
            securityqOp: securityqOpci,
            securityqAn:securityqAnsw
        });
        return user;
    }
    //Create a new User
    async createUser(postUserMethod:PostUserMethod):Promise<User>{
       const user=  new this.userModel(postUserMethod);
       return await user.save();
    }

    // Delete an User
    async deleteUser(userID: string): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    // Update a single User
    async updateUser(userID: string, postUserMethod: PostUserMethod): Promise<User> {
        const updatedUser = await this.userModel
                            .findByIdAndUpdate(userID, postUserMethod, {new: true});
        return updatedUser;
    }

 //Hace update agregando diferentes campos (addfield a los documentos)
  /* async Aiuda():Promise<any> {
      const x= await this.userModel.updateMany({},{ $set: { 'puntosLvl1Old': 0,'puntosLvl1New': 0,'puntosLvl2Old': 0,'puntosLvl2New': 0} })  
    }*/

    
}

export class GameService {
    constructor(@InjectModel('Game')private readonly gameModel:Model<Game>,@InjectModel('User') private readonly userModel:Model<User>){}

    //Crear nueva partida
    async createGame(postGameMethod:PostGameMethod):Promise<Game>{
        const game=  new this.gameModel(postGameMethod);
        return await game.save();
     }
    
     //Consulta todos los juegos de un user con su id
     /*async getGames(userID: string):Promise<Game[]>{
        var o_id = new ObjectId(userID);
        const games= await this.gameModel.find({"user":o_id});
        return games;
    }*/ 

    //Consulta todos los juegos
    /*async getGames2():Promise<Game[]>{
        const users= await this.gameModel.find();
        return users;
    }*/

    //Consulta el mejor juego para un nivel de un jugador
    async getProgreso(userID: string, lvl:string):Promise<Game[]> {
        var o_id = new ObjectId(userID);
        const max= await this.gameModel.
        find({}).sort({puntos:-1}).
        where('user').equals(o_id).
        where('lvl').equals(lvl).
        limit(2).select({_id: 0,user:0});
        return max;
    }


    async Tier():Promise<Game[]> {
       const max= await this.gameModel.aggregate([{
        "$group": {
          "_id": {
            "user": "$user",
            "lvl": "$lvl",
            "tiempo": "$tiempo",
            "fecha": "$fecha"
          },
          "puntos": {
            "$max": "$puntos"
          }
        }
      },{
        "$project": {
          "user": "$_id.user",
          "lvl": "$_id.lvl",
          "tiempo": "$_id.tiempo",
          "fecha": "$_id.fecha",
          "puntos": 1,
          "_id": 0
        }
      },{
        "$group": {
          "_id": {
            "user": "$user",
            "fecha": "$fecha"
          },             
          "puntos": {
            "$sum": "$puntos"
          },
          "tiempo": {
            "$sum": "$tiempo"
          }
        }
      },{
        "$sort": {
          "puntos": -1,
          "tiempo": 1,
          "_id.fecha": 1
        }
      },{
        "$limit": 5
      },{
        "$project": {
          "user": "$_id.user",
          "fecha": "$_id.fecha",
          "puntos": 1,
          "tiempo": 1,
          "_id": 0
        }
      }])
        return max;
    }

    async actualizarData1(userID:string):Promise<any>{
      const a= await this.getProgreso(userID,"1");
      const b= await this.getProgreso(userID,"2");  
      const user = await this.userModel.findById(userID);
      //Check Logros
      const userInfo= user.logros;
      var userHabilidad= parseInt(user.habilidad);
      if (userInfo[0]==false && a[0]!=null) {
        userHabilidad=userHabilidad+20;
        var valor=userHabilidad.toString();
        await this.userModel.findOneAndUpdate({_id:userID},{'logros.0':'true','notify.0':'true','habilidad':valor},{new:false});
      }
      if (userInfo[1]==false && b[0]!=null) {
        userHabilidad=userHabilidad+20;
        var valor=userHabilidad.toString();
        await this.userModel.findOneAndUpdate({_id:userID},{'logros.1':'true','notify.1':'true','habilidad':valor},{new:false});
      }  
      if (userInfo[2]==false && (a[0].puntos>=100 && b[0].puntos>=100)) {
        userHabilidad=userHabilidad+20;
        var valor=userHabilidad.toString();
        await this.userModel.findOneAndUpdate({_id:userID},{'logros.2':'true','notify.2':'true','habilidad':valor},{new:false});
      }  
      if (userInfo[3]==false && (a[0].puntos>=200 || b[0].puntos>=200)) {
        userHabilidad=userHabilidad+20;
        var valor=userHabilidad.toString();
        await this.userModel.findOneAndUpdate({_id:userID},{'logros.3':'true','notify.3':'true','habilidad':valor},{new:false});
      }  
      if (userInfo[4]==false && (a[0].puntos>=200 && b[0].puntos>=200)) {
        userHabilidad=userHabilidad+20;
        var valor=userHabilidad.toString();
        await this.userModel.findOneAndUpdate({_id:userID},{'logros.4':'true','notify.4':'true','habilidad':valor},{new:false});
      }      
    }

    async actualizarData2(userID:string):Promise<any>{
      const a= await this.getProgreso(userID,"1");
      const b= await this.getProgreso(userID,"2");  
      const user = await this.userModel.findById(userID);
      //CheckNivel
      var puntosLvl1Old= user.puntosLvl1Old;
      var puntosLvl2Old= user.puntosLvl2Old;
      var puntosLvl1New;
      var puntosLvl2New;
      var notify2Value;
      var nivelUser= parseInt(user.nivel);
      var userProgreso= parseInt(user.progreso);
      
      //check si hay una práctica del lvl 1
      if(a[0]!=null){
       puntosLvl1New= a[0].puntos;
       userProgreso=25;
      }else{
        puntosLvl1New=user.puntosLvl1New;
        userProgreso=0;
      }
      //check si hay una práctica del lvl 2
      if(b[0]!=null){
       puntosLvl2New= b[0].puntos;
      }else{
        puntosLvl2New=user.puntosLvl2New;
      }
      var TotalOld= puntosLvl1Old+puntosLvl2Old;
      var TotalNew= puntosLvl1New+puntosLvl2New;
     //Cuenta cuantos niveles subió teniendo el nuevo puntaje máximo
      for (let index = 101; index < 400; index=index+100) {
        if(TotalOld<index && TotalNew>=index){
          nivelUser++;
          notify2Value=true;                    
      }
    }
      //Si ya tiene una práctica el progreso debe empezar a subir
      if(userProgreso!=0){
      userProgreso=nivelUser*25;
      }    
      puntosLvl1Old=puntosLvl1New;
      puntosLvl2Old=puntosLvl2New;
      TotalOld=TotalNew;
      var nivelFinal=nivelUser.toString();
      var progresoFinal=userProgreso.toString();
      
      await this.userModel.findOneAndUpdate({_id:userID},
        {'progreso':progresoFinal,
          'nivel': nivelFinal,
          'puntos':TotalNew,
          'notify2':notify2Value,
          'puntosLvl1Old':puntosLvl1Old,
          'puntosLvl2Old':puntosLvl2Old,
          'puntosLvl1New':puntosLvl1New,
          'puntosLvl2New':puntosLvl2New
        },{new:false}
        );
  } 
}
