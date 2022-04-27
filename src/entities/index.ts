export interface IGift {
  id: number;
  name: string;
  fromId?: number;
}

export interface IOrder {
  id: number;
  date: Date;
  description?: string;
  userId?: number;
  giftId?: number;
}

export interface IUser {
  id: number;
  name: string;
  number: string;
}
