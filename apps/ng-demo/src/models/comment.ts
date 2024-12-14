import { User } from './user';

export type Comment = {
  type_of: string;
  id_code: string;
  created_at: Date;
  body_html: string;
  user: User;
  children: Comment[];
}
