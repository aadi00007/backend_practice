const express = require('express');
const Person = require('./models/Person');

const app = express();
app.get('/', (req,res)=>{
    console.log("homepage");

})
app.get('/person/:worktype', async(req,res)=>{
    try {
        const worktype =  req.params.worktype;
        if(worktype=='developer' || worktype=='tester' || worktype=='sales mg'){
            const response = await Person.find({Profession: worktype});
            console.log('respone fetched');
            res.status(200).json(respone);

        }
        else{
            res.status(404).response('invalid worktype');
        }
    } catch (error) {
        console.log(err);
        res.status(500).response('some server error');
        
    }
})
app.listen(3000);