import { Resolver, FieldResolver, Root } from 'type-graphql'

import { User } from './User'
import { PostSchema } from '../PostSchema'
import { posts } from '../data'
import { Post } from '../Post'

@Resolver(() => User)
export default class UserPostsResolver {
  @FieldResolver(() => [PostSchema])
  async posts (@Root() user: User): Promise<Post[]> {
    return posts.filter(post => post.user_id === user.id)
  }
}
