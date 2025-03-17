import PropTypes from 'prop-types'

function MainContainer ({page, wrapper, children}) {
  return (
    <main id="main-container" className={page}>
      {
        wrapper ? <div className="main-wrapper">{children}</div>
        : <>{children}</>
      }
    </main>
  )
}

MainContainer.propTypes = {
  page: PropTypes.string.isRequired,
  wrapper: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default MainContainer