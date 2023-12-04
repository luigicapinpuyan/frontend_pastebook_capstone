import { User } from "./user";
import { Photo } from "./photo";

export class Album {
    constructor(
        public id?: string,
        public albumName?: string,
        public userId?: string,
        public user?: User
    ){}
}

export class AlbumDTO {
    constructor(
        public albumName?: string,
        public userId?: string
    ){}
}

export class AlbumWithFirstPhoto {
    constructor(
        public albumDTO?: Album,
        public firstPhoto?: Photo,

        public photoUrl?: string
    ){}
}