export const queryGetPostsByMonth = () => {
  return `
    query GetPostsByMonth($startDate: DateTime!, $endDate: DateTime!) {
      newsCollection(where: { publishDate_gte: $startDate, publishDate_lt: $endDate }) {
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
      competitionCollection(where: { publishDate_gte: $startDate, publishDate_lt: $endDate }) {
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
};
