const errors = {
  error404: (req, res) => {
    res.status(404).json({
    statusCode: 404,
    message: "Not Found"
    });
  },
  error400: (res) => {
      res.status(400).json({
      statusCode: 400,
      message: "Bad request"
    });
  },
  error500: (res, err) =>{
      res.status(500).json({
      statusCode: 500,
      message: "Server error",
      fullErrorMessage: err
  })
  }
}

module.exports = errors