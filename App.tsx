import React, { useState, useCallback, useRef } from 'react';
import QRCodeCard from './components/QRCodeCard';
import { CompanyLogoIcon } from './components/icons/CompanyLogoIcon';

const App: React.FC = () => {
  const [url1, setUrl1] = useState<string>('');
  const [url2, setUrl2] = useState<string>('');
  const [logoFile, setLogoFile] = useState<string | null>(null);

  const qrCodeRef1 = useRef<HTMLDivElement>(null);
  const qrCodeRef2 = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = useCallback(async <T,>(ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (ref.current) {
      const canvas = ref.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 flex flex-col items-center">
      <header className="w-full bg-umisan-blue text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <CompanyLogoIcon className="h-10 w-auto" />
          <h1 className="text-2xl font-bold tracking-wide">
            Gerador de QR Code
          </h1>
        </div>
      </header>
      
      <div className="w-full max-w-5xl p-4 sm:p-6 lg:p-8">
        <main className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
              Crie QR codes para suas planilhas de produtos químicos ou qualquer outro texto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section 1 */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold border-b pb-2 text-umisan-blue dark:text-umisan-cyan border-gray-200 dark:border-gray-700">QR Code 1</h2>
              <div>
                <label htmlFor="url1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conteúdo (URL ou Texto)
                </label>
                <input
                  type="text"
                  id="url1"
                  value={url1}
                  onChange={(e) => setUrl1(e.target.value)}
                  placeholder="Cole o link ou digite o texto aqui"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-umisan-cyan focus:border-umisan-cyan"
                />
              </div>
            </div>

            {/* Input Section 2 */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold border-b pb-2 text-umisan-blue dark:text-umisan-cyan border-gray-200 dark:border-gray-700">QR Code 2</h2>
              <div>
                <label htmlFor="url2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Conteúdo (URL ou Texto)
                </label>
                <input
                  type="text"
                  id="url2"
                  value={url2}
                  onChange={(e) => setUrl2(e.target.value)}
                  placeholder="Cole o link ou digite o texto aqui"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-umisan-cyan focus:border-umisan-cyan"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center border-t border-gray-200 dark:border-gray-700 pt-8">
              <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo da Empresa - Opcional
              </label>
              <input 
                id="logo-upload"
                type="file"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
                className="block w-full max-w-xs text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-umisan-cyan/20 file:text-umisan-blue
                  dark:file:bg-umisan-cyan/30 dark:file:text-umisan-cyan
                  hover:file:bg-umisan-cyan/30 dark:hover:file:bg-umisan-cyan/40"
              />
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Para melhores resultados, use um logo quadrado.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <QRCodeCard
              ref={qrCodeRef1}
              title="QR Code 1"
              url={url1}
              logoSrc={logoFile}
              onDownload={() => downloadQRCode(qrCodeRef1, 'qrcode-1.png')}
            />
            <QRCodeCard
              ref={qrCodeRef2}
              title="QR Code 2"
              url={url2}
              logoSrc={logoFile}
              onDownload={() => downloadQRCode(qrCodeRef2, 'qrcode-2.png')}
            />
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p><strong>Dica:</strong> Os QR codes gerados são compatíveis com a câmera da maioria dos celulares. Teste-o antes de imprimir.</p>
          </div>
        </main>
        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} UMISAN. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;