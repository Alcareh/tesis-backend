import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GameController } from './user.controller';
import { DataController } from './user.controller';
import { GameService, UserService,DataService} from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { GameSchema } from './schemas/game.schema';
import { DataSchema } from './schemas/data.schema';
// Para mongo el name es el del servicio
@Module({
  imports:[MongooseModule.forFeature([
    {name:'User', schema:UserSchema},
    {name:'Game', schema:GameSchema},
    {name:'Data', schema:DataSchema}
  ])],
  controllers: [UserController,GameController,DataController],
  providers: [UserService,GameService,DataService]
})
export class UserModule {}
