export interface IGroupBase {
  groupname: string;
  isgroup: boolean;
  active: boolean;
}

export interface IGroup extends Document {
  groupname: string;
  isgroup: boolean;
  active: boolean;
}

export interface IGroupUserBase {
  groupid: string;
  userid: string;
  createdAt: Date;
}

export interface IGroupUser extends Document {
  groupid: string;
  userid: string;
  createdAt: Date;
}
