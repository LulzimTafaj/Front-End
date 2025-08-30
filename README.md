# Todo App Frontend

This is the **frontend** for the Todo App, built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**.  
It communicates with the backend API (Express + Prisma + MySQL) to manage tasks.

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- Backend API running (default: [http://localhost:4000](http://localhost:4000))

---

### 2. Clone the Repository
```bash
git clone https://github.com/LulzimTafaj/Front-End.git
cd front-end
```

---

### 3. Install Dependencies
```bash
npm install
```

---

### 4. Configure Environment Variables
Create a `.env` file in the project root based on the `.env.example` template and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

- `NEXT_PUBLIC_API_URL`: Base URL of your backend API.  
  (`NEXT_PUBLIC_` prefix is required so it can be accessed in the browser.)

---

### 5. Run the Development Server
```bash
npm run dev
```

Frontend will be available at:  
👉 [http://localhost:3000](http://localhost:3000)

---

### 6. Build for Production
```bash
npm run build
npm start
```

---

### 7. Linting
```bash
npm run lint
```

---

## 📦 Tech Stack
- **Next.js 15** → React framework  
- **React 19** → UI library  
- **Tailwind CSS 4** → Styling  
- **TypeScript** → Type safety  
- **ESLint** → Code quality  

---

## 🔗 Connecting to Backend
The frontend communicates with the backend API defined in `.env`.  
Make sure the database is set up and that the backend is running on [http://localhost:4000](http://localhost:4000) or update `NEXT_PUBLIC_API_URL` accordingly.

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
