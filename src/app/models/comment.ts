import { User } from "./user";
import { Post } from "./post";


export class Comment {
    constructor(
        public id?: string,
        public commentContent?: string,
        public dateCommented?: Date,
        public postId?: string,
        public post?: Post,
        public commenterId?: string,
        public commenter?: User
    ){}
}
export class CommentDTO {
    constructor(
        public id?: string,
        public commentContent?: string,
        public dateCommented?: Date,
        public postId?: string,
        public commenterId?: string,
    ){}
}