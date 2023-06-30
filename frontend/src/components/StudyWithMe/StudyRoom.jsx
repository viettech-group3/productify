import {
  formatChatMessageLinks,
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react';
import './globalRoom.css';

import { stopReportingRuntimeErrors } from 'react-error-overlay';
import { LogLevel } from 'livekit-client';

import { VideoPresets } from 'livekit-client';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { DebugMode } from '../../service/util';

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
      'http://localhost:5000/api/studywithme/leave',
      {
        token,
      },
      config,
    );
    navigate('/calendar');
  };

  const roomOptions = useMemo(() => {
    return {
      videoCaptureDefaults: {
        resolution: VideoPresets.h720,
      },
      publishDefaults: {
        red: false,
        dtx: false,
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
    };
  }, []);

  return (
    <main>
      <LiveKitRoom
        data-lk-theme="default"
        token={token}
        serverUrl={wsURL}
        audio={true}
        video={true}
        options={roomOptions}
        // options={roomOptions}
        onDisconnected={() => {
          onLeave();
        }}
      >
        <VideoConference chatMessageFormatter={formatChatMessageLinks} />
        <DebugMode logLevel={LogLevel.info} />
      </LiveKitRoom>
    </main>
  );
}
