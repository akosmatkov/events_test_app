## Description

Events test application. Implemented REST endpoints for CRUD operations.
There are two "instances" of server defined in **docker-compose.yml** on
*localhost:3000* and *localhost:3001*.

For REST endpoints there also was set up Swagger OpenAPI [here](http://localhost:3000/api)
and [here](http://localhost:3001/api). There you can test CRUD logic for both "instances" of application.

You can also use [Postman](https://learning.postman.com/docs/getting-started/installation-and-updates/)
following these [instructions](https://learning.postman.com/docs/getting-started/sending-the-first-request/)

Chosen database is **MongoDB 6.0**

All server instances are connected through **redis websocket adapter** and listening
for each other's emits on create/delete event document.

To test websocket connection you can also use **Postman** and it's **WebSocket Request**. To do this please follow [instuctions](https://learning.postman.com/docs/sending-requests/websocket/websocket/)

Entire subscribe/unsubscribe to event of type logic is supposed to be implemented on client side
with *addEventListener()* and *removeEventListener()* of **WebSocket API**.

## Running the app

To run the application you will need [docker-compose](https://docs.docker.com/compose/install/) installed

```bash
$ npm install
```
```bash
$ docker-compose up
```

