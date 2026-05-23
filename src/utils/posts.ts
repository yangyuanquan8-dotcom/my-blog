import { getCollection } from 'astro:content';

export async function getSortedPosts() {
  const posts = await getCollection('blog');
  return posts
    .filter(post => import.meta.env.PROD ? !post.data.draft : true)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsByTag(tag: string) {
  const posts = await getSortedPosts();
  const normalized = tag.toLowerCase().replace(/-/g, ' ');
  return posts.filter(post =>
    post.data.tags.some(t => t.toLowerCase() === normalized),
  );
}

export async function getAllTags() {
  const posts = await getSortedPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => post.data.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
