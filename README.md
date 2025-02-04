# jeera-lite
Jira/kanban style board clone


## Tech architecture

### Auth
- Email/password signup/login
- JWT token handling
- Protected routes

### Board Management
- Create/edit boards
- Drag-and-drop interface
- Multiple status columns

### Task Operations
- CRUD operations for tasks
- Title, description, priority
- Assignment to users
- Due dates
- Status updates

### User Experience
- Responsive design
- Real-time updates
- Error handling
- Loading states

----

## API Endpoints

### Authentication
```typescript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Boards
```typescript
GET /api/boards
POST /api/boards
GET /api/boards/:id
PUT /api/boards/:id
DELETE /api/boards/:id
```

### Tasks
```typescript
GET /api/boards/:boardId/tasks
POST /api/boards/:boardId/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id
PATCH /api/tasks/:id/status
PATCH /api/tasks/:id/assign
```

## Implementation Order

1. Basic Setup 
   - Project initialization
   - Database setup
   - Basic Express server
   - React project structure

2. Authentication 
   - User registration/login
   - JWT implementation
   - Protected routes

3. Core Features 
   - Board CRUD
   - Task CRUD
   - Status management
   - Basic UI

4. Advanced Features
   - Drag and drop
   - Real-time updates
   - Advanced styling
   - Error handling

## Testing Strategy
