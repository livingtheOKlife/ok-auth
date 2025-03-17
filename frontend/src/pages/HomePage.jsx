import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

function HomePage () {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <MainContainer page='home-page'>
      <h2><span className="logo"><em>OK</em>auth</span></h2>
      <p>This is a boilerplate for MERN authentication that stores a JWT in an HTTP-ONly cookie. It also uses Redux Toolkit and my own SASS library.</p>
      <div className="buttons">
        {
          userInfo ?
            <></>
          : 
            <>
              <Link to='/login' className='btn md'>Sign in</Link>
              <Link to='/register' className='btn md'>Sign up</Link>
            </>
        }
      </div>
    </MainContainer>
  )
}

export default HomePage