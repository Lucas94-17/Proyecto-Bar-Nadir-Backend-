//aca creamos la funcion que verifica si el usuario logeado es admin

const verifyIsAdmin=(req,res,next) =>
    req.role === "admin"
    ? next()
    : res.status(403).json({message:"Invalid credentials"})

module.exports ={verifyIsAdmin}