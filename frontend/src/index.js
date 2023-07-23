import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import store from './store/store';
import { Provider } from 'react-redux';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const supabase = createClient(
  'https://pgjigosajoukdhptiupm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnamlnb3Nham91a2RocHRpdXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2OTYyNzEsImV4cCI6MjAwNTI3MjI3MX0.Bq7FnDchX41mHftNS7k4eFfMqYcUk25ajyE2Gjw40QU',
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="225763645761-hsk3k9suo4qdjenika5i9deutkg7h5u1.apps.googleusercontent.com">
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <App />
      </Provider>
    </SessionContextProvider>
  </GoogleOAuthProvider>,
);
