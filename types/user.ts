export interface User {
  _id: string;
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  createdAt: Date;
}
