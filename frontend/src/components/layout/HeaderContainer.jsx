import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import MenuBtn from '../MenuBtn'

function HeaderContainer ({menuActive, setMenuActive}) {
  return (
    <header id="header-container">
      <nav id="main-nav">
        <Link to='/'>
          <span className="logo"><em>OK</em>auth</span>
        </Link>
        <ul className="main-nav-list"></ul>
        <MenuBtn menuActive={menuActive} setMenuActive={setMenuActive} />
      </nav>
    </header>
  )
}

export default HeaderContainer