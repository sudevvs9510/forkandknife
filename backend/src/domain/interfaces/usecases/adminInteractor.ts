import { UserType } from '../../entities/User'

export interface AdminInteractor {
   adminLogin(credentials: {email: string, password: string}): Promise<{message: string, token: string | null, admin: UserType | null}>
}