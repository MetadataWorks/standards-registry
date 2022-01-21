import Link from 'next/link';
import { Snippet, Tag, Flex, Pagination } from '../';
import upperFirst from 'lodash/upperFirst';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import classnames from 'classnames';
import styles from './style.module.scss';

const DATE_FORMAT = 'do MMM yyyy';

function Model({ model }) {
  const { name, status, title, metadata_modified, description } = model;
  const target = `/standards/${name}`;
  return (
    <>
      <Link href={target}>
        <a>{title}</a>
      </Link>
      <p>{description}</p>
      <Flex className="nhsuk-body-s">
        <p className={classnames('nhsuk-body-s', styles.noBottom)}>
          Status:{' '}
          <Tag status={status} classes="nhsuk-body-s">
            {upperFirst(status)}
          </Tag>
        </p>
        <p
          className={classnames('nhsuk-body-s', styles.right, styles.noBottom)}
        >
          Last updated: {format(parseISO(metadata_modified), DATE_FORMAT)}
        </p>
      </Flex>
    </>
  );
}

export default function Dataset({ data = {}, searchTerm, includeType }) {
  const { count = 0, results = [] } = data;

  return (
    <>
      <h3>
        <Snippet
          num={count}
          plural={count > 1 || count === 0}
          searchTerm={searchTerm}
          inline
        >
          {searchTerm ? 'filters.summary' : 'filters.all'}
        </Snippet>
      </h3>
      <ul className={styles.list}>
        {results.map((model) => (
          <li key={model.id} className={styles.listItem}>
            <Model model={model} includeType={includeType} />
          </li>
        ))}
      </ul>
      <Pagination count={count} />
    </>
  );
}
