import multer from "multer";

//store uploaded image temporarily im memory
const storage=multer.memoryStorage();

//configure multer
const upload=multer({
    storage,
    //Liit image size to 5mb
    limits:{
        fileSize:5*1024*1024
    },
    //allow only image file
    fileFilter:(req,file,callback)=>{
        if(file.mimetype.startsWith('image/')){
            callback(null,true)
        }else{
            callback(new Error("only image file are allowed"))
        }
    }
});
export default upload;