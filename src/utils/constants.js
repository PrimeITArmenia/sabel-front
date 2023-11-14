export const accessToken = "sabelUserToken";

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(accessToken));
};