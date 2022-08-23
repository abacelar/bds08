import { useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import Sales from './components/sales';
import { FilterData } from './types';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <Sales filterData={filterData} />
      </div>
    </>
  );
}

export default App;