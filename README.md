# 🌍 B2B Wholesale

![B2B Wholesale Screenshot](https://i.ibb.co.com/tMBxd843/B2-BWholesale.png)  
 

---

## 🚀 Live Demo

- **Live Site:** [Live Site URL](https://b2b-wholesale-d8558.web.app)  
   

---

## 🔹 Project Overview

**B2B Wholesale** is a global platform connecting bulk suppliers (manufacturers, distributors) with retailers, resellers, and institutional buyers.  
It supports multi-category product listings (electronics, fashion, books, furniture, sports) and includes features for **bulk orders, secure transactions, cart management, authentication, and logistics support**.  

---

## 💻 Technologies Used

### Frontend
- React (Vite)  
- React Router  
- Tailwind CSS + DaisyUI  
- Framer Motion (animations)  
- React Helmet (dynamic titles)  
- React Icons  
- Axios (API requests)  

### Backend
- Node.js + Express  
- MongoDB (Atlas)  
- dotenv (env management)  
- cors (CORS handling)  
- jsonwebtoken (JWT authentication)  

### Authentication & Security
- Firebase Auth (Email/Password + Google/GitHub login)  
- JWT authentication for private routes  
- Environment variable management for Firebase & MongoDB  

---

## ✨ Key Features

### 🔑 Authentication
- Email/password login & registration using Firebase Auth  
- Google/GitHub social login  
- JWT authentication for private routes  
- Password validation: uppercase, lowercase, min. 6 characters  
- Protected routes: All Products, Add Product, My Products, Cart  

### 🛍️ Product Management
- Add Product (private) with image, name, brand, category, main quantity, minimum selling quantity, price, rating, short description  
- All Products (private) with card & table view toggle  
- Filter products with Minimum_selling_quantity > 100  
- Update product details  
- Product Details page (private) with modal checkout, quantity increment/decrement, stock updates with MongoDB $inc  

### 🛒 Cart Management
- View purchased products filtered by user email  
- Cancel/Remove from cart restores stock using MongoDB $inc  
- Shows product image, category, brand, description, quantity, and date  

### 🏠 Home Page
- Slider with at least 3 slides  
- Product Categories section (minimum 5 categories)  
- Two extra meaningful sections (customizable)  
- Footer with design consistency  

### 📱 Responsiveness & UI/UX
- Fully responsive on mobile, tablet, and desktop  
- Modern design with Tailwind + DaisyUI  
- Smooth animations with Framer Motion  
- SweetAlert notifications for all CRUD operations  

### ⚙️ Additional
- Dynamic page titles using React Helmet  
- Spinner for loading states  
- 404 Not Found page  
- Environment variable security for Firebase & MongoDB  

---

## ⚙️ Dependencies

- react  
- react-dom  
- react-router 
- tailwindcss  
- daisyui  
- framer-motion  
- react-helmet  
- react-icons  
- axios  
- firebase  
- node  
- express  
- mongodb  
- dotenv  
- cors  
- jsonwebtoken  
- sweetalert2  

---

## 🚀 How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/rimyakter/my_assignment_11_client.git
cd my_assignment_11_client
