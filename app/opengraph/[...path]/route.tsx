import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/server';
import { allPosts } from '@/.contentlayer/generated';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const slug = params.path.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
  );
}
