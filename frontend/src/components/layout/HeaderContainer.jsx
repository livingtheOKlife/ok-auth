import PropTypes from 'prop-types'

import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import AlertContext from '../../context/alert/AlertContext'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { clearCredentials } from '../../slices/authSlice'

import MenuBtn from '../MenuBtn'

function HeaderContainer ({menuActive, setMenuActive}) {
  const { userInfo } = useSelector((state) => state.auth)
  const {setAlertActive} = useContext(AlertContext)
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
      navigate('/')
    } catch (error) {
      setAlertActive(`Log out failed - ${error.data.message}`, 'error')
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
              <>
                {
                  !pathMatchRoute('/profile') && <li className="main-nav-item" onClick={() => navigate('/profile')}>{userInfo.name}</li>
                }
                <li className="main-nav-item" onClick={() => logoutHandler()}>Logout</li>
              </>
            : 
              <>
                {
                  !pathMatchRoute('/login') && <li className="main-nav-item" onClick={() => navigate('/login')}>Sign in</li>
                }
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