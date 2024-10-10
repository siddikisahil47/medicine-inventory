# Product Requirements Document (PRD)

## Project Name: Medicine Inventory Management System

### 1. Overview

This project aims to develop a web platform for managing medicine inventory. The platform will allow users (typically managers) to input and manage details related to stock levels, expired medicines, and medicine requirements. The application will feature essential functions such as user authentication, dashboard overview, and inventory management.

The application will be built using ReactJS, TailwindCSS, shadcn/ui, and Lucid icons for UI elements.

### 2. Goals and Objectives

The main objective is to provide an easy-to-use interface for managers to track the current stock of medicines, add new medicines, and manage expired or used items. The system should also provide a clear overview of inventory levels and alert managers when stock needs replenishment.

### 3. User Roles

- **Manager**: Can log in, view the dashboard, add new medicines, update current stock, and track medicine expiration.

### 4. Core Functionalities

#### 4.1 Login Page

- Users can log in using their credentials (username and password).
- If login is successful, they are redirected to the dashboard.
- If login fails, display an error message.

**Notes for Developers:**
- Validate login credentials before redirecting.
- Use authentication context for managing user sessions.

#### 4.2 Dashboard

The dashboard will provide a high-level overview of the medicine inventory.

The following sections will be included:
- **Overview**: Displays summarized data (e.g., total stock, expired medicines, and medicines that need to be reordered).
- **Medicine List**: A detailed list of medicines, including their name, quantity, expiry date, and other relevant details.
- **Insert Medicine**: A form for adding new medicines to the inventory.

**Notes for Developers:**
- Use reusable components for displaying data (such as MedicineCard for individual items).
- Ensure the data updates dynamically when new medicines are added or the stock is changed.

#### 4.3 Insert Medicine

Users can add new medicines by filling in the following details:
- Medicine Name
- Current Stock: Initial quantity in stock.
- Medicine Needed: Desired quantity to maintain.
- Expired Medicine: Quantity of expired medicines.
- Medicine Used: Quantity of medicine used since the last update.
- Remaining Stock: Automatically calculated based on inputs.

**Notes for Developers:**
- Use a single form (MedicineForm.js) to handle the addition of new medicines and updates to existing entries.
- Implement validation for required fields (e.g., name and current stock).

#### 4.4 Logout

- Users can log out, which redirects them to the login page.

**Notes for Developers:**
- Ensure user session is cleared upon logout.
- Provide a confirmation prompt before logging out.

### 5. UI/UX Considerations

- **Responsiveness**: The platform must be responsive and optimized for both desktop and tablet views. TailwindCSS will be used for managing layout and responsiveness.
- **Icons and UI Elements**: Use Lucid icons for visually enhancing the interface. Ensure they are consistently used across the platform.
- **UI Library**: We will use shadcn/ui for pre-built components, which can be customized based on project requirements.

### 6. Technical Stack

#### Frontend:
- ReactJS
- TailwindCSS
- shadcn/ui
- Lucid Icons

#### Backend (optional):
Depending on the scope, a backend may be required for persistent storage of inventory data. For now, the focus is on frontend development.

#### Authentication:
Managed using Context API, with a mock API for login verification.

### 7. File Structure

```
frontend-medicine-inventory/
├── public/
│   ├── index.html                  # Main HTML file
│   └── favicon.ico                 # App favicon
│
├── src/
│   ├── assets/                     # Assets folder for images, icons, etc.
│
│   ├── components/                 # Reusable UI components
│       ├── Auth/                   # Authentication components (Login & Logout)
│       │   └── Auth.js             # Handles login and logout components.
│
│       ├── Dashboard/              # Dashboard components
│       │   ├── Dashboard.js        # Main dashboard (includes Overview, MedicineList, and InsertMedicine)
│       │   └── MedicineCard.js     # Reusable component for each medicine entry.
│
│       ├── Form/                   # Form components
│       │   └── MedicineForm.js     # Consolidated form for adding new medicine.
│
│       └── Layout/                 # Layout components
│           └── Header.js           # Navbar/header component.
│
│   ├── context/                    # Context API
│       └── AuthContext.js          # Authentication context for managing login/logout state.
│
│   ├── pages/                      # Pages routing
│       ├── DashboardPage.js        # Dashboard page.
│       ├── LoginPage.js            # Login page.
│       └── InsertMedicinePage.js   # Insert medicine page.
│
│   ├── styles/                     # TailwindCSS styles
│       └── global.css              # Global styles for the app.
│
├── App.js                          # Main app component where routes are defined.
├── index.js                        # Entry point for React app.
├── tailwind.config.js              # TailwindCSS configuration.
├── shadcn.ui.config.js             # shadcn/ui configuration.
├── package.json                    # Dependencies and scripts.
└── README.md                       # Project overview and instructions.
```

### 8. Milestones & Deadlines

#### Week 1:
- Setup the project structure.
- Implement the Login Page and Authentication Context.

#### Week 2:
- Implement the Dashboard (Overview, Medicine List).
- Create reusable components (e.g., MedicineCard.js for medicine entries).

#### Week 3:
- Implement the Insert Medicine form.
- Test validation logic.

#### Week 4:
- Final adjustments, testing, and deployment.
- Ensure proper logout and session management.

### 9. Testing & Validation

- **Unit Testing**: Focus on testing individual components (e.g., MedicineForm.js validation).
- **End-to-End Testing**: Ensure that the user can successfully log in, view the dashboard, add medicines, and log out without errors.
- **Responsiveness Testing**: Verify that the UI functions well across various device sizes (desktop, tablet).

### 10. Assumptions & Dependencies

- **Assumptions**: The initial phase focuses on frontend development only. If persistent storage is required (e.g., for actual stock management), a backend will be integrated in future phases.
- **Dependencies**: The project relies on ReactJS, TailwindCSS, shadcn/ui, and Lucid icons. Make sure all dependencies are installed and configured correctly.