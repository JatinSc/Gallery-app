const express = require('express')
const mongoose = require('mongoose')
const Gallery = require('../models/galleryModel')
const galleryRouter = express.Router()

//for adding pics
galleryRouter.post('/newPost', async(req,res)=>{
    const {labels , url} = req.body

    if (!labels || !url)
    return res
      .status(400)
      .json({ error: 'please enter all the required fields' })
    
      try{
        const newPic = new Gallery({labels,url})
        const result = await newPic.save()
        const newData = await Gallery.find()

        return res.status(201).json({
            myPics : newData.reverse()
        })
        }catch(error){
            return  res.status(404).json({
                message : error.message
            })
        }
    })

    // for getting all saved pics
    galleryRouter.get('/pics', async(req,res)=>{
        try {
            const pics = await Gallery.find()
            return res.status(200).json({
                data : pics.reverse()
            })
        } catch (error) {
            return  res.status(404).json({
                message:error.message
            }) 
        }
    })

    //for deleting a pic
    galleryRouter.delete('/delete:id', async(req,res)=>{
        const {id} = req.params
        try {
           const result = await Gallery.deleteOne({_id:id})
           const newData = await Gallery.find()

           return res.status(200).json({
            myPics : newData.reverse()
           })
           
        } catch (error) {
            return res.status(404).json({
                message:error.message
            })
        }
    })


module.exports = galleryRouter