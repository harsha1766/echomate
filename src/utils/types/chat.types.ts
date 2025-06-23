export interface ChatType {
  timestamp: string;
  sender: string;
  receiver: string;
  message: string;
  media: string;
  type: "image" | "video" | "text";
  _id: string;
  comments: any[];
}
