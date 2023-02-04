const multer = require ('multer')
const ApiError = require ('./apiError')

//we need to specify the folder to upload our images in
const fileStorage =multer.diskStorage({
    destination:'images',
    filename:(req,file,cb)=>{
        cb(null,file,originalname)
    }
})

//filtiration of images to allow only certain extensions

const fileFilter = (req,file,cb)=>{

    if(
        file.mimetype === 'images/png' ||
        file.mimetype === 'images/jpg' ||
        file.mimetype === 'images/jpeg'||
        file.mimetype === 'images/jfif'||
        file.mimetype === 'images/webP'
    )
    {
        cb(null,true)
    }
    else {
        cb(new ApiError(`invalid image type`,400),false)
    }
}

module.exports = multer({storage:fileStorage, fileFilter:fileFilter}).any();