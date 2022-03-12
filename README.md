# Interview Scheduler

Book appointments with a mentor using this dynamic sheduler built in **React**! The components were written and tested, first,  using **Storybook**. The Selector functions were written with a test-driven approach (TDD), using **Jest**.

This is only the front-end client. The test server for this App can be cloned from the following Repo: [scheduler-api](https://github.com/deuxp/scheduler-api).

## Usage

---

### Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running client

The browser client is running on `localhost:8000` & the server on `localhost:8001`.
The proxy for the browser is already set in the `package.json`. But you may get a CORS error if you have your server on a different port. In which case change the following line in the `package.json` to match your PORT `"proxy": "http://localhost:????"`.

The server has to be cloned and run on a separate port.
