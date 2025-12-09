# Authentication Fixes

## Issues Fixed

### 1. Missing CORS Configuration in Auth Service
**Problem**: The auth-service didn't have CORS configured, causing browser to block requests from the Angular frontend.

**Solution**: Created `CorsConfig.java` in auth-service to allow requests from `http://localhost:4200`.

**File**: `microservices/auth-service/src/main/java/com/revcart/auth/config/CorsConfig.java`

### 2. Frontend Role Field Issue
**Problem**: Frontend was sending `role: 'CUSTOMER'` as a string, but backend expects it to default properly.

**Solution**: Removed the role field from the signup form data, letting the backend default it to CUSTOMER.

**File**: `revcart-frontend/src/app/components/auth/signup/signup.component.ts`

### 3. Error Response Format
**Problem**: Backend was returning error messages in Map format which wasn't being handled properly by frontend.

**Solution**: Changed error responses to return plain strings for better frontend error handling.

**File**: `microservices/auth-service/src/main/java/com/revcart/auth/controller/AuthController.java`

### 4. Password Validation
**Problem**: No client-side validation for password length.

**Solution**: Added validation to ensure password is at least 6 characters before submitting.

**File**: `revcart-frontend/src/app/components/auth/signup/signup.component.ts`

### 5. Improved Error Messages
**Problem**: Generic error messages weren't helpful for debugging.

**Solution**: Enhanced error handling to show specific error messages from the backend.

**Files**: 
- `revcart-frontend/src/app/components/auth/login/login.component.ts`
- `revcart-frontend/src/app/components/auth/signup/signup.component.ts`

## Testing

### Prerequisites
1. Ensure MySQL is running on port 3306
2. Ensure Consul is running on port 8500
3. Start auth-service: `cd microservices/auth-service && mvn spring-boot:run`
4. Start api-gateway: `cd microservices/api-gateway && mvn spring-boot:run`
5. Start frontend: `cd revcart-frontend && npm start`

### Manual Testing
1. Navigate to `http://localhost:4200/auth/signup`
2. Fill in the signup form with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Phone: 1234567890 (optional)
3. Click "Create Account"
4. You should be redirected to the home page
5. Logout and try logging in with the same credentials

### Automated Testing
Run the test script:
```bash
test-auth.bat
```

## Common Issues

### Issue: "Cannot connect to server"
**Solution**: Ensure both api-gateway (port 8080) and auth-service (port 8081) are running.

### Issue: "Email is already in use"
**Solution**: Use a different email or delete the existing user from the database:
```sql
DELETE FROM revcart_auth.users WHERE email = 'test@example.com';
```

### Issue: CORS errors in browser console
**Solution**: 
1. Restart the auth-service after adding CorsConfig.java
2. Clear browser cache
3. Verify the frontend is running on port 4200

## Next Steps

If issues persist:
1. Check browser console for detailed error messages
2. Check auth-service logs for backend errors
3. Verify database connection in `application.properties`
4. Ensure all environment variables are set (MAIL_USERNAME, MAIL_PASSWORD, etc.)
