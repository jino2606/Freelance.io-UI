import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';

function AddJobImage({formData, setFormData, imgURL, setImgURL}) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        
        const file = event.target.files[0];
        setFormData({...formData, jobImages:{...formData.jobImages, file: [...formData.jobImages.file, file] } });
      
        if (!file) {
          toast.warning('Please upload an image file (JPEG, PNG, or GIF).');
          return;
        }

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
        // const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        // if (file.size > maxSizeInBytes) {
        // alert('Please upload an image with a size less than 5MB.');
        // return;
        // }

        // Image dimensions validation (using FileReader)
        const reader = new FileReader();
        reader.onload = (e) => {
          
            const img = new Image();
            img.onload = function () {
                if (img.width < 400 || img.height < 300) {
                    toast.warning('Please upload an image with dimensions at least 800x600.');
                } else {
                // setSelectedFile(file);


                // Create a new array by spreading the existing jobSkills array and appending the inputText
                // const newJobImages = [...formData.jobImages.file, file];


                // Update the formData state with the new jobSkills array

                setFormData({...formData, jobImages:{...formData.jobImages, file: [...formData.jobImages.file, file], prevImgs: [...formData.jobImages.prevImgs, img.src]} });


                }
            };
            img.src = e.target.result;
            
        };
        reader.readAsDataURL(file);        
    };

    const handleRemove = (index)=>{
        console.log("innside the remove");

        // setFormData({...formData, jobImages: formData.jobImages.filter(item => item.name !== itemToRemove.name)})

        // Create a copy of the formData object
        const updatedFormData = { ...formData };

        // Remove the file and preview URL at the specified index
        updatedFormData.jobImages.file.splice(index, 1); 
        updatedFormData.jobImages.prevImgs.splice(index, 1);/* The splice(index, 1) operation removes one element from the array
                                                                starting at the specified index. In this case, it's used to remove
                                                                the file and preview URL at the given index from the jobImages.file
                                                                and jobImages.prevImgs arrays, respectively. */

        // Update the state with the modified formData
        setFormData(updatedFormData);
    }

    console.log("image Url", formData);

  return (
    <React.Fragment>

        <Col lg={5} className='p-5'>
            <h1>Add revelent images reflective of your project.</h1>

            <p>This increases the visibility of your job posting to attract the ideal candidates.</p>
        </Col>

        <Col lg={5} className='p-5 position-relative'>
            <Form.Label><h4>Add Images</h4></Form.Label>
            
            <Row className='p-3 rounded border border-1 w-100 overflow-y-scroll' style={{maxHeight: '20rem'}}>
                {
                    formData.jobImages.prevImgs.length>0 &&
                    formData.jobImages.prevImgs.map(( item, index) =>(
                        <Col sm={6} className='my-2 justify-content-center align-items-center'>
                            <div className='position-relative justify-content-center align-items-center'>
                                <img src={item} className='w-100 rounded-4 shadow' alt="Selected Image" style={{height: '85px', objectFit: 'cover'}} />
                                <span key={index} class="position-absolute btn top-0 start-100 translate-middle badge rounded-circle bg-light shadow" onClick={() => handleRemove(index)}><span class=""><i className="fa-solid fa-close text-dark"></i></span></span>
                            </div>
                        </Col>
                    ))

                }
            </Row>

            <div className='w-75 mx-auto'>
                <label for="fileInput" className="bg-light px-3 py-2 w-100 rounded-5 shadow text-center mt-4 border border-1">
                    Add Image
                    <i className="fa-solid fa-plus ms-2"></i>
                </label>
    
                <Form.Control id='fileInput' type="file" accept="image/*" onChange={handleFileChange} hidden/>
            </div>

        </Col>


        
    </React.Fragment>
  )
}

export default AddJobImage
