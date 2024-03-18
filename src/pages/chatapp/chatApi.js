import { BASE_URL } from "../../services/baseUrl"
import { commomAPI } from "../../services/commonApi"




export const getMessages = async (senderId, receiverId, reqHeader)=>{
    return await commomAPI("GET",`${BASE_URL}/chats/${senderId}/${receiverId}`,"", reqHeader)
}

export const getChatPreview = async (userId, reqHeader)=>{
    console.log("GET sfsd reqHeader", userId, reqHeader);
    return await commomAPI("GET",`${BASE_URL}/user/contacted/${userId}`,"", reqHeader)
}