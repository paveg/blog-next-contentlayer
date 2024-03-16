import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"
import { PostNotFound } from "@/components/post-not-found"

export default function Home() {
  console.info(allPosts.length)
  if (allPosts.length === 0) {
    return <PostNotFound />
  }

  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
