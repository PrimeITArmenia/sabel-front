import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from '../../../utils';


export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			async authorize(credentials) {

				if (!credentials.email || !credentials.password) {
                    // throw new Error('Please Enter an email and password');
					router.push('./error.js');
                }
				const user = await fetcher.post("api/auth/signin", credentials, {
                    baseURL: process.env.NEXTAUTH_URL,
                })
				
                if ( user.data.status === 401 ) {
                    throw new Error('No user found')
                }
				const userWithToken = {...user.data.user, token: user.data.token}
				return userWithToken;
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			authorization: "https://www.facebook.com/v17.0/dialog/oauth",
			scope: [],
		}),
	],
	
	callbacks: {
		// async signIn({ user, account, profile }) {
		// 	// console.log("USER", user);
		// 	console.log("ACCOUNT", account.id_token);
		// 	// token user model
		// 	//useri datat het pahel tokene
		// 	//passwrod user ID
		// 	// tokeni sub pahel
		// 	// console.log("PROFILE", profile)
		// 	// const mySession = this.session(session, account.id_token)
		// 	// console.log("mySession: ", mySession)
		// 	return true
		// },
		async signIn({ session, user, account, profile }) {

			if (account.provider === 'google') {
				const data = {
					email: profile.email,
					password: 'Password'
				}

				try {
					const response = await fetcher.post("api/auth/signup", data, {
						baseURL: "http://localhost:3000"
					})

					session.user = response.data
				} catch(error) {
					console.log(error)
				}
			}
			return true

		},


		async jwt({token, user}) {
			if(user) {
				token.role = user?.role
				token.token = user?.token
			}
			return token
		},
		async session({session, token, user}) {
			session.user.role = token.role
			session.user.token = token.token
			return session;
		},
		// async jwt({token, user}) {
		// 	return {...token, ...user}
		// },
		// async session({session, token, user}) {
		// 	session.user = token;		
		// 	return session;
		// },
	},
	session: {
		jwt: true,
	},
	pages: {
		signIn: '/signin',
		signUP: '/signup',
		error: '/signin',
	}

};

export default async function auth(req, res) {
	return NextAuth(req, res, authOptions);
}