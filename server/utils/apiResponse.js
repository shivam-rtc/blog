// utils/apiResponse.js
exports.success = (res, data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };
  
  exports.error = (res, message = "Error", statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      status: "error",
      message,
      errors,
    });
  };
  