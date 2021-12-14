import classnames from 'classnames';

const statusMap = {
  active: 'nhsuk-tag--blue',
  draft: 'nhsuk-tag--grey',
  deprecated: 'nhsuk-tag--orange',
  retired: 'nhsuk-tag--red',
};

export default function Tag({ children, classes, status }) {
  return (
    <span
      className={classnames('nhsuk-tag', classes, statusMap[status] || null)}
    >
      {children}
    </span>
  );
}