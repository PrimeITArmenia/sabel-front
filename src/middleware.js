import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  },
  // {
  //   pages: {
  //     signIn: "/signin",
  //     error: "/error",
  //   },
  // }
);

export const config = { matcher: ["/admin/:path*"] };

// export { default } from 'next-auth/middleware';

// export const config = { matcher: '/admin/:path*'}
