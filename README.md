# HR Management Portal — Client

The frontend application for the HR Management Portal, built with React, Vite, and TypeScript.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of the `client` directory.
   - Copy the contents from `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Update `VITE_API_BASE_URL` if your backend is running on a different port.

### Development

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form & Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
