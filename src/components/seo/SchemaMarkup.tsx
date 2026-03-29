import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schema: object | object[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <Helmet>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
