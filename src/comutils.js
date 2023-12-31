import axios from "axios"
import {BASE_URL} from "./config/constants";

const config = {
    headers: {Authorization: "Bearer " + window.localStorage.getItem('token')}
};

/**
 * Adds new user into the system.
 * @param username string, does not have to be unique
 * @return if success, saves token im local storage
 */
export async function getAuthToken(username){
    const r =  await axios.post(BASE_URL + '/api/login', {'username':username});
    try{
        window.localStorage.setItem('token',r.data.token)
    } catch (e) {
        throw new Error(e)
    }
}

/**
 * Retrieves data from specified user or yourself
 * @param uuid string, user unique id. If it is not passed, your own user data is retrieved.
 * @return if success, JSON with user data
 */
export async function getUserData(uuid){
    if (uuid === undefined) {
        return await axios.get(BASE_URL + '/api/user', config)
    }
    return await axios.get(BASE_URL + '/api/user/' + uuid, config)
}

/**
 * It allows to update your username.
 * @param username string, new username.
 * @return if success, returns JSON with new user updated data.
 */
export async function updateUsername(username){
    return await axios.put(BASE_URL + '/api/user', {'username':username}, config)
}

/**
 * Retrieves plan info.
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns JSON with plan info and its members.
 */
export async function getPlanData(id){
    return await axios.get(BASE_URL + '/api/plan/' + id, config)
}

/**
 * Deletes specified plan
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns confirmation message
 */
export async function deletePlanData(id){
    return await axios.delete(BASE_URL + '/api/plan/' + id, config)
}

/**
 * Add user to a plan. Fails if user is not valid or is already in the group
 * @param planid string, unique. ID of the plan.
 * @param uuid
 * @return {Promise<AxiosResponse<any>>}
 */
export async function addParticipant(planid, uuid){
    return await axios.patch(BASE_URL + 'api/plan' + planid + '/add/' + uuid, undefined, config)
}

/**
 * Remove a user from a plan. Fails if user is not valid or is ot in the group
 * @param planid string, unique. ID of the plan.
 * @param uuid
 * @return {Promise<AxiosResponse<any>>}
 */
export async function deleteParticipant(planid, uuid){
    return await axios.patch(BASE_URL + 'api/plan' + planid + '/delete/' + uuid, undefined, config)
}

/** still some functions to implement.
 *  the prev idea was to directly call the backend using the form but can't be done with this new auth system
 */


