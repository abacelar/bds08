import { useEffect, useMemo, useState } from 'react';
import { buildSalesByGenderChart } from '../../helpers';
import { FilterData, PieChartConfig, SalesByGender } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';
import PieChartCard from '../pie-chart-card';
import { sumSalesByDate } from '../pie-chart-card/helpers';
import './styles.css';

type Props = {
  filterData?: FilterData;
};

function Sales({ filterData }: Props) {
  const [totalSum, setTotalSum] = useState(0);
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesByGender[]>('/sales/by-gender', { params }).then((response) => {
      const newTotalSum = sumSalesByDate(response.data);
      setTotalSum(newTotalSum);
      const newSalesByGender = buildSalesByGenderChart(response.data);
      setSalesByGender(newSalesByGender);
    });
  }, [params]);

  return (
    <div className="base-card sales-container">
      <div className="sales-text-container">
        <h1>{formatPrice(totalSum)}</h1>
        <span>Total de vendas</span>
      </div>
      <div className="sales-pie-container">
        <PieChartCard
          name=""
          labels={['Feminino', 'Masculino', 'Outro']}
          series={salesByGender?.series}
        />
      </div>
    </div>
  );
}

export default Sales;
