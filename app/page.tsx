import Link from 'next/link';
import { compareDesc } from 'date-fns';
import { PostNotFound } from '@/components/post-not-found';
import { type Post, allPosts } from '@/.contentlayer/generated';
export default function Home() {
  const sorted = (posts: Post[]): Post[] =>
    posts.sort((a, b) =>
      compareDesc(new Date(a.publishedDate), new Date(b.publishedDate))
    );
  const filtered =
    process.env.NODE_ENV === 'development'
      ? allPosts
      : allPosts.filter((post) => post.isPublished);
  if (filtered.length === 0) {
    return <PostNotFound />;
  }

  return (
    <div className="prose prose-slate dark:prose-invert">
      {sorted(filtered).map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
