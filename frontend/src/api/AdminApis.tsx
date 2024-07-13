import authAxios from "../redux/api/authApi"


export const logoutAdmin = async () =>{
  try{
    console.log("admin logout")
    await authAxios.post('/admin/logout')

  } catch(error){
    console.log("Logout error",error)
  } finally{
    localStorage.removeItem("AdminAuthToken")
  }
 }