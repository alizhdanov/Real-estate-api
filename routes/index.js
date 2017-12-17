const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer()
const { check, validationResult, oneOf } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const appartementController = require('../controllers/appartementController');
const contactController = require('../controllers/contactController')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/api/appartements', appartementController.getAppartements)

router.post('/api/contact', 
    upload.array(),
    [
        check('name')
            .trim()
            .isLength({min: 3}).withMessage('Minimum 3 characters'),
        oneOf([
            check('email').isEmail().withMessage('must be an email'),
            check('phone').isLength({min: 5}).withMessage('Phone should consist at least 5 characters')
        ]),
        check('message').isLength({min: 10}).withMessage('Message should have at least 10 characters')
    ],
    contactController.showFormErrors
)

module.exports = router