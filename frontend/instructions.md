# Project Overview
You are developing a frontend platform for managing medicine inventory. The manager will be able to input details such as the current stock, the number of medicines needed, expired medicines, medicines used, and remaining stock.

You will be using ReactJs, TailwindCSS, shadcn/ui, lucid icon

## Core Functionalities

**1. Login Page:**

*   Users will be able to log in to the platform using their credentials.
*   The login page will have input fields for username and password.
*   Upon successful login, users will be redirected to the dashboard.

**2. Dashboard:**

*   The dashboard will provide a centralized view of the medicine inventory.
*   It will consist of the following sections:

    *   **Overview:** A summary of the current inventory status, including total stock, expired medicines, and medicines needed.
    *   **Medicine List:** A detailed list of all medicines in the inventory, including their name, quantity, expiry date, and other relevant information.
    *   **Insert Medicine:** A form to add new medicines to the inventory.

**3. Insert Medicine:**

*   The "Insert Medicine" form will allow users to input the following details for each medicine:

    *   **Current Stock:** The initial quantity of the medicine in stock.
    *   **Medicine Needed:** The desired quantity of the medicine to be maintained in stock.
    *   **Expired Medicine:** The quantity of expired medicine.
    *   **Medicine Used:** The quantity of medicine used since the last inventory update.
    *   **Remaining Stock:** The calculated remaining stock after accounting for expired and used medicine.

**4. Logout:**

*   Users will be able to log out of the platform, which will redirect them to the login page.


# Docs


# Current File Structure
```frontend-medicine-inventory/
├── public/
│   ├── index.html               # Main HTML file
│   └── favicon.ico              # App favicon
│
├── src/
│   ├── assets/                  # Assets folder for images, icons, etc.
│   └── components/              # Reusable UI components
│       ├── Dashboard/
│       │   ├── Dashboard.js     # Main dashboard component
│       │   ├── Overview.js      # Overview section component
│       │   └── MedicineList.js  # Medicine list component
│       ├── InsertMedicine/
│       │   ├── InsertMedicine.js # Form to insert new medicine
│       │   └── MedicineForm.js  # Form for medicine details
│       ├── Login/
│       │   ├── Login.js         # Login page component
│       │   └── LoginForm.js     # Login form component
│       ├── Logout/
│       │   └── Logout.js        # Logout button component
│       └── Header/
│           └── Header.js        # Navbar/header component
│
├── context/                     # Context API (if needed for global state management)
│   └── AuthContext.js           # Authentication context
│
├── pages/                       # Pages routing
│   ├── DashboardPage.js         # Dashboard page
│   ├── LoginPage.js             # Login page
│   └── InsertMedicinePage.js    # Insert medicine page
│
├── styles/                      # TailwindCSS styles
│   └── global.css               # Global styles for the app
│
├── App.js                       # Main app component
├── index.js                     # Entry point for React app
├── tailwind.config.js           # TailwindCSS configuration
├── shadcn.ui.config.js          # shadcn/ui configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project overview and instructions
```

--
above is the project i want to build,
How should i structure my project file?
(try to create as few files as possible)

Help me adding details to the original PRD that give clear alignment to the developers who will be implementing the project.

- dont craete actual code, just the PRD
- include the file structure into the doc
- include the core functionality into the doc