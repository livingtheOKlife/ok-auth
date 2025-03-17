import PropTypes from 'prop-types'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import MenuBtn from '../MenuBtn'
import { useSelector } from 'react-redux'

function HeaderContainer ({menuActive, setMenuActive}) {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <header id="header-container">
      <nav id="main-nav">
        <Link to='/'>
          <span className="logo"><em>OK</em>auth</span>
        </Link>
        <ul className="main-nav-list">
          {
            userInfo ?
              <></>
            : 
              <>
                {
                  !pathMatchRoute('/register') && <li className="main-nav-item" onClick={() => navigate('/register')}>Sign up</li>
                }
              </>
          }
        </ul>
        <MenuBtn menuActive={menuActive} setMenuActive={setMenuActive} />
      </nav>
    </header>
  )
}

export default HeaderContainer