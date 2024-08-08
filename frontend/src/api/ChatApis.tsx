import authAxios from "../redux/api/authApi";


export const getConversations = async(userId: string) =>{
  try{
    console.log(userId)
    const response = await authAxios.get(`/chat/conversations/${userId}`)
    console.log(response.data)
    return response.data
  } catch(error){
    console.log(error)
    throw error
  }
}


export const addConversation = async(senderId: string, receiverId: string) =>{
  try{
    const response = await authAxios.post(`/chat/conversations`, { senderId, receiverId})
    return response.data
  } catch (error){
    console.log(error)
    throw error
  }
}


export const getMessages = async (conversationId : string) =>{
  try{
    console.log(conversationId)
    const response = await authAxios.get(`/chat/messages/${conversationId}`)
    console.log(response.data)
    return response.data 
  } catch(error){
    console.log(error)
    throw error
  }
}


export const sendMessage = async (conversationId: string, sender: string, content: string) =>{
  try{
    const response = await authAxios.post('/chat/messages', {conversationId,sender, content})
    return response.data 
  } catch(error){
    console.log(error)
    throw error
  }
} 
