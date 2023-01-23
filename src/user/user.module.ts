import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GameController } from './user.controller';
import { GameService, UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { GameSchema } from './schemas/game.schema';
// Para mongo el name es el del servicio
@Module({
  imports:[MongooseModule.forFeature([
    {name:'User', schema:UserSchema},
    {name:'Game', schema:GameSchema}
  ])],
  controllers: [UserController,GameController],
  providers: [UserService,GameService]
})
export class UserModule {}
