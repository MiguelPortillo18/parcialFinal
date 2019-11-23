var express = require('express');
var router = express.Router();
var languageController = require('../controllers/languageController')

/* GET users listing. */
router.get('/:languageName', languageController.getOne);
router.get('/', languageController.getAll);

router.post('/',languageController.register);
router.put('/:languageName', languageController.update);
router.delete('/:languageName',languageController.delete);

module.exports = router;