import { User } from "./user";
import { Post } from "./post";

export class Like {
    constructor(
        public id?: string,
        public postId?: string,
        public post?: Post,
        public likerId?: string,
        public liker?: User,
    ){}


}

export class LikeDTO {
    constructor(
        public postId?: string,
        public likerId?: string
    ){}
}