import { Album } from "./album";

export class Photo {
    constructor(
        public id: string,
        public photoImageURL: string,
        public uploadDate?: Date,
        public albumId?: string,
        public album?: Album         
    ){}
}
export class PhotoDTO {
    constructor(
        public id: string,
        public photoImage: string,
        public uploadDate?: Date,
        public AlbumId?: string
    ){}
}