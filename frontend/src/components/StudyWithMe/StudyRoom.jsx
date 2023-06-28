import {
  formatChatMessageLinks,
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudyRoom() {
  const navigate = useNavigate();
  const { token } = useParams();
  const wsURL = 'wss://test-9yy8lq1j.livekit.cloud';
  const onLeave = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    await axios.post(
      'http://localhost:8080/api/studywithme/leave',
      {
        token,
      },
      config,
    );
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
          onDisconnected={() => {
            console.log('leaving');
            onLeave();
          }}
        >
          <VideoConference chatMessageFormatter={formatChatMessageLinks} />
        </LiveKitRoom>
      }
    </main>
  );
}
