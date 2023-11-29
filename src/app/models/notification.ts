import { User } from "./user";

export class Notification {
    constructor(
        public id?: string,
        public notifiedUserId?: string,
        public notifiedUser?: User,
        public notificationType?: string,
        public contextId?: string,
        public isRead?: boolean
    ){}
}
