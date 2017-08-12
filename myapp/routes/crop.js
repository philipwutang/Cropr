var express = require('express');
var router = express.Router();

/* GET cropper page. */
router.get('/', function(req, res, next) {
  res.render('crop');
});

module.exports = router;
