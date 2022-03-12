const validate = (req, res, next) => {
  const { fullUrl } = req.body;

  const urlRegex = new RegExp(
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  );

  if (!fullUrl) {
    const err = new Error('Request payload should include full Url');
    err.status = 400;
    return next(err);
  }

  if (!urlRegex.test(fullUrl)) {
    const err = new Error('Full url is invalid');
    err.status = 400;
    return next(err);
  }

  return next();
};

export default validate;
