const UserModel = require("../models/User")

// Para ver los usuarios , con el metodo get usamos la siguiente funcion asincrona
//esto envía directamente los datos que hay guardamos en la base de datos , por eso no hay request , es decir, no hay nada de parte del front
async function getUsers(_,res){
    try{
        await UserModel.find().then(response => {
            const excludePassword = response.map(user=>{ // aca excluimos el password de la request get 
                const {id,userName,email} = user
                return {id,userName,email}
            })
            res.status(200).json(excludePassword)
        })
        
    }catch (error){
        res.status(400).json({message:error.message})
    }
}