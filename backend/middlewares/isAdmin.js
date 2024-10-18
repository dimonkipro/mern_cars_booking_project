const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        // console.log(req.user);
        
        return next()
      
    }
    res.status(401).send({msg: "access denied"})
}
module.exports=isAdmin