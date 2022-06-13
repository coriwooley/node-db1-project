const router = require('express').Router()
const Accounts  = require('./accounts-model')
const {
  checkAccountPayload, 
  checkAccountNameUnique,
  checkAccountId} =
require('./accounts-middleware')


router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.json(req.account)
  next()
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async(req, res, next) => {
  try {
    const newAcc = await Accounts.create({
      name: req.body.name.trim(), 
      budget: req.body.budget
    })
    res.status(201).json(newAcc)
  } catch(err){
    next(err)
  }
})

router.put('/:id', 
checkAccountId, 
checkAccountPayload, 
checkAccountNameUnique, 
async (req, res, next) => {
  try {
    const post = await Accounts.updateById(req.params.id, req.body)
    res.status(200).json(post)
  } catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message
  })
  next()
})

module.exports = router;
