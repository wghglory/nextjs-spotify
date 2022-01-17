# Spotify App by Next.js + Tailwind CSS

Deployed at https://derek-nextjs-spotify.vercel.app/

## Tech Highlights

- Nextjs v12 (middleware, server rendering)
- NextAuth v4
- Spotify Web API for node
- Tailwind v3, custom layout components
- Recoil for managing global state such as current track, isPlay, playlist id

## Setup

```bash
# Create the app
npx create-next-app@latest --typescript -e with-tailwindcss nextjs-spotify

# install heroicons
npm install @heroicons/react

# install next-auth
npm i next-auth
```

## Create Spotify developer app

https://developer.spotify.com/dashboard/applications

I personally login via facebook.

```
app: nextjs-spotify
client id: 0e3eff139050415a9635bc8e4394622a
```

## Resources

- https://next-auth.js.org/getting-started/example
