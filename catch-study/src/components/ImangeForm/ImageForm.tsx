import React, { ChangeEvent } from 'react';

interface ImageEditFormProps {
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStoreImagesChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageForm: React.FC<ImageEditFormProps> = ({
  handleThumbnailChange,
  handleStoreImagesChange,
}) => {
  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-col justify-start gap-10 mb-4'>
        <label className='block mb-2'>썸네일 사진 (선택)</label>
        <input
          type='file'
          onChange={e => handleThumbnailChange(e)}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-light-gray'
        />
      </div>
      <div className='flex flex-col justify-start gap-10 mb-4'>
        <label className='block mb-2'>매장 사진 (선택)</label>
        <input
          type='file'
          multiple
          onChange={e => handleStoreImagesChange(e)}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-light-gray'
        />
      </div>
    </div>
  );
};

export default ImageForm;
