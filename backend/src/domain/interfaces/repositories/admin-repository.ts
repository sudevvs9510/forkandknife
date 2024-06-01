import { UserType } from "../../entities/User"

export interface AdminRepositories{
   adminLoginRepo(credentials: {email: string, password: string}): Promise<{ admin: UserType | null, message: string }>
   
}