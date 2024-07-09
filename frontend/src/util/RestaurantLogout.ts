import store from "../redux/app/store"
import { logout } from "../redux/reducers/restaurantSlices/RestaurantAuthSlice"
import toast from "react-hot-toast"

const restaurantLogout = ( message: string) : void =>{
  store.dispatch(logout())
  toast.error(message)

}

export default restaurantLogout