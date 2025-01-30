<p align="center">
  <img src="https://honghong.me/images/projects/one-blog/cover.png">
</p>

## Tech Stack

| Name             | Link                                      |
| ---------------- | ----------------------------------------- |
| Framework        | [Next.js](https://nextjs.org/)            |
| Deployment       | [Vercel](https://vercel.com)              |
| Database         | [PostgreSQL](https://www.postgresql.org/) |
| ORM              | [Drizzle](https://orm.drizzle.team/)      |
| Rich Text Editor | [Tiptap](https://tiptap.dev)              |
| Icons            | [Lucide](https://lucide.dev/)             |
| Authentication   | [NextAuth](https://next-auth.js.org)      |
| Styling          | [TailwindCSS](https://tailwindcss.com)    |

## Features

- **Authentication**: Sign in with Google
- **Rich Text Editor**: Create and edit blog posts with a rich text editor
- **Dark Mode**: Toggle between light and dark mode
- **Like Button**: Like and unlike blog posts
- **Drafts**: Save blog posts as drafts
- **Visibility**: Make blog posts public or private

## Getting Started

Follow these steps to run the project locally on your machine:

1. Clone the repository

```bash
git clone https://github.com/tszhong0411/one-blog.git
```

2. Navigate to the project directory

```bash
cd one-blog
```

3. Install dependencies

```bash
pnpm install
```

4. Configure environment variables

Create a `.env.local` file based on the provided `.env.example` file and fill in the necessary variables.

5. Start docker compose

```bash
docker compose up -d
```

6. Run the development server

```bash
pnpm dev
```

<hr>
<p align="center">
Made with ❤️ in Hong Kong
</p>
