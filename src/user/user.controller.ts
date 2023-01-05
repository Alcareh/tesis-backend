import { Controller, Post, Res, HttpStatus, Body, Get, NotFoundException, Delete, Put} from '@nestjs/common';
import { PostUserMethod } from './dto/user.dto'
import { UserService } from './user.service';
import { UserAuth } from 'src/config';


@Controller('user')
export class UserController {
//Acá van los endpoints

    constructor(private userService:UserService){}
    // Add User: /user/auth/create
    //json con todos los datos
    @Post('/auth/create')
    async createUser(@Res() res, @Body() postUserMethod: PostUserMethod) {
        //console.log(postUserMethod);
        const user = await this.userService.createUser(postUserMethod);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            user
        });
    }
    
    /*Select * from User
    @Get('/list')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }
    */

    // GET single user: /user/5c9d46100e2e5c44c444b2d1
    //poner el id en el json
    @Post('/userByID')
    async getUserID(@Res() res, @Body() userID) {
        const user = await this.userService.getUserID(userID);
        if (!user) throw new NotFoundException('user does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
   
    @Post('/getUserSignUp')
    async getUserSignUp(@Res() res, @Body('name') userName) {
        //console.log(userName);        
        const user = await this.userService.getUserName(userName);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({message:"Exists"});
    }

    /*GET single User: /user/data Lo que va en el body se tiene que llamar como en la bd
    //poner el nombre en el json
    @Post('/userByName')
    async getUserName(@Res() res, @Body('name') userName) {
        //console.log(userName);        
        const user = await this.userService.getUserName(userName);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
    */ 

    @Post('/Login')
    async getUserLogin(@Res() res, @Body() data) {
        //console.log(userName,password);        
        const user = await this.userService.getLoginUser(data.name,data.password);
        if (!user) throw new NotFoundException('Usuario o contraseña incorrectos');
        return res.status(HttpStatus.OK).json({message:"Correct Login"});
    }

    @Post('/CheckRecover')
    async getCheckRecover(@Res() res, @Body() data) {
        //console.log(userName,password);        
        const user = await this.userService.getCheckRecover(data.mail,data.securityqOp,data.securityqAn);
        if (!user) throw new NotFoundException('Los datos no coinciden');
        return res.status(HttpStatus.OK).json(user);
    }

   

    // Delete User: /user/delete   aunque creo que ni lo usaré
    // Toca poner el id en el json
    @Delete('/delete')
    async deleteUser(@Res() res, @Body('_id') userID) {
        const userDeleted = await this.userService.deleteUser(userID);
        if (!userDeleted) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Successfully',
            userDeleted
        });
    }

// Update User: /user/update  //toca poner el   ID y el otro campo que quiere cambiar en el json
    @Post('/PasswordRecover')
    async updateUser(@Res() res, @Body() postUserMethod: PostUserMethod, @Body('_id') userID) {
        const updatedUser = await this.userService.updateUser(userID, postUserMethod);
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
        });
    }   
}

