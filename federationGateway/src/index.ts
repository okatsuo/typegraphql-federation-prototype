import 'reflect-metadata'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'

type AppOption = {
  port: number
}

class App {
  static async start ({ port }: AppOption) {
    const gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'user', url: 'http://localhost:4001/graphql' }
        ]
      })
    })

    const { executor, schema } = await gateway.load()

    const server = new ApolloServer({
      schema,
      executor
    })

    const { url } = await server.listen(port)
    console.log(`Server running at ${url}`)
  }
}

const port = Number(process.env.PORT) || 4000
App.start({ port }).catch(console.error)
