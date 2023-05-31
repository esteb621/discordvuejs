import axios from "./axiosInstance";


class PictureService {
    async uploadProfilePic(id,image){
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
          return response.data;
        })
        .catch(e => {
          return e.response.data.message;
        })
    }

  getProfilePicture(idUser) {
    return axios.get(`../picture/${idUser}`)
      .then(response => {
        return response.data.picture;
      })
      .catch(error => {
        return error.response.data.message;
      });
  }
}

export default new PictureService();