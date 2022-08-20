import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Post {
  @Field({ description: 'Post id' })
  id: string

  @Field({ description: 'Owner id' })
  user_id: string

  @Field({ description: 'Post text' })
  text: string
}
