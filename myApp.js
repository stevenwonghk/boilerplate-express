let express = require('express');
let app = express();
let bodyParser = require('body-parser');


console.log('Hello World');
app.use(express.static(__dirname));
app.use(function(req, res, next) {
  let msg = req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(msg);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
  // 1） res.send('Hello Express');
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/json', function(req, res) {
  str =
    (process.env.MESSAGE_STYLE == 'uppercase') ?
      'HELLO JSON' :
      'Hello json';

  let data = {
    "message": str
  };
  return res.json(data);
});
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
},
  function(req, res) {
    let data = {
      time: req.time
    };
    return res.json(data);
  });
app.get('/:word/echo', function(req, res) {
  let data = {
    echo: req.params.word
  };
  return res.json(data);
});
app.route('/name')
  .get(function(req, res) {
    let data = {
      name: req.query.first + ' ' + req.query.last
    };
    return res.json(data);
  })
  .post(function(req, res) {
    let data = {
      name: req.body.first + ' ' + req.body.last
    };
    return res.json(data);
  });

module.exports = app;
