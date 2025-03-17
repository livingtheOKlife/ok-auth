import PropTypes from 'prop-types'

function EmailInput ({value, onChange}) {
  return (
    <input type="email" placeholder='Enter Email Address' name='email' value={value} onChange={onChange} />
  )
}

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default EmailInput