import React, { useState } from 'react'
import './HeaderStyle.scss'
import { ReactComponent as CloseIcon } from '../../Images/svg/close.svg'
import { ReactComponent as BurgerIcon } from '../../Images/svg/burger.svg'

type Props = {
  handleBtnClick: () => void
}

const HeaderView: React.FC<Props> = ({ handleBtnClick }) => {
  const [closeIcon, setCloseIcon] = useState(false)
  const openText = 'Open list of favourite jokes'
  const closeText = 'Close list of favourite jokes'
  const iconClick = () => {
    setCloseIcon(!closeIcon)
    handleBtnClick()
  }

  return (
    <header className={ `Header ${closeIcon ? 'Header-overlay' : ''}` }>
      <h1 className="Header__logo">Chuck 2021 Challenge</h1>
      <button className="Header__menu" aria-label={ closeIcon ? closeText : openText }
        onClick={ () => iconClick() } >
        { closeIcon ? <CloseIcon tabIndex={ 0 } /> : <BurgerIcon tabIndex={ 0 } /> }
        <span>Favourite</span>
      </button>
    </header>
  )
}

export default HeaderView
