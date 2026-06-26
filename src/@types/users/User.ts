export interface User {
  id: string;
  sessionId: string;
  username: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}
