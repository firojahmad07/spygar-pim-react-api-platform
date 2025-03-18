import { type TLanguageCode } from '@/i18n';

export interface AuthModel {
  access_token: string;
  token: string;
  refreshToken?: string;
  api_token: string;
}

export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: number[];
  pic?: string;
  language?: TLanguageCode;
  auth?: AuthModel;
}
