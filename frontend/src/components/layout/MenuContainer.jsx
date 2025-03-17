import PropTypes from 'prop-types'

function MenuContainer ({menuActive, setMenuActive}) {
  return menuActive &&
    <aside id="menu-container">
      <nav id="menu-nav">
        <ul className="menu-nav-list"></ul>
      </nav>
    </aside>
}

export default MenuContainer