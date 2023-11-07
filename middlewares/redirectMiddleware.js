module.exports = (req, res, next) => {
  if (req.url === "/lugar") {
    console.log("Redirecionamento ativado, encaminhando para ceps");
    return res.redirect(301, "/ceps");
  }
  next();
};
