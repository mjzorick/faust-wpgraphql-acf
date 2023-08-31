import { gql, useQuery } from "@apollo/client";
import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout";

const GET_ALBUMS = gql`
query getAlbums {
    albums {
      nodes {
        albumFields {
          cover {
            node {
              databaseId
              mediaItemUrl
            }
          }
          releaseDate
        }
        databaseId
        slug
      }
    }
  }
`;

export default function Albums() {
    const { loading, error, data } = useQuery(GET_ALBUMS);

    if (loading) return "Loading...";
    if (error) return "Error! ${error.message}";

    return (
        <Layout>
            <ul className="gallery">
                {data.albums.nodes.map((album) => (
                    <li className="galleryItem" key={album.databaseId}>
                        <AlbumCard album={album} />
                    </li>
                ))}        
            </ul>
        </Layout>
    );
}