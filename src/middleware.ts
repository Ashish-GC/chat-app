"use server"


//google Authentication middleware
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



export  async function middleware(request: NextRequest) {

// Available paths

         const token = await getToken({req:request});
         const url = request.nextUrl;

       if( !token && (
        url.pathname.startsWith('/dashboard') || 
        url.pathname.startsWith('/room')||
        url.pathname.startsWith('/user-profile')
       )){
           return NextResponse.redirect(new URL('/', request.url))
       }
       if( token && (
        url.pathname === '/signIn'|| 
        url.pathname === '/signUp'||
        url.pathname ==='/'
       )){
        return NextResponse.redirect(new URL('/dashboard', request.url))
       } 
       
       return NextResponse.next();
}


 
export const config = {
    matcher: [ '/dashboard/:path*', '/room/:path*', '/user-profile/:path*', '/signIn', '/signUp', '/'],
  };





// Manual Authentication middleware
// middleware for manual authentication 

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { cookies } from 'next/headers'; 

// // const allowedOrigins = ['http://localhost:3000'];
// // const corsOptions = {
// //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// //   }

// export  async function middleware(request: NextRequest) {

//     //CORS 

// //     const origin = request.headers.get('Origin') ?? '';
// //     const isAllowedOrigin=allowedOrigins.includes(origin)
// //        const response = NextResponse.next();

// //   if(isAllowedOrigin){
// //     response.headers.set('Access-Control-Allow-Origin',origin)
// //   }

// // Available paths

//     const accessToken =  cookies().get('access-token')?.value;
//        const url = request.nextUrl;

//        if( !accessToken && (
//         url.pathname.startsWith('/dashboard') || 
//         url.pathname.startsWith('/room')||
//         url.pathname.startsWith('/user-profile')
//        )){
//            return NextResponse.redirect(new URL('/', request.url))
//        }
//        if( accessToken && (
//         url.pathname === '/signIn'|| 
//         url.pathname === '/signUp'||
//         url.pathname ==='/'
//        )){
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//        } 
       
//        return NextResponse.next();
// }
 
// export const config = {
//     matcher: [ '/dashboard/:path*', '/room/:path*', '/user-profile/:path*', '/signIn', '/signUp', '/'],
//   };



