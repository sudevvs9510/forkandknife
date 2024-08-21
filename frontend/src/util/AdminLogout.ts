import store from "../redux/app/store"
import { logout } from "../redux/reducers/adminSlices/AdminAuthSlice"
import toast from "react-hot-toast"

const AdminLogout = ( message: string) : void =>{
  store.dispatch(logout())
  message.length > 0 && toast.error(message)
}

export default AdminLogout