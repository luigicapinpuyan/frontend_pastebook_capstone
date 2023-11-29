import { User } from "./user";
import { Photo } from "./photo";
import { Timeline } from "./timeline";

export class Post {

    constructor(
        public id?: string,
        public postTitle?: string,
        public postBody?: string,
        public datePosted?: Date,
        public timelineId?: string,
        public timeline?: Timeline,
        public photoId?: string,
        public photo?: Photo,
        public posterId?: string,
        public poster?: User

    ){}
}

export class PostDTO{
    constructor(
        public id?: string,
        public postTitle?: string,
        public postBody?: string,
        public datePosted?: Date,
        public photoId?: string,
        public userId?: string,
        public posterId?: string
    ){}
}