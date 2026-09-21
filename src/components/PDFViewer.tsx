import React from 'react';
import { FileText, Download } from 'lucide-react';

interface PDFViewerProps {
  regionName: string;
  configuredPdfUrl: string; // e.g., "/pdf/shst_sample_1.pdf"
}

export default function PDFViewer({ regionName, configuredPdfUrl }: PDFViewerProps) {
  return (
    <div className="bg-white rounded border border-[#dee2e6] overflow-hidden shadow-sm" id="pdf-viewer-card">
      {/* Header */}
      <div className="px-4 py-3 bg-[#f8f9fa] border-b border-[#dee2e6] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#f8d7da] text-[#dc3545] rounded flex items-center justify-center border border-[#f5c2c7]">
            <FileText className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#212529] m-0 font-sans">Lampiran Dokumen PDF SHST</h4>
            <p className="text-[11px] text-[#6c757d] m-0 font-sans">
              {regionName} (Konfigurasi File: {configuredPdfUrl})
            </p>
          </div>
        </div>

        {/* Live file action */}
        <div className="flex items-center gap-2">
          <a
            href={configuredPdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6efd] hover:bg-[#e7f1ff] border border-[#0d6efd] px-3 py-1.5 rounded transition-all bg-white cursor-pointer font-sans"
          >
            <span>Unduh PDF</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Full-width PDF Frame Viewer */}
      <div className="p-3 bg-white h-[650px] flex flex-col">
        <div className="flex-1 bg-[#e9ecef] rounded overflow-hidden border border-[#dee2e6] relative">
          <iframe
            src={`${configuredPdfUrl}#toolbar=1`}
            className="w-full h-full border-0"
            title={`PDF Viewer ${regionName}`}
          />
        </div>
      </div>
    </div>
  );
}
