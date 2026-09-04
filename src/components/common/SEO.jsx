import { useEffect } from 'react';

const DEFAULT_TITLE = 'THE ROYAL CLUB — Unity in Diversity | Pan-India Visionaries';
const DEFAULT_DESCRIPTION = 'THE ROYAL CLUB — A prestigious pan-India community of 13 visionary leaders hosting daily interactive Facebook Live sessions, fostering collective growth, and driving monthly social impact.';
const BASE_URL = 'https://the-royal-club.vercel.app';
const DEFAULT_IMAGE = `${BASE_URL}/welcome-bg.jpg`;

/**
 * Set or update a <meta> tag attribute in document.head
 */
function setMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Set or update a <link> tag in document.head
 */
function setLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  image = DEFAULT_IMAGE,
  schema = null,
}) {
  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title
      ? `${title} | THE ROYAL CLUB`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Canonical URL
    const canonicalUrl = canonical
      ? `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
      : BASE_URL;
    setLinkTag('canonical', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', image);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 6. Dynamic JSON-LD Structured Data
    let scriptTag = document.getElementById('route-jsonld-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'route-jsonld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up dynamic schema if needed on unmount
    };
  }, [title, description, keywords, canonical, image, schema]);

  return null;
}
