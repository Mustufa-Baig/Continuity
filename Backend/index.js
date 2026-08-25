const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../Frontend/dist')))
app.use(express.json())

let entries = []

app.get('/api/entries', (request, response) => {
  response.json(entries)
})

app.post('/api/entries', (request, response) => {
  const body = request.body

  const entry = {
    title: body.title,
    content: body.content,
    id: String(entries.length + 1),
    timestamp: new Date().toLocaleString(),
  }

  entries = [entry, ...entries]

  response.status(201).json(entry)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
