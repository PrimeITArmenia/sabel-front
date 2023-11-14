import { accessToken } from "../utils/constants";
import { apiClient } from "./api";
import {url} from '@/api'

const AuthService = {

    async login(payload) {
        return apiClient.post(`${url}/auth/signin`, payload).then(
            (response) => {
                debugger
                const result = response.data.result
                const tokenParams = {
                    expires_in: result.expires_in,
                    access_token: result.access_token,
                    email: result.user.email,
                    name: result.user.name,
                    role: result.user.role
                }
                localStorage.setItem(accessToken, JSON.stringify(tokenParams))
                },
            (error) => {
                throw new Error('Invalid credentials');
            }
        )
    },
    // logout() {
    //     apiClient.post("/logout")
    //         .then(() => {
    //             dispatch(
    //                 authActionCreator(SET_USER, {
    //                     user: null
    //                 }))
    //             history?.push("/login")
    //         })
    //         .catch((error) => {
    //             dispatch(
    //                 authActionCreator(SET_ERROR, {
    //                     error: getError(error)
    //                 }))
    //         })
    // },
    // async forgotPassword(payload) {
    //     return apiClient.post("/reset-password", payload);
    // },
    // getAuthUser() {
    //     return apiClient.get("/user");
    // },
    // updatePassword(payload) {
    //     return apiClient.post("/change-password", payload);
    // },
    // sendVerification(payload) {
    //     return apiClient.post("/account-verify", payload);
    // },
    // resetPassword(payload) {
    //     return apiClient.post("/reset-password", payload);
    // },
    // sendResetLink(payload) {
    //     return apiClient.post("/send-reset-link", payload);
    // },
    // sendLinkEmail(payload) {
    //     return apiClient.post("/email-resend", payload);
    // },
    // emailVerification(payload) {
    //     return apiClient.post("/email-verify", payload);
    // }
};

export default AuthService;