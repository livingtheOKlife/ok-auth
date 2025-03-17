import PropTypes from 'prop-types'

function MenuBtn ({menuActive, setMenuActive}) {
  return (
    <button type="button" className={`menu-btn ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(!menuActive)}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </button>
  )
}

export default MenuBtn