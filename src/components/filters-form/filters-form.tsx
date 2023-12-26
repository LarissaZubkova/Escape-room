import { QuestLevel, QuestLevelFilter, QuestType, QuestTypeFilter } from '../../consts';
import { FiltersState } from '../../types/quest';
import { getIconWidth } from '../../utils/utils';

type FiltersFormProps = {
  selectedFilters: FiltersState;
  setSelectedFilters: (filters: FiltersState) => void;
}

function FiltersForm({selectedFilters, setSelectedFilters}: FiltersFormProps): JSX.Element {
  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {Object.values(QuestType).map((type) => (
            <li
              className="filter__item"
              key={type}
            >
              <input
                type="radio"
                name="type"
                id={type}
                onChange={() => setSelectedFilters({...selectedFilters, type})}
                checked={selectedFilters.type === type}
              />
              <label className="filter__label" htmlFor={type}>
                <svg className="filter__icon" width={getIconWidth(type)} height={30} aria-hidden="true">
                  <use xlinkHref={`#icon-${type}`}></use>
                </svg><span className="filter__label-text">{QuestTypeFilter[type]}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {Object.values(QuestLevel).map((level) => (
            <li
              className="filter__item"
              key={level}
            >
              <input
                type="radio"
                name="level"
                id={level}
                onChange={() => setSelectedFilters({...selectedFilters, level})}
                checked={selectedFilters.level === level}
              />
              <label className="filter__label" htmlFor={level}><span className="filter__label-text">{QuestLevelFilter[level]}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}

export default FiltersForm;
