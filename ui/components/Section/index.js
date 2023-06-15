export default function HtmlSection({ val }) {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val) }} />
    </div>
  );
}
