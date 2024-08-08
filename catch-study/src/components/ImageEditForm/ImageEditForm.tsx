import { ChangeEvent } from 'react';

interface ImageEditFormProps {
  titleImage: string | null;
  multipleImages: string[];
  handleThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStoreImagesChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageEditForm: React.FC<ImageEditFormProps> = ({
  titleImage,
  multipleImages,
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
        {titleImage && (
          <div className='mt-4'>
            <p className='text-sm font-medium'>기존 썸네일 사진:</p>
            <img
              src={titleImage}
              alt='Thumbnail Preview'
              referrerPolicy='no-referrer'
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
          onChange={e => handleStoreImagesChange(e)}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-light-gray'
        />
        {multipleImages.length > 0 && (
          <div className='mt-4'>
            <p className='text-sm font-medium'>기존 매장 사진:</p>
            <div className='flex flex-wrap max-w-full gap-2 mt-2'>
              {multipleImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Store Preview ${index + 1}`}
                  referrerPolicy='no-referrer'
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

export default ImageEditForm;
