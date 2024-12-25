# PetCare - Pet Daycare Management Application

## Use Case Scenario

Imagine a lady in your neighborhood who wants to start her own pet daycare. A pet daycare is a place where people send their pets, and the daycare staff takes care of them while the owners go on trips. She is looking for a tool to manage her pet daycare. This application not only solves her problem but is also suitable for pet daycares around the world.

---

## Component Tree

![Component Tree](https://github.com/user-attachments/assets/2a60ec83-522d-4691-b56a-f9c59ce82a58)

---

## Tech Stack Used

### Frontend
- **Next.js** - React framework for building user interfaces.
- **Tailwind CSS** - Utility-first CSS framework for fast UI design.
- **ShadCN UI** - Component library for UI elements.

### Backend
- **Prisma ORM** - Object-relational mapping (ORM) for database management.
- **PostgreSQL** (Neon DB) - Database solution for handling pet daycare data.

### State Management
- **Context API** - Global state management for passing data across components.

### Form Handling
- **React Hook Form** - A simple and fast form handling library for React.

### Schema Validation
- **Zod** - A TypeScript-first schema declaration and validation library.

### Payment Gateway
- **Stripe** - Integrated payment gateway for handling payments securely.

### Deployment
- **Vercel** - Deployment platform for Next.js applications.

---

## Prime Features

### **Optimistic UI**
Optimistic UI makes the application incredibly fast by showing data in the UI even before it is updated in the database. This reduces waiting times and enhances user experience.

### **Payment Gateway Integration**
A complete and secure integration of **Stripe** is implemented for handling payments, making it easier for users to pay for services.

### **User Authentication**
The application supports easy authentication with **Next-Auth** and custom session tokens, ensuring secure access to the system.

### **Server Actions to Update the DB**
Server actions provide a fast way to interact with the backend, making database updates seamless and efficient without requiring additional client-side updates.

### **Cutting-Edge Features**
This is an industry-grade application that takes care of edge cases and implements necessary security measures to protect sensitive user and pet data.

---

## Live Demo

You can access the live version of the application here: [PetCare Live Demo](https://petcare-theta.vercel.app)

---

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install` or `yarn install`.
3. Set up environment variables:
   - `NEXT_PUBLIC_STRIPE_KEY`
   - `STRIPE_SECRET_KEY`
   - `DATABASE_URL`
4. Run the development server: `npm run dev` or `yarn dev`.
5. Visit `http://localhost:3000` to access the app.

---

## Contributing

Feel free to fork the repository and submit issues or pull requests. We welcome contributions to enhance the functionality and security of the app.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
