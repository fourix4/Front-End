const Topbar: React.FC = () => {
  return (
    <>
      <header className='flex w-max h-topbar py-25 px-20 box-border justify-between items-center'>
        <div className='inline-block text-24 cursor-pointer'>Catch Study</div>
        <div className='inline-block'>
          <button className='bg-alarm w-28 h-28 bg-no-repeat bg-center mr-20 '></button>
          <button className='bg-menu w-28 h-28 bg-no-repeat bg-center'></button>
        </div>
      </header>
    </>
  );
};

export default Topbar;
