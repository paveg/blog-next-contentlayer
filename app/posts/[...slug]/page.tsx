import '@/styles/codes/prism-dracula.css';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleJsonLd } from 'next-seo';
import { CalendarIcon, ClockIcon, ReloadIcon } from '@radix-ui/react-icons';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { TableOfContents } from '@/components/table-of-contents';
import { cfg } from '@/utils/constants';
import { CategoryBadge } from '@/components/category-badge';
import { CustomImage } from '@/components/custom-image';
import { ShareButtons } from '@/components/share-buttons';
import { Separator } from '@/components/ui/separator';

interface PostProps {
  params: {
    slug: string[];
  };
}

const formatDate = (date: string, locale = 'ja-JP') => {
  const row = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
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
    openGraph: {
      title: post.title,
      description: post.description,
      locale: 'ja_JP',
      type: 'website',
      images: [
        {
          type: 'image/png',
          width: 1200,
          height: 630,
          url: `/opengraph/${post.slugAsParams}`,
          alt: 'Open Graph Image',
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      card: 'summary_large_image',
      creator: cfg.twitterId,
      creatorId: cfg.twitterId,
      images: [
        {
          url: `/opengraph/${post.slugAsParams}`,
          alt: 'Twitter Image',
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  const isNotPublished = (): boolean => {
    return process.env.NODE_ENV === 'production' && !post?.isPublished;
  };

  if (!post || isNotPublished()) {
    notFound();
  }

  const fullUrl = cfg.siteURL + post.slug;
  return (
    <article className="prose prose-slate py-6 transition-colors dark:prose-invert lg:prose-lg">
      <ArticleJsonLd
        useAppDir={true}
        url={fullUrl}
        title={post.title}
        images={[cfg.siteURL + `/opengraph/${post.slugAsParams}`]}
        datePublished={post.publishedDate}
        dateModified={
          post.lastUpdatedDate ? post.lastUpdatedDate : post.publishedDate
        }
        authorName={cfg.author}
        description={post?.description ?? ''}
      />
      <h1 className="mb-2 scroll-m-20 text-3xl font-extrabold tracking-tight md:mb-4 lg:text-5xl">
        {post.title}
      </h1>
      {post.heroImage && (
        <CustomImage src={post.heroImage} alt="A hero image" />
      )}
      <div
        id="date-container"
        className="mb-2 flex items-center justify-start gap-2 text-sm"
      >
        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
          <CalendarIcon className="my-0 h-4 w-4" />
          {formatDate(post.publishedDate)}
        </span>
        {post.lastUpdatedDate && (
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
            <ReloadIcon className="my-0 h-4 w-4" />
            {formatDate(post.lastUpdatedDate)}
          </span>
        )}
      </div>
      <div className="flex flex-row items-center gap-2 text-sm">
        <div className="flex-1">
          <span className="text-slate-700 dark:text-slate-200">
            <CategoryBadge badgeString={post.category} />
          </span>
        </div>
        {post.readingTime && (
          <div className="flex items-center justify-end gap-1 text-sm">
            <ClockIcon className="my-0 h-4 w-4" />
            <span className="text-slate-700 dark:text-slate-200">
              {post.readingTime.text}
            </span>
          </div>
        )}
        <ShareButtons
          title={post.title}
          url={fullUrl}
          hashtags={post.category ? [post.category] : []}
        />
      </div>
      <Separator className="my-4" />
      <div
        className="lg:grid lg:grid-cols-8 lg:gap-x-4"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="break-words py-2 lg:col-span-7">
          <Mdx code={post.body.code} />
        </div>
        <aside>
          <div className="hidden lg:sticky lg:top-20 lg:col-span-1 lg:block">
            <TableOfContents source={post.body.raw} />
          </div>
        </aside>
      </div>
      <Separator className="mb-2 mt-10" />
      <ShareButtons
        title={post.title}
        url={fullUrl}
        hashtags={post.category ? [post.category] : []}
      />
    </article>
  );
}
