import { MediaContext } from '@/context'
import { useDeviceStream } from '@/hooks'
import { getCookie } from '@/lib'
import { useContext, useEffect, useRef } from 'react'

type Props = {
  // sourceName: string
}

export const PeerLocal: React.FC<Props> = ({}) => {
  const username = getCookie('username')
  const streamVideoMain = useDeviceStream('video_main')
  const videoRef = useRef<HTMLVideoElement>(null)
  const ctx = useContext(MediaContext)
  const streamVideoScreen = useDeviceStream('video_screen')

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = streamVideoScreen || streamVideoMain || null
      return () => {
        if (videoRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          videoRef.current.srcObject = null
        }
      }
    }
  }, [streamVideoMain, streamVideoScreen])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-800">
      <div className="absolute bottom-3 left-2 z-[1] flex items-center gap-1">
        <div className="rounded-full bg-slate-950 bg-opacity-30 px-2 py-0.5 text-sm text-white">
          {username || 'You'} {streamVideoScreen && `(You, presenting)`}
        </div>
      </div>
      {streamVideoScreen && (
        <div
          onClick={() => ctx.turnOffDevice('video_screen')}
          className="absolute bottom-3 right-2 z-50 cursor-pointer rounded-full bg-blue-500 px-3 py-1.5 text-sm text-white"
        >
          Stop presenting
        </div>
      )}
      {streamVideoMain || streamVideoScreen ? (
        <video
          muted
          autoPlay
          playsInline
          controls={false}
          className="aspect-video h-full"
          ref={videoRef}
          style={{
            transform: !streamVideoScreen ? 'rotateY(180deg)' : 'none',
          }}
        />
      ) : (
        <div className="flex aspect-square max-h-28 w-1/3 max-w-28 items-center justify-center rounded-full bg-zinc-500 text-3xl uppercase text-white">
          {username?.[0]}
        </div>
      )}
    </div>
  )
}
