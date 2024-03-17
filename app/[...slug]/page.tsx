import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleJsonLd } from 'next-seo';
import { allPages } from 'contentlayer/generated';

import { Mdx } from '@/components/mdx-components';
import { cfg } from '@/utils/constants';

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allPages.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const pagePublishedDate = '2024-03-17'
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  const fullUrl = [cfg.siteURL, page.slugAsParams].join('/');

  return (
    <article className="prose py-6 dark:prose-invert">
      <ArticleJsonLd
        useAppDir={true}
        url={fullUrl}
        title={page.title}
        images={[]}
        datePublished={pagePublishedDate}
        authorName={cfg.author}
        description={page?.description ?? ''}
      />

      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  );
}
