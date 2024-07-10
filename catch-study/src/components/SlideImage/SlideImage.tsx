import { useEffect, useState } from 'react';

interface SlideImagePropTypes {
  images: string[];
}

const SlideImage: React.FC<SlideImagePropTypes> = ({ images }) => {
  const [imageList] = useState([
    images[images.length - 1],
    ...images,
    images[0],
  ]);
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const prevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrentImgIndex(prev => prev - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const nextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCurrentImgIndex(prev => prev + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  useEffect(() => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imageList.length - 2);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-${imageList.length - 2}00%)`,
          transition: '0ms',
        });
      }, 500);
    }

    if (currentImgIndex >= imageList.length - 1) {
      setCurrentImgIndex(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${1}00%)`,
          transition: '0ms',
        });
      }, 500);
    }
  }, [currentImgIndex, imageList.length]);

  return (
    <>
      <div className='relative mb-20'>
        <div className='overflow-hidden bg-black w-400 h-150 m-middle'>
          <div className='flex' style={style}>
            {imageList.map((image, i) => (
              <img
                key={i}
                src={image}
                className='object-contain min-w-[400px] h-150 '
              />
            ))}
          </div>
        </div>

        <div className='absolute flex justify-between w-full top-1/2 translate-y-[-50%]'>
          <button
            className='button-icon bg-image-arrow-left'
            onClick={prevClick}
          ></button>
          <button
            className='button-icon bg-image-arrow-right'
            onClick={nextClick}
          ></button>
        </div>
      </div>
    </>
  );
};

export default SlideImage;
