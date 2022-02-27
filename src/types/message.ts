export interface IMessageBase {
  userid: string;
  groupid: string;
  message: string;
  receivedby: string[];
  readdby: string[];
}

export interface IMessage extends Document {
  userid: string;
  groupid: string;
  message: string;
  receivedby: string[];
  readdby: string[];
}
