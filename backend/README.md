# Task Manager API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:5001/api`  
**Authentication:** JWT Bearer Token  
**Content-Type:** `application/json`

---

## Authentication

Include JWT token in headers for protected routes:

```
Authorization: Bearer <your_token>
```

---

## Endpoints

### Authentication

#### 1. Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### 2. Login User

```http
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### 3. Logout User

```http
POST /api/auth/logout
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Profile Management

#### 1. Get Profile

```http
GET /api/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-05T12:30:00.000Z"
  }
}
```

---

#### 2. Update Profile

```http
PUT /api/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body (all fields optional):**

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "avatar": "https://example.com/new-avatar.jpg",
    "updatedAt": "2024-01-06T14:20:00.000Z"
  }
}
```

---

### Task Management

#### 1. Get All Tasks

```http
GET /api/tasks
```

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

- `search` - Search in title/description
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `tags` - Filter by tags (comma-separated)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sort` - Sort field (default: -createdAt)

**Example:**

```
GET /api/tasks?status=pending&priority=high&page=1&limit=10
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
        "user": "64f5a1b2c3d4e5f6a7b8c9d0",
        "title": "Complete project documentation",
        "description": "Write comprehensive API documentation",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2024-01-15T00:00:00.000Z",
        "tags": ["documentation", "urgent"],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-05T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

---

#### 2. Get Single Task

```http
GET /api/tasks/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "user": "64f5a1b2c3d4e5f6a7b8c9d0",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "tags": ["documentation", "urgent"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-05T10:30:00.000Z"
  }
}
```

---

#### 3. Create Task

```http
POST /api/tasks
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "tags": ["documentation", "urgent"]
}
```

**Field Requirements:**

- `title` - Required, max 200 characters
- `description` - Optional, max 1000 characters
- `status` - Optional (pending, in-progress, completed), default: pending
- `priority` - Optional (low, medium, high), default: medium
- `dueDate` - Optional, ISO 8601 date format
- `tags` - Optional, array of strings, max 10 tags

**Response (201):**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "user": "64f5a1b2c3d4e5f6a7b8c9d0",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "tags": ["documentation", "urgent"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### 4. Update Task

```http
PUT /api/tasks/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body (all fields optional):**

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "priority": "medium",
  "dueDate": "2024-01-20T00:00:00.000Z",
  "tags": ["updated", "completed"]
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2024-01-20T00:00:00.000Z",
    "tags": ["updated", "completed"],
    "updatedAt": "2024-01-06T15:45:00.000Z"
  }
}
```

---

#### 5. Delete Task

```http
DELETE /api/tasks/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "64f5a1b2c3d4e5f6a7b8c9d1"
  }
}
```

---

## Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "message": "Not authorized to access this route. Token missing."
}
```

### Not Found (404)

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Rate Limit (429)

```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Status Codes

| Code | Description                |
| ---- | -------------------------- |
| 200  | OK - Success               |
| 201  | Created - Resource created |
| 400  | Bad Request / Validation   |
| 401  | Unauthorized               |
| 404  | Not Found                  |
| 429  | Too Many Requests          |
| 500  | Server Error               |

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Scope:** All `/api/*` routes

---

## cURL Examples

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Tasks

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description","priority":"high"}'
```

### Update Task

```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

### Delete Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Implementation Notes

### Security

- All passwords are bcrypt hashed with 10 salt rounds
- JWT tokens expire after 7 days
- Rate limiting prevents abuse
- Input validation on all endpoints
- CORS enabled for frontend

### Database Indexes

- User email indexed for fast lookups
- Task user + status + priority for efficient filtering
- Text index on task title and description for search

### Pagination

- Default page size: 10 items
- Maximum page size: 100 items
- Total count provided for UI pagination controls

### Search

- Full-text search on task title and description
- Case-insensitive matching
- Supports boolean search operators

### Filtering

- Status: pending, in-progress, completed
- Priority: low, medium, high
- Tags: array filtering with $in operator
- Combine multiple filters for advanced queries

---

## Success & Error Flow

### Typical Authentication Flow

1. User registers → receives JWT token
2. Token stored in client localStorage
3. Include token in Authorization header for protected routes
4. Token validated on server for each request
5. Token expires → user must re-login

### Task Operations Flow

1. Create task with required title
2. Task defaults to "pending" status and "medium" priority
3. Update task status as work progresses
4. Search/filter tasks by various criteria
5. Delete completed tasks

---

End of API Documentation
