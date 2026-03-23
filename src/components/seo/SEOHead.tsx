import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogType?: string;
}

const DOMAIN = 'https://clientconnectaustralia.com.au';
const OG_IMAGE = `${DOMAIN}/images/logoCCA2.png`;
const SITE_NAME = 'Client Connect Australia';

export default function SEOHead({ title, description, path, ogType = 'website' }: SEOHeadProps) {
  const url = `${DOMAIN}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ClientConnectAU" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}
