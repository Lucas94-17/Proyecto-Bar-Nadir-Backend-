const UserModel = require("../models/User")


async function getUsers(_,res){
    try{
        await UserModel.find().then(response => {
            const excludePassword = response.map(user=>{ 
                const {id,username,email} = user
                return {id,username,email}
            })
            res.status(200).json(excludePassword)
        })
        
    }catch (error){
        res.status(400).json({message:error.message})
    }
}


async function getUsersPaginated(req,res){
    const {size,page} =req.query 

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
        const { id_user, modify }  = req.body

        await UserModel.findOneAndUpdate({ id: id_user } , modify).then(
            response => {
                if(response.id){
                    res.status(200).json({
                        message:`El documento con id ${response.id} se editadó exitosamente`,
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


async function readUsers(_, res) {
	try {
		await UserModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
    deleteUser,
    readUser,
    readUsers,
    updateUser,
}