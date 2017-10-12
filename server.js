const express = require('express');
const dotenv = require('dotenv');
dotenv.load();

const app = express();

const port = process.env.PORT || 1337;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
