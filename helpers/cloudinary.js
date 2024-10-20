const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dc2rxchpe', 
    api_key: '578981829258414', 
    api_secret: 'EstMh1hgMhTB2st-JV5WUXjUA9k' // Click 'View API Keys' above to copy your API secret
});

exports.uploads = async(file) => {
    const uploadResult = await cloudinary.uploader
    .upload(file)
    return uploadResult
      console.log(uploadResult)
    // .catch((error) => {
    //     console.log(error);
    // });
}    

