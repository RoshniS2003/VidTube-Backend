# JWT (JSON Web Token)

## What is JWT?

JWT stands for **JSON Web Token**.

JWT is used to **identify and authenticate a user after login**.

### Simple Definition

> JWT is like a **digital pass** given to a user after successful login.

---

## How JWT Works?

```text
User Login
    ↓
Email + Password
    ↓
Password Correct? ✅
    ↓
JWT Token Generated 🎫
    ↓
Token sent to User
    ↓
User makes another request
    ↓
Server checks Token
    ↓
Valid Token ✅
    ↓
User is authenticated
```

---

## Simple Real-Life Example

Imagine a college.

```text
Student
   ↓
Shows ID Card
   ↓
Security checks ID
   ↓
ID is correct ✅
   ↓
Student gets Entry Pass 🎫
```

After getting the pass, the student can use it to prove that they are allowed inside.

Similarly:

```text
User
  ↓
Login
  ↓
Server checks password
  ↓
JWT Token 🎫
  ↓
Token is used for authentication
```

---

## Example JWT Token

A JWT looks like a long string:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

You don't normally need to remember the token's format as a beginner.

---

## Why Do We Use JWT?

JWT is used to:

* Authenticate users
* Identify logged-in users
* Protect private routes
* Allow access to user-specific data

---

## Example

Suppose a user logs in:

```text
Email: roshni@gmail.com
Password: 12345
```

Server checks the password.

If correct:

```text
Login Successful ✅
       ↓
JWT Token 🎫
       ↓
Browser stores token
```

Later, the user requests:

```text
/profile
```

The token is sent with the request.

```text
Browser
   ↓
Token 🎫
   ↓
Server
   ↓
Token valid? ✅
   ↓
Show Profile
```

---

## JWT and Password Difference

| bcrypt              | JWT                                  |
| ------------------- | ------------------------------------ |
| Works with password | Works with token                     |
| Hashes password     | Creates/handles authentication token |
| Checks password     | Helps identify authenticated user    |
| 🔐                  | 🎫                                   |

### Easy Memory Trick

```text
bcrypt → Password 🔐

JWT → Token 🎫
```

---

## Important Point

Getting a JWT once does **not** mean the user can never get another token.

For example, when the user logs in again, the server can generate a **new JWT token**.

```text
Login 1 → Token A 🎫

Login 2 → Token B 🎫
```

The server checks whether the token being used is valid.

---

## Interview Answer

### What is JWT?

> JWT is a token used for user authentication. After successful login, the server generates a JWT token, and the token is used to identify the authenticated user.

### In One Line

> **JWT is like a digital pass that helps the server identify an authenticated user.**


## JWT = Login ke baad Token

Password check ho gaya aur login successful ho gaya.

Ab server user ko ek token deta hai:

```
Login successful
       ↓
     JWT
       ↓
    Token 🎫
```

Example:

> abc123xyz456

Ab jab tum profile open karti ho:

```
Tum → Token → Server
             ↓
       "Haan, ye logged-in user hai."
```

#### 👉 JWT ka kaam = user ko identify/authenticate karna.

### 1. bcrypt = Password ki security

#### Tumhara password:

> 12345

Database mein directly nahi rakhna chahiye.

bcrypt password ko hash kar deta hai:

```
12345
  ↓
bcrypt
  ↓
$2b$10$........ 🔐
  ↓
Database
```

Database mein ye hash save hota hai.

#### Login ke time:

```
Tum password enter karti ho
        ↓
     bcrypt
        ↓
Database ke password se check
        ↓
Correct ✅ / Wrong ❌
```

👉 bcrypt ka kaam = password ko secure karna aur password check karna.