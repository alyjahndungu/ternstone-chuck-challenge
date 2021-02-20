import React from 'react'
import './JokeItemStyle.scss'
import { ReactComponent as HeartFullIcon } from '../../Images/svg/heart-full.svg'
import { ReactComponent as HeartEmptyIcon } from '../../Images/svg/heart-empty.svg'
import { ReactComponent as LinkIcon } from '../../Images/svg/link.svg'
import { ReactComponent as MessageIcon } from '../../Images/svg/message.svg'
import { JokeType } from '../../Types'

type Props = {
    className: string
    handleItem: (id: string) => void
} & JokeType

const JokeItemView: React.FC<Props> = ({ className, handleItem, ...props }) => {
  return (
    <li className={ `${className} JokeItem` } >
      <div className="JokeItem__wrapper">
        <div className="JokeItem__icons">
          { (props.isFavourite)
            ? <HeartFullIcon onClick={ () => handleItem(props.id) } />
            : <HeartEmptyIcon onClick={ () => handleItem(props.id) } /> }
          <MessageIcon />
        </div>
        <div className="JokeItem__text-wrapper">
          <div className="JokeItem__link">
            <span>ID:</span>
            <a href={ props.url }>{ props.url }</a>
            <LinkIcon />
          </div>
          <p className="JokeItem__text">
            { props.text }
          </p>
          <div className="JokeItem__info-wrapper">
            <small className="JokeItem__info">Last update: <mark> { props.updatedAt } </mark></small>
            { props.categories.length
              ? <div className="JokeItem__category">
                <span>{ props.categories }</span>
              </div> : undefined }
          </div>
        </div>
      </div>
    </li>
  )
}

export default JokeItemView
