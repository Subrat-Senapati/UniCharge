# UniCharge Server

This is the secure backend HTTP API for the UniCharge application. Built using Node.js and Express, it acts as the data hub, effectively connecting to MongoDB.

## Tech Stack

- **Runtime & Framework**: Node.js `(v22.x)` & Express.js `(v5.x)`
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens), Passport.js, Passport Google OAuth 2.0
- **Payments Processing**: Razorpay Node SDK
- **Utilities**: Bcrypt (hashing), CORS, Cookie-parser, Express-validator (input validation), and PapaParse.

## Folder Structure

```
/server
├── config/       # Environment configs and keys
├── controllers/  # Request handler functions
├── data/         # Mock data or static resources
├── database/     # DB connection and initiation scripts
├── middleware/   # Express middlewares (auth, validators, error handlers)
├── models/       # Mongoose database schemas
├── routes/       # API endpoint definitions and router assignments
├── services/     # External service aggregators and business logic
├── utils/        # General helper scripts/utilities
└── validators/   # Request property validation logic
```

## Prerequisites

- Node.js (v22.19.0 recommended)
- MongoDB instance (locally running or an Atlas cluster URL)
- Razorpay account (for payment environment configurations)

## Setup & Installation

1. Ensure you are in the `server` directory:
   ```bash
   cd server
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Review the local `.env` variables string configuration. Ensure the `MONGO_URI`, JWT secrets, and `RAZORPAY` keys are correctly set to connect to required external services.

4. Start the server (Using Node directly or another specified dev script):
   ```bash
   node index.js
   ```
