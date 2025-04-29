# Auth system Project

This project contains a basic authentication system with reCAPTCHA v2 integration.

---

##  Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Rishikesh-00/assignment.git
```

---

### 2. Backend Setup

```bash
cd assignment/backend
```

#### Install dependencies:

```bash
npm install
```

#### Configure Environment Variables:

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

> ⚠️ Replace the placeholder values with your actual credentials.

#### Start the server:

```bash
node server.js
```

---

### 3. Frontend Setup

Open the `frontend/` directory in your code editor or file explorer:

```bash
cd ../frontend
```

Then run it using **Live Server** (VS Code Extension or similar).\
You can also open `login.html` or `register.html` directly in your browser via Live Server.

---

## You're all set!

- Register a new account with Google reCAPTCHA.
- Then login with your credentials.
- JWT token will be stored in `localStorage`.

---

## Tech Stack

- Node.js + Express
- NeonDb (Postgres Database)
- bcryptjs
- jwt-simple
- Google reCAPTCHA v2
- HTML/CSS (frontend)

