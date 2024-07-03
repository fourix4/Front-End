const Topbar: React.FC = () => {
  return (
    <>
      <header className='box-border flex items-center justify-between px-20 border-b h-topbar py-25 border-light-gray'>
        <div className='inline-block cursor-pointer text-24'>Catch Study</div>
        <div className='inline-block'>
          <button className='mr-20 bg-alarm button-icon'></button>
          <button className='bg-menu button-icon'></button>
        </div>
      </header>
    </>
  );
};

export default Topbar;
