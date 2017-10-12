var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET Drive Data listing. */
router.get('/', function(req, res, next) {
  var driveDataArr = [];
  fs.readdir('../trips', (err, fileNames) => {
    fileNames.forEach(file => {
      let contents = fs.readFileSync(`../trips/${file}`, 'utf8');
      let driveData = JSON.parse(contents);
      driveData.coords.forEach(obj => driveDataArr.push([obj.lng, obj.lat]));
    });
    res.send(driveDataArr);
  });
});

module.exports = router;
