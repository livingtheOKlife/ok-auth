import PropTypes from 'prop-types'

function PasswordInput ({type, confirm, value, onChange}) {
  return (
    <input type={type} placeholder={confirm ? 'Confirm Password' : 'Enter Password'} name={confirm ? 'confirmPassword' : 'password'} value={value} onChange={onChange} />
  )
}

PasswordInput.propTypes = {
  confirm: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PasswordInput