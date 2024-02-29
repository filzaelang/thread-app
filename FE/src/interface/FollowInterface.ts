

export interface IFollower {
    id?: number,
    follower_id?: number,
    username?: string,
    full_name?: string,
    email?: string,
    photo_profile?: string,
    description?: string,
    is_followed?: boolean,
}

export interface IFollowing {
    id?: number,
    following_id?: number,
    username?: string,
    full_name?: string,
    email?: string,
    photo_profile?: string,
    description?: string,
    is_followed?: boolean,
}