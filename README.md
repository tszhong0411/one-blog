<h1 align="center">
 One blog
</h1>

<p align="center">
  <img src="https://socialify.git.ci/tszhong0411/one-blog/image?forks=1&issues=1&logo=https://honghong.me/images/projects/one-blog/logo.png&name=1&owner=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark">
</p>

<p align="center">
    <a href="https://one-blog.honghong.me">View Online</a>
    ·
    <a href="https://github.com/tszhong0411/one-blog/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/tszhong0411/one-blog/issues/new">Request New Feature</a>
</p>

## 🌍 one-blog.honghong.me

- Framework: [Next.js](https://nextjs.org/)
- Deployment: [Vercel](https://vercel.com)
- Database [Neon](https://neon.tech)
- ORM: [Prisma](https://www.prisma.io)
- Rich Text Editor: [Tiptap](https://tiptap.dev)
- Icons: [Tabler icons](https://tabler-icons.io/)
- Authentication: [NextAuth](https://next-auth.js.org)
- Styling: [Tailwindcss](https://tailwindcss.com)

## 👋 Running Locally

1. Clone the repository

```sh
git clone https://github.com/tszhong0411/one-blog.git
```

2. Go to the project directory

```sh
cd one-blog
```

3. Install dependencies

```sh
pnpm
```

4. Create a `.env.local` file and input environment variables based on the `.env.example` file so that the project can run properly.

```
# Database
DATABASE_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Next auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

5. Run the development server

```sh
pnpm dev
```

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>
