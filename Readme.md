# URL Shortener Server

This is an implementation of URL Shortener Server, where clients can pass long URL and get back shortened version of it.

## Requirements

The server is written in [Node v17](https://nodejs.org/en/) and [Express v4](https://github.com/expressjs/express). You will also need the [MongoDB](https://www.mongodb.com/collateral/mongodb-5-whats-new) database to run the server.

## Setup

With `Node`, `NPM` and `MongoDB` installed on your system you can install the application locally using

```sh
$ npm install
```

The application uses a local `MongoDB` database. You can update the DATABASE_URL in `.env` file to work with a different DB.

Express comes with a local development server. To run the application use

```sh
$ npm start
```

Which starts the application and lets it listen on port `3000`.

You can also run the test suite with

```sh
$ npm run test
```

and linter with

```sh
$ npm run lint
```

## Usage

With the server running you can make HTTP requests to it in order to create short URLs and call them afterwards.

The URL Shortener server provides one resource endpoint `/shortUrls` that allows you to list, show, and create urls. The server handles JSON payloads and an endpoint definition might look like this:

### Create a new short URL

```sh
curl -d '{"fullUrl":"https://www.monkeyuser.com/2019/bug-fixing-ways/"}' -H "Content-Type: application/json" -X POST http://localhost:3000/shortUrls
```

will return unique short url with `tier.app-` as base

```sh
{"full":"https://www.monkeyuser.com/2019/bug-fixing-ways/","short":"tier.app-fZyNHUNko"}
```

### Get all the created short URLs

```sh
curl -X GET http://localhost:3000/shortUrls
```

will return

```sh
[{"full":"https://www.monkeyuser.com/2019/bug-fixing-ways/","short":"tier.app-fZyNHUNko","clicks":0}]
```

### Get a short URL by short ID

```sh
curl -X GET http://localhost:3000/shortUrls/tier.app-fZyNHUNko
```

will redirect `https://www.monkeyuser.com/2019/bug-fixing-ways/`

## Errors and Validation

The server implements some validation:

- Only GET `/shortUrls`, POST `/shortUrls` and GET `/shortUrls/:shortUrl` are allowed, all other Path and Method combinations respond with `405` error.
- Full URL in POST request needs to be valid and present
- Server returns error stacktrace only for `dev` environment and on `production` no data is leaked

When validation fails or when short URL cannot be found, the server responds with an error message, for example:

```
GET /shortUrls/10

404 Not Found
{
    "message": "10 Not found"
}
```

```
POST /shortUrls with Body {"fullUrl":"not an URL"}

400 Not Found

{
    "message": "Full url is invalid",
    "error": {
        "status": 400
    }
}
```

## Possible improvements

-
