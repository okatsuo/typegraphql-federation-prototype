import 'reflect-metadata'
import { buildFederatedSchema } from './helpers/buildFederatedSchema'
import { Resolver, Query, ObjectType, Field } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { users } from './data'
import { ResolveUserReference } from './userReference'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  name: string
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  getUser (): User[] {
    return users
  }
}

type AppOptions = {
  port: number
}

class App {
  static async start ({ port }: AppOptions): Promise<void> {
    const schema = await buildFederatedSchema({
      resolvers: [UserResolver],
      orphanedTypes: [User]
    }, {
      user: { __resolveReference: ResolveUserReference.resolve }
    })

    const server = new ApolloServer({ schema, tracing: false, playground: true })
    const { url } = await server.listen(port)
    console.log(`User service is ready at ${url}`)
  }
}

App.start({ port: 4001 }).catch(console.error)
