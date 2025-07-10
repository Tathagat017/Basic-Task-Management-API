# Task Management Application

A full-stack task management application built with React TypeScript frontend and FastAPI Python backend.

## 🚀 Features

- **Create Tasks**: Add new tasks with title and description
- **View Tasks**: Display all tasks with status indicators
- **Update Tasks**: Toggle task completion status
- **Delete Tasks**: Remove tasks with confirmation
- **Real-time Updates**: Optimistic UI updates for better user experience
- **Error Handling**: Comprehensive error handling with user feedback

## 🏗️ Project Structure

```
q1/
├── backend/                 # FastAPI Python backend
│   ├── main.py             # FastAPI application and routes
│   ├── models.py           # Data models and enums
│   ├── schema.py           # Pydantic schemas for API
│   ├── storage.py          # In-memory data storage
│   ├── pyproject.toml      # Python dependencies
│   └── README.md           # Backend documentation
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── routes/         # Application routing
│   ├── package.json        # Node.js dependencies
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

## 🛠️ Technology Stack

### Backend

- **FastAPI**: Modern, fast web framework for building APIs
- **Python 3.8+**: Programming language
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for FastAPI
- **CORS Middleware**: Cross-origin resource sharing support

### Frontend

- **React 18**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Build tool and development server
- **CSS3**: Styling and layout

## 📋 Prerequisites

- **Python 3.8+** installed on your system
- **Node.js 16+** and **npm** installed
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd q1
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
# OR if using uv
uv sync

# Start the backend server
python main.py
```

The backend will start on `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### Get All Tasks

```http
GET /tasks
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "status": "pending",
    "created_at": "2024-01-01T10:00:00"
  }
]
```

#### Create Task

```http
POST /tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Optional description"
}
```

#### Update Task

```http
PUT /tasks/{task_id}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete Task

```http
DELETE /tasks/{task_id}
```

### Interactive API Documentation

Visit `http://localhost:8000/docs` when the backend is running to access the interactive Swagger UI documentation.

## 🎯 Usage

1. **Start Both Servers**: Make sure both backend (port 8000) and frontend (port 5173) are running
2. **Create Tasks**: Use the form to add new tasks with title and optional description
3. **Manage Tasks**: Click the circle button to toggle completion status
4. **Delete Tasks**: Click the trash icon to delete tasks (with confirmation)
5. **View Status**: Tasks are organized into "Active Tasks" and "Completed Tasks" sections

## 🔧 Development

### Backend Development

```bash
cd backend

# Run with auto-reload for development
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests (if available)
pytest

# Check code formatting
black .
```

### Frontend Development

```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🏛️ Architecture

### Backend Architecture

- **main.py**: FastAPI application with CORS middleware and route definitions
- **models.py**: Task model with status enum and data methods
- **schema.py**: Pydantic schemas for request/response validation
- **storage.py**: In-memory storage implementation (easily replaceable with database)

### Frontend Architecture

- **Component-based**: Modular React components for reusability
- **Service Layer**: Centralized API communication in `taskService.ts`
- **Type Safety**: Full TypeScript integration for better development experience
- **State Management**: React hooks for local state management

### Data Flow

1. User interacts with React components
2. Components call methods in `taskService.ts`
3. Service layer makes HTTP requests to FastAPI backend
4. Backend processes requests and returns responses
5. Frontend updates UI with new data

## 🔒 CORS Configuration

The backend is configured to allow requests from any origin during development. For production, update the CORS settings in `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://your-frontend-domain.com"],  # Update this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🚨 Error Handling

- **Backend**: Returns appropriate HTTP status codes with error messages
- **Frontend**: Displays user-friendly error messages and handles network failures
- **Optimistic Updates**: UI updates immediately with rollback on failure

## 📝 Task Status

Tasks have two possible statuses:

- **pending**: Task is not yet completed
- **completed**: Task has been finished

## 🔄 State Management

The application uses React's built-in state management:

- `useState` for component-level state
- `useEffect` for side effects and data fetching
- Optimistic updates for better user experience

## 🎨 Styling

The application uses vanilla CSS with:

- Responsive design principles
- Clean, modern interface
- Visual feedback for user interactions
- Status-based styling for tasks

## 🐛 Troubleshooting

### Backend Issues

1. **Port 8000 already in use**:

   ```bash
   # Kill process using port 8000
   lsof -ti:8000 | xargs kill -9
   ```

2. **Import errors**:
   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r requirements.txt`

### Frontend Issues

1. **Port 5173 already in use**:

   ```bash
   # The dev server will automatically try the next available port
   npm run dev
   ```

2. **API connection issues**:
   - Verify backend is running on port 8000
   - Check browser console for CORS errors
   - Ensure API_BASE_URL in `taskService.ts` is correct

## 🚀 Deployment

### Backend Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Serve the dist folder with any static file server
# Example with serve:
npm install -g serve
serve -s dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FastAPI for the excellent Python web framework
- React team for the powerful frontend library
- Vite for the fast build tool and development server
