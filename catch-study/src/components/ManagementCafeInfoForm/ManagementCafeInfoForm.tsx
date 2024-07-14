import React from 'react';
import {
  FormDataTypes,
  RoomInfoTypes,
  UsageFeeTypes,
} from '../../types/management';

interface ManagementCafeInfoFormPropsTypes {
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNestedInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    setData: React.Dispatch<React.SetStateAction<FormDataTypes>>,
  ) => void;
  usageFees: UsageFeeTypes[];
  handleAddFee: () => void;
  handleRemoveFee: (index: number) => void;
  handleFeeChange: (
    index: number,
    field: keyof UsageFeeTypes,
    value: string,
  ) => void;
  roomInfos: RoomInfoTypes[];
  handleAddRoom: () => void;
  handleRemoveRoom: (index: number) => void;
  handleRoomChange: (
    index: number,
    field: keyof RoomInfoTypes,
    value: string,
  ) => void;
  handleRoomNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
}

const ManagementCafeInfoForm: React.FC<ManagementCafeInfoFormPropsTypes> = ({
  formData,
  setFormData,
  handleEditSubmit,
  handleInputChange,
  handleNestedInputChange,
  usageFees,
  handleAddFee,
  handleRemoveFee,
  handleFeeChange,
  roomInfos,
  handleAddRoom,
  handleRemoveRoom,
  handleRoomChange,
  handleRoomNameChange,
}) => {
  return (
    <form
      onSubmit={handleEditSubmit}
      className='relative w-full p-20 border-2 rounded-sm border-light-gray bg-bright-gray'
    >
      <h1 className='mb-10 font-bold text-20'>스터디 카페 정보</h1>

      <button
        type='submit'
        className='absolute p-6 text-white bg-blue text-14 top-10 right-10 rounded-default'
      >
        수정완료
      </button>

      <div className='flex flex-col items-start gap-30 md:flex-row'>
        <div className='flex-1 w-full pt-10 border-t-2 md:border-0 border-light-gray'>
          <div className='mb-4'>
            <h2 className='font-semibold text-17'>이름</h2>
            <input
              name='cafe_name'
              placeholder='스터디 카페 이름'
              value={formData.cafe_name}
              onChange={handleInputChange}
              className='w-full p-4'
            />
          </div>
          <div className='mb-4'>
            <h2 className='font-semibold text-17'>주소</h2>
            <div className='w-full'>
              <input
                name='city'
                placeholder='도시'
                value={formData.address.city}
                onChange={e =>
                  handleNestedInputChange(e, 'address', setFormData)
                }
                className='w-1/3 p-4'
              />
              <input
                name='country'
                placeholder='구'
                value={formData.address.country}
                onChange={e =>
                  handleNestedInputChange(e, 'address', setFormData)
                }
                className='w-1/3 p-4'
              />
              <input
                name='town'
                placeholder='동'
                value={formData.address.town}
                onChange={e =>
                  handleNestedInputChange(e, 'address', setFormData)
                }
                className='w-1/3 p-4'
              />
            </div>
            <input
              name='etc'
              placeholder='기타 주소'
              value={formData.address.etc}
              onChange={e => handleNestedInputChange(e, 'address', setFormData)}
              className='w-full p-4'
            />
          </div>
          <div className='mb-4'>
            <h2 className='font-semibold text-17'>시간</h2>
            <div className='flex items-center justify-center gap-10'>
              <input
                name='opening_hours'
                placeholder='영업시간 (10:00)'
                value={formData.opening_hours}
                onChange={handleInputChange}
                className='w-full p-4'
              />
              <div>~</div>
              <input
                name='closed_hours'
                placeholder='마감시간 (23:00)'
                value={formData.closed_hours}
                onChange={handleInputChange}
                className='w-full p-4'
              />
            </div>
            <input
              name='closed_day'
              placeholder='휴무일 (없음)'
              value={formData.closed_day}
              onChange={handleInputChange}
              className='w-full p-4 mt-10'
            />
          </div>
        </div>

        <div className='flex-1 w-full pt-10 border-t-2 md:border-0 border-light-gray'>
          <h2 className='font-semibold text-17'>좌석 수</h2>
          <div className='mb-4'>
            <input
              name='seats'
              type='number'
              value={formData.seats}
              onChange={handleInputChange}
              className='w-full p-4'
            />
          </div>
          <h2 className='font-semibold text-17'>가격</h2>
          <div className='mb-4'>
            <div className='flex flex-col gap-10'>
              {usageFees.map((fee, index) => (
                <div
                  key={index}
                  className='flex items-center justify-start w-full gap-10'
                >
                  <div className='flex items-center justify-start w-full gap-10'>
                    <input
                      type='string'
                      value={fee.hours}
                      onChange={e =>
                        handleFeeChange(index, 'hours', e.target.value)
                      }
                      className='w-full p-4'
                    />
                    <div className='whitespace-nowrap'>시간</div>
                    <input
                      type='string'
                      value={fee.price}
                      onChange={e =>
                        handleFeeChange(index, 'price', e.target.value)
                      }
                      className='w-full p-4'
                    />
                    <div className='whitespace-nowrap'>원</div>
                  </div>
                  <button
                    type='button'
                    onClick={() => handleRemoveFee(index)}
                    className='w-24 h-24 bg-center bg-no-repeat bg-close'
                  ></button>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-center w-full p-10'>
              <button
                type='button'
                onClick={handleAddFee}
                className='w-24 h-24 bg-white bg-center bg-no-repeat border-2 rounded-full bg-add border-light-gray'
              ></button>
            </div>
          </div>
        </div>

        <div className='flex-1 w-full pt-10 border-t-2 md:border-0 border-light-gray'>
          <h2 className='font-semibold text-17'>스터디룸 정보</h2>
          {roomInfos.length === 0 ? (
            <div>
              <p>스터디룸 없음</p>
            </div>
          ) : (
            <div className='flex flex-col gap-20'>
              {roomInfos.map((room, index) => (
                <div
                  key={index}
                  className='flex items-center justify-start w-full gap-10'
                >
                  <div className='flex flex-col gap-10'>
                    <div className='flex items-center justify-start w-full gap-10'>
                      <input
                        name='name'
                        placeholder='이름'
                        value={room.name}
                        onChange={e => handleRoomNameChange(e, index)}
                        className='w-full p-4'
                      />
                      <div className='whitespace-nowrap'>스터디룸</div>
                      <input
                        type='text'
                        value={room.capacity}
                        onChange={e =>
                          handleRoomChange(index, 'capacity', e.target.value)
                        }
                        className='w-full p-4'
                      />
                      <div className='whitespace-nowrap'>인실</div>
                    </div>
                    <div className='flex items-center justify-center w-full gap-10'>
                      <div className='whitespace-nowrap'>시간당</div>
                      <input
                        type='text'
                        value={room.price}
                        onChange={e =>
                          handleRoomChange(index, 'price', e.target.value)
                        }
                        className='w-full p-4'
                      />
                      <div className='whitespace-nowrap'>원</div>
                    </div>
                  </div>

                  <button
                    type='button'
                    onClick={() => handleRemoveRoom(index)}
                    className='w-24 h-24 bg-center bg-no-repeat bg-close'
                  ></button>
                </div>
              ))}
            </div>
          )}
          <div className='flex items-center justify-center w-full p-10'>
            <button
              type='button'
              onClick={handleAddRoom}
              className='w-24 h-24 bg-white bg-center bg-no-repeat border-2 rounded-full bg-add border-light-gray'
            ></button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ManagementCafeInfoForm;
