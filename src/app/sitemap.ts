import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mc-status.abhiyanpa.in',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ]
}