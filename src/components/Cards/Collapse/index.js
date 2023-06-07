import { useState } from 'react';

const CardCollapse = ({ title, children }) => {

const [show, setShow] = useState(false);

const handleClick = () => {
    const newValue = !show;
    setShow(newValue);
} 

  return (
    <div className='card shadow mb-4' onClick={handleClick}>
      {/* <!-- Card Header - Accordion --> */}
      <a
        href='#collapseCardExample'
        className={`d-block card-header py-3 ${!show && 'collapsed'}`}
        data-toggle='collapse'
        role='button'
        aria-expanded={show? 'true' : 'false'}
        aria-controls='collapseCardExample'
      >
        <h6 className='m-0 font-weight-bold text-primary'>
          {title ? title : 'Basic Card Example'}
        </h6>
      </a>
      {/* <!-- Card Content - Collapse --> */}
      <div className={`collapse ${show && 'show'}`} id='collapseCardExample'>
        <div className='card-body'>{children}</div>
      </div>
    </div>
  );
};

export default CardCollapse;
