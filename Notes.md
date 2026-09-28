# CORS, Cookies, Token, Middleware and Cookie-Parser

## 1. What is CORS?

**CORS** stands for **Cross-Origin Resource Sharing**.

CORS allows communication between the frontend and backend when they have **different origins**.

### Example

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:5000
```

Here, the ports are different:

```text
Frontend → 3000
Backend  → 5000
```

So, they have different origins.

### Simple Flow

```text
Frontend
localhost:3000
      |
      | Request
      ↓
     CORS
      |
      ↓
Backend
localhost:5000
```

### Simple Definition

> CORS allows the frontend and backend to communicate when they have different origins.

---

# 2. What is an Origin?

An origin mainly depends on:

* Protocol
* Domain/Host
* Port

### Example

```text
http://localhost:3000
```

and

```text
http://localhost:5000
```

These are different origins because their ports are different.

### Same Origin

```text
http://example.com
http://example.com
```

Same protocol, host, and port → Same origin.

### Different Origin

```text
http://example.com
https://example.com
```

Protocol is different.

Or:

```text
http://localhost:3000
http://localhost:5000
```

Port is different.

---

# 3. What is a Cookie?

A **cookie is a small piece of information stored by the browser**.

For example:

```text
user = Roshni
```

Another example:

```text
token = ABC123
```

The browser can save this information and send the cookie with applicable requests.

### Simple Example

```text
Cookie:

Name: user
Value: Roshni
```

So we can think of it as:

```text
user=Roshni
```

---

# 4. How Does a Cookie Go From Browser to Backend?

Suppose the browser has saved this cookie:

```text
user=Roshni
```

Now the browser sends a request to the backend.

```text
Browser
   |
   | Request + Cookie
   | user=Roshni
   ↓
Backend
```

The cookie can be sent along with the request when the cookie's rules allow it.

---

# 5. What is a Token?

A **token is a special string used to identify or authenticate a user**.

For example, after successful login:

```text
ABC123XYZ789
```

The server can give this token to the browser.

The browser may store it in a cookie:

```text
token=ABC123XYZ789
```

### Example Flow

```text
User Login
    ↓
Backend checks username/password
    ↓
Login successful
    ↓
Server creates token
    ↓
Browser stores token
```

Later:

```text
Browser
   ↓
Request + token
   ↓
Backend
```

The backend can use the token to authenticate the request.

### Real-Life Example

A token is like an **ID card**.

```text
ID Card → identifies a person
Token   → helps identify/authenticate a user
```

### Important

A token is **not the same as a password**.

---

# 6. What is Middleware?

**Middleware is a function that works between the incoming request and the final route/response.**

### Flow

```text
Browser
   ↓
Request
   ↓
Middleware
   ↓
Route / Backend
   ↓
Response
   ↓
Browser
```

Middleware can perform extra work on a request.

For example:

* Read JSON
* Read cookies
* Handle CORS
* Check authentication
* Serve static files

### Simple Definition

> Middleware is a function that performs some work between a request and the route.

---

# 7. What is Cookie-Parser?

`cookie-parser` is an **Express middleware** used to process cookies from incoming requests.

### Simple Example

Browser sends:

```text
user=Roshni
```

The backend receives the request.

`cookie-parser` processes the cookie.

Then we can access it using:

```js
req.cookies
```

For example:

```js
req.cookies.user
```

Output:

```text
Roshni
```

### Flow

```text
Browser
   ↓
Request + Cookie
   ↓
cookie-parser
   ↓
req.cookies
   ↓
Backend / Route
```

### Simple Definition

> Cookie-parser is an Express middleware used to parse cookies from incoming requests.

---

# 8. Why is Cookie-Parser Called Middleware?

Because it works between the **request and the route**.

```text
Browser
   ↓
Request
   ↓
cookie-parser
   ↓
Route
   ↓
Response
```

So:

```js
app.use(cookieParser());
```

means:

> Use cookie-parser middleware in the Express application.

---

# 9. How Does Cookie-Parser Work?

Suppose the browser sends:

```text
Cookie: user=Roshni
```

The `cookie-parser` middleware processes it.

Then the backend can use:

```js
req.cookies
```

For example:

```js
console.log(req.cookies.user);
```

Output:

```text
Roshni
```

### Flow

```text
🍪 Cookie
user=Roshni
     ↓
cookie-parser
     ↓
req.cookies
     ↓
user = Roshni
```

### Important

`cookie-parser` does **not** create the cookie.

It helps the Express backend **process and access cookies received in requests**.

---

# 10. Browser Can Also Read Cookies

It is not correct to say:

> "Only the backend can read cookies."

The browser can also manage/read cookies depending on cookie settings.

The important point for Express is:

> `cookie-parser` helps the backend process incoming cookies.

---

# 11. `app.use(cors())`

Example:

```js
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
```

### `origin`

```js
origin: process.env.CORS_ORIGIN
```

This specifies which frontend origin is allowed.

Example:

```text
http://localhost:3000
```

### `credentials: true`

This allows credentials such as cookies to be used in cross-origin requests when the browser and client request are configured appropriately.

---

# 12. `express.json()`

```js
app.use(express.json({ limit: "16kb" }));
```

It helps Express read incoming **JSON data**.

### Example

Frontend sends:

```json
{
    "name": "Roshni",
    "age": 22
}
```

Backend can access:

```js
req.body
```

For example:

```js
req.body.name
```

Output:

```text
Roshni
```

### Simple Definition

> `express.json()` is used to parse JSON request data.

### `16kb`

```js
limit: "16kb"
```

This sets the maximum allowed JSON request body size to 16 KB.

---

# 13. `express.urlencoded()`

```js
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
```

It helps Express read **URL-encoded/form data**.

Example:

```text
name=Roshni&age=22
```

Then we can access:

```js
req.body
```

### Simple Definition

> `express.urlencoded()` is used to parse URL-encoded form data.

### `extended: true`

It allows more complex/nested form data to be parsed.

---

# 14. `express.static()`

```js
app.use(express.static("public"));
```

This is used to serve **static files** from the `public` folder.

### Example Project

```text
project
│
├── public
│   ├── image.jpg
│   └── style.css
│
└── src
```

Express can serve files from the `public` folder.

### Simple Definition

> `express.static()` is used to serve static files such as images, CSS, and HTML files.

---

# 15. Complete Middleware Code

```js
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));

app.use(cookieParser());
```

---

# 16. What Does `app.use()` Mean?

`app.use()` is used to add middleware to the Express application.

Example:

```js
app.use(cookieParser());
```

Meaning:

> Use the cookie-parser middleware in this Express application.

Another example:

```js
app.use(express.json());
```

Meaning:

> Use the JSON parsing middleware.

---

# 17. All Middleware in One Table

| Middleware             | Main Use                                                    |
| ---------------------- | ----------------------------------------------------------- |
| `cors()`               | Allows frontend-backend communication for different origins |
| `express.json()`       | Reads JSON request data                                     |
| `express.urlencoded()` | Reads URL-encoded/form data                                 |
| `express.static()`     | Serves static files                                         |
| `cookieParser()`       | Processes incoming cookies                                  |

---

# 18. Complete Request Flow

```text
                    Browser
                       |
                       |
                    Request
                       |
        +--------------+--------------+
        |              |              |
        ↓              ↓              ↓
      CORS        JSON/Form        Cookie
        |              |              |
        |              |         cookie-parser
        |              |              |
        +--------------+--------------+
                       |
                       ↓
                    Route
                       |
                       ↓
                    Backend
                       |
                       ↓
                   Response
                       |
                       ↓
                    Browser
```

---

# 19. Cookie Example From Start to End

### Step 1: User logs in

```text
Browser
   ↓
Username + Password
   ↓
Backend
```

### Step 2: Backend verifies login

```text
Backend
   ↓
Login successful
```

### Step 3: Server can set a cookie

Example:

```text
token=ABC123
```

### Step 4: Browser stores the cookie

```text
Browser
🍪 token=ABC123
```

### Step 5: Browser makes another request

```text
Browser
   ↓
GET /profile
Cookie: token=ABC123
   ↓
Backend
```

### Step 6: cookie-parser processes the cookie

```text
Cookie
   ↓
cookie-parser
   ↓
req.cookies
```

Backend can access:

```js
req.cookies.token
```

Output:

```text
ABC123
```

---

# 20. Easy Real-Life Example

Imagine a college.

### Browser = Student

The student carries an ID card.

### Cookie = ID Card

```text
Name: Roshni
ID: 101
```

### Middleware = Security Check

The security check happens before entering the college.

### cookie-parser = Person who reads the ID card

```text
Student
   ↓
ID Card
   ↓
Cookie-parser
   ↓
Reads information
   ↓
Backend
```

---

# 21. Most Important Points to Remember

### CORS

> Allows frontend and backend communication when their origins are different.

### Cookie

> A small piece of information stored by the browser.

Example:

```text
user=Roshni
```

### Token

> A special string used for authentication/identification.

Example:

```text
ABC123XYZ
```

### Middleware

> A function that works between the request and the route/response.

### Cookie-Parser

> An Express middleware that processes incoming cookies so the backend can access them through `req.cookies`.

### Express JSON

> Parses JSON request data.

### Express URL Encoded

> Parses URL-encoded form data.

### Express Static

> Serves static files from a folder.

---

# 22. One-Line Interview Answers

**What is CORS?**

> CORS allows communication between frontend and backend when they have different origins.

**What is a cookie?**

> A cookie is a small piece of information stored by the browser.

**What is a token?**

> A token is a special string used to identify or authenticate a user.

**What is middleware?**

> Middleware is a function that works between a request and a route.

**What is cookie-parser?**

> Cookie-parser is an Express middleware used to process cookies from incoming requests.

**What is `express.json()`?**

> It is used to parse JSON request data.

**What is `express.urlencoded()`?**

> It is used to parse URL-encoded form data.

**What is `express.static()`?**

> It is used to serve static files.

---

# Quick Memory Trick

```text
CORS
↓
Frontend ↔ Backend

Cookie
↓
Browser information

Token
↓
User authentication/identification

Middleware
↓
Request ke beech mein kaam

cookie-parser
↓
Incoming cookies ko process/access

express.json()
↓
JSON read

express.urlencoded()
↓
Form data read

express.static()
↓
Public files serve
```
