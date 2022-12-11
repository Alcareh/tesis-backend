import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto'
import { UserService } from './user.service';


@Controller('user')
export class UserController {
//Acá van los endpoints

    constructor(private userService:UserService){}

    @Post("consultica")
    async post1(@Res() res, @Body() createUserDTO:CreateUserDTO){
        //console.log(createUserDTO);
        const user=await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
             message: 'Create done',
             users:user
        });
    }

    @Get("sirve")
    async get1(@Res() res){
        //console.log(createUserDTO);
        const user=await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
             message: 'Select *  done',
             users:user
        });
    }
    }

