import { User } from "./user";

export class Friend {
    constructor(
        public id?: string,
        public receiverId?: string,
        public receiver?: User,
        public senderId?: string,
        public sender?: User,
        public friendshipDate?: Date,
        public isFriend?: boolean
    ){}
}

export class FriendDTO{
    constructor(
        public id?: string,
        public receiverId?: string,
        public senderId?: string,
    ){}
}
