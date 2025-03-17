import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import HeaderContainer from './components/layout/HeaderContainer'
import MenuContainer from './components/layout/MenuContainer'
import FooterContainer from './components/layout/FooterContainer'
import Alert from './components/Alert'

function App () {
  const [menuActive, setMenuActive] = useState(false)
  return (
    <div className="App">
      <h1>livingtheOKlife</h1>
      <HeaderContainer menuActive={menuActive} setMenuActive={setMenuActive} />
      <MenuContainer menuActive={menuActive} setMenuActive={setMenuActive} />
      <Outlet />
      <FooterContainer />
      <Alert />
    </div>
  )
}

export default App