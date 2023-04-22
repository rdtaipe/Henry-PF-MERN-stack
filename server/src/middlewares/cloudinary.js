import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

  // Configuration 
  cloudinary.config({
  cloud_name: "da8rw7yta",
  api_key: "192596445858892",
  api_secret: "sWzup0QfmhPqrgI0ANoImNFlB0U"
});

  
    const uuid = uuidv4(); //uuid para manejar nombre de imageens aleatorios
    //console.log(uuid);
    //el filename tiene el uuid 
    let filename = uuid; //la extension se la agrega solo cloudinary
      
  async function uploadCloudinary(file)
  {
    let cloud = await cloudinary.uploader.upload(file.path, 
    { //uploas seria la carpeta donde se guardara todo lo que subimos de products
    folder: 'products',
     public_id: filename,
     //transformation maneja la imagen , tamaño calidad y recorte
      transformation: [
        { width:500, height:500, crop: "limit",quality:"auto"  }
      ]
    });
   return cloud;
}

 export default uploadCloudinary;