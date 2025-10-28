export interface AuthStore {
  accessToken: string | null
  user: User | null
  loading: boolean

  signUp: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => Promise<void>
}
