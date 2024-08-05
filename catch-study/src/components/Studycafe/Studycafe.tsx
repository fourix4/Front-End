import { StudyCafeListTypes } from '../../types/interfaces';

interface StudycafePropTypes {
  studycafeClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    name: string,
  ) => void;
  studycafeList: StudyCafeListTypes[];
}

const Studycafe: React.FC<StudycafePropTypes> = ({
  studycafeClick,
  studycafeList,
}) => {
  return (
    <>
      {studycafeList.map((cafe, i) => (
        <div
          key={i}
          onClick={e => studycafeClick(e, cafe.cafe_id, cafe.cafe_name)}
          className='flex justify-center border-b cursor-pointer h-140 border-light-gray'
        >
          <div className='flex items-center w-full p-20 sm:w-smWeb lg:w-lgWeb'>
            <img
              className='mr-20 w-100 h-100'
              src={cafe.cafe_image}
              referrerPolicy='no-referrer'
            />
            <div>
              <div className='mb-10 text-16'>{cafe.cafe_name}</div>
              <div className='text-12'>{cafe.address}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Studycafe;
