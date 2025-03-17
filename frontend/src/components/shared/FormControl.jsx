import PropTypes from 'prop-types'

function FormControl ({className, children}) {
  return (
    <div className={`form-control ${className}`}>
      {children}
    </div>
  )
}

FormControl.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default FormControl