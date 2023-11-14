/**
 * This sets `cookie` using the `res` object
 */
const setCookies = (res, values = []) => {
	res.setHeader('Set-Cookie', values);
};

export default setCookies;