export interface SHSTRecord {
  no: number;
  kabKota: string;
  nomorDokumen: string;
  tanggalDitetapkan: string;
  tahunAnggaran: string;
  
  // Harga Satuan Pembangunan Gedung Negara (M2)
  gedungTidakSederhana: number; // Gedung Negara Tidak Sederhana
  gedungSederhana: number;      // Gedung Negara Sederhana
  
  // Harga Satuan Pembangunan Rumah Negara (M2)
  rumahTipeA: number;
  rumahTipeB: number;
  rumahTipeCDE: number;
  
  // Harga Satuan Pembangunan Pagar (M')
  pagarGedungDepan: number;
  pagarGedungSamping: number;
  pagarGedungBelakang: number;
  
  pagarRumahDepan: number;
  pagarRumahSamping: number;
  pagarRumahBelakang: number;

  // PDF custom path or local blob URL override
  pdfUrl?: string;
}

export type DataSourceType = 'local' | 'google-sheets' | 'uploaded-file';

export interface AppConfig {
  dataSourceType: DataSourceType;
  googleSheetCsvUrl: string;
  useLocalPdfOnly: boolean;
}
