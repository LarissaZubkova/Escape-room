import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, BookingDay, QuestLevelFilter, DayQuestCard } from '../../consts';
import { MyBookingCard } from '../../types/booking';
import { QuestShortCard } from '../../types/quest';
import { getCorrectAddress, getMinMaxPeople } from '../../utils/utils';

type QuestCardProps = {
  quest: QuestShortCard;
  children?: ReactNode;
  myQuest?: MyBookingCard;
}

function QuestCard({quest, children, myQuest}: QuestCardProps): JSX.Element {
  const navigate = useNavigate();
  const {title, previewImg, previewImgWebp, id, peopleMinMax, level} = quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img" onClick={()=> navigate(AppRoute.Quest.replace(':id', id))}>
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg} 2x`} width={344} height={232} alt={title}/>
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={AppRoute.Quest.replace(':id', id)}>{title}</Link>
          {myQuest &&
          <span className="quest-card__info">
            {`[${myQuest.date === BookingDay.Today ?
              DayQuestCard.Today :
              DayQuestCard.Tomorrow}, ${myQuest.time}. ${getCorrectAddress(myQuest.location.address).start}`}
            <br/>
            {`${getCorrectAddress(myQuest.location.address).end}]`}
          </span>}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{myQuest ? `${myQuest.peopleCount} ` : getMinMaxPeople(peopleMinMax)}чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>{QuestLevelFilter[level]}
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
}

export default QuestCard;
