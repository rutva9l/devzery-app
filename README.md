This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run Flask

In the api folder, install the requirements and run the Flask server.

```bash
source .venv/bin/activate
pip3 install -r requirements.txt
flask run
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000) on your browser to see the result.

The test cases are available on [http://127.0.0.1:5000/api/test-case](http://127.0.0.1:5000/api/test-case).

## Run Next.js

In the client folder, install the dependencies and run the Next development server.

```bash
npm i
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.
