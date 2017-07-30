let express = require('express');
let router = express.Router();

router.get('/hello', function (req, res) {
  res.send('Hello Medium.com3');
});

module.exports = router;