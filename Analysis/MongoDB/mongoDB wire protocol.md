# Introduction
The MongoDB Wire Protocol is a simple socket-based, request-response style protocol. Clients communicate with the database server through a regular TCP/IP socket.

## TLS/SSL
MongoDB supports TLS/SSL (Transport Layer Security/Secure Sockets Layer) to encrypt all of MongoDB's network traffic. TLS/SSL ensures that MongoDB network traffic is only readable by the intended client.

## TLS Libraries
We are programming to host are system on a server with a linux base OS. Therefore the TLS library used will be OpenSSL

References:
    [MongoDB Wire Protocol](https://docs.mongodb.com/manual/reference/mongodb-wire-protocol/#mongodb-wire-protocol)
    [TLS/SSL for MongoDB Wire](https://docs.mongodb.com/manual/core/security-transport-encryption/)