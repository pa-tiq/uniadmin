import { useEffect, useState } from "react";
import useComponentVisible from "../../../util/useComponentVisible";

// icon = bell, envelope
const PopupNav = ({name, counter, icon, children}) => {

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    const [show, setShow] = useState(false);
    
    const handleClick = () => {
        const newValue = !show;
        if(newValue){
          setIsComponentVisible(true);
        }
        setShow(newValue);
    }

    useEffect(()=>{
      if(!isComponentVisible){
        setShow(false);
      }
    },[isComponentVisible]);


    return (
      <li
        ref={ref}
        onClick={handleClick}
        className={`nav-item dropdown no-arrow mx-1 ${show && 'show'}`}
      >
        <a
          className='nav-link dropdown-toggle'
          href='#'
          id='alertsDropdown'
          role='button'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded={show ? 'true' : 'false'}
        >
          <i className={icon ? `fas fa-${icon} fa-fw`: 'fas fa-bell fa-fw'}></i>
          {/* <!-- Counter - Alerts --> */}
          <span className='badge badge-danger badge-counter'>{counter}</span>
        </a>
        {/* <!-- Dropdown - Alerts --> */}
        <div
          className={`dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in ${
            show && 'show'
          }`}
          aria-labelledby='alertsDropdown'
        >
          <h6 className='dropdown-header'>{name}</h6>
          {children}
          <a className='dropdown-item text-center small text-gray-500' href='#'>
            Show All
          </a>
        </div>
      </li>
    );

}

export default PopupNav;