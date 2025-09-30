const jwt  = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
const jwt_secret = process.env.JWT_SECRET;
const users = [
    {id: 1,
        username: 'john',
        password: '1234'
    }

]
app.post('/login', (req,res)=>{
    const {username, password} = req.body;

    const user = users.find(u=> u.username === username && u.password === password);
    if(user){
        const toker = jwt.sign({id: user.id, username : user.username}, jwt_secret);
        res.json({token});
    }
        else{
            res.status(401).json({message: "user not found!"});
        }

    
});

app.get('/profile', (req,res)=>{
    const token  = req.headers.authorization;
    if(!token){
        return res.status(404).json({message : "token not provided"});
    }
    try {
        const decoded = jwt.verify(token, jwt_secret);
        res.json({message: `hello ${decoded.username}`, user: decoded})
        
    } catch (error) {
        res.status(401).json({message: 'invalid token'});
        
    }
})
