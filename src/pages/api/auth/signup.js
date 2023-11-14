import { fetcher, serializeCookie, setCookies } from "../../../utils";
import {url} from '@/api'

export default async function handler(req, res) {
	let data = {};
	try {
		const response = await fetcher.post("auth/signup", req.body, {
			baseURL: `${url}`
		});

		data = response.data;
		// setCookies(res, [
		// 	serializeCookie('refreshToken', data.token.refreshToken, {
		// 		path: "/",
		// 		httpOnly: true,
		// 		secure: true,
		// 		sameSite: "Strict",
		// 		expires: new Date(data.token.expiresIn)
		// 	}),
		// 	serializeCookie('accessToken', "Bearer " + data.token.accessToken, {
		// 		path: "/",
		// 		httpOnly: true,
		// 		secure: true,
		// 		sameSite: "Strict",
		// 		expires: new Date(data.token.expiresIn)
		// 	}),
		// ])
	
	}
	catch (err) { 
		data = err.response.data;
	}

	return res.json(data);
}


