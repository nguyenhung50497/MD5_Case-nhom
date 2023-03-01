export const userAuth = (req, res, next) => {
  console.log(4, req.decoded);
  
  if (req.decoded.role === "user") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
