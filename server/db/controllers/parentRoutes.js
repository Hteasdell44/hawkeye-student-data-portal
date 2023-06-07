const router = require('express').Router();
const auth = require('../../utils/auth');

const Parent = require('../../models/Parent');

router.post('/signup', async (req, res) => {

    const userExists = await Parent.findOne({ where: { email: req.body.email }});

      if (userExists) {
        console.log('A user with that email already exists!');
        return;
      }

      const newUser = await Parent.create({ ...req.body });
      const token = auth.signToken(newUser);
      res.send(token);
    
});

router.post('/', async (req, res) => {

  const userExists = await Parent.findOne({ where: { email: req.body.email }});

    if (!userExists) {
      console.log('No user found with that email!');
      return;
    }

    if (!userExists.checkPassword(req.body.password)) {
      console.log('Your password is incorrect!');
      return;
    }

    const token = auth.signToken(userExists);
    res.send(token);
  
});


module.exports = router;