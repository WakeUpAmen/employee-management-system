'use strict';
const express    = require('express');        
const routerEmployees = express.Router();     

const Employee     = require('./employee-module');

routerEmployees.get('/', (req, res) => {
    res.json({ message: 'welcome to employment api!' });   
});

//post new employee
routerEmployees.post('/employees', (req, res) => {
    Employee.create(req.body.employee,(err, employ)=>{
        if(err){
            res.status(500).json({error: err})
        }else{
            if(employ.manager != null){
                Employee.findById(employ.manager, (err, postEE) => {
                    if (err) {
                        res.status(500).json({error: err});
                    }else{
                        postEE.children.push(employ._id);
                        postEE.save(err =>  {
                            if (err) {
                                res.status(500).json({ error: err });
                            }else{
                                res.status(200).json({ message: 'Memployee add child!' });
                            }
                        })
                    } 
                })
            }
        }
    })     
});
// get all employees
routerEmployees.get('/employees', (req, res) => {
    Employee.find((err, employees) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(employees);
        }
    });
});
// get one employee by Id
routerEmployees.get('/employees/:id', (req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            // console.log(employee._id)
            let childrenID = employee.children;
            // console.log(childrenID[0])
            let managerID = employee.manager;
            // console.log(managerID)
            Employee.find((err, employees)=>{
                if(err){
                    res.status(500).json({rror: err});
                }else{
                   res.status(200).json({
                       employee,
                       children: employees.filter(em =>childrenID.includes(em.id)),
                       manager: employees.filter(em => managerID == em.id)
                   })
                }
            })
        }
    });
});
//
routerEmployees.put('/employees/:_id', (req, res) => {
    //有没有改 manager，没改的话，直接update； 改了manager， 原manager的children少一个，现manager的children多一个
    Employee.findByIdAndUpdate(req.params._id, req.body.employee, (err, ee) => {
        if (err) {
            res.status(500).json({error:err})
        }else{
            let tmp_id = String(ee._id);// cur Id
            let tmp_manager = ee.manager; // previous manager
            if(tmp_manager !== req.body.employee.manager ){
                if(tmp_manager !== null){
                    console.log("pre manager pop ")
                    Employee.findById(tmp_manager, (err, preManagerEmlopyee)=>{
                        if(err){
                            // console.log("pre manager pop  error")
                            res.status(500).json({error:err});
                        }else{
                            preManagerEmlopyee.children.pop(tmp_id);
                            preManagerEmlopyee.save(err =>  {
                                if (err) {
                                    res.status(500).json({ error: err });
                                }else{
                                    res.status(200).json("pre manager pop  success")
                                } 
                            })
                        }
                    })
                } 
                if(req.body.employee.manager !== null){
                    console.log("cur manager push ")
                    Employee.findById(req.body.employee.manager, (err, curManagerEmlopyee)=>{
                        if(err){
                            // console.log("cur manager push error")
                            res.status(500).json({error: err});
                        }else{
                            curManagerEmlopyee.children.push(ee._id);
                            curManagerEmlopyee.save(err =>  {
                                if (err) {
                                    res.status(500).json({ error: err});
                                } else{
                                    res.status(200).json({ message: 'cur manager push success!' });
                                }
                            })                                 
                        }
                    })
                }
            }else{
                res.status(200).json("put successed")
            }
        } 
    });
});

routerEmployees.delete('/employees/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, employee)=>{
        if(err){
            res.status(500).json({error: err});
        }else{
            Employee.findById(employee.manager, (err, manager)=>{
                if(err){
                    res.status(500).json({error: err});
                }else{
                    console.log("manager:"+manager);
                    let index = manager.children.indexOf(req.params.id);
                    manager.children.splice(index, 1);
                    console.log("children:"+manager.children)
                    manager.save(err=>{
                        if(err){
                            res.status(500).json({error: err});
                        }else{
                            Employee.update(
                                {manager: req.params.id}, {$set: {manager: null}}, {multi: true}
                            , (err, childrenEE)=>{
                                if(err){
                                    res.status(500).json({error:err});
                                }else{
                                    res.status(200).json("delete suceessed");
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

module.exports = routerEmployees;


