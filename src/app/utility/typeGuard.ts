import { NewsPost, CompetitionPost } from '@/app/definitions/types';

export function isNewsPost(post: any): post is NewsPost {
  return (
    post &&
    'id' in post &&
    'title' in post &&
    'content' in post &&
    'publishDate' in post &&
    post.postType === 'Nyheter'
  );
}

export function isCompetitionPost(post: any): post is CompetitionPost {
  return (
    post &&
    'id' in post &&
    'title' in post &&
    'content' in post &&
    'publishDate' in post &&
    post.postType === 'Tävlingar'
  );
}
