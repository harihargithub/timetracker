import React from 'react';
import ReactDOM from 'react-dom/client';
import { Fill, ReExtProvider } from '@sencha/reext';
import App from './components/App';

// Initialize ReExt
Fill();

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  
  // ReExt configuration data
  const ReExtData = { 
    sdkversion: "7.8.0", 
    toolkit: "classic", 
    theme: "classic", 
    packages: {
      charts: true,
      fontawesome: true,
      ux: false,
      calendar: false,
      d3: false,
      exporter: false,
      pivot: false,
      pivotd3: false,
      pivotlocale: false,
      froalaeditor: false
    },
    rtl: false, 
    locale: "en", 
    debug: false, 
    urlbase: "./", 
    location: "remote", 
    overrides: false
  };

  // Trial License Key
  const reextKey = 'MEg3VWpNc1Rxbkh4TmU0Q0tjT2trTVZvbzZnbHFUT080WExGTWNmaE5Wei45bHpNNVF6TjNjak0zRWpPaUFIZWxKQ0xpWUhabGhUYjNWV1p6MVdOeGMzWXpjM1lrUmpibEJuTnFGRE1mUldhc0ppT2lJV2R6SnllLjlKaU4xSXpVSUppT2ljR2JoSnll';

  // Render the React application with ReExtProvider
  root.render(
    <React.StrictMode>
      <ReExtProvider ReExtData={ReExtData} splash={true} reextkey={reextKey}>
        <App />
      </ReExtProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}