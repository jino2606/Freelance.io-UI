import { BASE_URL } from "../../services/baseUrl";
import { commomAPI } from "../../services/commonApi";

const API_URL  = "https://api.apilayer.com/skills?q=";
const API_KEY = "dpBBbsaUNfdRda2iY4MvsDkA0IK2160r";

const headers = {
                  'Content-Type': 'application/json',
                  'apikey': API_KEY
                };


/* get getSkillsData api*/
export const getSkillsData = async(searchKey)=>{
    return await commomAPI('GET', `${API_URL}${searchKey}`, "", headers)  
}

//Add Post Api
export const addPostApi = async(reqBody,reqHeader)=>{
  return await commomAPI('POST',`${BASE_URL}/job/post`, reqBody, reqHeader)
}
