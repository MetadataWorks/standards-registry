import classnames from 'classnames';
import { useState, useEffect } from 'react';
import { useQueryContext } from '../../context/query';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { CheckboxGroup, OptionSelect, Expander, Select } from '../';

import styles from './Filters.module.scss';
import { Radio } from '../Radio';

export function Filter({
  label,
  choices,
  onChange,
  field_name: fieldName,
  open,
  useSelect,
  useRadio,
  numActive = 0,
  onlyChild,
  fullHeight,
  clearAll,
  onClearAllClick,
  clearAllAlign,
  noBorderTop,
}) {
  const { query, updateQuery } = useQueryContext();
  if (onlyChild && !fullHeight) {
    label = `Filter by ${label.toLowerCase()}`;
  }
  const summary = useSelect ? null : (
    <span className={styles.filterHeader}>
      {label}

      {numActive > 0 ? <span>{numActive} selected</span> : null}
    </span>
  );

  function onSelectChange(val) {
    updateQuery({ ...query, [fieldName]: val || [] });
  }

  if (useSelect) {
    return (
      <Expander
        summary={summary}
        className={classnames('nhsuk-filter', styles.filter)}
        open={open}
        noBorderTop={noBorderTop}
        title={label}
      >
        <label className="nhsuk-heading-m nhsuk-u-padding-top-3">
          {label}
          {summary}
          <Select
            options={choices}
            onChange={onSelectChange}
            showAll={true}
            value={query[fieldName] || ''}
          />
        </label>
        {clearAll && (
          <a
            href="#"
            className={classnames(styles.clearAll, styles[clearAllAlign])}
            onClick={onClearAllClick}
          >
            Clear all
          </a>
        )}
      </Expander>
    );
  }

  if (useRadio) {
    return (
      <Expander
        summary={summary}
        className={classnames('nhsuk-filter', styles.filter)}
        open={open}
        noBorderTop={noBorderTop}
        title={label}
      >
        <Radio
          options={choices}
          onChange={onSelectChange}
          showAll={true}
          value={query[fieldName] || ''}
          name={fieldName}
        />
        {clearAll && (
          <a
            href="#"
            className={classnames(styles.clearAll, styles[clearAllAlign])}
            onClick={onClearAllClick}
          >
            Clear all
          </a>
        )}
      </Expander>
    );
  }

  return (
    <Expander
      summary={summary}
      className={classnames('nhsuk-filter', styles.filter)}
      open={open}
      noBorderTop={noBorderTop}
      title={label}
    >
      <OptionSelect fullHeight={fullHeight}>
        <CheckboxGroup
          onChange={onChange}
          options={choices}
          parent={fieldName}
          legend={label}
          small
        />
      </OptionSelect>
      {clearAll && (
        <a
          href="#"
          className={classnames(styles.clearAll, styles[clearAllAlign])}
          onClick={onClearAllClick}
        >
          Clear all
        </a>
      )}
    </Expander>
  );
}

const select = (names, fields) =>
  (Array.isArray(names) ? names : [names]).map((name) =>
    fields.find((val) => val.field_name === name)
  );

export function Filters({
  schema,
  categories = ['care_setting', 'topic', 'status', 'standard_category'],
  title = 'Filters',
  showTitle,
  before,
  expanded,
  className,
  clearAll = true,
  clearAllAlign = 'left',
  fullHeight,
  noBorderTop,
}) {
  const { dataset_fields: fields } = schema;
  const { query, updateQuery } = useQueryContext();
  const [openFilters, setOpenFilters] = useState([]);

  const setItem = (name) => (event) => {
    const { checked, value } = event.target;
    let filter = query[name];
    if (filter && !Array.isArray(filter)) {
      filter = [filter];
    }
    if (checked) {
      return updateQuery({
        [name]: filter ? [...filter, value] : [value],
      });
    }
    if (!filter || !filter.includes(value)) {
      return;
    }
    const newVal = filter.filter((val) => val !== value);
    return updateQuery({
      [name]: newVal.length ? newVal : null,
    });
  };

  const filters = select(categories, fields).map((item) => {
    switch (item.field_name) {
      case 'status':
        return mapStatus(item);
      default:
        return item;
    }
  });

  function mapStatus(item) {
    return {
      ...item,
      label: 'Status',
      choices: ['in-development', 'active', 'deprecated', 'retired'].map(
        (value) => {
          const choice = item.choices.find((c) => c.value === value);
          if (value === 'in-development') {
            return {
              ...choice,
              value,
              label: 'In development (APIs only)',
            };
          }
          return choice;
        }
      ),
    };
  }

  function onClearAllClick(e) {
    e.preventDefault();
    updateQuery(pick(query, 'q', 'page', 'orderBy', 'order'), {
      overwrite: true,
    });
  }

  useEffect(() => setOpenFilters(Object.keys(query)), [query]);

  const activeFilters = omit(query, 'q', 'page', 'orderBy', 'order');
  showTitle = showTitle || filters.length > 1;

  return (
    <div className={classnames('nhsuk-filters', styles.filters, className)}>
      {showTitle && title && <h2 className="nhsuk-heading-m">{title}</h2>}
      {before}
      <div className={classnames('nhsuk-expander-group', styles.clear)}>
        {filters.map((filter) => {
          let fieldFilters = activeFilters[filter.field_name] || [];
          if (!Array.isArray(fieldFilters)) {
            fieldFilters = [fieldFilters];
          }
          const numActive = fieldFilters.length;
          filter.choices = filter.choices.map((opt) => ({
            ...opt,
            checked: fieldFilters.includes(opt.value),
          }));

          return (
            <Filter
              key={filter.field_name}
              {...filter}
              open={expanded || openFilters.includes(filter.field_name)}
              onChange={
                filter.onChange ? filter.onChange : setItem(filter.field_name)
              }
              numActive={numActive}
              // TODO: this should be configured in schema
              //useSelect={filter.field_name === 'standard_category'}
              useRadio={filter.field_name === 'standard_category'}
              onlyChild={filters.length === 1}
              fullHeight={fullHeight}
              onClearAllClick={onClearAllClick}
              clearAll={clearAll}
              clearAllAlign={clearAllAlign}
              noBorderTop={noBorderTop}
            />
          );
        })}
      </div>
    </div>
  );
}
