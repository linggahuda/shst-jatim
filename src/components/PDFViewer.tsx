import React, { useState, useEffect } from 'react';
import { FileText, Download, FileQuestion, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { 
  getGoogleDrivePreviewUrl, 
  getGoogleDriveDownloadUrl 
} from '../data/shstData';

interface PDFViewerProps {
  regionName: string;
  configuredPdfUrl?: string;
  isAvailable?: boolean;
}

export default function PDFViewer({ 
  regionName, 
  configuredPdfUrl,
  isAvailable = true
}: PDFViewerProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loaded state when region or url changes
  useEffect(() => {
    setIsLoaded(false);
  }, [regionName, configuredPdfUrl]);

  // Check if PDF exists and is available
  const hasPdf = Boolean(configuredPdfUrl && configuredPdfUrl.trim() !== '' && isAvailable);

  if (!hasPdf) {
    return (
      <div className="bg-white rounded border border-[#dee2e6] overflow-hidden shadow-xs" id="pdf-viewer-card">
        {/* Header */}
        <div className="px-4 py-3 bg-[#f8f9fa] border-b border-[#dee2e6] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 text-slate-400 rounded flex items-center justify-center border border-slate-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#212529] m-0 font-sans">Berkas PDF</h4>
              <p className="text-[11px] text-[#6c757d] m-0 font-sans">
                {regionName}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200 font-sans">
            Data Belum Tersedia
          </span>
        </div>

        {/* Centered empty container box with proportional text */}
        <div 
          className="p-8 md:p-12 bg-white min-h-[300px] md:min-h-[360px] flex flex-col items-center justify-center text-center select-none"
          id="pdf-container-empty"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-2.5 shadow-2xs">
            <FileQuestion className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-700 font-sans tracking-tight">
            Belum Tersedia
          </h3>
        </div>
      </div>
    );
  }

  const previewUrl = getGoogleDrivePreviewUrl(configuredPdfUrl) || configuredPdfUrl;
  const downloadUrl = getGoogleDriveDownloadUrl(configuredPdfUrl) || configuredPdfUrl;

  return (
    <div className="bg-white rounded border border-[#dee2e6] overflow-hidden shadow-xs" id="pdf-viewer-card">
      {/* Header */}
      <div className="px-4 py-3 bg-[#f8f9fa] border-b border-[#dee2e6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f8d7da] text-[#dc3545] rounded flex items-center justify-center border border-[#f5c2c7] shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[#212529] m-0 font-sans truncate">Berkas PDF</h4>
            <p className="text-[11px] text-[#6c757d] m-0 font-sans truncate">
              {regionName}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {isLoaded && (
            <>
              <button
                onClick={() => setIframeKey((prev) => prev + 1)}
                title="Muat Ulang Tampilan"
                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded border border-[#dee2e6] transition-all bg-white cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsLoaded(false)}
                title="Sembunyikan Dokumen"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-[#dee2e6] px-2.5 py-1.5 rounded transition-all bg-white cursor-pointer font-sans"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Sembunyikan</span>
              </button>
            </>
          )}

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={`${regionName.replace(/\s+/g, '_')}_SHST.pdf`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#0d6efd] hover:bg-[#0b5ed7] px-3 py-1.5 rounded transition-all cursor-pointer font-sans shadow-xs"
            id="btn-download-pdf"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh PDF</span>
          </a>
        </div>
      </div>

      {/* PDF Container Area */}
      {isLoaded ? (
        <div className="p-3 bg-white h-[650px] flex flex-col" id="pdf-container-box">
          <div className="flex-1 bg-[#e9ecef] rounded overflow-hidden border border-[#dee2e6] relative">
            <iframe
              key={iframeKey}
              src={previewUrl}
              className="w-full h-full border-0"
              title={`PDF Lampiran SHST ${regionName}`}
              allow="autoplay"
            />
          </div>
        </div>
      ) : (
        <div 
          className="p-8 md:p-14 bg-white min-h-[300px] md:min-h-[360px] flex flex-col items-center justify-center text-center select-none"
          id="pdf-placeholder-container"
        >
          <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0d6efd] mb-4 shadow-2xs">
            <FileText className="w-7 h-7" />
          </div>
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d6efd] hover:bg-[#0b5ed7] active:scale-[0.98] text-white rounded font-sans text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            id="btn-tampilkan-dokumen"
          >
            <Eye className="w-4 h-4" />
            <span>Tampilkan Dokumen</span>
          </button>
        </div>
      )}
    </div>
  );
}
