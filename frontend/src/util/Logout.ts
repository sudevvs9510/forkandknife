import store from "../redux/app/store"
import { logout } from "../redux/reducers/userSlices/UserAuthSlice"
import toast from "react-hot-toast"

const userLogout = ( message: string) : void =>{
  store.dispatch(logout())
  toast.error(message)

}

export default userLogout