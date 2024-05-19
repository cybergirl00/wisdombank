'use client'
import { Trash,ImageUp } from 'lucide-react'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import Spinner from '@/components/Spinner'
import { useState } from "react"
import { storage } from '@/lib/firebase'
const ImageUploader = ({imageUrl,onFieldChange,setFiles}) => {
  const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
      setLoading(true);
        const selectedFile = e.target.files[0]; 
            const storageRef = ref(storage, `books/${selectedFile.name}`);
            const uploadTask = uploadBytes(storageRef, selectedFile);
            const snapshot = await uploadTask;
            const downloadURL = await getDownloadURL(snapshot.ref).then(
              setLoading(false)
            );
            setFiles(selectedFile)
            console.log(downloadURL)
            onFieldChange(downloadURL)
        //   setWrongImageType(false);
        //   setLoading(true);
      };
      if(loading) return <Spinner />
  return (
    <div className="flex items-center bg-gray-100  h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
           {!imageUrl ? (
              <label  className="flex h-full w-full flex-1 justify-center ">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <ImageUp />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
                <div className="flex flex-col items-center justify-center p-5">
                    <h2 className='text-3xl font-bold'>Study Material Uploaded</h2>
                </div>
            //   <div className="relative h-full">
            //     <img
            //       src={imageUrl}
            //       alt="uploaded-pic"
            //       className="h-full w-full"
            //     />
            //     <button
            //       type="button"
            //       className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
            //       onClick={() => onFieldChange(null)}
            //     >
            //       <Trash color={'#FF6C0A'}/>
            //     </button>
            //   </div>
            )}
    </div>
  )
}

export default ImageUploader