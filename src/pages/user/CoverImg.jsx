import React, { useState } from 'react'
import coverPlaceholder from '../../assets/images/user/coverImgPlaceholder.jpg'
import { toast } from 'react-toastify';

function CoverImg() {

    const [imgURL, setImgURL] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = (event) => {
        
        const file = event.target.files[0];
      
        if (!file) {
          toast.warning('Please upload an image file (JPEG, PNG, or GIF).');
          return;
        }

        console.log("filee", file);

        if (file) {
          // File type validation
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!allowedTypes.includes(file.type)) {
            toast.warning('Please upload a valid image file (JPEG, PNG, or GIF).');
            return;
          }
        } else {
          toast.warning('Please upload a image file (JPEG, PNG, or GIF).');
          return
        }


        // File size limit (in bytes)
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
          toast.warning('Please upload an image with a size less than 5MB.');
        return;
        }

        // Image dimensions validation (using FileReader)
        const reader = new FileReader();
        reader.onload = (e) => {
          
            const img = new Image();
            img.onload = function () {
                if (img.width < 800 || img.height < 270) {
                  toast.warning('Please upload an image with dimensions at least 800x600.');
                } else {
                // setSelectedFile(file);
                setImgURL(img.src);
                }
            };
            img.src = e.target.result;
            
        };
        reader.readAsDataURL(file);        
    };

  return (
    <React.Fragment>
        <div className='position-absolute start-50 translate-middle p-0' style={{top: '25%'}}>
            <label for="fileInput" className="bg-light px-3 py-2 rounded-5">
                <i className="fa-solid fa-arrow-up-from-bracket me-2"></i>
                Upload New Cover
            </label>
            <input id='fileInput' type="file" accept="image/*" onChange={handleFileChange} hidden />
        </div>
        {/* object-position-center */}
        <img className='w-100 h-100 object-fit-cover ' style={{objectPosition: 'center'}} src={imgURL?imgURL:coverPlaceholder} alt="No Image" />
    </React.Fragment>
  )
}

export default CoverImg
