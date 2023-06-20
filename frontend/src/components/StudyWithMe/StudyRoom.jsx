import {
  formatChatMessageLinks,
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useParams } from 'react-router-dom';

export default function StudyRoom() {
  const { token } = useParams();
  const wsURL = 'wss://test-9yy8lq1j.livekit.cloud';

  return (
    <main data-lk-theme="default">
      {
        <LiveKitRoom token={token} serverUrl={wsURL} audio={true} video={true}>
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
        </LiveKitRoom>
      }
    </main>
  );
}
