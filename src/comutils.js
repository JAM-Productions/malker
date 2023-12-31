import axios from "axios"
import {BASE_URL} from "./config/constants";

/**
 * Adds new user into the system.
 * @param username string, does not have to be unique
 * @return if success, JSON with user data + auth cookie
 */
export async function getAuthToken(username){
    return await axios.post(BASE_URL + '/api/login', {'username':username}, { withCredentials: true });
    // save data into localstorage?
}

/**
 * Retrieves data from specified user
 * @param uuid string, user unique id. If it is not passed, your own user data is retrieved.
 * @return if success, JSON with user data
 */
export async function getUserData(uuid){
    if (uuid === undefined) {
        return await axios.get(BASE_URL + '/api/user')
    }
    return await axios.get(BASE_URL + '/api/user/' + uuid)
}

/**
 * It allows to update your username.
 * TODO: we could use a form instead of this function!
 * @param username string, new username.
 * @return if success, returns JSON with new user updated data.
 */
export async function updateUsername(username){
    return await axios.put(BASE_URL + '/api/user', {'username':username})
}

/**
 * Retrieves plan info.
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns JSON with plan info and its members.
 */
export async function getPlanData(id){
    return await axios.get(BASE_URL + '/api/plan/' + id)
}

/**
 * Deletes specified plan
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns confirmation message
 */
export async function deletePlanData(id){
    return await axios.get(BASE_URL + '/api/plan/' + id)
}

/**
 * Add user to a plan. Fails if user is not valid or is already in the group
 * @param planid string, unique. ID of the plan.
 * @param uuid
 * @return {Promise<AxiosResponse<any>>}
 */
export async function addParticipant(planid, uuid){
    return await axios.patch(BASE_URL + 'api/plan' + planid + '/add/' + uuid)
}

/**
 * Remove a user from a plan. Fails if user is not valid or is ot in the group
 * @param planid string, unique. ID of the plan.
 * @param uuid
 * @return {Promise<AxiosResponse<any>>}
 */
export async function deleteParticipant(planid, uuid){
    return await axios.patch(BASE_URL + 'api/plan' + planid + '/delete/' + uuid)
}


