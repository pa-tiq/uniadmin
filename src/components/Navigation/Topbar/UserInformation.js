import { useEffect, useState } from 'react';
import useComponentVisible from '../../../util/useComponentVisible';

const UserInformation = () => {
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
    <li
      ref={ref}
      className={`nav-item dropdown no-arrow ${show && 'show'}`}
      onClick={handleClick}
    >
      <a
        className='nav-link dropdown-toggle'
        href='#'
        id='userDropdown'
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded={show ? 'true' : 'false'}
      >
        <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
          Valerie Luna
        </span>
        <img
          className='img-profile rounded-circle'
          src='https://source.unsplash.com/QAB-WJcbgJk/60x60'
        />
      </a>
      {/* <!-- Dropdown - User Information --> */}
      <div
        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
          show && 'show'
        }`}
        aria-labelledby='userDropdown'
      >
        <a className='dropdown-item' href='#'>
          <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
          Profile
        </a>
        <a className='dropdown-item' href='#'>
          <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
          Settings
        </a>
        <a className='dropdown-item' href='#'>
          <i className='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>
          Activity Log
        </a>
        <div className='dropdown-divider'></div>
        <a
          className='dropdown-item'
          href='#'
          data-toggle='modal'
          data-target='#logoutModal'
        >
          <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
          Logout
        </a>
      </div>
    </li>
  );
};

export default UserInformation;
