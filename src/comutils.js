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
    if (window.localStorage.getItem('token') === undefined){
        return await axios.get(BASE_URL + '/api/plan/' + id)
    }
    return await axios.get(BASE_URL + '/api/plan/' + id, config)
}

export async function createPlan(name, description, date, location){
    const data = {
        'name':name,
        'description':description,
        'date':date,
        'location':location
    }
    return await axios.post(BASE_URL + '/api/plan',data, config)
}

/**
 *
 * @param id str. unique id of the plan
 * @param data JSON with the data to be updated. can update all the values listed in post method + admin.
 * @return {Promise<AxiosResponse<any>>}
 */
export async function updatePlan(id, data){
    /**
     * valid dict values:
     * 'name', 'description', 'date', 'location', 'admin'
     * they are all strings
     */
    return await axios.put(BASE_URL + 'api/plan' + id, data, config)
}

/**
 * Deletes specified plan
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns confirmation message
 */
export async function deletePlan(id){
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


