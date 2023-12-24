import { useAppSelector } from '../../hooks';
import { getQuests } from '../../store/quests-process/quest-process.selectors';
import { FiltersState } from '../../types/quest';
import { filterByLevel, filterByType } from '../../utils/utils';
import QuestCard from '../quest-card/quest-card';

type QuestsCatalogProps = {
  selectedFilters: FiltersState;
}

function QuestsCatalog({selectedFilters}: QuestsCatalogProps): JSX.Element {
  const quests = useAppSelector(getQuests);
  const filteredByType = filterByType[selectedFilters.type](quests);
  const currentQuests = filterByLevel[selectedFilters.level](filteredByType);

  return (
    <div className="cards-grid">
      {currentQuests.length === 0 && <p>Нет квестов, выберите другие фильты</p>}
      {currentQuests.map((quest) => <QuestCard quest={quest} key={quest.id}/>)}
    </div>
  );
}

export default QuestsCatalog;
