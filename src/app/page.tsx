'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function QrGeneratorPage() {
  const [text, setText] = useState('https://davidaliaga.vercel.app/');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'codigo-qr.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-100 font-sans p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl transition-shadow duration-300 hover:shadow-indigo-100">

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
          Generador de QR
        </h1>

        <div ref={qrRef} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg border border-slate-200">
          <QRCodeCanvas
            value={text || 'https://google.com'}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#0d1117"}
            level={"H"}
            includeMargin={true}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="text-input" className="mb-2 block font-semibold text-slate-700">
              Introduce tu texto o URL
            </label>
            <input
              id="text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              placeholder="https://ejemplo.com"
            />
          </div>

          <button
            onClick={handleDownload}
            disabled={!text}
            className="flex items-center justify-center w-full px-6 py-3 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar como PNG
          </button>
        </div>
      </div>
    </main>
  );
}
