const isCompany = (req, res, next) => {
  if (req.user.role == "company") {
    return next();
  }
  res.status(401).send({ msg: "access denied" });
};
module.exports = isCompany;
