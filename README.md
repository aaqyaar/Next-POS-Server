# NextPOS (API App)

This is backend of Next POS App and it's used for managing the data of the app. It's built with [NestJS](https://nestjs.com/) and [TypeScript](https://www.typescriptlang.org/).

## Requirements

- [Node.js](https://nodejs.org/en/) (>= 18.0.0)
- [Yarn](https://yarnpkg.com/) (>= 1.22.5)
- [PostgreSQL](https://www.postgresql.org/) (>= 13.1)
- [Docker](https://www.docker.com/) Optional

## Features

Main features of this app are:

marked with [x] are completed, [ ] are not completed

- [x] Authentication (Login, Logout, Register, Forgot Password, Reset Password)
- [ ] Products (Items)
- [ ] Categories (Product Groups)
- [ ] Customers (Clients)
- [ ] Suppliers (Vendors)
- [ ] Sales (Orders)
- [ ] Purchases (Orders for Suppliers)
- [ ] Payments (Sales, Purchases, Customers, Suppliers)
- [ ] Balance (Cash, Bank, Wallet, MMT)
- [ ] Bills (Sales, Purchases, Customers, Suppliers)
- [ ] Reports (Sales, Purchases, Products, Customers, Suppliers)
- [ ] Settings
- [ ] Users Management
- [ ] Roles Based Access Control
- [ ] Permissions Management
- [ ] Profile Management

## Installation

1. Clone this repository

```bash
git clone https://github.com/aaqyaar/Next-POS-Server
```

2. Run `yarn install`
3. Run `yarn dev`

## Configuration

1. Copy `.env.example` to `.env`
2. Edit `.env` and set all the required information

```bash
cp .env.example .env
```

## Usage

1. Run `yarn dev`
2. Visit `http://localhost:8000`

## Docker

1. Run `docker-compose up -d`
2. Visit `http://localhost:8000`
