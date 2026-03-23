import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const hostname = 'https://clientconnectaustralia.com.au';

const urls = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/case-studies', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/seo', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/google-ads', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/web-design', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/social-media-management', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/social-media-ads', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/content-creation', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/brand-identity', changefreq: 'monthly', priority: 0.9 },
];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname });
  const writeStream = createWriteStream(resolve('public', 'sitemap.xml'));

  stream.pipe(writeStream);

  const today = new Date().toISOString().split('T')[0];

  urls.forEach(({ url, changefreq, priority }) => {
    stream.write({ url, lastmod: today, changefreq, priority });
  });

  stream.end();

  await streamToPromise(stream);
  console.log('✅ Sitemap generated: public/sitemap.xml (' + urls.length + ' URLs)');
}

generateSitemap().catch(console.error);
