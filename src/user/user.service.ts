import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import { User } from './interfaces/user.interface';
import { PostUserMethod } from './dto/user.dto';
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
}
/*
export class GameService{
    constructor(@InjectModel('Game') private readonly gameModel:Model<Game>){}

    async gamesUser(userID:string): Promise<Game[]>{
        const query:any={ user:new mongoose.Types.ObjectId(userID)}
        const games= await this.gameModel.find(query).exec()
        return games
    }
}*/
