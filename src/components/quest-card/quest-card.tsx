import { Link, useNavigate } from 'react-router-dom';
import { QuestShortCard } from '../../types/quest';
import { AppRoute, QuestLevelFilter } from '../../consts';
import { getMinMaxPeople } from '../../utils/utils';
import { ReactNode } from 'react';

type QuestCardProps = {
  quest: QuestShortCard;
  children?: ReactNode;
  count?: number;
}

function QuestCard({quest, children, count}: QuestCardProps): JSX.Element {
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
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{count ? `${count} ` : getMinMaxPeople(peopleMinMax)}чел
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
