import { useState } from "react";

const CollapseNavLink = ({outerName, innerName, icon, children}) => {

    const [collapsed, setCollapsed] = useState(true);
    
    const handleCollapse = () => {
        const newValue = !collapsed;
        setCollapsed(newValue);
    }

    return (
      <li
        className='nav-item'
        onClick={handleCollapse}
      >
        <a
          className={collapsed ? 'nav-link collapsed' : 'nav-link'}
          href='#'
          data-toggle='collapse'
          data-target='#collapseTwo'
          aria-controls='collapseTwo'
          aria-expanded={!collapsed}
        >
          <i className={icon ? `fas fa-fw fa-${icon}` : `fas fa-fw fa-cog`}></i>
          <span>{outerName}</span>
        </a>
        <div
          id='collapseTwo'
          className={collapsed ? 'collapse' : 'collapse show'}
          aria-labelledby='headingTwo'
          data-parent='#accordionSidebar'
        >
          <div className='bg-white py-2 collapse-inner rounded'>
            <h6 className='collapse-header'>{innerName}</h6>
            {children}
          </div>
        </div>
      </li>
    );

}

export default CollapseNavLink;