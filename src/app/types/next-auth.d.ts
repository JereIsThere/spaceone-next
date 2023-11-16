import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    // user?: User
    uid: number,
    username: string,
    password: string
  }
}