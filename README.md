# TaskMaster Backend API

A user-centric REST API for a TodoList application using a nested document structure.

## Features

- **User-Based Schema**: Todos are grouped by unique `username`.
- **Automatic User Creation**: Posting a task creates the user if they don't exist.
- **Nested Documents**: efficient array management for todo items.
- **Clean Code**: Minimalist class-based architecture.

## API Endpoints

The API handles both User resources and Todo resources directly.

### Tasks & Users

| Method | Endpoint | Description | Payload / Notes |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | **List All**: Returns all users and their tasks. | - |
| `GET` | `/api/todos/:username` | **Get User**: Retrieve a specific user's task list. | The `:username` parameter is the string username (e.g., `/api/todos/john`). |
| `POST` | `/api/todos` | **Add Task**: Adds task to user. Creates user if new. | `{ "username": "john", "title": "Buy Milk", "priority": "high" }` |
| `PUT` | `/api/todos/:todoId` | **Update Task**: Update a specific todo item. | The `:todoId` is the unique `_id` of the individual task.<br>`{ "completed": true, "title": "Updated Title" }` |
| `DELETE` | `/api/todos/:todoId` | **Delete Task**: Remove a specific todo item. | The `:todoId` is the unique `_id` of the individual task. |

## Data Model

**User Document**:
```json
{
  "_id": "64f...",
  "username": "john",
  "todos": [
    {
      "_id": "64f...a1",
      "title": "Buy Milk",
      "priority": "high",
      "completed": false,
      "createdAt": "..."
    }
  ]
}
```

## Setup & Run

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:8000`.
# todo_using_oops
