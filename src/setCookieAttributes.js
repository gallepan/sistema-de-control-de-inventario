function setCookieAttributes(req, res, next) {
  // Set SameSite and Secure attributes for all cookies
  res.setHeader('Set-Cookie', `SameSite=None; Secure`);

  next();
}

module.exports = setCookieAttributes;