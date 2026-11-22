# 01. SocialGram – Project Setup and Architecture

## 1. Project Overview

SocialGram is a full-stack social media application where users can register, log in, create posts, share content, follow other users, and communicate with each other.

The project follows a **Monorepo Architecture**, where frontend and backend applications are maintained inside one repository.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend application and routing |
| React.js | Building reusable UI components |
| TypeScript | Type safety and better code maintainability |
| Tailwind CSS | Styling the application |
| Node.js | Backend JavaScript runtime |
| Express.js | Creating REST APIs |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB schema and database operations |
| Axios | Making HTTP requests |
| JWT | User authentication |
| bcryptjs | Hashing user passwords |
| Git & GitHub | Version control |

## 3. Project Architecture

The project uses a monorepo structure.

- `apps/web`: Contains the Next.js frontend.
- `apps/api`: Contains the Express.js backend.
- `docs`: Contains project documentation.

### Folder Structure

```text
social-media-platform/
│
├── apps/
│   ├── web/
│   │   └── src/
│   │       ├── app/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── lib/
│   │       └── services/
│   │
│   └── api/
│       └── src/
│           ├── config/
│           ├── controllers/
│           ├── middleware/
│           ├── models/
│           ├── routes/
│           └── server.ts
│
├── docs/
│
├── package.json
└── package-lock.json
```

## 4. Why Did I Use Monorepo Architecture?

I used monorepo architecture to maintain the frontend and backend in a single repository.

Benefits:

- Easy project management.
- Frontend and backend code are organized separately.
- Dependencies and scripts can be managed through npm workspaces.
- Easier communication between frontend and backend teams.
- One repository for the complete application.

## 5. Frontend and Backend Responsibilities

### Frontend (apps/web)

The frontend is responsible for:

- Displaying the user interface.
- Handling user interactions.
- Managing component state.
- Form validation.
- Calling backend APIs.
- Displaying API responses.

### Backend (apps/api)

The backend is responsible for:

- Handling API requests.
- Validating incoming data.
- Managing authentication.
- Processing business logic.
- Communicating with MongoDB.
- Sending responses to the frontend.

## 6. Development Environment

The project runs two applications simultaneously.

| Application | Port |
|---|---|
| Next.js Frontend | 3000 |
| Express Backend | 5001 |

### Start Both Applications

From the project root:

```bash
npm run dev
```

This command uses concurrently to start the frontend and backend development servers together.

## 7. Environment Variables

### Backend – apps/api/.env

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend – apps/web/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Environment variables help keep configuration separate from application code.

Important: Actual secrets must never be committed to GitHub.

## 8. Current Working Functionality

- Frontend and backend applications are configured.
- MongoDB Atlas connection is implemented.
- Express server is running.
- Frontend communicates with the backend using Axios.
- Authentication APIs are implemented.

## 9. Implementation Details

- Architecture: Monorepo
- Frontend: Next.js + React + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: MongoDB Atlas
- Implementation date: Not recorded
- Time taken: Not recorded
- Status: Completed

## 10. Interview Explanation

"I developed SocialGram using a monorepo architecture, where I maintain the frontend and backend applications in a single repository.

For the frontend, I used Next.js, React, TypeScript and Tailwind CSS. For the backend, I used Node.js and Express.js to create REST APIs. I used MongoDB Atlas as the database and Mongoose to interact with it.

I separated the frontend and backend into different applications to maintain clean code organization and make the project easier to manage."

## 11. Future Improvements

- Implement post creation and management.
- Implement likes and comments.
- Implement follow and unfollow functionality.
- Implement real-time messaging.
- Implement notifications.
