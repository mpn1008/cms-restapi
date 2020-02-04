let express = require('express');
let router = express.Router();
let {admin,trainer,trainee,course,enroll} = require('../connection')

router.get('/', function(req,res,next){
    trainee.findAll().then(function(data){
        res.json(data);
    })
});
router.get('/:Id',function(req,res){
    trainee.findByPk(req.params.Id).then(data => {
        res.json(data);
    });
});

router.put('/:Id',async function(req,res){
    const [ updated ] = await trainee.update(req.body, {
        where: { courseId:req.params.Id }
    });
    if (updated) {
        const updatedT = await trainee.findOne({ where: { traineeId:req.params.Id } });
        return res.status(200).json(updatedT);
    }
});

router.post('/',function(req,res){
    trainee.create({
        traineeId:req.body.traineeId,
        traineeName:req.body.traineeName,
        traineeEmail:req.body.traineeEmail
    }).then(() => res.status(200).send({message:'Created new student'}));
});

router.delete('/:Id',function(req,res){
    let id = req.params.Id;
    trainee.destroy({
        where:{
            traineeId:id
        }
    }).then(() => res.send({message:'Deleted Trainee'}));
});

module.exports = router;