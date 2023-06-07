import { useState } from 'react';

const CardDropdown = ({ title, children }) => {

const [show, setShow] = useState(false);

const handleClick = () => {
    const newValue = !show;
    setShow(newValue);
} 


  return (
    <div className='card shadow mb-4' onClick={handleClick}>
      {/* <!-- Card Header - Dropdown --> */}
      <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
        <h6 className='m-0 font-weight-bold text-primary'>
          {title}
        </h6>
        <div className='dropdown no-arrow'>
          <a
            className='dropdown-toggle'
            href='#'
            role='button'
            id='dropdownMenuLink'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded={show? 'true' : 'false'}
          >
            <i className='fas fa-ellipsis-v fa-sm fa-fw text-gray-400'></i>
          </a>
          <div
            className='dropdown-menu dropdown-menu-right shadow animated--fade-in'
            aria-labelledby='dropdownMenuLink'
          >
            <div className='dropdown-header'>Dropdown Header:</div>
            <a className='dropdown-item' href='#'>
              Action
            </a>
            <a className='dropdown-item' href='#'>
              Another action
            </a>
            <div className='dropdown-divider'></div>
            <a className='dropdown-item' href='#'>
              Something else here
            </a>
          </div>
        </div>
      </div>
      {/* <!-- Card Body --> */}
      <div className='card-body'>{this.props.children}</div>
    </div>
  );

}

export default CardDropdown;