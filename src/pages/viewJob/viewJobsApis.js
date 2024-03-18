import { BASE_URL } from "../../services/baseUrl"
import { commomAPI } from "../../services/commonApi"


/* Request Task api*/
export const requestTask = async(reqBody, reqHeader)=>{
    return await commomAPI('POST', `${BASE_URL}/job/request-task`, reqBody, reqHeader)  
}

export const getPostData = async (id, reqHeader)=>{
    return await commomAPI("GET",`${BASE_URL}/job/post/data/${id}`,"", reqHeader)
}

export const deleteRequestTask = async (id, reqHeader)=>{
    return await commomAPI("DELETE",`${BASE_URL}/job/delete-task/${id}`,{}, reqHeader)
}
