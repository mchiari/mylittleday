import { UserI } from "../users/types"

export interface PostI {
    _id: mongoose.Types.ObjectId;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId | UserI; 
    mentions: mongoose.Types.ObjectId[] | UserI[]; 
    createdAt?: Date;
    updatedAt?: Date;
  }