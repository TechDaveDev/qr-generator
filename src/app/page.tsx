'use client';

import { useState, useRef, useEffect } from 'react';

import { QRCodeCanvas } from 'qrcode.react';
import { Download, Github, Moon, Sun } from '@/components/icons';


export default function QrGeneratorPage() {
  const [text, setText] = useState('https://davidaliaga.vercel.app/');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDarkMode(true);
    }
  }, [])

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
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <main className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#0f172a] font-sans p-6 transition-colors duration-500">

        {/* card */}
        <div className="w-full max-w-[420px] bg-white dark:bg-[#1e293b] rounded-[40px] shadow-2xl dark:shadow-none p-10 space-y-10 border border-slate-100 dark:border-slate-800 transition-colors duration-500">

          <h1 className="text-[28px] font-bold text-center text-[#4255ff] dark:text-[#818cf8] tracking-tight transition-colors duration-500">
            Generador de QR
          </h1>

          {/* qr area */}
          <div className="relative">
            <div className="bg-[#38665c] aspect-square rounded-[32px] flex items-center justify-center p-8 overflow-hidden relative shadow-inner">
              <div
                ref={qrRef}
                className="bg-white aspect-square w-4/5 flex items-center justify-center rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform -rotate-1 transition-transform hover:rotate-0 hover:scale-105 duration-300"
              >
                <QRCodeCanvas
                  value={text || 'https://davidaliaga.vercel.app/'}
                  size={160}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                />
              </div>
            </div>
          </div>

          {/* input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="text-input" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 transition-colors duration-500">
                Introduce tu texto o URL
              </label>
              <input
                id="text-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-[#0f172a]/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors duration-500"
                placeholder="https://tulink.com"
              />
            </div>

            {/* donwload button */}
            <button
              onClick={handleDownload}
              disabled={!text}
              className="flex items-center justify-center w-full px-6 py-4 font-bold text-white bg-[#4f46e5] rounded-2xl hover:bg-indigo-600 active:scale-95 transition-all duration-500 shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50"
            >
              <Download />
              Descargar como PNG
            </button>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-10 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3">

            <a
              href="https://github.com/TechDaveDev"
              target="_blank"
              className="flex items-center space-x-2 px-8 py-2.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-500 shadow-sm"
            >
              <Github />
              <span className="font-semibold text-sm">GitHub</span>
            </a>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-500 shadow-sm"
            >
              {isDarkMode ? (
                <Sun />
              ) : (
                <Moon />
              )}
            </button>
          </div>

          <footer className="text-slate-400 dark:text-slate-500 text-sm font-light">
            Creado por <a
              href="https://davidaliaga.vercel.app/"
              target="_blank"
              className="hover:text-indigo-500 transition-colors font-medium decoration-slate-200 dark:decoration-slate-800"
            >
              David Aliaga
            </a>
          </footer>
        </div>

      </main>
    </div>
  );
}