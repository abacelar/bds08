import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FilterData, Store } from '../../types';
import { baseURL, makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
  onFilterChange: (filter: FilterData) => void;
};

function Filter({ onFilterChange }: Props) {
  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();
  const [selectStore, setSelectStore] = useState<Store[]>([]);

  const onSubmit = (filterData: FilterData) => {
    onFilterChange(filterData);
  };

  const handleChangeStore = (value: Store) => {
    setValue('store', value);

    const obj: FilterData = {
      store: getValues('store')
    };

    onSubmit(obj);
  };

  useEffect(() => {
    const config: AxiosRequestConfig = {
      url: `${baseURL}/stores`
    };
    makeRequest(config).then((response) => {
      setSelectStore(response.data);
    });
  }, []);

  return (
    <div className="base-card filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-input">
        <Controller
          name="store"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectStore}
              isClearable
              placeholder="Selecione uma loja"
              classNamePrefix="filter-input"
              onChange={(value) => handleChangeStore(value as Store)}
              getOptionLabel={(store: Store) => store.name}
              getOptionValue={(store: Store) => String(store.id)}
            />
          )}
        />
      </form>
    </div>
  );
}

export default Filter;
