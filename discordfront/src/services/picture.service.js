import axios from "./axiosInstance";


class PictureService {
    uploadProfilePic(id,image){
        console.log(id)
        const formData = new FormData();
        formData.append('image',image);
        formData.append('id',id);
        return axios.post('../picture/upload',formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then(response => {
          return response.data;
        })
        .catch(e => {
          console.warn(e.response.data.message);
          return e.response.data.message;
        })
      }
}

export default new PictureService();