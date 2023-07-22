import { Controller, Post, Res, HttpStatus, Body, Get, NotFoundException, Delete, Put} from '@nestjs/common';
import { PostUserMethod } from './dto/user.dto'
import { PostGameMethod } from './dto/game.dto'
import { PostDataMethod } from './dto/data.dto'
import { UserService } from './user.service';
import { GameService } from './user.service';
import { DataService } from './user.service';
import { UserAuth } from 'src/config';
import { get } from 'node:http';


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
        return res.status(HttpStatus.OK).json({message:"Correct Login", _id: user._id});
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
    @Post('/updateData')
    async updateUser(@Res() res, @Body() postUserMethod: PostUserMethod, @Body('_id') userID) {
        const updatedUser = await this.userService.updateUser(userID, postUserMethod);
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
        });
    }  
   
}

@Controller('game')
export class GameController {
//Acá van los endpoints

    constructor(private gameService:GameService,private userService:UserService){}
    @Post('/create')
    async createGame(@Res() res, @Body() postGameMethod: PostGameMethod) {
        const game = await this.gameService.createGame(postGameMethod);
        return res.status(HttpStatus.OK).json({game});
    }

    /*@Post('/list')
    async getGames(@Res() res, @Body() data) {
        const game = await this.gameService.getGames(data.user);
        return res.status(HttpStatus.OK).json(game);
    }


    @Get('/list2')
    async getUsers(@Res() res) {
        const users = await this.gameService.getGames2();
        return res.status(HttpStatus.OK).json(users);
    }*/

    @Post('/progress')
    async getProgreso(@Res() res, @Body() data) {
        const ListaRta=[];
        var progress = await this.gameService.getProgreso(data.user,'1');
        var progress2 = await this.gameService.getProgreso(data.user,'2');
        for (let index = 0; index < 2; index++) {
            if(progress[index]!=null){
                ListaRta.push(progress[index]);
            }
            if(progress2[index]!=null){
                ListaRta.push(progress2[index]);
            }            
        }
        return res.status(HttpStatus.OK).json({progresses:ListaRta});
    }

  /*  @Get('/aiuda')
    async Aiuda(@Res() res){
        const x= await this.userService.Aiuda();
        return res.status(HttpStatus.OK).json({x});
    }*/

    @Get('/tier')
    async Tier(@Res() res) {
        var rta={};
        const ListaRta=[];
        const users = await this.gameService.Tier();
        for (let index = 0; index < users.length; index++) {
            var data = await this.userService.getUserID(users[index].user.toString()) //estaba en ObjectID lo pasé a string para poder consultar
             rta={_id:users[index].user.toString(),
                    name:data.name,
                    fondoAvatar:data.fondoAvatar,
                    avatarUser:data.avatarUser,
                    puntos:users[index].puntos,
                    tiempo:users[index].tiempo};
            ListaRta.push(rta);        
        }        
        return res.status(HttpStatus.OK).json({items:ListaRta});
    }

    @Post('/updateData')
    async actualizarData(@Res() res, @Body() data) {
        await this.gameService.actualizarData1(data._id);
        await this.gameService.actualizarData2(data._id);
        return res.status(HttpStatus.OK).json({message: 'User Updated Successfully'});
    }

}

@Controller('data')
export class DataController {
    //Acá van los endpoints
    
        constructor(private dataService:DataService,private userService:UserService){}
        @Post('/create')
        async createData(@Res() res, @Body() postDataMethod: PostDataMethod) {
            const data = await this.dataService.createData(postDataMethod);
            return res.status(HttpStatus.OK).json({data});
        }

    
        /*@Post('/list')
        async getGames(@Res() res, @Body() data) {
            const game = await this.gameService.getGames(data.user);
            return res.status(HttpStatus.OK).json(game);
        }
    
    
        @Get('/list2')
        async getUsers(@Res() res) {
            const users = await this.gameService.getGames2();
            return res.status(HttpStatus.OK).json(users);
        }
    
        @Post('/progress')
        async getProgreso(@Res() res, @Body() data) {
            const ListaRta=[];
            var progress = await this.gameService.getProgreso(data.user,'1');
            var progress2 = await this.gameService.getProgreso(data.user,'2');
            for (let index = 0; index < 2; index++) {
                if(progress[index]!=null){
                    ListaRta.push(progress[index]);
                }
                if(progress2[index]!=null){
                    ListaRta.push(progress2[index]);
                }            
            }
            return res.status(HttpStatus.OK).json({progresses:ListaRta});
        }
    
      /*  @Get('/aiuda')
        async Aiuda(@Res() res){
            const x= await this.userService.Aiuda();
            return res.status(HttpStatus.OK).json({x});
        }
    
        @Get('/tier')
        async Tier(@Res() res) {
            var rta={};
            const ListaRta=[];
            const users = await this.gameService.Tier();
            for (let index = 0; index < users.length; index++) {
                var data = await this.userService.getUserID(users[index].user.toString()) //estaba en ObjectID lo pasé a string para poder consultar
                 rta={_id:users[index].user.toString(),
                        name:data.name,
                        fondoAvatar:data.fondoAvatar,
                        avatarUser:data.avatarUser,
                        puntos:users[index].puntos,
                        tiempo:users[index].tiempo};
                ListaRta.push(rta);        
            }        
            return res.status(HttpStatus.OK).json({items:ListaRta});
        }
    
        @Post('/updateData')
        async actualizarData(@Res() res, @Body() data) {
            await this.gameService.actualizarData1(data._id);
            await this.gameService.actualizarData2(data._id);
            return res.status(HttpStatus.OK).json({message: 'User Updated Successfully'});
        }
       */
    }