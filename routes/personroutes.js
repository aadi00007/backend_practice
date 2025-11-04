const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

router.post('/person' async(req,res)=>{
    try {
        
        const data = req.body;
        const newPerson = new Person(data);
        const respone = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).response('server error, couldnt save the data');
        
    }
})