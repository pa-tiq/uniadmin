import { useState } from "react";

//color = primary, success, warning
//icon = fa-file-alt, fa-donate, fa-exclamation-triangle
const PopupNavItem = ({color, icon, date, text, textBold}) => {

    return (
      <a className='dropdown-item d-flex align-items-center' href='#'>
        <div className='mr-3'>
          <div
            className={
              color ? `icon-circle bg-${color}` : 'icon-circle bg-primary'
            }
          >
            <i
              className={
                icon
                  ? `fas ${icon} text-white`
                  : 'fas fa-file-alt text-white'
              }
            ></i>
          </div>
        </div>
        <div>
          <div className='small text-gray-500'>{date}</div>
          <span className={textBold ? 'font-weight-bold' : null}>{text}</span>
        </div>
      </a>
    );

};

export default PopupNavItem;