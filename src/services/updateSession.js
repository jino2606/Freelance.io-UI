import { getUser } from "./allApis";


export const getReqHeader = ()=>{

    const token = sessionStorage.getItem("token");

    if (token) {
        // Create request headers
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        return reqHeader
    }else {
        console.error("Token not found. Unable to update session.");
        return ("Token not found. Login to get token.")
    }
}


async function updateSession(userId) {

    const reqHeader = getReqHeader()

    // Fetch user data
    try {
        const response = await getUser(userId, reqHeader);

        if (response.status === 200) {
            const userData = response.data;
            sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
            console.log("Session updated successfully:", userData);
        } else {
            console.error("Failed to update session:", response.statusText);
        }
    } catch (error) {
        console.error("An error occurred while updating session:", error);
    }
}

export default updateSession;
