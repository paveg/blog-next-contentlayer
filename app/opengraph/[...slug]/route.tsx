import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import { allPosts } from '@/.contentlayer/generated';

export const runtime = 'edge';

type Props = {
  params: {
    slug: string[];
  };
};
const size = {
  width: 1200,
  height: 630,
};

export const GET = async (request: NextRequest, { params }: Props) => {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
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
    {
      ...size,
    }
  );
};
