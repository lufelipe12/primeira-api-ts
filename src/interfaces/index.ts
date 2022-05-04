export interface IUser {
  id: string
  email: string
  name: string
  password: string
}

export interface ICreateUser {
  email: string
  name: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserListOne {
  authorization?: string
}
