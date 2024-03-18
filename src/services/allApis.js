import { BASE_URL } from "./baseUrl"
import { commomAPI } from "./commonApi"


/* user register api*/
export const userRegister = async(reqBody)=>{
    console.log("called");
    return await commomAPI('POST', `${BASE_URL}/user/register`, reqBody, "")  
}

/* user login api*/
export const userLogin = async(reqBody)=>{
    return await commomAPI('POST', `${BASE_URL}/user/login`, reqBody, "")  
}

//user logout
export const userLogout = async(reqHeader)=>{
    return await commomAPI("PUT",`${BASE_URL}/user/logout`,"",reqHeader)
}

//profile update
export const updateProfileAPI = async(reqBody,reqHeader)=>{
    return await commomAPI("PUT",`${BASE_URL}/user/update`,reqBody,reqHeader)
}

export const getUser = async (id, reqHeader)=>{
    return await commomAPI("GET",`${BASE_URL}/user/${id}`,"", reqHeader)
}




/* add project api*/
export const addProjects = async(reqBody, reqHeader)=>{
    return await commomAPI('POST', `${BASE_URL}/projects/add`, reqBody, reqHeader)  
}

/* get home project api*/
export const homeProjects = async()=>{
    return await commomAPI('GET', `${BASE_URL}/projects/homeProjects`)  
}

/* get all project api*/
export const allProjects = async(searchKey, reqHeader)=>{ /* passing a query param search key as param*/
    /* query parameter = path?key=value */
    return await commomAPI('GET', `${BASE_URL}/projects/allProjects?search=${searchKey}`, "", reqHeader)  
}

/* get user specified projects */
export const getUserProject = async(reqHeader)=>{
    return await commomAPI('GET', `${BASE_URL}/projects/userProjects`, "", reqHeader)
}