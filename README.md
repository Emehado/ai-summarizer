# AI Review Summarizer

A fullstack app that uses local LLMs to summarize product reviews. Built this to try out tRPC and see how Ollama performs for real-world text summarization tasks.

## Tech Stack

**Backend:**

- Bun runtime
- Express + tRPC for type-safe APIs
- Prisma with MySQL
- Ollama integration for running Llama locally

**Frontend:**

- React + TypeScript
- Vite for bundling
- TanStack Query + tRPC client
- Tailwind for styling
- shadcn/ui components

## What it does

Pretty straightforward - fetches product reviews from a database and generates AI summaries using Ollama. The summaries are cached to avoid re-processing.

Main features:

- Product listing with review counts
- Individual product pages showing all reviews
- AI-generated review summaries (runs locally, no API keys needed)
- Summary caching with expiration

## Running locally

```bash
# Install dependencies
bun install

# Set up database
cd packages/server
bun prisma migrate dev
bun prisma db seed

# Start Ollama (needs to be installed separately)
ollama run llama3.2

# Run the app
bun dev
```

## Key learnings

- tRPC is a beauty for fullstack TypeScript apps - no more manual type definitions for API responses
- Ollama makes it easy to run LLMs locally without dealing with cloud APIs
- Bun is fast, Period!
- Local LLMs are good enough for prototyping

## Project structure

```
packages/
├── client/          # React frontend
│   ├── src/
│   └── package.json
└── server/          # Express + tRPC backend
    ├── prisma/      # Database schema
    ├── trpc/        # tRPC routes
    └── package.json
```
