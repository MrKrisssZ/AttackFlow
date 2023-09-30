require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/userRoutes')
const reportRoutes = require('./routes/reportRoutes')
const annotationRoutes = require('./routes/annotationRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const mongoose = require('mongoose')

// routes
app.use('/api/users', userRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/annotations', annotationRoutes)

// connect to db
const mongo_uri = process.env.MONGO_URI
const port = process.env.PORT || 5001

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connection established")
    // listen for requests 
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
  .catch((error) => console.error("MongoDB connection failed:", error.message))