import upperFirst from 'lodash/upperFirst';
import {
  Details,
  Tag,
  Link,
  MarkdownBlock,
  Paragraph,
  Dl,
  Dd,
  Dt,
} from '../../components';
import format from 'date-fns/format';
import ActionLink from '../../components/ActionLink';
import Logo from '../../components/Logo';

function truncate(str, chars = 50) {
  if (str.length > chars) {
    return `${str.substring(0, chars)}...`;
  }
  return str;
}

function formatDate(date) {
  if (!date) {
    return 'Date not set';
  }
  return format(new Date(date), 'dd/MM/yyyy');
}

function TruncateLink({ link, email }) {
  if (!link) {
    return 'Not available';
  }
  return <a href={email ? `mailto:${link}` : link}>{truncate(link, 50)}</a>;
}

const sentenceCase = (str) => (str ? upperFirst(str.replaceAll('-', ' ')) : '');

const DocumentationLink = ({ link = false, title }) =>
  !link ? (
    'Not available'
  ) : (
    <>
      <a
        href={link}
        rel="noreferrer"
        target="_blank"
        title={`Documentation for ${title}`}
      >
        View documentation for this standard
      </a>
      <span className="nhsuk-u-visually-hidden">opens in a new tab</span>
      <br />
      (opens in new tab)
    </>
  );

const CategoryDetails = function () {
  return (
    <Details
      className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
      summary="Show definitions of standard types"
    >
      <div className="nhsuk-details__text">
        <Paragraph>
          <strong>Collections.</strong> A Collection is a systematic gathering
          of a specified selection of data or information for a particular
          stated purpose from existing records held within health and care
          systems and electronic devices.
        </Paragraph>
        <Paragraph>
          <strong>Extractions.</strong> An extraction is a type of collection
          that is pulled from an operational system by the data controller and
          transmitted to the receiver without additional processing or
          transcription by the sender.
        </Paragraph>
        <Paragraph>
          <strong>Information standards.</strong> Information standards are
          agreed ways of doing something, written down as a set of precise
          criteria so they can be used as rules, guidelines, or definitions.
        </Paragraph>
        <Paragraph>
          <strong>Technical Standards and specifications.</strong> Technical
          standards and specifications specify how to make information available
          technically including how the data is structured and transported.
        </Paragraph>
      </div>
    </Details>
  );
};

const Owner = ({ owner, image_url }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {owner}
      {image_url && <Logo owner={owner} image_url={image_url} />}
    </div>
  );
};

const schema = [
  {
    section_title: '',
    alternate_title: {
      hide_when_empty: true,
      label: 'Also known as',
      accessor: 'alternate_name',
    },
  },
  {
    section_title: 'About this standard',
    owner: {
      hide_when_empty: true,
      label: 'Owner',
      accessor: 'owner',
      format: (_, data) => {
        const { owner, logo } = data;
        return <>{<Owner owner={owner} image_url={logo} />}</>;
      },
    },
    reference_code: {
      hide_when_empty: true,
      label: 'Reference code',
      accessor: 'reference_code',
      format: (val) => !!val.length && val,
    },
    release_date: {
      label: 'Release date',
      format: (val) => formatDate(val),
    },
    status: {
      hide_when_empty: true,
      label: 'Status',
      format: (val) => (
        <>
          <Tag type={val}>{val}</Tag>
          {
            <Details
              className="nhsuk-u-font-size-16 nhsuk-u-margin-top-4"
              summary="Show definitions of statuses"
            >
              <div className="nhsuk-details__text">
                <Paragraph>
                  <strong>Active.</strong> Active standards are stable,
                  maintained and have been approved, assured or endorsed for use
                  by qualified bodies.
                </Paragraph>
                <Paragraph>
                  <strong>Deprecated</strong> Deprecated standards are available
                  for use and are maintained, but are being phased out, so new
                  functionality will not be added.
                </Paragraph>
                <Paragraph>
                  <strong>Retired standards</strong> Retired standards are not
                  being maintained or supported and should not be used.
                </Paragraph>
              </div>
            </Details>
          }
        </>
      ),
    },
    standard_category: {
      hide_when_empty: true,
      label: 'Standard type',
      more: <CategoryDetails />,
    },
    contact_details: {
      hide_when_empty: true,
      label: 'Contact point',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
  },
  {
    section_title: 'Link to standard',
    documentation_help_text: {
      label: 'Documentation',
      format: (val, data) => (
        <>
          {val && <MarkdownBlock md={val} />}
          {data.documentation_link && data.documentation_link.length > 0 ? (
            <ActionLink
              id="documentation-link"
              link={data.documentation_link}
              title={data.title || ''}
            />
          ) : (
            <span>Not Available</span>
          )}
        </>
      ),
    },
    applies_to: {
      hide_when_empty: true,
      label: 'Applies to',
      format: (val) => val,
    },
    impacts_on: {
      hide_when_empty: true,
      label: 'Impacts on',
      format: (val) => val,
    },
    associated_medias: {
      hide_when_empty: true,
      label: 'Associated medias',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },

    is_part_of: {
      hide_when_empty: true,
      label: 'Is part of',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    comply_by_date: {
      label: 'Comply by',
      format: (val) => formatDate(val),
    },
    implementation_from_date: {
      label: 'Effective from',
      format: (val) => formatDate(val),
    },
  },

  {
    section_title: 'Topics and care settings',
    topic: {
      hide_when_empty: true,
      label: 'Topic',
      format: (val) => val,
    },
    care_setting: {
      hide_when_empty: true,
      label: 'Care setting',
      format: (val) => val,
    },
  },
  {
    section_title: 'Dependencies and related standards',
    dependencies: {
      hide_when_empty: true,
      label: 'Dependencies',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    related_standards: {
      hide_when_empty: true,
      label: 'Related standards',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
  },
  {
    section_title: 'Review Information',
    scope: {
      hide_when_empty: true,
      label: 'Scope',
      format: (val) => val,
    },
    sponsor: {
      hide_when_empty: true,
      label: 'Sponsor',
      format: (val) => val,
    },
    senior_responsible_officer: {
      hide_when_empty: true,
      label: 'Senior Responsible Officer',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    business_lead: {
      hide_when_empty: true,
      label: 'Business Lead',
      format: (val) => val,
    },
    contributor: {
      hide_when_empty: true,
      label: 'Contributor',
      format: (val) => val,
    },
    assurance: {
      hide_when_empty: true,
      label: 'Assurance',
      format: (val) => val,
    },
    approval_date: {
      label: 'Approval date',
      format: (val) => formatDate(val),
    },
    post_implementation_review_date: {
      label: 'Post Implementation review Date',
      format: (val) => formatDate(val),
    },
    registration_status: {
      hide_when_empty: true,
      label: 'Registration status',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    registration_authority: {
      hide_when_empty: true,
      label: 'Registration authority',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
  },
  {
    section_title: 'Assurance and endorsements',
    assurance: {
      hide_when_empty: true,
      label: 'Quality assurance',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    legal_authority: {
      hide_when_empty: true,
      label: 'Legal authority',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    legal_authority_description: {
      hide_when_empty: true,
      label: 'Legal authority description',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
    trusted_by: {
      hide_when_empty: true,
      label: 'Collaborating Organisations',
      format: (val) => !!val?.length && <MarkdownBlock md={val} />,
    },
  },
];

export default schema;

export const upcomingStandard = [
  {
    id: 'name',
    title: 'Name',
    sortable: true,
    defaultSort: 'asc',
    formatter: (val, row) => {
      return (
        <>
          <p>
            <strong>
              <a href={`/future-standards/${row.name}`}>{row.title}</a>
            </strong>
            <br />
            {row.description}
          </p>
        </>
      );
    },
  },
  {
    id: 'standard_category',
    title: 'Standard type',
    sortable: false,
  },
  {
    id: 'status',
    title: 'Stage',
    sortable: true,
    formatter: (val) => <strong>{sentenceCase(val)}</strong>,
  },
  {
    id: 'dates',
    title: 'Estimated dates',
    formatter: (_, row) => (
      <Dl>
        <Dt>Approval due:</Dt>
        <Dd>{formatDate(row.approval_date)}</Dd>

        <Dt>Implement from:</Dt>
        <Dd>{formatDate(row.implementation_from_date)}</Dd>

        <Dt>Comply by:</Dt>
        <Dd>{formatDate(row.comply_by_date)}</Dd>
      </Dl>
    ),
  },
  {
    id: 'other',
    title: 'Further information',
    formatter: (_, row) => (
      <Dl>
        <Dt>Owner</Dt>
        <Dd>{row?.organization?.title}</Dd>

        <Dt>Submit feedback</Dt>
        <Dd>
          <TruncateLink link={row.submit_feedback} email />
        </Dd>

        <Dt>Documentation</Dt>
        <Dd>
          <DocumentationLink link={row.documentation_link} title={row.title} />
        </Dd>
      </Dl>
    ),
  },
];
