# 🌍 Wanderlust Web

Wanderlust Web is a travel and rental listing platform where users can explore and book rooms, hotels, PGs, and vacation homes. Property owners can list their properties for rent, making it a comprehensive solution for both travelers and hosts.

## 🚀 Features

- 🏠 Property listing by house, hotel, and PG owners
- 🔍 Search and filter functionality based on location, price, and amenities
- 🖼️ Image uploads for property previews
- 📍 Google Maps integration for location preview *(optional)*
- 💬 Contact/booking option for potential tenants
- 🧾 Admin and user dashboards

## 🛠️ Tech Stack

**Frontend:**
- HTML, CSS, Bootstrap
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

## 📦 Installation

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/wanderlust-web.git
cd wanderlust-web

# Install dependencies
npm install

# Set up environment variables
touch .env
# Add your MongoDB URI and other secrets in the .env file
# Example:
# MONGODB_URI=mongodb://localhost:27017/wanderlust
# PORT=3000

# Start the development server
npm start
