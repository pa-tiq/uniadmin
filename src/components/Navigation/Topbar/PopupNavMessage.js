import { useState } from 'react';

// status = success, warning
// imgSrc:
// https://source.unsplash.com/fn_BT9fwg_E/60x60
// https://source.unsplash.com/AU4VPcFN4LE/60x60
// https://source.unsplash.com/CS2uCrpNzJY/60x60
// https://source.unsplash.com/Mv9hjnEUHR4/60x60
const PopupNavMessage = ({ status, imgSrc, message, remetent }) => {
  return (
    <a className='dropdown-item d-flex align-items-center' href='#'>
      <div className='dropdown-list-image mr-3'>
        <img
          className='rounded-circle'
          src={imgSrc}
          alt=''
        />
        <div
          className={
            status
              ? `status-indicator bg-${status}`
              : 'status-indicator'
          }
        ></div>
      </div>
      <div className='font-weight-bold'>
        <div className='text-truncate'>
          {message}
        </div>
        <div className='small text-gray-500'>{remetent}</div>
      </div>
    </a>
  );
};

export default PopupNavMessage;
