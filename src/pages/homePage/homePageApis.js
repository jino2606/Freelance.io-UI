import { BASE_URL } from "../../services/baseUrl"
import { commomAPI } from "../../services/commonApi"


/* All apis used in the home page */

/* get user specified projects */
export const getUserProject = async(reqHeader)=>{
    return await commomAPI('GET', `${BASE_URL}/projects/userProjects`, "", reqHeader)
}