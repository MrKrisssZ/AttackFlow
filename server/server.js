require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/userRoutes')
const reportRoutes = require('./routes/reportRoutes')
const fileRoutes = require('./routes/fileRoutes');
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
app.use('/api/files', fileRoutes);

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

// modules for OpehAI
const openai = require('openai')
const apiKey = process.env.OPENAI_API_KEY

app.post('/chatgpt', async (req, res) => {
  const prompt = req.body.prompt

  try {
    const response = await openai.Completion.create({
      engine: 'gpt-3.5-turbo',
      messages: [{
        'role': 'user',
        'content': prompt
      }],
      temperature: 0
    });
    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'An error occurred while processing your request. '});
  }
});

