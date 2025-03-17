import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function MenuContainer ({menuActive, setMenuActive}) {
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  return menuActive &&
    <aside id="menu-container">
      <nav id="menu-nav">
        <ul className="menu-nav-list">
          {
            userInfo ?
              <></>
            :
              <>
                {
                  !pathMatchRoute('/login') && <li className="menu-nav-item" onClick={() => {
                    navigate('/login')
                    setMenuActive(!menuActive)
                  }}>Sign in</li>
                }
                {
                  !pathMatchRoute('/register') && <li className="menu-nav-item" onClick={() => {
                    navigate('/register')
                    setMenuActive(!menuActive)
                  }}>Sign up</li>
                }
              </>
          }
        </ul>
      </nav>
    </aside>
}

export default MenuContainer