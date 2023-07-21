//Acá haremos las autenticaciones para cuando el usuario se regitre y cuando inice sesion

// aca se importa la funcion jsonwebtoken que nos sirve para el token una vez iniciada la sesion
const jwt = require("jsonwebtoken")
//Importamos bcrypt , que funciona para encriptar las passwords
const bcrypt= require("bcrypt") 
//importamos uuid , que funciona para generar un id
const uuid = require("uuid")

const UserModel = require ("../models/User")

function login(req,res) {
    const {email, password} = req.body

    UserModel.findOne({email}).then(async response =>{
        if(response?.id){
            const isMatch = await bcrypt.compare(
                password,
                response.password
            )
            if (isMatch) {
                jwt.sign(
                    {
                        user:{
                            role:response.role,
                            id:response.id,
                        },
                    },
                    process.env.SECRET,
                    {
                        expiresIn:"5h"
                    },
                    (err,token)=>{
                        if(err)res.sendStatus(403)
                        else{
                            res.status(200).json({
                                token,
                                user:{
                                    email:response.email,
                                    id:response.id,
                                    name:response.name,
                                    role:response.role
                                },
                            })
                        }
                    }
                )
            }else{
                res.status(401).json({
                    message: "Invalid credentials",
                })
            }
        }else{
            res.status(401).json({
                message:"Invalid credentials"
            })
        }
    })
}

async function register  (req,res) {
    try{
        const {username,password,email} =req.body // aca trae el body y lo guarda en un array

        const salt = bcrypt.genSaltSync(10) // inicializamos bcrypt y usamos la funcion genSaltSync para determinar de cuantos caracteres será nuestra password
        const hash = await bcrypt.hash(password,salt)//inicializamos de nuevo bcrypt pero con la funcion hash , le damos los parametros y guardamos todo en la variable hash

        const data = new UserModel({
            id : uuid.v4(),
            username,
            password : hash,
            email,
            role : "client",
        })
        data.save()
        res.status(201).json({create : true})
    }catch(error){
        res.status(400).json({
            message : error.message
        })
    }
}

module.exports = {
    login,
    register
}