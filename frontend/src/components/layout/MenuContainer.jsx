import PropTypes from 'prop-types'

import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import AlertContext from '../../context/alert/AlertContext'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearCredentials } from '../../slices/authSlice'

function MenuContainer ({menuActive, setMenuActive}) {
  const { userInfo } = useSelector((state) => state.auth)
  const { setAlertActive } = useContext(AlertContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [logout] = useLogoutMutation()
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      setMenuActive(!menuActive)
      navigate('/')
    } catch (error) {
      setAlertActive(`Log out failed - ${error.data.message}`, 'error')
    }
  }
  return menuActive &&
    <aside id="menu-container">
      <nav id="menu-nav">
        <ul className="menu-nav-list">
          {
            userInfo ?
              <>
                {
                  !pathMatchRoute('/profile') && <li className="menu-nav-item" onClick={() => navigate('/profile')}>{userInfo.name}</li>
                }
                <li className="menu-nav-item" onClick={() => logoutHandler()}>Logout</li>
              </>
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

MenuContainer.propTypes = {
  menuActive: PropTypes.bool.isRequired,
  setMenuActive: PropTypes.func.isRequired
}

export default MenuContainer