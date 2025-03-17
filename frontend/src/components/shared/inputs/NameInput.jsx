import PropTypes from 'prop-types'

function NameInput ({value, onChange}) {
  return (
    <input type="text" placeholder='Enter Your Name' name='name' value={value} onChange={onChange} />
  )
}

NameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NameInput