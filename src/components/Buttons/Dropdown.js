import { useEffect, useState } from 'react';
import useComponentVisible from '../../util/useComponentVisible';

const Dropdown = ({ title, children }) => {

    const { ref, isComponentVisible, setIsComponentVisible } =
      useComponentVisible(true);

    const [show, setShow] = useState(false);

    const handleClick = () => {
      const newValue = !show;
      if (newValue) {
        setIsComponentVisible(true);
      }
      setShow(newValue);
    };

    useEffect(() => {
      if (!isComponentVisible) {
        setShow(false);
      }
    }, [isComponentVisible]);

  return (
    <div className='card dropdown' ref={ref}>
      <button
        onClick={handleClick}
        className='btn btn-secondary dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded={show ? 'true' : 'false'}
      >
        {title}
      </button>
      {show ? (
        <div
          className='dropdown-menu show'
          aria-labelledby='dropdownMenuButton'
          style={{
            position: 'absolute',
            transform: 'translate3d(0px, 37px, 0px)',
            top: '0px',
            left: '0px',
            willChange: 'transform',
          }}
          x-placement='bottom-start'
        >
          {children}
        </div>
      ) : (
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
