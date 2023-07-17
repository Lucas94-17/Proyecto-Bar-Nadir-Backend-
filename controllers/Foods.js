const uuid = require("uuid")

const FoodModel = require("../models/Food")
const UserModel=require("../models/User")
const {text} = require("express")

async function readFoods(_,res){
    try{
        await CourseModel.find().then(response =>
            res.status(200).json(response)
        )
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

async function createFood(req,res){
    const{title,img,detail,price,category,creator_id} = req.body

    try{
        UserModel.findOne({id : creator_id}).then(response =>{
            if(response?.role === "admin"){
                const data = new FoodModel({
                    id : uuid.v4(),
                    title,
                    img,
                    detail,
                    price,
                    category,
                })
                data.save()
                res.status(201).json({
                    success:true,
                    data: req.body,
                })
            }else{
                res.sendStatus(403)
            }
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

async function deleteFood(req,res){
    const {id} = req.params

    try{
        FoodModel.deleteOne({id}).then(response => {
            if(response.deletedCount){
                res.status(200).json({
                    message: `El curso con ${id} fue borrado exitosamente.`,
                })
            }else{
                res.status(200).json({
                    message:`No se ha encontrado el curso : ${id}`,
                })
            }
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
}


async function updateFood(req,res){
    const {id_food , modify} = req.body

    try{
        FoodModel.finOneAndUpdate({ id : id_food}, modify).then(
            response =>{
                if(response.id){
                    res.status(200).json({
                        message: `El curso con id ${response.id} fue editado exitosamente.`,
                        data : res.body,
                    })
                }
            }
        )
    }catch (error){
        res.status(400).json({message:error.message})
    }
}

async function searchFoods(req,res){
    const {q} = req.query
    try{
        await FoodModel.find(
            {
                $text : {$search :q},
            },
            {
                score : {$meta : "textScore"}
            },
        )
        .sort({
            score : {$meta :"textScore"},
        })
        .then(response =>{
            res.status(200).json({data:response})
        })
    }catch{
        res.status(400).json({message:error.message})
    }
}

module.exports = {
    readFoods,
	createFood,
	deleteFood,
	updateFood,
	searchFoods,
}
