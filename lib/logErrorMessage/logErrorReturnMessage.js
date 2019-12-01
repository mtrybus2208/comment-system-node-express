const logAndSendMessage = (req, res, err, responseInformation) => {
  console.log(err);
  return res.status(responseInformation.status).json({
    msg: responseInformation.message,
    err,
  })
};

export default logAndSendMessage;
