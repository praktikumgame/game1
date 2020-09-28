import { AVATAR_API } from '../../constants';
import exampleAvatar from '../../images/example-avatar.jpg';

export function parseAvatar(link: string) {
  return `${link ? AVATAR_API + link : exampleAvatar}`;
}
