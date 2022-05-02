export interface User {
  id: string
  email: string
  name: string
  password: string
}

export interface CreateUser {
  email: string
  name: string
  password: string
}
