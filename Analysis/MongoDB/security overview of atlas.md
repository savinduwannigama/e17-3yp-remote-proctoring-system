# Basic Security Overview of MongoDB Atlas

## Network Isolation
MongoDB Atlas dedicated clusters are deployed in a unique Virtual Private Cloud (VPC) with dedicated firewalls. Access must be granted by an IP access list or VPC Peering.

## Role-based access management
Configure sophisticated role-based access rules to control which users and teams can access, manipulate, and delete data in your databases.

## End-to-end encryption
All network traffic is encrypted using Transport layer Security (TLS), with flexibility to configure the minimum TLS protocol version. Encryption for data at rest is automated using encrypted storage volumes.

> Enable automatic client-side field level encryption to encrypt sensitive data before it leaves the application and lands in the cloud.

[click here for more info](https://www.mongodb.com/collateral/field-level-encryption)