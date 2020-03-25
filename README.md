# Cargo-IO
Structured response object.

### 1. Use as in your Project
```js

const { Cargo } = require('cargo')

const cargo = new Cargo()
cargo.payload(somePayload)

```

### 2. Use as Express Middleware
```js
const cargo = require('cargo')

// mount on express app
app.use(cargo())

// access in your routes

const someRoute = (req, res, next) => {
    const somePaylaod = { 
        // add your data here ...
    }

    req.cargo
        .details({message:'some informative message!'})
        .payload(somePaylaod)

    res.status(200).json(req.cargo)
} 
// mount route on express app
app.use(someRoute)

```
