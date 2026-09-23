const errorHandler = (error, request, response, next) => {

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: 'Validation failed',
      details: Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      })),
    })
  }

  console.error(error)
  response.status(500).json({
    error: 'Internal server error',
  })
}

module.exports = { errorHandler }