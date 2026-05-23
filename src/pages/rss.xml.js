import rss from '@astrojs/rss';
import { getSortedPosts } from '../utils/posts';

export async function GET(context) {
  const posts = await getSortedPosts();
  return rss({
    title: 'My Blog',
    description: 'Personal blog - thoughts on technology, life, and learning',
    site: context.site || 'https://myblog.vercel.app',
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
