export class ICreateUser {
  username: string;
  password: string;
  email: string;
}

export class IUserInfo {
  user_info_token: { id: number; name: string; email: string; balance: number };
}

export class ILogin {
  email: string;
  password: string;
}

export class IToken {
  id_token: string;
}
