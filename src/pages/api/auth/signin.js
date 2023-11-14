import { fetcher, serializeCookie, setCookies } from "../../../utils";
import axios from 'axios'
import {url} from '@/api'


// export default async function handler( req, res ) {
// 	let data = [];
// 	const {email, password} = req.body
// 	console.log("sing---in----email, password----", email, password)
// 	try {
// 		const response = await axios.post("http://localhost:8081/v1/auth/signin", {email, password}, {
// 			// baseURL: "http://localhost:8081/v1"
// 		});
// 		if(response.data.status === 200){
// 			console.log('response----data-------200-----', response.data)
// 		}
// 		console.log(' sign-in-response ------------------------------------------------------------------------------------------- ', response)
//
// 		res.status(200).json(response.data);
// 	}
// 	catch (err) {
// 		// data = err?.response?.data;
// 		// return res.json(err)
// 		const status = err.response?.status || 500;
// 		const message = err.response?.data?.message || "An unexpected error occurred";
//
// 		// Send the error message back to the client with the proper status code.
// 		res.status(status).json({ message });
// 	}
// }


export default async function handler( req, res ){
	const {email, password }  = req.body;
	await axios.post(`${url}/auth/signin`, {email, password})
		.then((axiosResponse)=>{
			console.log('res------------------------------------------', axiosResponse)
			res.status(axiosResponse.status).json(axiosResponse.data);
		})
		.catch((err)=>{
			const status = err.response?.status || 500;
			const message = err.response?.data?.message || "An unexpected error occurred";
			console.log('error', err)
			res.status(status).json({ message });
		})
}