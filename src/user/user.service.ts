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

    // Get a single Product by ID
    async getUserID(userID: string): Promise<User> {
        const user = await this.userModel.findById(userID); 
        return user;
    }

    //Select a specific User by name
   async getUserName(userName:string):Promise<User>{
        const user=  await this.userModel.findOne({name:userName});
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
