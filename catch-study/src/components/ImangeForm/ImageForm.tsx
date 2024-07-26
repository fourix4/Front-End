import React from 'react';
import useManagementInfo from '../../hooks/useManagementInfo';

const ImageForm: React.FC = () => {
  const {
    // thumbnail,
    // storeImages,
    handleThumbnailChange,
    handleStoreImagesChange,
  } = useManagementInfo();

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-col justify-start gap-10 mb-4'>
        <label className='block mb-2'>썸네일 사진 (선택)</label>
        <input
          type='file'
          onChange={e => handleThumbnailChange(e)}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-light-gray'
        />

        {/* {thumbnail && (
          <div className='mt-4'>
            <p className='text-sm font-medium'>미리보기:</p>
            <img
              src={URL.createObjectURL(thumbnail)}
              alt='Thumbnail Preview'
              className='object-cover w-64 h-64 mt-2 md:w-128 md:h-128'
            />
          </div>
        )} */}
      </div>
      <div className='flex flex-col justify-start gap-10 mb-4'>
        <label className='block mb-2'>매장 사진 (선택)</label>
        <input
          type='file'
          multiple
          onChange={e => handleStoreImagesChange(e)}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-light-gray'
        />
        {/* {storeImages.length > 0 && (
          <div className='mt-4'>
            <p className='text-sm font-medium'>미리보기:</p>
            <div className='flex flex-wrap max-w-full gap-2 mt-2'>
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
        )} */}
      </div>
    </div>
  );
};

export default ImageForm;
