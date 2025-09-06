# 🌍 B2B Wholesale

A global **B2B wholesale** connecting bulk suppliers (manufacturers, distributors) with retailers, resellers, and institutional buyers.  
The platform supports **multi-category product listings** (electronics, fashion, books,furniture,sports.) with features for bulk orders, secure transactions, cart management, authentication, and logistics support.

---

## 🚀 Live Demo

🔗 [Live Site URL](https://your-deployment-link.com)  
🔗 [Server API URL](https://your-server-link.com)

---

## 🎯 Purpose

This project is part of the **candidate selection process**. It demonstrates:

- Problem-solving and challenge tackling
- Creativity in UI/UX and animations
- Efficient backend and database management
- Secure authentication and environment setup
- Full-stack development best practices

---

## ✨ Key Features

### 🔑 Authentication

- Email/password login & registration using Firebase Auth
- Google/GitHub social login
- JWT authentication for private routes
- Password validation (uppercase, lowercase, min. 6 characters)
- Protected routes: All Products, Add Product, My Products, Cart

### 🛍️ Product Management

- Add Product (private) with:
  - Image, Name, Brand, Category, Main Quantity, Minimum Selling Quantity, Price, Rating, Short Description
- All Products (private)
  - Card & Table view toggle
  - Filter for products with `Minimum_selling_quantity > 100`
  - Update button to edit product details
- Product Details page (private) with modal checkout:
  - Quantity increment/decrement
  - Enforce minimum selling quantity
  - Uses MongoDB `$inc` to decrement stock

### 🛒 Cart Management

- View purchased products filtered by user email
- Cancel/Remove from cart: restores stock using MongoDB `$inc`
- Shows product image, category, brand, description, quantity, and date

### 🏠 Home Page

- Slider with at least 3 slides
- Product Categories section (minimum 5 categories)
- Two extra meaningful sections (customizable)
- Footer with design consistency

### 📱 Responsiveness & UI/UX

- Fully responsive on **mobile, tablet, and desktop**
- Modern design with Tailwind + DaisyUI
- Smooth animations with **Framer Motion**
- SweetAlert notifications for all CRUD operations

### ⚙️ Additional

- Dynamic page titles (Helmet)
- Spinner for loading states
- 404 Not Found page
- Environment variable security for Firebase & MongoDB

---

## 🛠️ Tech Stack

### Frontend

- **React** (Vite)
- **React Router**
- **Tailwind CSS** + **DaisyUI**
- **Framer Motion** (animations)
- **React Helmet** (dynamic titles)
- **React Icons**
- **Axios** (API requests)

### Backend

- **Node.js + Express**
- **MongoDB (Atlas)**
- **dotenv** (env management)
- **cors** (CORS handling)
- **jsonwebtoken** (JWT auth)

---
