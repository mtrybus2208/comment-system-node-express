const logAndSendMessage = (req, res, err, responseInformation) => {
  return res.status(responseInformation.status).json({
    msg: responseInformation.message,
    err,
  })
};

export default logAndSendMessage;
