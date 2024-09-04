import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { getNextStaticProps } from '@faustwp/core';

Page.query = gql`
  query getPosts {
    posts {
      nodes {
        title
        excerpt
        databaseId
        uri
      }
    }
  }
`;

export default function Page(props) {
    const { data } = useQuery(Page.query);
   
    const title = props.title;

    return (
    <ul>
      {data.posts.nodes.map((post) => (
        <li key={post.databaseId}>
          <Link href={`${post.uri}`}>
            <h2>{post.title}</h2>
          </Link>
          <div>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        </li>
      ))}
    </ul>
  );
  }

export function getStaticProps(ctx) {
    return getNextStaticProps(ctx, {Page, props: {title: 'Blog'}, revalidate: 10});
  }