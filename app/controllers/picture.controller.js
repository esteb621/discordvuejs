const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const app = require('../config/firebase.config');
const storage = getStorage(app);


exports.uploadImage = async (req, res) => {

  if (!req.body.id || !req.file) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const id = req.body.id;
  const image = req.file;
  console.log(id);
  const metadata = {
    contentType: 'image/jpeg',
  };
  const storageRef = ref(storage, `public/${id}`);
  try {
    await uploadBytes(storageRef, image.buffer,metadata);
    const downloadURL = await getDownloadURL(storageRef);
    res.status(200).json({ downloadURL });
    console.log("Photo de profil uploadé!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'upload de l'image" });
  }
}

exports.getImage = async (req, res) => {
  const { id } = req.params;

  const storageRef = ref(storage, `public/${id}`);

  try {
    const downloadURL = await getDownloadURL(storageRef);
    res.status(200).json({ downloadURL });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "L'image demandée est introuvable" });
  }
}