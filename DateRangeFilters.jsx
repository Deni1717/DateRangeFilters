import { useState, useMemo } from 'react';
import { dateRangeFiltersList } from './DateRangeFilters.data';
import classes from './DateRangeFilters.module.css';

export const DateRangeFilters = ({
  header = 'Date Range filters:',
  containerClassName = '',
  listClassName = '',
  datesRangeAction,
  activeDateFilter,
  setActiveDateFilter
}) => {
  const isControlled = useMemo(
    () => setActiveDateFilter !== undefined,
    [setActiveDateFilter]
  );
  const [internalDateFilter, setInternalDateFilter] = useState('');

  const setDateFilter = (data) => {
    if (!data) return;
    if (data.label === activeDateFilter) {
      //isControlled ? setActiveDateFilter('') : setInternalDateFilter('');
    } else {
      isControlled
        ? setActiveDateFilter(data.label)
        : setInternalDateFilter(data.label);
      if (data.getDate) {
        const dates = data.getDate();
        datesRangeAction(dates);
      }
    }
  };

  return (
    <div className={containerClassName}>
      <h3 className={classes.filtersHeader}>{header}</h3>
      <ul className={`${classes.filtersList} ${listClassName}`}>
        {dateRangeFiltersList.map((row) => (
          <li
            key={row.label}
            className={`${classes.filterContainerRow} ${
              (isControlled ? activeDateFilter : internalDateFilter) ===
              row.label
                ? classes.activeFilter
                : classes.filterDisabled
            }`}
            onClick={() => setDateFilter(row)}
          >
            {row.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
