import { Controller, Post, Res, HttpStatus, Body, Get, NotFoundException, Delete, Put} from '@nestjs/common';
import { PostUserMethod } from './dto/user.dto'
import { UserService } from './user.service';
import { UserAuth } from 'src/config';


@Controller('user')
export class UserController {
//Acá van los endpoints

    constructor(private userService:UserService){}
    // Add User: /user/auth/create
    @Post('/auth/create')
    async createUser(@Res() res, @Body() postUserMethod: PostUserMethod) {
        const user = await this.userService.createUser(postUserMethod);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            user
        });
    }
    
    //Select * from User
    @Get('/list')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    // GET single user: /user/5c9d46100e2e5c44c444b2d1
    @Post('/userByID')
    async getUserID(@Res() res, @Body() userID) {
        const user = await this.userService.getUserID(userID);
        if (!user) throw new NotFoundException('user does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
   

    // GET single User: /user/data Lo que va en el body se tiene que llamar como en la bd
    @Post('/userByName')
    async getUserName(@Res() res, @Body('name') userName) {
        const user = await this.userService.getUserName(userName);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

   

    // Delete User: /user/delete   aunque creo que ni lo usaré
    @Delete('/delete')
    async deleteUser(@Res() res, @Body('_id') userID) {
        const userDeleted = await this.userService.deleteUser(userID);
        if (!userDeleted) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Successfully',
            userDeleted
        });
    }

// Update User: /user/update
    @Put('/update')
    async updateUser(@Res() res, @Body() postUserMethod: PostUserMethod, @Body('_id') userID) {
        const updatedUser = await this.userService.updateUser(userID, postUserMethod);
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
            updatedUser 
        });
    }   
/*
    @Post("consultica")
    async post1(@Res() res, @Body() createUserDTO:CreateUserDTO){
        //console.log(createUserDTO);
        const user=await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
             message: 'Create done',
             users:user
        });
    }

    @Get("/sirve")
    async get1(@Res() res){
        //console.log("ola");
        const user=await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
             message: 'Select *  done',
             users:user
        });
    }*/
}

