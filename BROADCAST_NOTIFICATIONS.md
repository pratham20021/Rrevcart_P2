# Broadcast Notifications Implementation

## Overview
Notifications can now be sent to all users in the system through a broadcast feature accessible from the admin dashboard.

## Backend Changes

### 1. Notification Service
- **New Endpoint**: `POST /notifications/broadcast`
  - Accepts: `{ type, title, message }`
  - Sends notification to all registered users

- **New Method**: `broadcastToAllUsers(type, title, message)`
  - Fetches all users from user-service
  - Creates individual notification for each user

- **New Feign Client**: `UserClient`
  - Calls `GET /users` to fetch all users

### 2. Admin Service
- **New Endpoint**: `POST /admin/notifications/broadcast`
  - Proxy endpoint for admins to trigger broadcasts
  
- **New Feign Client**: `NotificationClient`
  - Calls notification-service broadcast endpoint

## Frontend Changes

### 1. Admin Service
- **New Method**: `broadcastNotification(type, title, message)`
  - Sends broadcast request to backend

### 2. Admin Dashboard Component
- **Broadcast Button**: Opens modal to compose notification
- **Modal Form**: 
  - Type selector (ANNOUNCEMENT, PROMOTION, ALERT, INFO)
  - Title input
  - Message textarea
- **Send Action**: Broadcasts to all users

## Usage

### For Admins:
1. Navigate to Admin Dashboard
2. Click "Broadcast Notification" button
3. Select notification type
4. Enter title and message
5. Click "Send to All Users"

### API Example:
```bash
POST http://localhost:8080/api/admin/notifications/broadcast
Content-Type: application/json

{
  "type": "ANNOUNCEMENT",
  "title": "New Feature Released!",
  "message": "Check out our new premium delivery service"
}
```

## Files Modified/Created

### Backend:
- `notification-service/controller/NotificationController.java` - Added broadcast endpoint
- `notification-service/service/NotificationService.java` - Added broadcast logic
- `notification-service/client/UserClient.java` - NEW: Feign client for user service
- `notification-service/NotificationServiceApplication.java` - Added @EnableFeignClients
- `admin-service/controller/AdminController.java` - Added broadcast proxy endpoint
- `admin-service/client/NotificationClient.java` - NEW: Feign client for notifications

### Frontend:
- `services/admin.service.ts` - Added broadcastNotification method
- `components/admin/dashboard/admin-dashboard.component.ts` - Added broadcast modal logic
- `components/admin/dashboard/admin-dashboard.component.html` - Added broadcast UI
- `components/admin/dashboard/admin-dashboard.component.css` - Added modal styles

## Testing
1. Start all microservices
2. Login as admin
3. Go to admin dashboard
4. Click broadcast button and send a test notification
5. Login as different users to verify they all received the notification
