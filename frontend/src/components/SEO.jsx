import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, name, type }) {
  const defaultTitle = "Aditya | Premium Full Stack Developer";
  const defaultDesc = "I am a Computer Engineering student focused on building scalable backend systems, APIs, and modern web applications.";
  
  return (
    <Helmet>
      <title>{title ? `${title} | Aditya` : defaultTitle}</title>
      <meta name='description' content={description || defaultDesc} />
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta name="twitter:creator" content={name || "Aditya"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
    </Helmet>
  );
}
