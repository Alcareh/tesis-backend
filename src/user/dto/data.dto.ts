import {BaseDTO} from './user.dto';
import { Types } from "mongoose";
export class PostDataMethod extends BaseDTO{
   readonly artro:string;
   readonly palpa:string;
   readonly target:string;
   readonly timer:string;
   readonly fecha:string;
   readonly tratado:boolean;
   readonly user:Types.ObjectId;   
}