import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"
import { TableOfContents } from "@/components/table-of-contents"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  // TODO: Improve tailwindCSS
  return (
    <article className="prose py-6 dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <div className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="pb-8 pt-10 transition-colors lg:col-span-3">
          <Mdx code={post.body.code} />
        </div>
        <aside>
          <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
            <TableOfContents source={post.body.raw} />
          </div>
        </aside>
      </div>
    </article>
  )
}
