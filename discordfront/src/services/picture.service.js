import axios from "./axiosInstance";


class PictureService {
    uploadProfilePic(id,image){
        const formData = new FormData();
        formData.append('picture',image);
        formData.append('id',id);
        return axios.post('../picture/upload',formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then(async response => {
          await axios.put("/update/users/"+id,{
            picture: response.data.downloadURL
          });
          console.log("photo de profil uploadé")
          return response.data;
        })
        .catch(e => {
          console.warn(e.response.data.message);
          return e.response.data.message;
        })
    }

  getProfilePicture(idUser) {
    return axios.get(`../picture/${idUser}`)
      .then(response => {
        return response.data.picture;
      })
      .catch(error => {
        console.warn(error.response.data.message);
        return error.response.data.message;
      });
  }
}

export default new PictureService();