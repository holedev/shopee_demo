# Shopee E-commerce Platform

A full-stack e-commerce application built with React.js, Spring MVC, and MySQL.

## Features

- 🛍️ Product browsing and searching
- 🛒 Shopping cart functionality
- 💬 Real-time chat support
- ⭐ Product ratings and reviews
- 🔒 User authentication with OAuth2
- 💳 Secure payment processing with Stripe
- 📊 Sales statistics and analytics
- 🏪 Store management system
- 📱 Responsive design

## Tech Stack

### Frontend
- React.js with Vite
- Context API for state management
- CSS Modules for styling
- Firebase for OAuth authentication
- Axios for API calls
- Chart.js for statistics visualization

### Backend
- Java Spring MVC
- Spring Security with JWT
- Hibernate ORM
- MySQL Database
- Maven for dependency management

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable components
│   │   ├── config/        # Configuration files
│   │   ├── pages/         # Page components
│   │   ├── store/         # Context providers
│   │   └── utils/         # Utility functions
│   
├── shopee/                 # Backend Spring MVC application
│   ├── src/main/
│   │   ├── java/
│   │   │   └── com/dev/
│   │   │       ├── configs/     # Spring configurations
│   │   │       ├── controllers/ # API controllers
│   │   │       ├── dto/         # Data transfer objects
│   │   │       ├── pojo/        # Entity models
│   │   │       └── service/     # Business logic
│   │   └── resources/    # Application properties
│   
└── saledb.sql             # Database schema
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Java JDK 11 or higher
- Maven
- MySQL

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with required environment variables:
```
VITE_API_URL=http://localhost:8080
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup
1. Navigate to the shopee directory:
```bash
cd shopee
```

2. Update database configuration in `src/main/resources/databases.properties`

3. Install dependencies and build:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

### Database Setup
1. Create a MySQL database
2. Import the schema:
```bash
mysql -u your_username -p your_database_name < saledb.sql
```

## Main Features Implementation

### Authentication
- JWT-based authentication
- Google OAuth2 integration
- Protected routes implementation

### Shopping Cart
- Real-time cart updates
- Persistent cart storage
- Stripe payment integration

### Chat System
- Real-time messaging
- Chat history storage
- User presence indicators

### Product Management
- Product CRUD operations
- Image upload and management
- Category organization

### Rating System
- Product ratings
- Store ratings
- Comment management

## API Documentation

Key API endpoints:

- `/api/products` - Product management
- `/api/users` - User management
- `/api/cart` - Shopping cart operations
- `/api/orders` - Order processing
- `/api/comments` - Review system
- `/api/stats` - Statistics and analytics

Detailed API documentation can be found in the respective controllers.

## Deployment

### Frontend Deployment
- Build the production bundle:
```bash
cd client
npm run build
```
- Deploy the `dist` directory to your web server

### Backend Deployment
- Build the WAR file:
```bash
cd shopee
mvn clean package
```
- Deploy the WAR file to your Java application server

## License

This project is licensed under the MIT License.
