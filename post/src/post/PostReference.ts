import { posts } from './data'
import { Post } from './Post'

export class ResolvePostReference {
  static async resolve (reference: Pick<Post, 'id'>): Promise<Post> {
    return posts.find(post => post.id === reference.id)!
  }
}
