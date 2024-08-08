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


 export const getUsers = async () =>{
  try{
    const response = await authAxios.get("/admin/user-management")
    console.log(response)
    return response.data.users
  } catch(erroor){
    console.log("Error fetching users",erroor)
  }
 }


 export const blockUsers = async (userId: string, isBlocked: boolean) =>{
  try{
    const response = await authAxios.patch("/admin/block-user",{ userId, isBlocked})
    console.log(response.data)
    return response.data
  } catch(error){
    console.log(error)
    throw  error
  }
 }


 export const blockRestaurant = async (restaurantId: string, isBlocked: boolean)=>{
  try{
    const response = await authAxios.patch("/admin/block-restaurant",{restaurantId, isBlocked}) 
    console.log(response.data)
    return response.data
  } catch(error){
    console.log(error)
    throw error
  }
 }