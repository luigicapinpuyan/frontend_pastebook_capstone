import { Photo } from "./photo";

export class User {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public birthDate?: Date,
        public sex?: string,
        public phoneNumber?: string,
        public aboutMe?: string,
        public profileImageId?: string,
        public photo?: Photo
        
    ){}

}

export class UserRegisterDTO {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public password?: string,
        public birthDate?: Date,
        public sex?: string,
        public phoneNumber?: string
    ){}
}

export class UserLoginDTO {
    constructor(
        public email?: string,
        public password?: string
    ){}
}

export class LoginResponse {
    constructor(
        public userId?: string,
        public email?: string,
        public password?: string
    ){}
}

export class MiniProfileDTO {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public photo?: Photo,
        public friendCount?: number
    ){}
}

export class ProfileDTO {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public birthDate?: Date,
        public sex?: string,
        public phoneNumber?: string,
        public aboutMe?: string
    ){}
}

export class EditPasswordDTO {
    constructor(
        public userId?: string,
        public currentPassword?: string,
        public newPassword?: string
    ){}
}

export class AboutMeDTO {
    constructor(
        public aboutMe?: string
    ){}
}