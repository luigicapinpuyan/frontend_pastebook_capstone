import { User } from "./user";

export class Timeline {
    constructor(
        public id: string,
        public userId: number,
        public user: User,
    ){}
}
