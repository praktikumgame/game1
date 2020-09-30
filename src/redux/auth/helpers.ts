import { AVATAR_API } from '../../constants';
const AVATAR_EXAMPLE_LINK = '../../images/example-avatar.jpg';

export function parseAvatar(link: string) {
  return `${link ? AVATAR_API + link : AVATAR_EXAMPLE_LINK}`;
}
