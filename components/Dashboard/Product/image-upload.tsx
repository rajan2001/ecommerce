import { Button } from '@/components/ui/button';
import { ImageIcon, TrashIcon } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';

const ImageUpload = ({ onChange, onRemove, value, disabled }: any) => {
    return <div className='flex flex-col gap-y-4'>
        {value.map((url: any) => {
            return <div key={url} className='h-[200px] w-[200px] overflow-hidden rounded-lg relative'>
                <Button disabled={disabled} onClick={() => onRemove(url)} variant={"destructive"} size={"icon"} className=' absolute right-2 top-2'>
                    <TrashIcon className='h-4 w-4' />
                </Button>
                <CldImage
                    width="960"
                    height="600"
                    src={url}
                    sizes="100vw"
                    alt="Description of my image"
                />
            </div>
        })}


        <div className='flex items-center bg-slate-300 py-2 px-4 text-sm self-start rounded-lg'>
            <ImageIcon className=' h-4 w-4 mr-2' />
            <CldUploadWidget uploadPreset="ecommerce" onSuccess={(results: any) => {
                if (results) {
                    onChange(results.info.secure_url);
                }
            }}>
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    </div>
}


export default ImageUpload