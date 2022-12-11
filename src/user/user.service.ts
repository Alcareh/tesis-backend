import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto';
@Injectable()
export class UserService {
constructor(@InjectModel('User') private readonly userModel:Model<User>){}

   async getUsers():Promise<User[]>{
        const users= await this.userModel.find()
        return users;
    }

   async getUser(userID:string):Promise<User>{
        const user=  await this.userModel.findById(userID)
        return user;
    }

    async createUser(createUserDTO:CreateUserDTO):Promise<User>{
       const user=  new this.userModel(createUserDTO);
       return await user.save();
    }

    // Delete Product
    async deleteUser(userID: string): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    // Put a single product
    async updateUser(userID: string, createUserDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel
                            .findByIdAndUpdate(userID, createUserDTO, {new: true});
        return updatedUser;
    }
}
