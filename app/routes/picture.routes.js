const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
  });
module.exports = app => {

    const picture = require('../controllers/picture.controller');

    var router = require("express").Router();
    // Route pour télécharger une image
    router.post('/upload', upload.single('picture'), picture.uploadImage);

    // Route pour accéder à une image
    router.get('/:id', picture.getImage);

    router.delete('/delete/:id',picture.deleteImage);
    
    module.exports = router
    app.use('/api/picture', router);
}