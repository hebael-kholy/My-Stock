const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key :process.env.CLOUD_API_KEY,
    api_secret_key: process.env.CLOUD_API_KEY
    
})

exports.uploads=(file)=>{
    return new Promise(resolve=>{
        cloudinary.Uploader.upload(file,(result)=>{
            resolve({url:result.url,id:result.public_id})
        },{resource_type:"auto"})
    })
}