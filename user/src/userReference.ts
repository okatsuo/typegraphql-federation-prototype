import { User } from '.'
import { users } from './data'

export class ResolveUserReference {
  static async resolve (reference: Pick<User, 'id'>): Promise<User> {
    return users.find(u => u.id === reference.id)!
  }
}
