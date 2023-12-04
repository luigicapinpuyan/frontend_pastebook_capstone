import { Friend } from "./friend";
import { Like } from "./like";
import { User } from "./user";

export class Notification {
    constructor(
        public id?: string,
        public notifiedUserId?: string,
        public notifiedUser?: User,
        public notificationType?: string,
        public isRead?: boolean,
        
        public contextId?: string,
        public likeContext?: Like,
        public friendContext?: Friend,
        public commentContext?: Comment
    ){}
}
