const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const Excel = require('../modals/excel');
const recordSchema = require('../modals/record');
const excelToJson = require('convert-excel-to-json');
// const upload=multer({dest:'uploads/'});
var fs = require('fs');
var counter = 0;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {


        cb(null, './uploads/');

    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({ storage: storage });



router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Excel.findById({ _id: id }).exec().then(result => {
        const path = result.datasheet;
        console.log(path);
        const ress = excelToJson({
            sourceFile: path,
            columnToKey: { '*': '{{columnHeader}}' },
            header: {
                rows: 1
            },
        });
        console.log(ress);
        res.status(200).json({ ress })
        // res.download("./"+path);
    }).catch()

})






router.post('/', upload.single('datasheet'), (req, res, next) => {
    console.log(req.body);
    if (req.file) {
        const exe = new Excel({
            _id: new mongoose.Types.ObjectId(),
            datasheet: req.file.path

        });

        console.log(exe);
        exe.save()
            .then(result => {
                console.log("result ", result)
                res.status(201).json({ message: 'user created', result })
            })
            .catch(err => { res.status(404).json({ error: err }) })
    }
    else {
        addData();
                var newManager=[];
                async function addData()
                {
                    arrayOE = JSON.parse(req.body.employes);
                    arrayOM = JSON.parse(req.body.managers);
                    for(const manager of arrayOM)
                    {
                        employee = new recordSchema({
                            _id: mongoose.Types.ObjectId(),
                            emp_code: manager.emp_code,
                            mng_code:'-',
                            firstName:manager.mngName,
                            lastName:manager.mngLastName,
                            email:manager.mngEmail,
                            status:manager.mngStatus
                        })
                        try
                        {
                            await employee.save()
                            .then((result)=>{
                                console.log('result:'+result)
                                newManager.push(result);  
                            })
                            .catch((err)=>{res.status(400).json({error:err})})
                        }
                        catch(error)
                        {
                            console.log(error);
                        }
                    }
                
                    for(const man of newManager)
                    {   
                        for(const emp of arrayOE)
                        {
                            if(man.emp_code === emp.mng_code)
                            {
                                
                                employee = new recordSchema({  
                                    emp_code: mongoose.Types.ObjectId(),
                                    mng_code:  man._id,
                                    firstName: emp.empName,
                                    lastName: emp.empLastName,
                                    email:  emp.empEmail,
                                    status: emp.empStatus
                                })
                                try
                                {
                                    console.log('employee:'+employee);
                                    await employee.save()
                                    .then((result) => {
                                        
                                    })
                                    .catch((error) => res.status(404).json({error: error}))
                                }
                                catch(error)
                                {
                                    console.log(error);
                                }
                            }
                        }   
                    }  
                }
                res.status(200).json({message:"Successfully !"})

    }

});





router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Excel.findById({ _id: id }).exec().then((res) => {
        console.log(res)
        let path = res.datasheet;
        fs.unlink(path, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
    }).catch();
    Excel.deleteOne({ _id: id }).exec().then((result) => {
        console.log(result)
    },
        (err) => console.log(err)).catch()

})


module.exports = router;