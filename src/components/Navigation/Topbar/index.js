import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';
import PopupNav from './PopupNav';
import PopupNavItem from './PopupNavItem'
import PopupNavMessage from './PopupNavMessage'
import UserInformation from './UserInformation';

const Topbar = ({ clickMenuOpen }) => {

  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      {/* <!-- Sidebar Toggle (Topbar) --> */}
      <button
        onClick={() => {
          clickMenuOpen();
        }}
        id='sidebarToggleTop'
        className='btn btn-link d-md-none rounded-circle mr-3'
      >
        <i className='fa fa-bars'></i>
      </button>

      {/* <!-- Topbar Search --> */}
      <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control bg-light border-0 small'
            placeholder='Search for...'
            aria-label='Search'
            aria-describedby='basic-addon2'
          />
          <div className='input-group-append'>
            <button className='btn btn-primary' type='button'>
              <i className='fas fa-search fa-sm'></i>
            </button>
          </div>
        </div>
      </form>

      {/* <!-- Topbar Navbar --> */}
      <ul className='navbar-nav ml-auto'>
        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
        <li className='nav-item dropdown no-arrow d-sm-none'>
          <a
            className='nav-link dropdown-toggle'
            href='#'
            id='searchDropdown'
            role='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='fas fa-search fa-fw'></i>
          </a>
          {/* <!-- Dropdown - Messages --> */}
          <div
            className='dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in'
            aria-labelledby='searchDropdown'
          >
            <form className='form-inline mr-auto w-100 navbar-search'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control bg-light border-0 small'
                  placeholder='Search for...'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                />
                <div className='input-group-append'>
                  <button className='btn btn-primary' type='button'>
                    <i className='fas fa-search fa-sm'></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <PopupNav name='Alertas' counter='3+' icon='bell'>
          <PopupNavItem
            color='primary'
            date='December 12, 2019'
            text='A new monthly report is ready to download!'
            textBold={true}
          />
          <PopupNavItem
            color='success'
            icon='fa-donate'
            date='December 7, 2019'
            text='$290.29 has been deposited into your account!'
            textBold={false}
          />
          <PopupNavItem
            color='warning'
            icon='fa-exclamation-triangle'
            date='December 2, 2019'
            text={`Spending Alert: We've noticed unusually high spending for your
              account.`}
            textBold={false}
          />
        </PopupNav>

        <PopupNav name='Messages' counter='7' icon='envelope'>
          <PopupNavMessage
            status='success'
            imgSrc='https://source.unsplash.com/fn_BT9fwg_E/60x60'
            message={`Hi there! I am wondering if you can help me with a problem
                  I've been having.`}
            remetent={`Emily Fowler · 58m`}
          />
          <PopupNavMessage
            status=''
            imgSrc='https://source.unsplash.com/AU4VPcFN4LE/60x60'
            message={`I have the photos that you ordered last month, how would you
                  like them sent to you?`}
            remetent={`Jae Chun · 1d`}
          />
          <PopupNavMessage
            status='warning'
            imgSrc='https://source.unsplash.com/CS2uCrpNzJY/60x60'
            message={`Last month's report looks great, I am very happy with the
                  progress so far, keep up the good work!`}
            remetent={`Morgan Alvarez · 2d`}
          />
        </PopupNav>

        <div className='topbar-divider d-none d-sm-block'></div>

        <UserInformation/>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = (store) => ({
  toggled: store.menuState.menuOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
