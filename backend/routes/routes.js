const express = require('express');
const { addProblem, addAnswer, getAllProblems } = require('../controller/addProblem');
const { signUp, login, verifyToken } = require('../controller/auth');
const { addNotes, getAllNotes } = require('../controller/files');

const Router = express.Router();

Router.post('/addproblem',addProblem);
Router.post('/addanswer',addAnswer);
Router.post('/signup',signUp);
Router.post('/login',login);
Router.post('/addnotes',verifyToken,addNotes)

Router.get('/getallproblem',getAllProblems);
Router.get('/getnotes',getAllNotes)

module.exports = Router