import { UserType } from "./user.types";

export interface PostType {
    _id: string;
    text: string;
    type: 'image' | "video" | 'text';
    likes: string[];
    comments: {
        user: string;
        text: string;
        timestamp: string;
    }[];
    edited: boolean;
    owner: UserType;
    timestamp: string;
    content: string;
}