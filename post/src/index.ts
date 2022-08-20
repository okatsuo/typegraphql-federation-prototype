import 'reflect-metadata'
import { buildFederatedSchema } from './helpers/buildFederatedSchema'
import { Resolver, Query } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { ResolvePostReference } from './PostReference'
import { PostSchema } from './PostSchema'
import { posts } from './data'
import { Post } from './Post'
import UserPostsResolver from './user/resolver'
import { User } from './user/User'

@Resolver(() => PostSchema)
export class PostResolver {
  @Query(() => [PostSchema], { description: 'Get all posts' })
  getPosts (): Post[] {
    return posts
  }
}

type AppOptions = {
  port: number
}

class App {
  static async start ({ port }: AppOptions): Promise<void> {
    const schema = await buildFederatedSchema({
      resolvers: [PostResolver, UserPostsResolver],
      orphanedTypes: [Post, User]
    }, {
      Post: { __resolveReference: ResolvePostReference.resolve }
    })

    const server = new ApolloServer({ schema, tracing: false, playground: true })
    const { url } = await server.listen(port)
    console.log(`Post service is ready at ${url}`)
  }
}

App.start({ port: 4002 }).catch(console.error)
