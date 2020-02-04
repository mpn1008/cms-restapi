let express = require('express');
let router = express.Router();
let courseModel = require('../model/course');
let {admin,trainer,trainee,course,enroll} = require('../connection')

router.get('/', function(req,res,next){
    course.findAll({
        include:[
            {
                model:trainer,
                required:true
            }
        ]
    }).then(function(data){
        res.json(data);
    })
});

router.get('/enrols', function(req,res,next){
    enroll.findAll({
        include:[
            {
                model:trainee,
                required:true,
            },
            {
                model:course,
                required:true
            }
        ]
    }).then(data => {
        res.json(data)
    })
});

router.get('/:Id',function(req,res,next){
    course.findByPk(req.params.Id,{
        include:[{
            model:trainer,
            required:true
        }]
    }).then(data => {
        res.json(data);
    })
})

router.put('/:Id',async function(req,res){
    const [ updated ] = await course.update(req.body, {
        where: { courseId:req.params.Id }
    });
    if (updated) {
        const updatedCourse = await course.findOne({ where: { courseId:req.params.Id } });
        return res.status(200).json(updatedCourse);
    }
});

router.post('/',function(req,res){
    course.create({
        courseId:req.body.courseId,
        courseName:req.body.courseName,
        trainer_Id:req.body.trainer_Id
    }).then(() => res.status(200).send({message:'Created new Course'}));
});

router.delete('/:Id',function(req,res){
    let id = req.params.Id;
    course.destroy({
        where:{
            courseId:id
        }
    }).then(() => res.send({message:'Deleted Course'}));
});


router.get('/enrols/:sId',function(req,res){
    enroll.findAll({
        where:{
            en_Id:req.params.sId
        },
        include:[
            {
                model:trainee,
                required:true,
            },
            {
                model:course,
                required:true,
                include:[{
                    model:trainer
                }]
            }
        ]
    }).then(data => {
        res.json(data)
    })
})

module.exports = router;