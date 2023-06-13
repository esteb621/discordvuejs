const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const app = require('../config/firebase.config');
const { response } = require("express");
const storage = getStorage(app);
const db = require("../models");
const Users = db.Users;


exports.uploadImage = async (req, res) => {

  if (!req.body.id || !req.file) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const id = req.body.id;
  const image = req.file;
  const metadata = {
    contentType: 'image/jpeg',
  };
  const storageRef = ref(storage, `public/${id}`);
  await uploadBytes(storageRef, image.buffer,metadata)
  .then(async ()=> {
    const downloadURL = await getDownloadURL(storageRef);
    Users.update({picture:downloadURL}, {
      where: { id: id}
    })
    res.status(200).json({ downloadURL });
    console.log("Photo de profil uploadé!");
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'upload de l'image" });
  });
}

exports.getImage = async (req, res) => {
  const id  = req.params.id;
  await Users.findByPk(id,{attributes: ['picture'] })
  .then(data => {
    res.send(data); 
    return;
  })
  .catch(err => {
    res.status(404).send({
      message:
        err.message || "Aucune photo de profil correspondant a cet id="+id,
      picture: 
        "https://firebasestorage.googleapis.com/v0/b/discordjs-ded7c.appspot.com/o/public%2Fprofile-default.jpg?alt=media&token=694e0cd3-627d-4f6a-aa4b-597743c47439"
      });
    return;
  });
}

exports.deleteImage = async (req, res) => {
  const fileName = req.params.id;
  try {
    const fileRef = ref(storage, `public/${fileName}`);
    await deleteObject(fileRef);
    res.status(200).send('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send('Failed to delete file');
  }
};