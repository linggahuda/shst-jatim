import React from 'react';
import { SHSTRecord } from '../types';
import { Calendar, Building2, Home, Fence, Info, Map, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface SHSTTableProps {
  record: SHSTRecord | undefined;
}

export default function SHSTTable({ record }: SHSTTableProps) {
  if (!record) {
    return (
      <div className="bg-white border border-[#dee2e6] rounded p-5 text-center shadow-sm">
        <div className="max-w-md mx-auto py-8">
          <div className="w-11 h-11 bg-[#f8f9fa] text-[#6c757d] rounded-full flex items-center justify-center mx-auto mb-3 border border-[#dee2e6]">
            <Info className="w-5.5 h-5.5" />
          </div>
          <h4 className="text-base font-bold text-[#212529] mb-1 font-sans">Data Belum Dipilih</h4>
          <p className="text-sm text-[#6c757d] font-sans">
            Silakan pilih Kabupaten atau Kota.
          </p>
        </div>
      </div>
    );
  }

  // Indonesian Rupiah Formatter
  const formatRupiah = (value: number | undefined | null) => {
    if (value === undefined || value === null || value === 0) {
      return '-';
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatTanggal = (val: string | number | undefined): string => {
    if (!val) return '-';
    const serial = Number(val);
    if (isNaN(serial) || serial <= 0) {
      return String(val);
    }
    const epoch = new Date(1899, 11, 30);
    const dateObj = new Date(epoch.getTime() + serial * 24 * 60 * 60 * 1000);
    
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Get current active year
  const currentYear = new Date().getFullYear();
  const budgetYear = Number(record.tahunAnggaran);

  let yearBadgeClass = '';
  let YearIcon: React.ComponentType<{ className?: string }> | null = null;

  if (isNaN(budgetYear) || !record.tahunAnggaran) {
    yearBadgeClass = 'text-gray-500 bg-gray-50 border-gray-200';
    YearIcon = null;
  } else if (budgetYear === currentYear) {
    // Current year: Green + checkmark (centang)
    yearBadgeClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    YearIcon = CheckCircle2;
  } else if (budgetYear === currentYear - 1) {
    // 1 year before: Yellow/Amber + caution mark
    yearBadgeClass = 'text-amber-700 bg-amber-50 border-amber-200';
    YearIcon = AlertTriangle;
  } else {
    // >= 2 years before or other: Red + exclamation mark
    yearBadgeClass = 'text-rose-700 bg-rose-50 border-rose-200';
    YearIcon = AlertCircle;
  }

  return (
    <div className="space-y-4" id="shst-data-display">
      
      {/* 1. HEADER BANNER (Kabupaten on the Left, Metadata in one uniform style on the Right) */}
      <div className="bg-white border border-[#dee2e6] rounded p-4 md:p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#e7f1ff] text-[#0d6efd] rounded flex items-center justify-center border border-[#b6d4fe] shrink-0">
            <Map className="w-5.5 h-5.5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#212529] m-0 font-sans">
              {record.kabKota}
            </h3>
          </div>
        </div>

        {/* Unified Metadata (Nomor Dokumen, Tanggal Ditetapkan, Tahun Anggaran) */}
        <div className="flex flex-col md:flex-row gap-6 bg-[#f8f9fa] border border-[#dee2e6] p-4 rounded w-full lg:w-auto lg:ml-auto shrink-0">
          <div className="flex-1 min-w-0 md:max-w-md lg:max-w-lg space-y-0.5">
            <span className="block text-[11px] font-bold text-[#6c757d] uppercase tracking-wider font-sans">SUMBER DATA</span>
            <span className="text-sm font-semibold text-[#212529] leading-relaxed font-sans block break-words" title={record.nomorDokumen || '-'}>
              {record.nomorDokumen || '-'}
            </span>
          </div>
          
          <div className="space-y-0.5 border-t md:border-t-0 md:border-l border-[#dee2e6] pt-3 md:pt-0 md:pl-6 shrink-0 md:w-56">
            <span className="block text-[11px] font-bold text-[#6c757d] uppercase tracking-wider font-sans">Tanggal Ditetapkan</span>
            <span className="text-sm font-semibold text-[#212529] font-sans flex items-center gap-1.5 leading-normal whitespace-nowrap">
              <Calendar className="w-4 h-4 text-[#0d6efd] shrink-0" />
              {formatTanggal(record.tanggalDitetapkan)}
            </span>
          </div>

          <div className="space-y-0.5 border-t md:border-t-0 md:border-l border-[#dee2e6] pt-3 md:pt-0 md:pl-6 shrink-0 md:w-44">
            <span className="block text-[11px] font-bold text-[#6c757d] uppercase tracking-wider font-sans">Tahun Anggaran</span>
            <div className={`text-sm font-bold font-sans flex items-center justify-between border px-2.5 py-0.5 rounded w-full leading-normal whitespace-nowrap ${yearBadgeClass}`}>
              <span>{record.tahunAnggaran || '-'}</span>
              {YearIcon && <YearIcon className="w-4 h-4 shrink-0" />}
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE METRICS CARDS (Gedung, Rumah, Pagar) - Proportional widths for unified text sizing */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Card A: Pembangunan Gedung Negara - 25% width on desktop */}
        <div className="w-full lg:w-[25%] bg-white rounded p-4 border border-[#dee2e6] shadow-sm flex flex-col justify-between hover:border-[#b6d4fe] transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-[#fff3cd] text-[#664d03] rounded flex items-center justify-center border border-[#ffe69c] shrink-0">
                <Building2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#212529] font-sans m-0">Pembangunan Gedung Negara</h4>
                <p className="text-[11px] text-[#6c757d] font-sans m-0">Harga Satuan per M²</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#dee2e6] flex flex-col gap-0.5">
                <span className="text-xs font-medium text-[#495057] font-sans">Gedung Tidak Sederhana</span>
                <span className="text-base font-bold text-black font-sans">{formatRupiah(record.gedungTidakSederhana)}</span>
              </div>
              
              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#dee2e6] flex flex-col gap-0.5">
                <span className="text-xs font-medium text-[#495057] font-sans">Gedung Sederhana</span>
                <span className="text-base font-bold text-black font-sans">{formatRupiah(record.gedungSederhana)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card B: Pembangunan Rumah Negara - 25% width on desktop */}
        <div className="w-full lg:w-[25%] bg-white rounded p-4 border border-[#dee2e6] shadow-sm flex flex-col justify-between hover:border-[#b6d4fe] transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-[#d1e7dd] text-[#0f5132] rounded flex items-center justify-center border border-[#badbcc] shrink-0">
                <Home className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#212529] font-sans m-0">Pembangunan Rumah Negara</h4>
                <p className="text-[11px] text-[#6c757d] font-sans m-0">Harga Satuan per M²</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#dee2e6] flex flex-col gap-0.5">
                <span className="text-xs font-medium text-[#495057] font-sans">Rumah Tipe A</span>
                <span className="text-base font-bold text-black font-sans">{formatRupiah(record.rumahTipeA)}</span>
              </div>
              
              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#dee2e6] flex flex-col gap-0.5">
                <span className="text-xs font-medium text-[#495057] font-sans">Rumah Tipe B</span>
                <span className="text-base font-bold text-black font-sans">{formatRupiah(record.rumahTipeB)}</span>
              </div>

              <div className="p-2.5 bg-[#f8f9fa] rounded border border-[#dee2e6] flex flex-col gap-0.5">
                <span className="text-xs font-medium text-[#495057] font-sans">Rumah Tipe C, D, E</span>
                <span className="text-base font-bold text-black font-sans">{formatRupiah(record.rumahTipeCDE)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card C: Pembangunan Pagar - 50% width on desktop to allow uniform font size */}
        <div className="w-full lg:w-[50%] bg-white rounded p-4 border border-[#dee2e6] shadow-sm flex flex-col justify-between hover:border-[#b6d4fe] transition-all">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-[#cff4fc] text-[#055160] rounded flex items-center justify-center border border-[#b6effb] shrink-0">
                <Fence className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#212529] font-sans m-0">Pembangunan Pagar</h4>
                <p className="text-[11px] text-[#6c757d] font-sans m-0">Harga Satuan per M'</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Pagar Gedung */}
              <div className="space-y-1">
                <span className="block text-xs font-bold text-[#495057] uppercase tracking-wider font-sans">Pagar Gedung Negara</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="p-2 bg-[#f8f9fa] rounded border border-[#dee2e6] text-left">
                    <span className="block text-[11px] text-[#6c757d] font-medium font-sans mb-0.5">Depan</span>
                    <span className="text-base font-bold text-black font-sans block truncate" title={formatRupiah(record.pagarGedungDepan)}>
                      {formatRupiah(record.pagarGedungDepan)}
                    </span>
                  </div>
                  <div className="p-2 bg-[#f8f9fa] rounded border border-[#dee2e6] text-left">
                    <span className="block text-[11px] text-[#6c757d] font-medium font-sans mb-0.5">Samping</span>
                    <span className="text-base font-bold text-black font-sans block truncate" title={formatRupiah(record.pagarGedungSamping)}>
                      {formatRupiah(record.pagarGedungSamping)}
                    </span>
                  </div>
                  <div className="p-2 bg-[#f8f9fa] rounded border border-[#dee2e6] text-left">
                    <span className="block text-[11px] text-[#6c757d] font-medium font-sans mb-0.5">Belakang</span>
                    <span className="text-base font-bold text-black font-sans block truncate" title={formatRupiah(record.pagarGedungBelakang)}>
                      {formatRupiah(record.pagarGedungBelakang)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pagar Rumah */}
              <div className="space-y-1">
                <span className="block text-xs font-bold text-[#495057] uppercase tracking-wider font-sans">Pagar Rumah Negara</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="p-2 bg-[#f8f9fa] rounded border border-[#dee2e6] text-left">
                    <span className="block text-[11px] text-[#6c757d] font-medium font-sans mb-0.5">Depan</span>
                    <span className="text-base font-bold text-black font-sans block truncate" title={formatRupiah(record.pagarRumahDepan)}>
                      {formatRupiah(record.pagarRumahDepan)}
                    </span>
                  </div>
                  <div className="p-2 bg-[#f8f9fa] rounded border border-[#dee2e6] text-left">
                    <span className="block text-[11px] text-[#6c757d] font-medium font-sans mb-0.5">Samping</span>
                    <span className="text-base font-bold text-black font-sans block truncate" title={formatRupiah(record.pagarRumahSamping)}>
                      {formatRupiah(record.pagarRumahSamping)}
                    </span>
                  </div>
                  <div className="p-2 bg-[#f8f9fa] rounded border border-[#dee2e6] text-left">
                    <span className="block text-[11px] text-[#6c757d] font-medium font-sans mb-0.5">Belakang</span>
                    <span className="text-base font-bold text-black font-sans block truncate" title={formatRupiah(record.pagarRumahBelakang)}>
                      {formatRupiah(record.pagarRumahBelakang)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
