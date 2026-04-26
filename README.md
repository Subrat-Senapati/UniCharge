# UniCharge

UniCharge is a full-stack application. It features a modern React-based web client and a robust Node.js/Express backend API.

## Project Structure

This repository contains the following main components:

- **`/client/web`**: The frontend web application built with React, Vite, and Bootstrap. Features interactive maps configured with Leaflet and Google Maps API.
- **`/server`**: The backend API powered by Node.js and Express. It connects to a MongoDB database and handles authentication (JWT/Passport) and payments (Razorpay).
- **`/ml-engine`**: Machine Learning engine (Python/Data processing services).
- **`/APIs_CORS`**: Directory containing API schemas, CORS configurations, or related testing resources.

## Key Features

- **Frontend Environment**: Responsive and interactive React UI built with Vite, utilizing tools like FontAwesome, React Router, Slick Carousel, and robust map integrations.
- **Backend Architecture**: Scalable RESTful API with Express, Mongoose for data modeling, secure OAuth/JWT-based authentication, routing utilities, and Razorpay payment integration.

## Getting Started

To get the project running locally, please refer to the specific configuration, dependency installation, and startup instructions in each respective directory's README guide:

- [Client Application Setup](./client/web/README.md)
- [Server Application Setup](./server/README.md)

## License

ISC License
