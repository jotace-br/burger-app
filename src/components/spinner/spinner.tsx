import './spinner.css';

export const Spinner = () => {
  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='loader'>
          <div className='spinner'></div>
        </div>
        <div className='loader'>
          <div className='spinner'></div>
        </div>
        <div className='loader'>
          <div className='spinner'></div>
        </div>
        <div className='loader'>
          <div className='spinner'></div>
        </div>
        <div className='loader'>
          <div className='spinner'></div>
        </div>
        <div className='loader'>
          <div className='spinner'></div>
        </div>
      </div>
    </div>
  );
};
