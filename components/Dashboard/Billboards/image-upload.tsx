import { CldUploadWidget } from 'next-cloudinary';

const ImageUpload = () => {
    return <>
        <CldUploadWidget uploadPreset="ecommerce" >
            {({ open }) => {
                return (
                    <button onClick={() => open()}>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
    </>
}


export default ImageUpload