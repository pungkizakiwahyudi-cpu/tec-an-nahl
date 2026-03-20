# API Contracts - TEC AN-NAHL Website

## Overview
This document outlines the API contracts between frontend and backend for the TEC AN-NAHL Islamic education center website.

## Current Mock Data (to be replaced)
- **Location**: `/app/frontend/src/mock.js`
- **Mock functions**: All data is currently hardcoded in frontend
- **Form submission**: Uses browser console.log and toast notification only

## Backend Implementation Requirements

### 1. Registration API

#### POST /api/registrations
Create a new student registration

**Request Body:**
```json
{
  "name": "string (required)",
  "phone": "string (required)",
  "email": "string (optional)",
  "age": "number (required)",
  "program": "string (required, enum: 'anak', 'remaja', 'dewasa')",
  "message": "string (optional)"
}
```

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "phone": "string",
  "email": "string",
  "age": "number",
  "program": "string",
  "message": "string",
  "status": "pending",
  "created_at": "datetime"
}
```

**Status Codes:**
- 201: Registration created successfully
- 400: Invalid input data
- 500: Server error

#### GET /api/registrations
Retrieve all registrations (for admin purposes)

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "phone": "string",
    "email": "string",
    "age": "number",
    "program": "string",
    "message": "string",
    "status": "pending",
    "created_at": "datetime"
  }
]
```

**Status Codes:**
- 200: Success
- 500: Server error

## Database Schema

### Collection: registrations

```
{
  "_id": ObjectId,
  "id": string (UUID),
  "name": string,
  "phone": string,
  "email": string (nullable),
  "age": number,
  "program": string (enum: 'anak', 'remaja', 'dewasa'),
  "message": string (nullable),
  "status": string (default: 'pending'),
  "created_at": datetime
}
```

## Frontend Integration

### Files to Update:
1. `/app/frontend/src/pages/ContactPage.jsx`
   - Update `handleSubmit` function to call backend API
   - Add error handling for API failures
   - Update success/error toast messages

### Integration Steps:
1. Import axios and API endpoint
2. Replace mock submission with actual POST request
3. Handle loading states during submission
4. Display appropriate success/error messages
5. Reset form only on successful submission

### Example API Call:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const response = await axios.post(`${API}/registrations`, formData);
```

## Testing Checklist
- [ ] POST /api/registrations creates new registration in database
- [ ] GET /api/registrations retrieves all registrations
- [ ] Form validation works correctly
- [ ] Success toast appears on successful submission
- [ ] Error toast appears on failed submission
- [ ] Form resets after successful submission
- [ ] Database stores all registration data correctly

