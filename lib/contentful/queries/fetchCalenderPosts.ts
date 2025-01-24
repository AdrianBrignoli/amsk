import { GraphQLClient } from 'graphql-request';
import { createGraphQLClient } from '../ContentfulFetching';
import { ValuePiece } from '@/app/misc/types';

type fetchCalenderPostsProps = {
  publishDate: string;
};

export const fetchCalenderPosts = async ({
  publishDate,
}: fetchCalenderPostsProps) => {
  // Define the GraphQL query
  const query = `
    query GetPostsByDate($publishDate: DateTime!) {
      competitionCollection(where: { publishDate: $publishDate }) {
        items {
          sys {
            id
          }
          title
          publishDate
          content {
            json
          }
        }
      }
    }
  `;

  // Define the variables object with the publishDate parameter
  const variables = { publishDate };

  const client = createGraphQLClient();

  // Send the query along with the variables
  const data = await client.request(query, variables);
  console.log('GRAPHQL ----------------', data);

  // Return the data received from Contentful
  return data;
};
