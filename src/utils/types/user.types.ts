export interface UserType {
    displayName: string;
    email: string;
    photoURL: string;
    phoneNumber: string;
    accessToken: string;
    friends: UserType[];
    socket_id?: string;
    _id: string;
    cover?: string;
    requests: UserType[];
}