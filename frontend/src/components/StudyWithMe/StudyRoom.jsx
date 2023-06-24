import {
  formatChatMessageLinks,
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function StudyRoom() {
  const navigate = useNavigate();
  const { token } = useParams();
  const wsURL = 'wss://test-9yy8lq1j.livekit.cloud';
  const onLeave = () => {
    console.log('leaving');
    navigate('/calendar');
  };

  return (
    <main data-lk-theme="default">
      {
        <LiveKitRoom
          token={token}
          serverUrl={wsURL}
          audio={true}
          video={true}
          onLeave={onLeave}
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
        </LiveKitRoom>
      }
    </main>
  );
}
