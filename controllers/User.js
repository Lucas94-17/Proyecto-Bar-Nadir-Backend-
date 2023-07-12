const User = require("../models/User")
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

//lo que hace esto es una páginación de los usuarios , con el método get
async function getUsersPaginated(req,res){
    const {size,page} =req.query // acá recibe lo que viene de la query , y obtenemos el size y page , es decir , el tamaño de elementos a ser devueltos y la cantidad de paginas

    const skip = size * page - size

    try{
        const data = await UserModel.find()
        .limit(size)
        .skip(skip)
        .then(response =>{
            const excludePassword = response.map(user => {
                const {id,name,email} = user
                return(id,name,email)
            })
            return excludePassword
        })
        const count = await UserModel.countDocuments()
        res.status(200).json({
            data,
            total:count,
        })
    }catch(error){
        res.status(400).json({ message : error.message })
    }
}


//lo que hace ésta función es eliminar el usuario , el método deleteone
async function deleteUser(req,res){
    try{
        const {id} =req.params
        UserModel.deleteOne({id}).then(response => {
            if (response.deletedCount){
                res.status(200).json({
                    message:`El documento con ${id} fue borrado existosamente`,
                })
            }else{
                res.status(200).json({
                    message:`No se ha encontrado el documento : ${id}`,
                })
            }
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

async function updateUser(req,res){
    try {
        const {id,name} = req.body

        await UserModel.findOneAndUpdate({id} , {name}).then( // la funcion findOneAndUpdate actualiza un único documento , dependiendo de las claves que se les otorga 
            response => {
                if(response.id){
                    res.status(200).json({
                        message:`El documento con id ${response.id} ue editado exitosamente`,
                        data : res.body
                    })
                }else{
                    res.status(200).json({
                        message:`No se ha encontrado el documento`,
                    })
                }
            }
        )
    }catch (error){
        res.status(400).json({ message: error.message})
    }
}

//Ésta funcion lee un usuario , con la funcion findeone , encuentra la primera igualdad segun el id que le pasamos de la request
async function readUser(req,res){
    try {
        const {id} = req.params

        UserModel.findOne({id}).then(response =>
            res.status(200).json(response)
        )
    }catch (error){
        res.status(400).json({ message : error.message })
    }
}

async function readUsers(req,res){
    if(Object.keys(req,query).length === 0) getUsers(req,res)
    else getUsersPaginated(req,res)
}

module.exports = {
    deleteUser,
    readUser,
    readUsers,
    updateUser,
}