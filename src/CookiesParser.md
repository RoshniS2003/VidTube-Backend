## 🍪 Cookie ko simple rakho

Cookie ke andar information ho sakti hai:

> user = Roshni

Browser mein ye cookie saved hai.

Jab browser backend ko request bhejta hai, cookie request ke saath ja sakti hai:

```
Browser
   ↓
Request + 🍪 user=Roshni
   ↓
Backend
```

Ab backend ko cookie ki information use karni hai.

### Yahan cookie-parser help karta hai:

```
Browser
   ↓
🍪 user=Roshni
   ↓
cookie-parser
   ↓
req.cookies
   ↓
Backend
```

#### For example:

> console.log(req.cookies.user);

#### Output:

> Roshni

### ❗ Bas ek correction

Ye mat bolo:

> ❌ “Cookie ko only backend read kar sakta hai.”

Actually browser bhi cookie ko store/read kar sakta hai, aur server bhi cookie ko receive kar sakta hai.

Tumhare Node/Express backend mein cookie-parser incoming cookies ko process karke req.cookies ke through access karne mein help karta hai.

>🧠 Tumhare words mein:

Cookie ek information hoti hai, jaise user=Roshni. Browser is cookie ko save karta hai aur request ke saath server ko bhej sakta hai. Backend mein cookie-parser us incoming cookie ko process karta hai, jisse hum req.cookies se information access kar sakte hain.

# Express Middleware

## 1. `express.json()`

```js
app.use(express.json({ limit: "16kb" }))
```

### What is it?

`express.json()` is used to **read JSON data** sent by the frontend/client to the backend.

### Example

Frontend sends:

```json
{
  "name": "Roshni",
  "age": 22
}
```

Backend can read this data using:

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

> `express.json()` = JSON data read karne ke liye.

### What is `16kb`?

```js
limit: "16kb"
```

It means the maximum JSON request body size is **16 KB**.

---

## 2. `express.urlencoded()`

```js
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
```

### What is it?

`express.urlencoded()` is used to **read form data** sent to the backend.

### Example

A form can send data like:

```text
name=Roshni&age=22
```

Backend can access this data using:

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

> `express.urlencoded()` = form data read karne ke liye.

### What is `extended: true`?

```js
extended: true
```

It allows Express to handle more complex or nested form data.

### What is `16kb`?

```js
limit: "16kb"
```

It sets the maximum request body size to **16 KB**.

---

## 3. `express.static()`

```js
app.use(express.static("public"))
```

### What is it?

`express.static()` is used to **serve files from the `public` folder**.

### Example Folder Structure

```text
project/
│
├── public/
│   ├── image.jpg
│   ├── style.css
│   └── index.html
│
└── src/
```

The files inside the `public` folder can be served to the browser.

### Simple Definition

> `express.static("public")` = public folder ki files browser ko serve karne ke liye.

---

# Quick Revision

| Middleware                 | Use                                |
| -------------------------- | ---------------------------------- |
| `express.json()`           | JSON data read karna               |
| `express.urlencoded()`     | Form data read karna               |
| `express.static("public")` | Public folder ki files serve karna |

## Easy Memory Trick

```text
JSON       → Data read
URLencoded → Form data read
Static     → Files serve
```

## Complete Code

```js
app.use(express.json({ limit: "16kb" }))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
```
# `express.static()` and "Serve" Meaning

## What does "Serve" mean?

In simple words:

> **Serve = Browser ko file ya data provide/send karna.**

---

## Example

Suppose our project has:

```text
project/
│
├── public/
│   ├── image.jpg
│   ├── style.css
│   └── index.html
│
└── src/
```

And in `app.js` we write:

```js
app.use(express.static("public"))
```

This tells Express:

> **"Public folder ki files ko browser ko provide kar sakte ho."**

---

## How does it work?

Suppose the browser wants:

```text
image.jpg
```

The flow is:

```text
Browser
   ↓
"I need image.jpg"
   ↓
Express Server
   ↓
public/image.jpg
   ↓
Browser ko file mil gayi
```

So, **serve** means:

```text
Server → Browser
        File/Data provide karna
```

---

## Simple Example

If we have:

```text
public/
   └── image.jpg
```

Then:

```js
app.use(express.static("public"))
```

allows Express to serve the file from the `public` folder.

---

## Easy Definition

> `express.static("public")` is used to serve files from the `public` folder to the browser.

---

## What is "Static File"?

Static files are files that are directly provided to the browser.

Examples:

* Images
* CSS files
* HTML files
* JavaScript files
* Fonts

Example:

```text
public/
├── image.jpg
├── style.css
├── index.html
└── script.js
```

---

## Quick Memory Trick

```text
Serve = Provide / Send

express.static("public")
        ↓
Public folder ki files
        ↓
Browser ko provide
```

### One Line

> **Serve ka simple meaning hai: server se browser ko file ya data provide karna.**


# `express.json()` vs `express.urlencoded()`

Dono middleware ka kaam **request ke data ko read karke `req.body` mein available karana** hai.

The main difference is the **format of the data** coming from the client/frontend.

---

## 1. `express.json()`

```js
app.use(express.json())
```

### What does it do?

`express.json()` is used to read **JSON format data**.

### Example

Frontend sends:

```json
{
  "name": "Roshni",
  "age": 22
}
```

Backend can read:

```js
req.body.name
req.body.age
```

Output:

```text
Roshni
22
```

### Simple Definition

> `express.json()` = JSON data ko read karne ke liye.

---

## 2. `express.urlencoded()`

```js
app.use(express.urlencoded({ extended: true }))
```

### What does it do?

`express.urlencoded()` is used to read **URL-encoded form data**.

### Example

Form data can be sent like:

```text
name=Roshni&age=22
```

Backend can read:

```js
req.body.name
req.body.age
```

Output:

```text
Roshni
22
```

### Simple Definition

> `express.urlencoded()` = URL-encoded form data ko read karne ke liye.

---

# Main Difference

| Feature         | `express.json()`    | `express.urlencoded()` |
| --------------- | ------------------- | ---------------------- |
| Data format     | JSON                | URL-encoded form       |
| Example         | `{"name":"Roshni"}` | `name=Roshni&age=22`   |
| Data access     | `req.body`          | `req.body`             |
| `req.body.name` | ✅                   | ✅                      |
| Common use      | REST APIs           | HTML/Form data         |

---

# Why is `req.body` Same?

This is the important point.

Both middleware convert the incoming data into an object that Express makes available through:

```js
req.body
```

So:

### JSON

```text
JSON data
    ↓
express.json()
    ↓
req.body
    ↓
req.body.name
```

### URL-encoded Form

```text
Form data
    ↓
express.urlencoded()
    ↓
req.body
    ↓
req.body.name
```

---

# Easy Example

Suppose we want to send:

```text
Name = Roshni
Age = 22
```

### JSON format

```json
{
  "name": "Roshni",
  "age": 22
}
```

Use:

```js
app.use(express.json())
```

Then:

```js
req.body.name
```

gives:

```text
Roshni
```

---

### Form URL-encoded format

```text
name=Roshni&age=22
```

Use:

```js
app.use(express.urlencoded({ extended: true }))
```

Then:

```js
req.body.name
```

gives:

```text
Roshni
```

---

# Easy Memory Trick

```text
JSON
 ↓
express.json()
 ↓
req.body


FORM
 ↓
express.urlencoded()
 ↓
req.body
```

## One-Line Difference

> **`express.json()` reads JSON data, while `express.urlencoded()` reads URL-encoded form data.**

### Remember

**Same `req.body`, different incoming data format.**
