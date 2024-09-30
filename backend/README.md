## Project Setup

This is the backend API built using NestJS, which serves the course subscription management functionality. It interacts with a database and provides endpoints for managing courses and subscriptions.

### Prerequisites

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)
- **Docker** (for running PostgreSQL with Docker Compose)

### Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

```env
# DB
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_NAME=course_subscription

# App
PORT=3001
FRONTEND_DOMAIN=http://localhost:5173
```

### Start PostgreSQL Database with Docker

To set up and run the PostgreSQL database, follow these steps:

1. Ensure that Docker is installed and running.
2. Navigate to the project root and use Docker Compose to start the PostgreSQL container:

   ```bash
   $ docker-compose up -d


### Install Backend Dependencies

```bash
$ npm install
```

### Run the project in dev mode

```bash
# watch mode
$ npm run start:dev
```


### Swagger Documentation
```http request
http://localhost:3001/swagger
```


### If you want you can also run integrations tests, but turn off first the running application  (not db) and run the command:
```bash
$ npm run test:e2e
```
