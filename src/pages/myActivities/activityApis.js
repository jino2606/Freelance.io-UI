import { BASE_URL } from "../../services/baseUrl"
import { commomAPI } from "../../services/commonApi"



/* get user specified projects */
export const getCurrentUserProject = async(reqHeader)=>{
    return await commomAPI('GET', `${BASE_URL}/job/post/currentuser`, "", reqHeader)
}

/* Getting Requested users using RequestedUserId for My Works  Page */
export const getMyWorks = async(reqHeader)=>{
    return await commomAPI('GET', `${BASE_URL}/job/post/myworks`, "", reqHeader)
}

/* Getting Requested users using JObPostId for ViewApplicants Page */
export const getRequestedUsers = async(id, reqHeader)=>{
    return await commomAPI('GET', `${BASE_URL}/job/post/requesteduser/${id}`, "", reqHeader)
}

//profile update
export const updateUserJobState = async(reqBody,reqHeader)=>{
    return await commomAPI("PUT",`${BASE_URL}/job/post/updaterequest`,reqBody,reqHeader)
}