# Web-Api-Tester Dashboard

A Dashboard for LINK-TO-WebApiTester

## Usage

1. Copy `compose-sample-deploy.yaml` and edit to your liking
2. `docker-compose up`

## Development

For local development a docker compose config is provided (`compose.yaml`). Just run `docker compose up` and access the app at `http://localhost:3000`. To install additional libraries etc., I use for example `docker run -it --rm -u node -v $(pwd):/app -w /app node npm install swr`.

## Credits

This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Created using `docker run -it --rm -u node -v $(pwd):/app -w /app -p 3000:3000 node npx create-next-app web-api-tester-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/basics/typescript-final"`
