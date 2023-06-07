import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import CollapseNavLink from './CollapseNavLink';
import { toggleMenu } from '../../../redux/menuOpenSlice';


const Sidebar = () => {

  const [cookie, setCookie] = useCookies(['menuWide']);
  const { menuWide } = cookie;
  const { menuOpen:toggled } = useSelector(state => state.menu);

  const dispatch = useDispatch();

  useEffect(()=>{
    setCookie('menuWide', toggled, { path: '/' , sameSite:'lax'});
  },[toggled]);

  useLayoutEffect(() => {
    if(`${toggled}` !== menuWide){
      dispatch(toggleMenu());
    }
  }, [menuWide]);


  return (
    <ul
      className={
        menuWide === 'false'
          ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'
          : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
      }
      id='accordionSidebar'
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className='sidebar-brand d-flex align-items-center justify-content-center'
        href='index.html'
      >
        <div className='sidebar-brand-icon rotate-n-15'>
          <i className='fas fa-laugh-wink'></i>
        </div>
        <div className='sidebar-brand-text mx-3'>
          SB Admin <sup>2</sup>
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr className='sidebar-divider my-0' />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className='nav-item'>
        <Link className='nav-link' to='/dashboard'>
          <i className='fas fa-fw fa-tachometer-alt'></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className='sidebar-divider' />

      {/* <!-- Heading --> */}
      <div className='sidebar-heading'>Interface</div>

      <CollapseNavLink outerName={'Components'} innerName={'Custom Components'}>
        <a className='collapse-item' href='buttons.html'>
          Buttons
        </a>
        <Link className='collapse-item' to='/cards'>
          Cards
        </Link>
      </CollapseNavLink>

      <CollapseNavLink
        outerName={'Utilities'}
        innerName={'Custom Utilities'}
        icon={'wrench'}
      >
        <a className='collapse-item' href='utilities-color.html'>
          Colors
        </a>
        <a className='collapse-item' href='utilities-border.html'>
          Borders
        </a>
        <a className='collapse-item' href='utilities-animation.html'>
          Animations
        </a>
        <a className='collapse-item' href='utilities-other.html'>
          Porra
        </a>
      </CollapseNavLink>

      {/* <!-- Divider --> */}
      <hr className='sidebar-divider' />

      {/* <!-- Heading --> */}
      <div className='sidebar-heading'>Addons</div>

      {/* <!-- Nav Item - Charts --> */}
      <li className='nav-item'>
        <Link className='nav-link' to='/charts'>
          <i className='fas fa-fw fa-chart-area'></i>
          <span>Charts</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Tables --> */}
      <li className='nav-item'>
        <a className='nav-link' href='tables.html'>
          <i className='fas fa-fw fa-table'></i>
          <span>Tables</span>
        </a>
      </li>

      {/* <!-- Divider --> */}
      <hr className='sidebar-divider d-none d-md-block' />

      {/* <!-- Sidebar Toggler (Sidebar) --> */}
      <div className='text-center d-none d-md-inline'>
        <button
          onClick={() => {
            dispatch(toggleMenu());
          }}
          className='rounded-circle border-0'
          id='sidebarToggle'
        ></button>
      </div>
    </ul>
  );
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ clickMenuOpen }, dispatch);

// const mapStateToProps = store => ({
//   toggled: store.menuState.menuOpen
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default Sidebar;