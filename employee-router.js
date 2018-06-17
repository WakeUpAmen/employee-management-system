'use strict';
// import express from 'express';
const express    = require('express');       
const routerEmployees = express.Router();

const Employee     = require('./employee-module');

routerEmployees.get('/', (req, res) => {
    res.json({ message: 'welcome to employment api!' });
});

//post new employee
routerEmployees.post('/employees', (req, res) => {
    if(req.body.employee.manager !== null){
        Employee.create(req.body.employee,(err, createdEm)=>{
            if(err){
                res.status(500).json({error: err})
            }else{
                Employee.findById(req.body.employee.manager, (err, postEE) => {
                    if (err) {
                        res.status(500).json({error: err});
                    }else{
                        postEE.children.push(createdEm._id);
                        Employee.update({_id: req.body.employee.manager}, {$set:{children: postEE.children}}, (err, em) =>  {
                            if (err) {
                                res.status(500).json({ error: err });
                            }else{
                                res.status(200).json("created successed");
                            }
                        });
                    }
                });
            }
        });
    }else{
        Employee.create(req.body.employee,(err, employ)=>{
            if(err){
                res.status(500).json({error: err});
            }else{
                res.status(200).json("created successed");
            }
        })
    }    
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
            console.log(childrenID)
            let managerID = employee.manager;
            // console.log(managerID)
            Employee.find((err, employees)=>{
                if(err){
                    res.status(500).json({rror: err});
                }else{
                   res.status(200).json({
                       employee,
                       children: employees.filter(em =>childrenID.includes(String(em._id))),
                       manager: employees.filter(em => managerID == String(em._id))
                   })
                }
            })
        }
    });
});
// get children
routerEmployees.get('/employees/children/:id', (req, res) => {
    Employee.find({manager: req.params.id}, (err, employees) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            console.log(employees)
            res.status(200).json({employees})
        }
    });
});

//put 
routerEmployees.put('/employees/:_id', (req, res) => {
    //有没有改 manager，没改的话，直接update； 改了manager， 原manager的children少一个，现manager的children多一个
    Employee.findById(req.params._id, (err, ee) => {
        if (err) {
            res.status(500).json({error:err})
        }else{
            console.log("ee:"+ee)
            let tmp_id = String(ee._id);// cur Id
            let tmp_manager = ee.manager; // previous manager
            console.log("temp.manager:"+ tmp_manager);
            console.log("req.body.manager:"+ req.body.employee.manager)
            if(tmp_manager != req.body.employee.manager ){
                if(tmp_manager !== null && req.body.employee.manager=== null){
                    console.log("pre manager pop ")
                    Employee.findById(tmp_manager, (err, preManagerEmlopyee)=>{
                        if(err){
                            // console.log("pre manager pop  error")
                            res.status(500).json({error:err});
                        }else{
                            preManagerEmlopyee.children.pop(tmp_id);
                            Employee.update({_id: preManagerEmlopyee.id}, {$set: {children: preManagerEmlopyee.children}},(err, em)=>{
                                if (err) {
                                    res.status(500).json({ error: err });
                                }else{
                                    Employee.update({_id: req.params._id}, {$set: {manager: req.body.employee.manager, managerName: req.body.employee.managerName}}, (err, em)=>{
                                        if(err){
                                            res.status(500).json({err:err})
                                        }else{
                                            res.status(200).json("pre manager pop  success")
                                        }
                                    })
                                    // res.status(200).json("pre manager pop  success")
                                } 
                            })
                        }
                    })
                }else  if(req.body.employee.manager !== null && tmp_manager === null){
                    console.log("cur manager push ")
                    Employee.findById(req.body.employee.manager, (err, curManagerEmlopyee)=>{
                        if(err){
                            // console.log("cur manager push error")
                            res.status(500).json({error: err});
                        }else{
                            curManagerEmlopyee.children.push(ee._id);
                            // curManagerEmlopyee.save(err =>  {
                            Employee.update({_id: curManagerEmlopyee.id}, {$set: {children: curManagerEmlopyee.children}},(err, em)=>{
                                if (err) {
                                    res.status(500).json({ error: err});
                                } else{
                                    // res.status(200).json({ message: 'cur manager push success!' });
                                    // Employee.update(req.params.id, req.body.employee, (err, em)=>{
                                    Employee.update({_id: req.params._id}, {$set: {manager: req.body.employee.manager, managerName: req.body.employee.managerName}}, (err, em)=>{
                                        if(err){
                                            res.status(500).json({err:err})
                                        }else{
                                            res.status(200).json("cur manager pop  success")
                                        }
                                    })
                                }
                            })                                 
                        }
                    })
                }else if(req.body.employee.manager !== null && tmp_manager !== null){
                console.log("pre manager pop  and cur manager pop")

                    Employee.findById(tmp_manager, (err, preManagerEmlopyee)=>{
                        if(err){
                            console.log("pre manager pop  error 1")
                            res.status(500).json({error:err});
                        }else{
                            preManagerEmlopyee.children.pop(tmp_id);
                            // preManagerEmlopyee.save(err =>  {
                            Employee.update({_id: preManagerEmlopyee.id}, {$set: {children: preManagerEmlopyee.children}},(err, em)=>  {
                                if (err) {
                                    console.log("pre manager pop  error 2")
                                    res.status(500).json({ error: err });
                                }else{
                                    Employee.findById(req.body.employee.manager, (err, curManagerEmlopyee)=>{
                                        if(err){
                                            console.log("cur manager find error")
                                            res.status(500).json({error: err});
                                        }else{
                                            curManagerEmlopyee.children.push(ee._id);
                                            Employee.update({_id: curManagerEmlopyee.id}, {$set: {children: curManagerEmlopyee.children}},(err, em)=>{
                                                if (err) {
                                                    console.log("cur manager push error")
                                                    res.status(500).json({ error: err});
                                                } else{
                                                    Employee.update({_id: req.params._id}, {$set: {manager: req.body.employee.manager, managerName: req.body.employee.managerName}}, (err, em)=>{
                                                        if(err){
                                                            console.log("seft save error")
                                                            res.status(500).json({error:err})
                                                        }else{
                                                            res.status(200).json("pre and cur manager pop  success")
                                                        }
                                                    })
                                                }
                                            })                                 
                                        }
                                    })
                                } 
                            })
                        }
                    })
                }
            }else{
                console.log("manager not change, change img")
                console.log(req.body.employee)
                Employee.findByIdAndUpdate(req.params._id, req.body.employee,(err, em)=>{
                    if(err){
                        res.status(500).json({error: err});
                    }else{
                        res.status(200).json("put successed")
                    }
                })
            }
        } 
    });
});

routerEmployees.delete('/employees/:id', (req, res) => {
    Employee.findById(req.params.id, (err, employee)=>{
        if(err){
            res.status(500).json({error: err});
        }else{
            Employee.findById(employee.manager, (err, manager)=>{
                if(err){
                    res.status(500).json({error: err});
                }else{
                    manager.children.pop(req.params._id);
                    Employee.update({_id: employee.manager}, {$set: {children: manager.children}},(err, em)=>{
                        if(err){
                            res.status(500).json({error: err});
                        }else{
                            Employee.update({manager: req.params.id}, {$set: {manager: null, managerName: null}}, {multi: true}, (err, childrenEE)=>{
                                if(err){
                                    res.status(500).json({error:err});
                                }else{
                                    Employee.remove({_id:req.params.id}, (err, em)=>{
                                        if(err){
                                            res.status(500).json({error:err});
                                        }else{
                                            Employee.find((err, employees) => {
                                                if (err) {
                                                    res.status(500).json({ error: err });
                                                } else {
                                                    res.status(200).json(employees);
                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

routerEmployees.get('/employees/offsprings/:id', (req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            let childrenID = employee.children;
            Employee.find((err, employees)=>{
                if(err){
                    res.status(500).json({rror: err});
                }else{
                   res.status(200).json({
                        offsprings: employees,
                   })
                }
            })
        }
    });
});
module.exports = routerEmployees;


