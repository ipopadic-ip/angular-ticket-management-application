# Angular Ticket Management Application

This project is a full-featured Angular 19.1.8 web application that allows users to manage transportation tickets (`Karta`) and carriers (`Prevoznik`). It implements a role-based access control system using JWT authentication, and supports full CRUD operations for the relevant entities.

## ✅ Features

- 🔐 **Login & Role-Based Authorization**  
  Users can log in using credentials. Depending on the assigned role, users have access to specific operations and pages in the application.

- 🛡️ **Authentication & Authorization**  
  Uses JWT tokens for secure API communication. Includes guards to protect routes and interceptors to handle token injection.

- 🧠 **Role-Specific Access Control**  
  CRUD operations and access to UI components are restricted based on the user’s role, as defined on the mock server.

- ⚙️ **CRUD Operations**  
  Full Create, Read, Update, Delete support for:
  - **Karta (Ticket)**
  - **Prevoznik (Carrier)**

- 🧮 **Validation Rules**
  - Departure date must not be earlier than the current date.
  - Arrival date must not be earlier than the departure date.

- 📊 **Carrier Statistics Page**  
  A dedicated statistics view for selected carriers showing:
  - All tickets for that carrier
  - Number of completed tickets (those with arrival dates)
  - Total revenue from tickets

- 🗑️ **Logical & Permanent Deletion of Carriers**  
  A carrier can be permanently deleted only if it was first logically deleted (i.e., the `active` field is set to `false`).

- 🕒 **Timeline Component**  
  Visual timeline displaying a user's tickets in chronological order.  
  - Click on the "+" node to open the ticket creation form.

## 🛠️ Technologies Used

- **Angular 19.1.8**
- **Angular Material** for UI components
- **Angular Router** for client-side navigation
- **Guards & Interceptors** for route protection and request handling
- **Services & Models** for business logic and data typing
- **Standalone Components** – no `NgModules` used
- **JWT (JSON Web Token)** for secure authentication
- **Mock Backend** using `json-server` on `localhost:3000`


## 📦 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2.Install dependencies:
 ```bash
   npm install
```

---

## Author: Ilija
   
