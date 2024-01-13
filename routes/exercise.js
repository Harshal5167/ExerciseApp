const express = require('express');
const router=express.Router()
const auth=require('../middleware/auth')
const {
    getExercises,
    addExercise,
    getExerciseById,
    deleteExercise,
    updateExercise
}=require('../controllers/exercise')

router.get('/',auth,getExercises)
router.post('/add',auth,addExercise)
router.delete('/:id',auth,deleteExercise)
router.patch('/:id',auth,updateExercise)
router.get('/:id',auth,getExerciseById)

module.exports=router
