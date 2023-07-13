const uuid = require("uuid")

const CourseModel = require("../models/Food")
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
            if(response?.id === "admin"){
                const data = new CourseModel({
                    id : uuid.v4(),
                    title,img,detail,price,category,
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

async function deleteCourse(req,res){
    const {id} = req.params
}