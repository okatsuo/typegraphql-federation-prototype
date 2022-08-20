import { Resolver, FieldResolver, Root } from 'type-graphql'

import { User } from './User'
import { PostSchema } from '../post/PostSchema'
import { posts } from '../post/data'
import { Post } from '../post/Post'

@Resolver(() => User)
export default class UserPostsResolver {
  @FieldResolver(() => [PostSchema])
  async posts (@Root() user: User): Promise<Post[]> {
    return posts.filter(post => post.user_id === user.id)
  }
}
