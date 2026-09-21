import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Map, User, Search, Table } from 'lucide-react';
import { SHSTRecord } from './types';
import { INITIAL_SHST_DATA } from './data/shstData';
import RegionSelector from './components/RegionSelector';
import SHSTTable from './components/SHSTTable';
import SHSTDataTable from './components/SHSTDataTable';
import PDFViewer from './components/PDFViewer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Clear any residual dark mode on layout mount to enforce light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('shst_dark_mode');
  }, []);

  // Application State
  const [records] = useState<SHSTRecord[]>(() => {
    const saved = localStorage.getItem('shst_records');
    return saved ? JSON.parse(saved) : INITIAL_SHST_DATA;
  });

  const [selectedRegion, setSelectedRegion] = useState<string>(() => {
    return localStorage.getItem('shst_selected_region') || "Kabupaten Bangkalan";
  });

  // View mode state: 'search' (detail card layout) or 'table' (spreadsheet table layout)
  const [viewMode, setViewMode] = useState<'search' | 'table'>('search');
  
  // Real-time keyword filter for the table mode search bar
  const [tableSearchQuery, setTableSearchQuery] = useState<string>('');

  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

  const lastUpdated = localStorage.getItem('shst_last_updated') || "27 Maret 2026";

  useEffect(() => {
    localStorage.setItem('shst_selected_region', selectedRegion);
  }, [selectedRegion]);

  // Find the selected record
  const selectedRecord = records.find(r => r.kabKota === selectedRegion);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#212529] font-sans pb-20">
      
      {/* Premium Bootstrap Header / Navbar */}
      <header className="bg-white border-b border-[#dee2e6] py-5 px-4 md:px-8 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Emblems */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0d6efd] text-white rounded flex items-center justify-center shadow-sm shrink-0">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-[#212529] font-sans">
                Portal Informasi SHST Kabupaten dan Kota di Jawa Timur
              </h1>
              <div className="flex items-center gap-2 mt-1 bg-[#e7f1ff] border border-[#b6d4fe] px-2.5 py-1 rounded shadow-xs text-[#084298] text-xs font-semibold font-sans w-fit" id="box-update-terakhir">
                <div className="w-1.5 h-1.5 bg-[#0d6efd] rounded-full animate-pulse shrink-0"></div>
                <span>Update Terakhir: <strong className="font-bold text-[#0d6efd]">{lastUpdated}</strong></span>
              </div>
            </div>
          </div>
 
          {/* Actions Container */}
          <div className="flex items-center gap-3.5 shrink-0 flex-wrap justify-center">
            {/* View Mode Switcher Toggles (Left of Admin) */}
            <div className="inline-flex rounded bg-slate-100 p-1 border border-slate-200" id="view-mode-toggle-group">
              <button
                onClick={() => setViewMode('search')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-sans transition-all cursor-pointer ${
                  viewMode === 'search'
                    ? 'bg-white text-[#0d6efd] shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 border border-transparent'
                }`}
                title="Mode Detail Pencarian"
                id="btn-mode-pencarian"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Pencarian</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-sans transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#0d6efd] shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 border border-transparent'
                }`}
                title="Mode Tabel Database"
                id="btn-mode-tabel"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Tabel</span>
              </button>
            </div>

            {/* Admin Portal Button with User Symbol (Smaller size as requested) */}
            <button
              onClick={() => setShowAdminPanel(true)}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded shadow-xs hover:shadow-sm transition-all text-xs font-semibold cursor-pointer font-sans border border-transparent"
              id="btn-admin-panel"
            >
              <User className="w-3.5 h-3.5 text-[#0d6efd]" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </header>
 
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* SECTION 1: SELECTION AND REGION DROPDOWN (ONLY RENDER IN SEARCH VIEW MODE) */}
        {viewMode === 'search' && (
          <motion.section 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-[#dee2e6] rounded shadow-sm p-5 md:p-6 overflow-visible" 
            id="section-selection"
          >
            <RegionSelector 
              regions={records.map(r => r.kabKota)}
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
            />
          </motion.section>
        )}
 
        {/* SECTION 2: DATATABLE AND VISUAL METRICS */}
        <section id="section-data-display" className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#dee2e6] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5.5 bg-[#0d6efd] rounded"></span>
              <h3 className="text-base font-bold text-[#212529] uppercase tracking-wider font-sans">
                STANDAR HARGA SATUAN TERTINGGI
              </h3>
            </div>

            {/* Search and Legend side for Table View */}
            {viewMode === 'table' && (
              <div className="flex flex-wrap items-center gap-4 md:gap-6 animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Legend items as requested (Data Tersedia, Data Belum Tersedia, Aktif) */}
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-600 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-white border border-[#dee2e6] inline-block"></span>
                    <span>Data Tersedia</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-50 border border-rose-200 inline-block"></span>
                    <span>Data Belum Tersedia</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-50 border border-blue-200 inline-block"></span>
                    <span>Aktif</span>
                  </div>
                </div>

                {/* Search input bar */}
                <div className="relative w-full md:w-56">
                  <input
                    type="text"
                    value={tableSearchQuery}
                    onChange={(e) => setTableSearchQuery(e.target.value)}
                    placeholder="Cari Kab/Kota"
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-[#dee2e6] rounded text-xs font-sans font-medium text-[#212529] focus:outline-hidden focus:ring-1 focus:ring-[#0d6efd] focus:border-[#0d6efd] placeholder:text-[#6c757d]"
                    id="table-search-input"
                  />
                  <Search className="w-4 h-4 text-[#6c757d] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
 
          {viewMode === 'search' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              key={selectedRegion}
            >
              <SHSTTable record={selectedRecord} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              key="table-view"
            >
              <SHSTDataTable 
                records={records}
                searchQuery={tableSearchQuery}
                selectedRegion={selectedRegion}
                onSelectRegion={(region) => {
                  setSelectedRegion(region);
                }}
              />
            </motion.div>
          )}
        </section>
 
        {/* SECTION 3: PDF EMBED VIEWER (DIRECT SHOW) */}
        <section id="section-pdf-viewer" className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#dee2e6] pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5.5 bg-[#dc3545] rounded"></span>
              <h3 className="text-base font-bold text-[#212529] uppercase tracking-wider font-sans">
                LAMPIRAN
              </h3>
            </div>
          </div>
 
          {selectedRecord ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              key={selectedRegion}
            >
              <PDFViewer 
                regionName={selectedRegion} 
                configuredPdfUrl={selectedRecord.pdfUrl || `/pdf/shst_sample_1.pdf`}
              />
            </motion.div>
          ) : (
            <div className="bg-[#f8f9fa] border border-[#dee2e6] rounded p-6 text-center text-[#6c757d] text-sm font-sans">
              Pilih wilayah untuk melihat lampiran PDF
            </div>
          )}
        </section>
 
      </main>
 
      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
}
