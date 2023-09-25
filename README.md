## Birthday Campaign
The Birthday Campaign is designed to enhance user engagement by offering personalized product recommendations and exclusive discount codes to users on their birthdays. The initial skeleton code is based on a monolithic architecture, which serves as a foundation for the microservices-based solution.

## Environment Variables
Before starting the application, ensure you set up the required environment variables. Here's a brief description:

#### SENDGRID_API_KEY: Your SendGrid API key for email dispatch.
#### FRONTEND_DOMAIN: The domain of your frontend application.
#### DB_HOST: Database host (default: localhost).
#### DB_PORT: Database port (default: 5432).
#### POSTGRES_USER: Database username (default: rainbow-campaign).
#### POSTGRES_PASSWORD: Database password (default: rainbow-campaign).
#### POSTGRES_DB: Database name (default: rainbow-campaign).

## Getting Started
#### Clone the repository.
#### Install dependencies using npm install.
#### Set up your .env file based on the env.example.
#### Run the application using npm start.

## Database Setup 
Run the docker compose file to intialize and setup the database

```bash
$ docker-compose up
```

## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```