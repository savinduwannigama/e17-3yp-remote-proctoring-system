# Customer Security Controls

## DATABASE AUTHENTICATION, AUTHORIZATION, AND USER RIGHTS MANAGEMENT

For MongoDB Atlas, we will discuss two components:
- MongoDB Atlas Web UI / Control Plane
- MongoDB Atlas Database Cluster

The MongoDB Atlas Web UI / Control Plane is the web application where your administrators can manage Atlas clusters, including initial user and permissions setup. The MongoDB Atlas Web UI / Control Plane
supports authentication via username/password and multi-factor authentication. Control plane user identities are managed in a MongoDB-controlled Okta instance, encrypted and stored securely. Federated identity with SAML identity providers such as Okta or OneLogin is supported. Users may also create and login to an Atlas control plane account using a Google Account. Authentication to the Atlas Web UI / Control Plane times out after 12 hours; users will need to re-authenticate after that time. 

## MULTI-FACTOR AUTHENTICATION

For the MongoDB Atlas Web UI, user credentials are stored using industry-standard and audited one-way hashing mechanisms. Additionally, customers can choose to optionally utilize multi-factor authentication, or require all of the users in their Atlas Organization to use multi-factor authentication. Multi-factor authentication options include SMS, voice call, a multi-factor app, or a multi-factor device (such as a YubiKey). Customer sensitive data provided within the GUI, such as passwords, keys, and credentials which must be used as part of the service are stored encrypted. 

[Reference:](https://webassets.mongodb.com/_com_assets/cms/MongoDB_Atlas_Security_Controls-v7k3rbhi3p.pdf)