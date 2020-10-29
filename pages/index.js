import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';
const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);
export async function getStaticProps() {

  const { posts } = await graphcms.request(
    `{
    posts {
      slug
      title
    }
  }`
  );

  return {
    props: {
      posts,
    },
  };
}

export default ({ posts }) =>
  posts.map(({ slug, title }) => (
    <Link key={slug} href={`/post/${slug}`}>
      <a>{title}</a>
    </Link>
  ));