import PropTypes from 'prop-types'

function MenuContainer ({menuActive, setMenuActive}) {
  return (
    <aside id="menu-container" className={menuActive ? 'active': ''}>
      MenuContainer
    </aside>
  )
}

export default MenuContainer