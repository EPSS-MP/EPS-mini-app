const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();

const db = require('./models');
const {User} =require('./models')
// middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cors({origin:true}))

// example routes for  CRUD

        // create
        app.post('/insert', (req, res) => {
            User.create({
                firstName: 'firstName',
                lastName: 'trialname',
                email: 'trial2@gmail.com',
                password: 'trialPassword' 
            }).then((user) => {
                console.log(user);
                res.end('User added successfully');
            }).catch((err) => {
                console.log(err.message);
                res.status(500).end('Error adding user');
            });
        });
        
       //read
        app.get('/selectAll',(req,res)=>{
            User.findAll({where:{firstName:"test"}}).then(users=>{
                res.send(users)
            }).catch((err)=>{
                console.log(err.message)
            })
        })
        // update
        
        app.post('/update',(req,res)=>{
            User.update({firstName:"yourNewName"}).then((updatedData)=>{
                  console.log(updatedData)
                  res.end('user updated successful')
            }).catch((err)=>{
                console.log(err.message)
                res.end('update was not successful')
            })
        })
        // delete
        app.get("/deleteUser",(req,res)=>{
            User.destroy({where:{id:10}})
        })
        













db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
