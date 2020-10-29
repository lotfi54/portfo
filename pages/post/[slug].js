import { GraphQLClient } from "graphql-request";
import Link from "next/link";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT);

export async function getStaticProps({ params }) {
  const { post } = await graphcms.request(
    `
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
  
        slug
        cover {
          id
          url
        }
       
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(`
    {
      posts {
        id
        title
        slug
        cover {
          id
          url
        }
      
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default ({ post }) => {
  return (
    <div className="py-16 bg-gray-100 min-h-screen">
      <div className="max-w-lg shadow-lg rounded-lg mx-auto mb-16">
        <div
          className="h-48 rounded-t flex-none bg-cover text-center overflow-hidden"
          style={{ backgroundImage: `url(${post.cover.url})` }}
          title={post.title}
        />
        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {post.title}
            </div>
            
          </div>
          
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        <Link href="/">
          <a>Back to all posts</a>
        </Link>
      </div>
    </div>
  );
};