// import parseISO from 'date-fns/parseISO';
// import format from 'date-fns/format';
import upperFirst from 'lodash/upperFirst';
import { Tag, Link } from '../components';

// const DATE_FORMAT = 'do MMMM yyyy';

export default [
  {
    section_title: 'About this standard',
    owner: {
      label: 'Owner',
      accessor: 'organization.title',
    },
    approval_code: {
      label: 'Approval Code',
      format: (val) => val || 'Not Applicable',
    },
    status: {
      label: 'Status',
      format: (val) => <Tag status={val.toLowerCase()}>{upperFirst(val)}</Tag>,
    },
    standard_category: {
      label: 'Type of Standard',
    },
    documentation_help_text: {
      label: 'Documentation',
    },
    documentation_link: {
      label: 'Documentation link',
      format: (val) => <Link href={val}></Link>,
    },
  },
  {
    section_title: 'Business and care setting usage',
    business_use: { label: 'Business use' },
    care_setting: {
      label: 'Care Setting',
    },
  },
  {
    section_title: 'Relationships to other standards',
    dependencies: {
      label: 'Dependencies',
    },
    related_standards: {
      label: 'Related Standards',
    },
  },
  {
    section_title: 'Assurance and endorsements',
    assurance: {
      label: 'Assurance',
    },
    endorsements: {
      label: 'Endorsements',
    },
  },
];

// url: {
//   label: 'Link to standard',
//   format: (val) => (
//     <a href={val} target="_blank" rel="noreferrer">
//       View standard
//     </a>
//   ),
// },
// metadata_modified: {
//   label: 'Standard last updated',
//   format: (val) => format(parseISO(val), DATE_FORMAT),
// },
