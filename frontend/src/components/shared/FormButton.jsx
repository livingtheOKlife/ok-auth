import PropTypes from 'prop-types'

import { useState } from 'react'

function FormButton ({children}) {
  const [btnClick, setBtnClick] = useState(false)
  return (
    <button type="submit" className={`btn md ${btnClick ? 'click' : ''}`} onMouseDown={() => setBtnClick(!btnClick)} onMouseUp={() => setBtnClick(!btnClick)}>
      {children}
    </button>
  )
}

FormButton.propTypes = {
  children: PropTypes.node.isRequired
}

export default FormButton