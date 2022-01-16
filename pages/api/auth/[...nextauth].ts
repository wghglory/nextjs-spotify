import NextAuth from 'next-auth';
import {JWT} from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

import spotifyApi, {LOGIN_URL} from '@/lib/spotify';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  // token: {
  //   name: 'Guanghui Wang',
  //   email: 'wghglory89@gmail.com',
  //   picture: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=499206156910170&height=300&width=300&ext=1644821539&hash=AeTFLP9rYFwExqf4ZWg',
  //   sub: '22fujndhf5ters54t5d3uesbq',
  //   accessToken: 'BQBvBJYwbQC4CWoJLCmj1lhGzsXlMJCFPZlX-YMLcxe_wW0gKTWsu72i34GzWmaXx6m1UWdwSq3LDSy8S8DnoTL5tQtKicZyBnS2ar4kWsrr6boREOtRqI5PPVWrx_uJh16Rynbc-mYPXWMfg391uQUIQgw9jUk50Z1yGYdVjfmOY0gYKswsvNoMQoOF-8lvQRPF2Hw4iFTE_SIdvsYlzmiZxbyTlAMW',
  //   refreshToken: 'AQBH1ygnl2P7OC_FIQM7xzJaFmmQjYd7aFhxDldPmX5TU82S-Eew7CtdiwKJOuFVo6lQExkxMH2r1ho_YPVbkdaspgDsav8lO2k2Cod6kEU3ljFaMIA_gXccrFxPCLT5PWY',
  //   username: '22fujndhf5ters54t5d3uesbq',
  //   accessTokenExpires: 1642235106829,
  //   iat: 1642231506,
  //   exp: 1644823506,
  //   jti: '1cb0a90c-7855-4782-93fe-ad11733aae2a'
  // }
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setRefreshToken(token.refreshToken as string);

    const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
    // {
    //   access_token: 'BQCzLdmjr-JSnm5YpxKkyVaRRAM31lJnEeg0sA48G4TRC-TqFuGzW_Jj_XW-5UDD2FXOVvdHkv7XeJAT6XNbQUuuaWuuCzeODISWFp7Os5hZIcrN268vV6scOmYAKfzX0_pCWI9o1YqU3QSis1UVLIETDJ-dcXIk_-Si4GYD51ZzwrsCvvYn-sZFRYRMVLgwU_haWM32dVmgrPS5OYZMUdN2CYjYuryU',
    //   token_type: 'Bearer',
    //   expires_in: 3600,
    //   scope: 'playlist-read-private playlist-read-collaborative streaming user-modify-playback-state user-library-read user-follow-read user-read-playback-state user-read-currently-playing user-read-email user-read-recently-played user-read-private user-top-read'
    // }

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // https://next-auth.js.org/tutorials/refresh-token-rotation
    async jwt({token, account, user}) {
      // token example:
      // {
      //   name: 'Guanghui Wang',
      //   email: 'wghglory89@gmail.com',
      //   picture: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=499206156910170&height=300&width=300&ext=1644821539&hash=AeTFLP9rYFwExqf4ZWg',
      //   sub: '22fujndhf5ters54t5d3uesbq'
      // }

      // OR

      // {
      //   name: 'Guanghui Wang',
      //   email: 'wghglory89@gmail.com',
      //   picture: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=499206156910170&height=300&width=300&ext=1644821539&hash=AeTFLP9rYFwExqf4ZWg',
      //   sub: '22fujndhf5ters54t5d3uesbq',
      //   accessToken: 'BQBvBJYwbQC4CWoJLCmj1lhGzsXlMJCFPZlX-YMLcxe_wW0gKTWsu72i34GzWmaXx6m1UWdwSq3LDSy8S8DnoTL5tQtKicZyBnS2ar4kWsrr6boREOtRqI5PPVWrx_uJh16Rynbc-mYPXWMfg391uQUIQgw9jUk50Z1yGYdVjfmOY0gYKswsvNoMQoOF-8lvQRPF2Hw4iFTE_SIdvsYlzmiZxbyTlAMW',
      //   refreshToken: 'AQBH1ygnl2P7OC_FIQM7xzJaFmmQjYd7aFhxDldPmX5TU82S-Eew7CtdiwKJOuFVo6lQExkxMH2r1ho_YPVbkdaspgDsav8lO2k2Cod6kEU3ljFaMIA_gXccrFxPCLT5PWY',
      //   username: '22fujndhf5ters54t5d3uesbq',
      //   accessTokenExpires: 1642235106829,
      //   iat: 1642231506,
      //   exp: 1644823506,
      //   jti: '1cb0a90c-7855-4782-93fe-ad11733aae2a'
      // }

      // account example:
      // {
      //   provider: 'spotify',
      //   type: 'oauth',
      //   providerAccountId: '22fujndhf5ters54t5d3uesbq',
      //   access_token: 'BQDjEH6oRUhmgjdGDSxQcK__BpIkwbpezKPRe4WzejV5ZMIoCAu8tMCHjH286AoCfse0s5yMbHFP3Ohr3Iy3byk79vJA-8sBs2rp-bcRU2LTRd9dP8PkBfufn8ipave5uDndGw-IlbtSZMR1kBxnkeVwhNpAq_s8RV8TY8w1giz0K1vfUaa6dYK52D8FKiWvtwAR_FQJ6L36hxsW53Dn5hBBfJ3ruvbp',
      //   token_type: 'Bearer',
      //   expires_at: 1642233140,
      //   refresh_token: 'AQDi1RASUG5RhVBVQuQ1z41jfonF7pIdMQ7AULEPjGVXZ0qVZ93wPCusj9QABg0cpDc7kXKschtSVOOQ2Ecluh63CkkOiDo8fsNyWUH8xhpH1EGj3kc1TB-M2BMt84Be2K4',
      //   scope: 'playlist-read-private playlist-read-collaborative streaming user-modify-playback-state user-library-read user-follow-read user-read-playback-state user-read-currently-playing user-read-email user-read-recently-played user-read-private user-top-read'
      // }

      // user example:
      // {
      //   id: '22fujndhf5ters54t5d3uesbq',
      //   name: 'Guanghui Wang',
      //   email: 'wghglory89@gmail.com',
      //   image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=499206156910170&height=300&width=300&ext=1644821539&hash=AeTFLP9rYFwExqf4ZWg'
      // }

      // CASE1: initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000, // milliseconds
        };
      }

      // CASE2: Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as Number)) {
        return token;
      }

      // CASE3: Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({session, token}) {
      // session example:
      // {
      //   user: {
      //     name: 'Guanghui Wang',
      //     email: 'wghglory89@gmail.com',
      //     image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=499206156910170&height=300&width=300&ext=1644821539&hash=AeTFLP9rYFwExqf4ZWg'
      //   },
      //   expires: '2022-02-14T07:38:19.593Z'
      // }

      // token example:
      // {
      //   name: 'Guanghui Wang',
      //   email: 'wghglory89@gmail.com',
      //   picture: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=499206156910170&height=300&width=300&ext=1644821539&hash=AeTFLP9rYFwExqf4ZWg',
      //   sub: '22fujndhf5ters54t5d3uesbq',
      //   accessToken: 'BQCoAlKuHpSsK7N1XfYcxXOJJrAfRqnPb_VMHc7S_FLk_hCBl6CtO32nw643cNCa7u6NpffLoHWwVr2jc3FuZK6nx4WvNQA1FTZV5HmGCGYEGevsDGSIVhPJWhiUSzrp46AoRClIsd18FNUH0_d5VyfUzzHMzeGxZkzD8JRyokIwdCAR1FpJuF4_dnZsSAxk1Xb7zTvRvLg3PxhmgDDlwMfq1zKeyjPK',
      //   refreshToken: 'AQC2pvU48dKPXmWlnItNP8lZB5f1rzKLDErmZUvnN2I_rAhwEy8IBbmEqYqCOMMegvs-I5ukjRUpCQSA_lFZpGpn7L4hUEuafKMqB_zrvRr6dQh9IJhUhtCyYoYbfykzdVg',
      //   username: '22fujndhf5ters54t5d3uesbq',
      //   accessTokenExpires: 1642235824000,
      //   iat: 1642232279,
      //   exp: 1644824279,
      //   jti: 'e33f7651-599a-4de1-9f41-6c9a121a6c54'
      // }
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.username = token.username;
      return session;
    },
  },
});
