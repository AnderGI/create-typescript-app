// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  outDir: "./../../../dist/landing",
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    starlight({
      title: 'My Docs',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Overview', slug: 'introduction/overview' }
          ],
        },
        {
          label: 'Architecture & Design',
          items: [
            { label: 'Domain-Driven Design (DDD)', slug: 'architecture/ddd' }
          ],
        },
        {
          label: 'Use Cases',
          items: [
            { label: 'Add a New Use Case', slug: 'use-cases/new-use-case' },
          ],
        },
      ],
    }),
  ],
});
