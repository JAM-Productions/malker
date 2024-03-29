import axios from "axios";
import { BASE_URL } from "./config/constants";

/**
 * Retrieves token from local storage and returns it in a JSON format
 * @return JSON with token
 */
export async function getAuthConfig() {
    const token = await getAuthToken();
    const config = {
        headers: { Authorization: "Bearer " + token },
    };
    return config;
}

/**
 * Saves token in local storage
 * @param token string, token to be saved
 * @return void
 */
export function setAuthToken(token) {
    window.localStorage.setItem("token", token);
}

/**
 * Adds new user into the system.
 * @param username string, does not have to be unique
 * @return if success, saves token im local storage
 */
export async function getAuthToken() {
    let token = window.localStorage.getItem("token");
    if (!token) {
        try {
            const response = await axios.post(BASE_URL + "/api/login");
            token = response.data.token;
            setAuthToken(token);
        } catch (error) {
            throw new Error(error);
        }
    }
    return token;
}

/**
 * Retrieves data from specified user or yourself
 * @param uuid string, user unique id. If it is not passed, your own user data is retrieved.
 * @return if success, JSON with user data
 */
export async function getUserData(uuid) {
    const config = await getAuthConfig();
    if (!uuid) {
        return await axios.get(BASE_URL + "/api/user", config);
    }
    return await axios.get(BASE_URL + "/api/user/" + uuid, config);
}

/**
 * Retrieves user data from token
 * @param token string, token to be used to retrieve user data
 * @return if success, JSON with user data
 */
export async function getUserByToken(token) {
    const config = await getAuthConfig();
    return await axios.get(BASE_URL + "/api/getUserFromToken/" + token, config);
}

/**
 * It allows to update your username.
 * @param username string, new username.
 * @return if success, returns JSON with new user updated data.
 */
export async function updateUsername(username) {
    const config = await getAuthConfig();
    return await axios.put(BASE_URL + "/api/user", { username: username }, config);
}

/**
 * Retrieves plan info.
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns JSON with plan info and its members.
 */
export async function getPlanData(id) {
    const config = await getAuthConfig();
    if (!window.localStorage.getItem("token")) {
        return await axios.get(BASE_URL + "/api/plan/" + id);
    }
    return await axios.get(BASE_URL + "/api/plan/" + id, config);
}

export async function createPlan(name, description, date, location) {
    const config = await getAuthConfig();
    const data = {
        name: name,
        description: description,
        date: date,
        location: location,
    };
    console.log(data);
    console.log(config);
    return await axios.post(BASE_URL + "/api/plan", data, config);
}

/**
 *
 * @param id str. unique id of the plan
 * @param data JSON with the data to be updated. can update all the values listed in post method + admin.
 * @return {Promise<AxiosResponse<any>>}
 */
export async function updatePlan(id, data) {
    /**
     * valid dict values:
     * 'name', 'description', 'date', 'location', 'admin'
     * they are all strings
     */
    const config = await getAuthConfig();
    return await axios.put(BASE_URL + "/api/plan" + id, data, config);
}

/**
 * Deletes specified plan
 * @param id string, unique. ID of the plan.
 * @return {Promise<AxiosResponse<any>>} if success, returns confirmation message
 */
export async function deletePlan(id) {
    const config = await getAuthConfig();
    return await axios.delete(BASE_URL + "/api/plan/" + id, config);
}

/**
 * Add user to a plan. Fails if user is not valid or is already in the group
 * @param planid string, unique. ID of the plan.
 * @param uuid
 * @return {Promise<AxiosResponse<any>>}
 */
export async function addParticipant(planid, uuid) {
    const config = await getAuthConfig();
    return await axios.patch(BASE_URL + "/api/plan/" + planid + "/add/" + uuid, undefined, config);
}

/**
 * Remove a user from a plan. Fails if user is not valid or is ot in the group
 * @param planid string, unique. ID of the plan.
 * @param uuid
 * @return {Promise<AxiosResponse<any>>}
 */
export async function deleteParticipant(planid, uuid) {
    const config = await getAuthConfig();
    return await axios.patch(
        BASE_URL + "/api/plan/" + planid + "/delete/" + uuid,
        undefined,
        config,
    );
}

/**
 * Retrieves all plans where the user is a participant
 * @return {Promise<AxiosResponse<any>>}
 */
export async function getUserPlans(uuid) {
    const config = await getAuthConfig();
    return await axios.get(BASE_URL + `/api/${uuid}/plans`, config);
}
