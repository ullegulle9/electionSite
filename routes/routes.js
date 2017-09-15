var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', (req, res) => {
	res.render('results');
})

router.get('/report', (req, res) => {
	res.render('report');
})



router.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404 - Sidan hittades inte'
    });
})

module.exports = router;