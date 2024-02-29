export interface IUser {
    id?: number;
    username?: string;
    full_name?: string;
    email?: string;
    photo_profile?: string | undefined;
    description?: string;
    followers_count?: number;
    following_count?: number;
}

export interface IUserSearchResult {
    id?: number;
    username?: string;
    full_name?: string;
    email?: string;
    photo_profile?: string | undefined;
    description?: string;
    followers_count?: number;
    following_count?: number;
    is_followed?: boolean | undefined;
}

export interface IUserUpdate {
    full_name?: string;
    description?: string;
    photo_profile?: Blob | MediaSource | string;
}

export interface IUserRegister {
    full_name: string;
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserSearch {
    username?: string | undefined;
}

// export interface IUserProfile {
//     id?: number;
//     username?: string;
//     full_name?: string;
//     email?: string;
//     photo_profile?: string | undefined;
//     description?: string;
//     follower?: any;
//     following?: any;
//     followers_count?: number;
//     following_count?: number;
// }