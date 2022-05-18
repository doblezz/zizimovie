const express = require('express');
const ir = express.Router();

ir.get('/', (req, res, next) => {
    res.render('index', {
        title: 'HOME',
    });
});

module.exports = ir;