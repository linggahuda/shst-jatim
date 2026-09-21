import React from 'react';
import { SHSTRecord } from '../types';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface SHSTDataTableProps {
  records: SHSTRecord[];
  searchQuery: string;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export default function SHSTDataTable({
  records,
  searchQuery,
  selectedRegion,
  onSelectRegion,
}: SHSTDataTableProps) {
  
  // Format price into IDR Rupiah (Accounting Format: Rp on far left, Value on far right)
  const renderAccountingPrice = (value: number | undefined | null) => {
    if (value === undefined || value === null || value === 0) {
      return <span className="text-black font-normal font-sans text-center block w-full text-[14px]">-</span>;
    }
    const formattedVal = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return (
      <div className="flex items-center justify-between w-full px-2.5 font-sans text-[14px] font-normal text-black">
        <span className="text-black/40 font-normal select-none">Rp</span>
        <span className="text-right text-black font-normal">{formattedVal}</span>
      </div>
    );
  };

  // Convert date format or Excel serial date
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

  // Check if all price fields in the record are empty
  const isRecordEmpty = (record: SHSTRecord) => {
    return (
      !record.gedungTidakSederhana &&
      !record.gedungSederhana &&
      !record.rumahTipeA &&
      !record.rumahTipeB &&
      !record.rumahTipeCDE &&
      !record.pagarGedungDepan &&
      !record.pagarGedungSamping &&
      !record.pagarGedungBelakang &&
      !record.pagarRumahDepan &&
      !record.pagarRumahSamping &&
      !record.pagarRumahBelakang
    );
  };

  // Filter records based on search query
  const filteredRecords = records.filter(record => {
    if (!searchQuery) return true;
    return record.kabKota.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white border border-[#dee2e6] rounded shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-200" id="shst-datatable-container">
      {/* Scrollable spreadsheet viewport */}
      <div className="overflow-auto max-h-[580px] h-[580px] relative scrollbar-thin">
        <table className="w-full text-left border-collapse table-fixed text-[14px] font-sans text-black font-normal">
          {/* Defined column widths to ensure perfect horizontal align and freezing */}
          <colgroup><col className="w-[48px]" /><col className="w-[170px]" /><col className="w-[100px]" /><col className="w-[280px]" /><col className="w-[150px]" /><col className="w-[160px]" /><col className="w-[160px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /><col className="w-[140px]" /></colgroup>
          <thead>
            {/* Header Utama Row 1 */}
            <tr className="bg-[#f8f9fa] text-black border-b border-[#dee2e6]">
              <th 
                rowSpan={2} 
                className="px-3 py-3 border-r border-[#dee2e6] text-center bg-[#f8f9fa] font-bold font-sans text-[14px] text-black sticky top-0 left-0 z-30 shadow-xs"
              >
                No
              </th>
              <th 
                rowSpan={2} 
                className="px-4 py-3 border-r border-[#dee2e6] text-center bg-[#f8f9fa] font-bold font-sans text-[14px] text-black sticky top-0 left-[48px] z-30 shadow-xs border-b border-[#dee2e6]"
              >
                Kabupaten / Kota
              </th>
              <th 
                rowSpan={2} 
                className="px-3 py-3 border-r border-[#dee2e6] text-center bg-[#f8f9fa] font-bold font-sans text-[14px] text-black sticky top-0 left-[218px] z-30 shadow-xs leading-tight"
              >
                Tahun<br/>Anggaran
              </th>
              <th 
                rowSpan={2} 
                className="px-4 py-3 border-r border-[#dee2e6] text-center bg-[#f8f9fa] font-bold font-sans text-[14px] text-black sticky top-0 z-20 shadow-xs"
              >
                Nomor Dokumen
              </th>
              <th 
                rowSpan={2} 
                className="px-4 py-3 border-r border-[#dee2e6] text-center bg-[#f8f9fa] font-bold font-sans text-[14px] text-black sticky top-0 z-20 shadow-xs"
              >
                Tanggal Ditetapkan
              </th>
              
              <th colSpan={2} className="px-4 py-2.5 bg-[#fffbf0] text-black text-center font-bold font-sans text-[14px] border-r border-b border-[#dee2e6] sticky top-0 z-20 shadow-xs">
                Harga Satuan Pembangunan Gedung Negara (M²)
              </th>
              <th colSpan={3} className="px-4 py-2.5 bg-[#f0faf4] text-black text-center font-bold font-sans text-[14px] border-r border-b border-[#dee2e6] sticky top-0 z-20 shadow-xs">
                Harga Satuan Pembangunan Rumah Negara (M²)
              </th>
              <th colSpan={3} className="px-4 py-2.5 bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] border-r border-b border-[#dee2e6] sticky top-0 z-20 shadow-xs">
                Harga Satuan Pembangunan Pagar Gedung Negara (M')
              </th>
              <th colSpan={3} className="px-4 py-2.5 bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] border-b border-[#dee2e6] sticky top-0 z-20 shadow-xs">
                Harga Satuan Pembangunan Pagar Rumah Negara (M')
              </th>
            </tr>

            {/* Header Sub-Kolom Row 2 */}
            <tr className="bg-[#f8f9fa] text-black border-b border-[#dee2e6]">
              {/* Gedung */}
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#fffbf0] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Gedung Tidak Sederhana
              </th>
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#fffbf0] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Gedung Sederhana
              </th>
              
              {/* Rumah */}
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0faf4] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Rumah Tipe A
              </th>
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0faf4] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Rumah Tipe B
              </th>
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0faf4] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Rumah Tipe C, D, E
              </th>
              
              {/* Pagar Gedung */}
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Pagar Depan
              </th>
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Pagar Samping
              </th>
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Pagar Belakang
              </th>
              
              {/* Pagar Rumah */}
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Pagar Depan
              </th>
              <th className="px-4 py-2 border-r border-[#dee2e6] bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Pagar Samping
              </th>
              <th className="px-4 py-2 border-[#dee2e6] bg-[#f0f8fa] text-black text-center font-bold font-sans text-[14px] sticky top-[44px] z-20 shadow-xs">
                Pagar Belakang
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={16} className="px-4 py-12 text-center text-black font-sans text-[14px] font-normal">
                  Tidak ditemukan data Kabupaten/Kota yang cocok dengan kata kunci pencarian.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => {
                const isSelected = selectedRegion === record.kabKota;
                const isEmpty = isRecordEmpty(record);
                const budgetYear = Number(record.tahunAnggaran);

                // Badge colors for Budget Year
                let yearBadgeColor = 'text-gray-600 bg-gray-50 border-gray-200';
                let YearBadgeIcon = null;

                if (!isNaN(budgetYear) && record.tahunAnggaran) {
                  if (budgetYear === currentYear) {
                    yearBadgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200 font-normal';
                    YearBadgeIcon = CheckCircle2;
                  } else if (budgetYear === currentYear - 1) {
                    yearBadgeColor = 'text-amber-700 bg-amber-50 border-amber-200 font-normal';
                    YearBadgeIcon = AlertTriangle;
                  } else {
                    yearBadgeColor = 'text-rose-700 bg-rose-50 border-rose-200 font-normal';
                    YearBadgeIcon = AlertCircle;
                  }
                }

                // Dynamic background values for frozen columns to avoid text transparency bleed-through
                let baseBgClass = 'bg-white hover:bg-slate-50';
                let frozenNoBg = 'bg-white group-hover:bg-slate-50 border-l-4 border-l-transparent';
                let frozenRegionBg = 'bg-white group-hover:bg-slate-50';
                let frozenYearBg = 'bg-white group-hover:bg-slate-50';

                if (isEmpty) {
                  baseBgClass = 'bg-rose-50/70 hover:bg-rose-100/60 text-rose-950';
                  frozenNoBg = 'bg-[#fff1f2] border-l-4 border-l-transparent';
                  frozenRegionBg = 'bg-[#fff1f2]';
                  frozenYearBg = 'bg-[#fff1f2]';
                } else if (isSelected) {
                  baseBgClass = 'bg-blue-50/40 hover:bg-blue-50/60';
                  frozenNoBg = 'bg-[#eff6ff] border-l-4 border-l-[#0d6efd]';
                  frozenRegionBg = 'bg-[#eff6ff]';
                  frozenYearBg = 'bg-[#eff6ff]';
                }

                return (
                  <tr
                    key={record.kabKota}
                    onClick={() => onSelectRegion(record.kabKota)}
                    className={`${baseBgClass} group border-b border-[#dee2e6] transition-colors cursor-pointer`}
                    id={`row-${record.kabKota.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {/* No (Frozen) */}
                    <td className={`px-3 py-3 border-r border-[#dee2e6] text-center font-normal font-sans text-[14px] text-black sticky left-0 z-10 ${frozenNoBg}`}>
                      {record.no}
                    </td>
                    
                    {/* Kabupaten / Kota (Frozen, Left-Aligned) */}
                    <td className={`px-4 py-3 border-r border-[#dee2e6] text-left sticky left-[48px] z-10 ${frozenRegionBg}`}>
                      <div className="flex flex-col font-sans text-[14px] text-black font-normal">
                        <span>{record.kabKota}</span>
                        {isEmpty && (
                          <span className="text-[14px] text-rose-600 font-normal leading-tight mt-0.5">
                            Belum tersedia
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tahun Anggaran (Frozen) */}
                    <td className={`px-2 py-3 border-r border-[#dee2e6] text-center sticky left-[218px] z-10 ${frozenYearBg}`}>
                      <div className={`inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded border text-[14px] font-normal font-sans w-[72px] mx-auto ${yearBadgeColor}`}>
                        <span>{record.tahunAnggaran || '-'}</span>
                        {YearBadgeIcon && <YearBadgeIcon className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                    </td>

                    {/* Nomor Dokumen (Left-Aligned, Word Wrap Enabled) */}
                    <td className="px-4 py-3 border-r border-[#dee2e6] text-left font-normal text-black whitespace-normal break-words font-sans text-[14px]">
                      {record.nomorDokumen || '-'}
                    </td>

                    {/* Tanggal Ditetapkan (Centered) */}
                    <td className="px-4 py-3 border-r border-[#dee2e6] text-center text-black font-normal font-sans text-[14px]">
                      {formatTanggal(record.tanggalDitetapkan)}
                    </td>

                    {/* Gedung Tidak Sederhana */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.gedungTidakSederhana)}
                    </td>

                    {/* Gedung Sederhana */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.gedungSederhana)}
                    </td>

                    {/* Rumah Tipe A */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.rumahTipeA)}
                    </td>

                    {/* Rumah Tipe B */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.rumahTipeB)}
                    </td>

                    {/* Rumah Tipe CDE */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.rumahTipeCDE)}
                    </td>

                    {/* Pagar Gedung Depan */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.pagarGedungDepan)}
                    </td>

                    {/* Pagar Gedung Samping */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.pagarGedungSamping)}
                    </td>

                    {/* Pagar Gedung Belakang */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.pagarGedungBelakang)}
                    </td>

                    {/* Pagar Rumah Depan */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.pagarRumahDepan)}
                    </td>

                    {/* Pagar Rumah Samping */}
                    <td className="px-1.5 py-3 border-r border-[#dee2e6] text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.pagarRumahSamping)}
                    </td>

                    {/* Pagar Rumah Belakang */}
                    <td className="px-1.5 py-3 text-center font-sans text-[14px] text-black font-normal">
                      {renderAccountingPrice(record.pagarRumahBelakang)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
