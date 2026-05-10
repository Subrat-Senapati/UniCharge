# UniCharge: Unified EV Charging Platform

UniCharge is a full-stack application featuring a modern React-based web client and a robust Node.js/Express backend API. It serves as a unified platform that integrates multiple EV charging providers, addressing the fragmented ecosystem of EV charging.

## Problem Statement

Today's EV charging ecosystem forces drivers to navigate a frustrating maze of disconnected provider apps, each with its own exclusive payment system. This fragmentation creates significant user pain points:
- **Discovery Complexity:** No unified platform to locate all available charging stations.
- **Booking Barriers:** Reservations locked within individual provider ecosystems.
- **Payment Overload:** Multiple wallets and payment methods required for different operators.
- **Financial Inefficiency:** Money gets stranded across various apps, unable to be utilized interchangeably between charging networks.

### Problems Faced by Charging Companies:
1. **Low Utilization Rate:** Most chargers remain idle for long hours, reducing revenue.
2. **High Setup & Maintenance Costs:** Investment in equipment, electricity, and land rent is high.
3. **Limited Visibility:** Many stations are not listed or have inaccurate information, leading to low customer traffic.
4. **Payment Failures:** Multiple wallets and inconsistent systems cause transaction issues.
5. **Lack of Real-Time Data:** Users face difficulties finding working or available chargers.
6. **No Centralized Analytics:** Operators cannot track usage patterns or plan expansions effectively.

## Proposed Solutions

A single unified platform (web + mobile app) that integrates multiple EV charging providers.

### Features:
1. **Stations Discovery:** One map showing all providers' stations.
2. **Slot Booking:** Book charging slots across providers from the same app.
3. **Unified Payments:** One wallet/payment gateway for all operators.
4. **Smart Recommendations:** Suggest cheapest, nearest, or fastest available stations.

### Gap Between Present Situations & Proposed Solutions:

| Feature | Present Situation | Proposed Solution |
| :--- | :--- | :--- |
| **Station Discovery** | Users must search in multiple apps, with no consolidated map. | Single map integrating all providers' stations in real-time. |
| **Data Consistency** | Information (availability, speed, cost) is not standardized across apps. | Normalized & standardized station data across providers. |
| **Booking System** | Users can only book slots within the provider's app. | Cross-provider booking from one platform. |
| **Payments** | Multiple payment gateways, wallets, and recharge systems. | Unified wallet & payment gateway supporting UPI/cards. |
| **User Experience** | Fragmented, time-consuming, confusing. | Seamless, integrated, one-stop solution. |
| **Provider Benefits** | Limited visibility to only their app users. | Wider customer base, analytics, revenue settlement via aggregator. |
| **AI/ML Optimization** | Rarely used, limited to individual apps. | AI-powered route planning, demand forecasting, dynamic pricing, and smart recommendations. |

### Benefits of the Unified EV Charging Platform:
1. **One Platform for All Brands:** Integrates public and private networks in a single map.
2. **Increased Charger Utilization:** More user visibility leads to higher usage and revenue.
3. **Accurate Real-Time Information:** Shows live charger status, cost, and availability.
4. **Seamless Payments:** Unified wallet supports all networks, ensuring faster and reliable transactions.
5. **Slot Booking System:** Users can reserve charging slots to avoid wait times.
6. **Analytics Dashboard:** Provides data insights on usage, demand, and performance.
7. **Dynamic Pricing:** Helps companies adjust prices based on demand and maximize profit.
8. **Improved Customer Experience:** Reliable, convenient, and transparent system builds user trust.

## Business Model

Our platform follows a simple and transparent revenue model designed to benefit both charging companies and users.

1. **Fees from Partner Charging Brands:** Charging operators will pay a service fee for the customers and traffic generated through our platform. By listing their stations on a unified map and enabling cross-network booking, they gain higher utilization, better visibility, and improved revenue. The fee reflects the value we deliver through increased activity and operational efficiency.
2. **User Platform Fee on Wallet Recharge:** Users recharge a single unified wallet instead of maintaining balances across multiple provider apps. This simplifies money management and avoids the problem of stranded balances. A small platform fee is applied during wallet recharge, which is justified by the convenience, reliability, and interoperability offered by the unified system.
3. **Bank Partnership Fee:** In the future, we may collaborate with banks and financial institutions. When users recharge the unified wallet using debit or credit cards, we can earn a transaction-based fee from banking partners. This adds an additional revenue stream without adding extra burden on the user.

## Project Structure

This repository contains the following main components:

- **`/client/web`**: The frontend web application built with React, Vite, and Bootstrap. Features interactive maps configured with Leaflet and Google Maps API.
- **`/server`**: The backend API powered by Node.js and Express. It connects to a MongoDB database and handles authentication (JWT/Passport) and payments (Razorpay).
- **`/ml-engine`**: Machine Learning engine (Python/Data processing services).
- **`/APIs_CORS`**: Directory containing API schemas, CORS configurations, or related testing resources.

## Getting Started

To get the project running locally, please refer to the specific configuration, dependency installation, and startup instructions in each respective directory's README guide:

- [Client Application Setup](./client/web/README.md)
- [Server Application Setup](./server/README.md)

## License

ISC License
