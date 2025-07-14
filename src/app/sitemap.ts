import { MetadataRoute } from 'next'
 
// Replace with your actual public domain
const URL = 'https://teachtools.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${URL}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
