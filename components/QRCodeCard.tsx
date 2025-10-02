import React, { forwardRef, useMemo } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { DownloadIcon } from './icons/DownloadIcon';

interface QRCodeCardProps {
  title: string;
  url: string;
  logoSrc: string | null;
  onDownload: () => void;
}

const QRCodeCard = forwardRef<HTMLDivElement, QRCodeCardProps>(({ title, url, logoSrc, onDownload }, ref) => {
  const qrCodeOptions = useMemo(() => ({
    value: url,
    size: 256,
    bgColor: "#ffffff",
    fgColor: "#000000",
    level: "H" as 'L' | 'M' | 'Q' | 'H',
    imageSettings: logoSrc ? {
      src: logoSrc,
      height: 50,
      width: 50,
      excavate: true,
    } : undefined,
  }), [url, logoSrc]);

  const hasContent = useMemo(() => {
    return url.trim().length > 0;
  }, [url]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-umisan-blue dark:text-umisan-cyan mb-4">{title}</h3>
      <div ref={ref} className="p-4 bg-white rounded-md shadow-inner">
        {hasContent ? (
          <QRCodeCanvas {...qrCodeOptions} />
        ) : (
          <div 
            className="w-[256px] h-[256px] flex items-center justify-center bg-gray-100 text-gray-500 text-center p-4 rounded-md"
          >
            Insira um conteúdo no campo acima para gerar o QR Code.
          </div>
        )}
      </div>
      <button
        onClick={onDownload}
        disabled={!hasContent}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-umisan-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-umisan-cyan disabled:bg-gray-400 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 transition-colors"
      >
        <DownloadIcon className="h-5 w-5" />
        Baixar QR Code
      </button>
    </div>
  );
});

export default QRCodeCard;