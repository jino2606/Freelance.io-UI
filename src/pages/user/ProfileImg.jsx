import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../redux/slices/sessionSlice';
import { toast } from 'react-toastify';

function ProfileImg({setImgURL, imgURL, setProfileImg, setIsProfileEdit}) {
    // const [imgURL, setImgURL] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch()
    const userData = useSelector((state)=> state.sessionReducer)
    
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
                if (img.width < 300 || img.height < 400) {
                  toast.warning('Please upload an image with dimensions at least 400x400.');
                } else {
                // setSelectedFile(file);
                setImgURL(img.src);
                // dispatch(setCurrentUser({ ...userData, ProfileImg: file}));
                setProfileImg(file)
                }
            };
            img.src = e.target.result;
            
        };
        reader.readAsDataURL(file); 

        /* to set the form to edit mode. so this will enambel the save button */
        setIsProfileEdit(true)
    };

  return (

    
    <React.Fragment>
        <label for="profileImgInput" >
                    
            <i className="fa-solid fa-camera fs-2 text-white" style={{cursor: 'pointer'}}></i>

        </label>

        <input id='profileImgInput' type="file" accept="image/*" onChange={handleFileChange} hidden />
    </React.Fragment>
  )
}

export default ProfileImg
