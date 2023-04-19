
 import multer  from 'multer';
 import fs from 'fs';
let upload=null;
try {
    
 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images"); 
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
upload= multer({ storage: storage })

} catch (error) {
    console.log(error.message)
}

export default upload; 
 


//=======midle==============esta funcion es para eliminar la imagen del local  una vez subida===============================
 export  async function deleteImageLocal(req, res, next) {
    const rutaArchivo = req.file.path;
   await fs.unlink(rutaArchivo, function(err) {
      if (err) {
        console.error(err.message);
      }
      console.log(`image delet of local ->: ${rutaArchivo}`);
      next();
    });
  }






  


/* por buffer */
/*  import multer  from 'multer';



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


export default upload;
 */


//multer lo usamos para poder manejar mejor los datos de la imagen 
/* pot Storage */