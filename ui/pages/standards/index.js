import {
  Reading,
  Snippet,
  Page,
  Row,
  Col,
  Filters,
  Dataset,
  FeedbackFooter,
} from '../../components';
import { getPageProps } from '../../helpers/getPageProps';

export default function Standards({ data, schemaData }) {
  return (
    <Page>
      <h1>
        <Snippet inline>title</Snippet>
      </h1>
      <Reading>
        <Snippet>intro</Snippet>
      </Reading>
      <Row>
        <Col>
          <Filters schema={schemaData} />
        </Col>
        <Col colspan={3}>
          <Dataset data={data} pagination={true} />
          <FeedbackFooter />
        </Col>
      </Row>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return await getPageProps(context);
}