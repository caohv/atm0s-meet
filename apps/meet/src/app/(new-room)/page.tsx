import { NewRoom } from './containers'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export default function NewRoomScreen() {
  const username = cookies().get('username')
  return <NewRoom username={username} />
}
