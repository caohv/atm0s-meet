import { Invite } from './containers'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export default function InviteScreen() {
  const username = cookies().get('username')
  return <Invite username={username} />
}
