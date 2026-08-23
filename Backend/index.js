const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let entries = []

app.get('/', (request, response) => {
  response.json(entries)
})

app.post('/entry', (request, response) => {
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

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
