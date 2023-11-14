import { serialize } from 'cookie';
 
/**
 * This sets `cookie` using the `res` object
 */
const serializeCookie = (name, value, options = {}) => {
	const stringValue =
		typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);
 
	if (typeof options.maxAge === 'number') {
		options.expires = new Date(Date.now() + options.maxAge * 1000);
	}
 
	return serialize(name, stringValue, options);
};

export default serializeCookie;