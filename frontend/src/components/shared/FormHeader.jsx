import PropTypes from 'prop-types'

function FormHeader ({children}) {
  return (
    <header className="form-header">
      {children}
    </header>
  )
}

FormHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormHeader