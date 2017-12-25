'use strict'

var express = require('express');
var conector = require('../controller/conector-controller');
var api = express.Router();

//urls

//8001a1
api.post('/4lkWRXB9rSceWnW4AU2IJ2VqrFJHrD5ok8FrPNbwTBEls8WMTk1NzeMvEfwkxWpyrInS',conector.authenticate);
api.post('/MgTP8PVv0tYpR8vJnurxazrYtcRGZILETUl8xhrJsHsf0KTHXfCjsZRc8e0PeLlOMsb6',conector.peticion)
module.exports=api;