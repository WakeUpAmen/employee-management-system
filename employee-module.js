'use strict';
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema   = new Schema({
    name: {
        type:String,
        default: ""
    },
    title: {
        type:String,
        default:""
    },
    sex: {
        type:String,
        default:""
    },
    startDate: {
        type:Date,
        default: Date.now,
    },
    officePhone: {
        type:String,
        default:""
    },
    cellPhone: {
        type:String,
        default:""
    },
    SMS: {
        type:String,
        // required: true,
        default:""
    },
    email: {
        type:String,
        // required: true,
        default:""
    },
    picture: {
        type:String,
        default:""
    },
    children: {
        type: [String],
        default: []
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: false,
        default: null
    },
    managerName: {
        type:String,
        default:null
    },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
