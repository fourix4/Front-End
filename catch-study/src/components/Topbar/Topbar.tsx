const Topbar: React.FC = () => {
  return (
    <>
      <header className='flex w-max h-topbar py-25 px-20 box-border justify-between items-center'>
        <div className='inline-block text-24 cursor-pointer'>Catch Study</div>
        <div className='inline-block'>
          <button className='bg-alarm button-icon  mr-20'></button>
          <button className='bg-menu button-icon'></button>
        </div>
      </header>
    </>
  );
};

export default Topbar;
