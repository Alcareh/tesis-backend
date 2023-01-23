import {BaseDTO} from './user.dto';
import { Types } from "mongoose";
export class PostGameMethod extends BaseDTO{
   readonly puntos:number;
   readonly lvl:string;
   readonly fecha:string;
   readonly tiempo:string;
   readonly user:Types.ObjectId;   
}