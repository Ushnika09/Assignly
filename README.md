
# Assignly

Assignly is a full-stack application designed to streamline the process of assigning tasks to agents. It allows users to upload CSV or Excel files containing task details, which are then distributed among available agents. The application provides an intuitive dashboard for monitoring task assignments and agent performance.

## Project Structure

```
Assignly/
├── backend/                # Server-side application
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   └── server.js           # Entry point for the server
└── frontend/               # Client-side application
    ├── components/         # Reusable UI components
    ├── pages/              # React pages
    ├── public/             # Static assets
    ├── src/                # Source code
    ├── .env                # Environment variables
    └── package.json        # Project metadata and dependencies
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (for local development) or access to a MongoDB Atlas cluster

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Ushnika09/Assignly.git
cd Assignly
```

2. **Set up the backend:**

```bash
cd Backend
npm install
```

3. **Set up the frontend:**

```bash
cd Frontend
npm install
```

4. **Start the development servers:**

**Backend:**
```bash
cd Backend
npm start
```

**Frontend:**
```bash
cd Frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` (typically), and the backend at `http://localhost:5000`.

## Usage

- **Upload Tasks**: Navigate to the "Upload" section in the frontend to upload CSV or Excel files containing task details. The tasks will be automatically distributed among available agents.

- **Dashboard**: The dashboard provides insights into task assignments, agent performance, and recent uploads.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for file uploads)

### Frontend
- React
- Tailwind CSS
- Recharts (for data visualization)

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with a detailed description of your changes.


This project is licensed under the MIT License - see the LICENSE file for details.
```
