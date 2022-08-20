import { Directive, Field, ObjectType, Root } from 'type-graphql'
import { User } from '../user/User'
import { Post } from './Post'

@ObjectType({ description: 'Post' })
@Directive('@key(fields: "id")')
export class PostSchema extends Post {
  @Field(() => User, { description: 'Owner data' })
  user (@Root() post: Post): User {
    return { id: post.user_id }
  }
}
