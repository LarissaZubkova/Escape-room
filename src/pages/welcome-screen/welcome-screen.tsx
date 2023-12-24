import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import QuestsCatalog from '../../components/quests-catalog/quests-catalog';
import FiltersForm from '../../components/filters-form/filters-form';
import { useState } from 'react';
import { QuestLevel, QuestType,Contacts } from '../../consts';

function WelcomeScreen(): JSX.Element {
  const [selectedFilters, setSelectedFilters] = useState({
    type: QuestType.All,
    level: QuestLevel.All,
  });

  return (
    <div className="wrapper">
      <Helmet>
        <title>Escape Room</title>
      </Helmet>
      <Header isMain/>
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">{`квесты в ${Contacts.CITY}е`}</h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
            <FiltersForm selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          <QuestsCatalog selectedFilters={selectedFilters}/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default WelcomeScreen;
