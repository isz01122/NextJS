const express = require('express');
const router = express.Router();
const { getCollection } = require('../db');

router.post('/signin', async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const collection = getCollection();
  const result = await collection.findOne({ id });

  if (!result)
    return res.status(500).json({ message: '아이디를 확인해주세요.' });

  if (result.password !== password)
    return res.status(500).json({ message: '비밀번호를 확인해주세요.' });

  const user = { ...result };
  ['_id', 'password'].forEach((private) => delete user[private]);

  req.session.user = user;
  return res.status(200).json({ data: user, message: 'ok' });
});

router.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'error' });
    return res.status(200).json({ message: 'ok' });
  });
});

router.get('/session', async (req, res) => {
  const session = req.session.user;
  if (!session) return res.status(200).json({ login: false });
  return res.status(200).json({ login: true, user: { ...session } });
});

module.exports = router;
