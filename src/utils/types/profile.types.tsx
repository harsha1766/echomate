import { PostType } from "./post.types";

export interface ProfileType {
    friends: string[];
    displayName: string;
    email: string;
    photoURL: string;
    cover: string;
    socket_id: string;
    dob: string;
    address: string;
    phoneNumber: string;
    accessToken: string;
    requests: string[];
    posts: PostType[];
    _id: string;
}