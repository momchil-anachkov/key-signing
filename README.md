# Elliptic Curve Signing and Verification

A basic message signing server using Express.

## Features

- ✅ An Express HTTP Server
- ✅ A POST endpoint for signing text messages
- ✅ A POST endpoint for verifying signed text messages
- ✅ Unit tests for signing and verification
- ✅ An OpenAPI spec for the API
- ✅ Request and response format validation
- ✅ A Basic Web UI on `localhost:3000` as a utility for 
  sending messages for signing, and verifying signed messages
  - ✅ Both the message and signature are editable from the UI, to verify the negative case as well
- ✅ Swagger UI on `localhost:3000/api-docs`

## Running the project
```shell
npm install
npm start
```

## Running the tests
```shell
npm run test
```

## Debugging the project

### Server
```shell
npm run debug
```
And then connect to the Node process with your favorite debugger on `localhost:9229`

You can also use a debugger on the tests in the same way via
```shell
npm run test-debug
```

### UI
It's just some static HTML/CSS/JS assets. You can use your favorite browser DevTools.