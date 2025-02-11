# Admin Dashboard

This repo is for the s4yt admin dashboard. 

# S4YT Dashboard API Documentation

This documentation provides the details of the API endpoints for the S4YT Admin Panel.

## API Endpoints

### 1. **POST /api/login**
   - **Description**: This endpoint allows an admin to log in.
   - **URL**: `http://localhost:4000/api/login`
   - **Request Body** (URL Encoded):
     - `email`: `tester1@test.com`
     - `password`: `123`
   
   **Example Request:**
   ```http
   POST http://localhost:4000/api/login
   Content-Type: application/x-www-form-urlencoded
   email=tester1@test.com&password=123
   ```

---

### 2. **POST /api/register**
   - **Description**: This endpoint allows a new business to register.
   - **URL**: `http://localhost:4000/api/register`
   - **Request Body** (URL Encoded):
     - `businessName`: 
     - `email`: 
     - `password`: 
   
   **Example Request:**
   ```http
   POST http://localhost:4000/api/register
   Content-Type: application/x-www-form-urlencoded
   businessName=tester2&email=tester2@test.com&password=123
   ```

---

### 3. **GET /api/business/{businessId}**
   - **Description**: This endpoint allows fetching a specific business's details by its ID.
   - **URL**: `http://localhost:4000/api/business/67ab86a627a0afca404537c3`
   - **Request**: `GET`
   - **Example Request:**
   ```http
   GET http://localhost:4000/api/business/67ab86a627a0afca404537c3
   ```

---

### 4. **PUT /api/business/{businessId}**
   - **Description**: This endpoint allows updating the business details.
   - **URL**: `http://localhost:4000/api/business/67ab86a627a0afca404537c3`
   - **Request Body** (URL Encoded):
     - `description`: 
     - `logo`: 
     - `question`: 
     - `youtubeLink`: 
   
   **Example Request:**
   ```http
   PUT http://localhost:4000/api/business/67ab86a627a0afca404537c3
   Content-Type: application/x-www-form-urlencoded
   description=a+test+business+for+an+example&logo=test&question=sample+question&youtubeLink=link
   ```

---

### 5. **DELETE /api/business/{businessId}**
   - **Description**: This endpoint allows deleting a specific business.
   - **URL**: `http://localhost:4000/api/business/67ab86a627a0afca404537c3`
   - **Request**: `DELETE`
   
   **Example Request:**
   ```http
   DELETE http://localhost:4000/api/business/67ab86a627a0afca404537c3
   ```

---
