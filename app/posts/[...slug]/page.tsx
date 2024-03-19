import '@/styles/codes/prism-dracula.css';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleJsonLd } from 'next-seo';
import { ClockIcon } from '@radix-ui/react-icons';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { TableOfContents } from '@/components/table-of-contents';
import { cfg } from '@/utils/constants';
import { CategoryBadge } from '@/components/category-badge';
import { CustomImage } from '@/components/custom-image';

interface PostProps {
  params: {
    slug: string[];
  };
}

const formatDate = (date: string, locale = 'en-JP') => {
  const row = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return row;
};

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  const isNotPublished =
    process.env.NODE_ENV === 'production' && !post.isPublished;
  if (!post || isNotPublished) {
    notFound();
  }

  const fullUrl = cfg.siteURL + post.slug;

  // TODO: Improve tailwindCSS
  // TODO: Add post date and the hero image
  return (
    <article className="prose py-6 transition-colors dark:prose-invert">
      <ArticleJsonLd
        useAppDir={true}
        url={fullUrl}
        title={post.title}
        images={[]}
        datePublished={post.publishedDate}
        dateModified={
          post.lastUpdatedDate ? post.lastUpdatedDate : post.publishedDate
        }
        authorName={cfg.author}
        description={post?.description ?? ''}
      />
      <h1 className="mb-4 scroll-m-20 text-3xl font-extrabold tracking-tight md:mb-8 lg:text-5xl">
        {post.title}
      </h1>
      <div className="flex flex-row gap-2 text-sm">
        <div className="flex-1">
          <span className="text-slate-700 dark:text-slate-200">
            <CategoryBadge badgeString={post.category} />
          </span>
        </div>
        <div id="container" className="text-right">
          {post.lastUpdatedDate ? (
            <span className="text-slate-700 dark:text-slate-200">
              Last updated {formatDate(post.lastUpdatedDate)}
            </span>
          ) : (
            <span className="text-slate-700 dark:text-slate-200">
              Published {formatDate(post.publishedDate)}
              <br />
            </span>
          )}
        </div>
      </div>
      {post.heroImage && (
        <CustomImage src={post.heroImage} alt="A hero image" />
      )}
      <hr className="my-4" />
      {post.readingTime && (
        <div className="flex items-center justify-end gap-1 text-sm">
          <ClockIcon className="my-0 h-4 w-4">
            {post.readingTime.text}
          </ClockIcon>
          <span className="text-slate-700 dark:text-slate-200">
            {post.readingTime.text}
          </span>
        </div>
      )}
      <div
        className="lg:grid lg:grid-cols-4 lg:gap-x-6"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="py-4 lg:col-span-3">
          <Mdx code={post.body.code} />
        </div>
        <aside>
          <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
            <TableOfContents source={post.body.raw} />
          </div>
        </aside>
      </div>
    </article>
  );
}
