import React, { ChangeEvent, useState } from 'react';

const ImageForm: React.FC = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [storeImages, setStoreImages] = useState<File[]>([]);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleStoreImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStoreImages(Array.from(e.target.files));
    }
  };

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-col justify-start gap-10 mb-4'>
        <label className='block mb-2'>썸네일 사진 (선택)</label>
        <input
          type='file'
          onChange={handleThumbnailChange}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />

        {thumbnail && (
          <div className='mt-4'>
            <p className='text-sm font-medium'>미리보기:</p>
            <img
              src={URL.createObjectURL(thumbnail)}
              alt='Thumbnail Preview'
              className='object-cover w-64 h-64 mt-2 md:w-128 md:h-128'
            />
          </div>
        )}
      </div>
      <div className='flex flex-col justify-start gap-10 mb-4'>
        <label className='block mb-2'>매장 사진 (선택)</label>
        <input
          type='file'
          multiple
          onChange={handleStoreImagesChange}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />
        {storeImages.length > 0 && (
          <div className='mt-4'>
            <p className='text-sm font-medium'>미리보기:</p>
            <div className='flex flex-wrap max-w-full gap-2 mt-2 max-w-'>
              {storeImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Store Preview ${index + 1}`}
                  className='object-cover w-64 h-64 md:w-128 md:h-128'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
