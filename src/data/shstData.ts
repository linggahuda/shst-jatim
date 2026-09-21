import { SHSTRecord } from '../types';

export const EAST_JAVA_REGIONS = [
  "Kabupaten Bangkalan",
  "Kabupaten Banyuwangi",
  "Kabupaten Blitar",
  "Kabupaten Bojonegoro",
  "Kabupaten Bondowoso",
  "Kabupaten Gresik",
  "Kabupaten Jember",
  "Kabupaten Jombang",
  "Kabupaten Kediri",
  "Kabupaten Lamongan",
  "Kabupaten Lumajang",
  "Kabupaten Madiun",
  "Kabupaten Magetan",
  "Kabupaten Malang",
  "Kabupaten Mojokerto",
  "Kabupaten Nganjuk",
  "Kabupaten Ngawi",
  "Kabupaten Pacitan",
  "Kabupaten Pamekasan",
  "Kabupaten Pasuruan",
  "Kabupaten Ponorogo",
  "Kabupaten Probolinggo",
  "Kabupaten Sampang",
  "Kabupaten Sidoarjo",
  "Kabupaten Situbondo",
  "Kabupaten Sumenep",
  "Kabupaten Trenggalek",
  "Kabupaten Tuban",
  "Kabupaten Tulungagung",
  "Kota Batu",
  "Kota Blitar",
  "Kota Kediri",
  "Kota Madiun",
  "Kota Malang",
  "Kota Mojokerto",
  "Kota Pasuruan",
  "Kota Probolinggo",
  "Kota Surabaya"
];

export function excelDateToIndonesian(serialVal: number | string): string {
  const serial = Number(serialVal);
  if (isNaN(serial) || serial <= 0) {
    return String(serialVal);
  }
  // Excel epoch is 1899-12-30 due to leap year bug
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
}

export const GOOGLE_DRIVE_PDF_MAP: Record<string, string> = {
  "Kabupaten Bangkalan": "https://drive.google.com/file/d/18bYW65ecvCCB00uAvNCa4rJtyIsoXRAk/view",
  "Kabupaten Banyuwangi": "https://drive.google.com/file/d/1XwKue7mqaQJDRbz-rUSMLIsZeC6A8HQj/view",
  "Kabupaten Blitar": "https://drive.google.com/file/d/1syrQSQKhbU6Y4CfF-hg40bKjooLXbnoQ/view",
  "Kabupaten Bojonegoro": "https://drive.google.com/file/d/1R-XOkyVmhxoOlrESM_S2e_LLUBJuPsFJ/view",
  "Kabupaten Bondowoso": "https://drive.google.com/file/d/1fjF8hDfxhElOPCWXkI_-_cB04QArAwPA/view",
  "Kabupaten Gresik": "https://drive.google.com/file/d/1Uzso8Z8sGVGb9WGSls8oTEOMo_TzC0zh/view",
  "Kabupaten Jember": "https://drive.google.com/file/d/1RT4Buu25c_XlKWaSCCJswW0XNH0vgSqq/view",
  "Kabupaten Jombang": "https://drive.google.com/file/d/1_7BqkzCnXrjLUDuj2jgQLeEATkWXZ1VS/view",
  "Kabupaten Kediri": "https://drive.google.com/file/d/1gZmG2FBbaeJ1Cbdf5ZJbcmY9AYcwOsXW/view",
  "Kabupaten Lamongan": "https://drive.google.com/file/d/1jbm5OPLE2H5t1p2Q-Usvzq-RDaYYuy-5/view",
  "Kabupaten Lumajang": "https://drive.google.com/file/d/1qZWikdEZiMtYs4xT86378l0vHjhdSgke/view",
  "Kabupaten Madiun": "https://drive.google.com/file/d/1yquocJn_TvVtx6tgtDREhwe6RZHxxDnY/view",
  "Kabupaten Magetan": "https://drive.google.com/file/d/12AGZ3gBm_Kp-I6ekLQrvYZnguVs8Jiul/view",
  "Kabupaten Mojokerto": "https://drive.google.com/file/d/1NI-depMjPE8ZBqlEo2U_37qGjVvMHJHl/view",
  "Kabupaten Nganjuk": "https://drive.google.com/file/d/1lxzJl3LqRvMtGl1DECz6xxk0szsVOsLO/view",
  "Kabupaten Ngawi": "https://drive.google.com/file/d/15brHq8Kufb8B_4O-5bE2cRqonxufrIGf/view",
  "Kabupaten Pacitan": "https://drive.google.com/file/d/1T0QQS6oamtiPBXSc5YBBfNiUwZqp8GZd/view",
  "Kabupaten Pamekasan": "https://drive.google.com/file/d/1fqyaGHcTV5gCvwfsGg7xB6B_j6Nsf1BJ/view",
  "Kabupaten Pasuruan": "https://drive.google.com/file/d/1GhC9xJCw9zCEBsR2d3VHBJbrm7IYzmX8/view",
  "Kabupaten Ponorogo": "https://drive.google.com/file/d/1qSMD-wKnaKyOD6R-0B_oHXiKHNUBECT4/view",
  "Kabupaten Probolinggo": "https://drive.google.com/file/d/1RkfEXHNnM8Nhu2r1-UoUasbe3vF_MKKA/view",
  "Kabupaten Sidoarjo": "https://drive.google.com/file/d/18qTaKRxeNJZc2jOHSnxhNsVveNSKWcEm/view",
  "Kabupaten Situbondo": "https://drive.google.com/file/d/1dTqo1fUZ2XIHJyMrH9LXz0KSogCEUkhV/view",
  "Kabupaten Sumenep": "https://drive.google.com/file/d/1VNEkFx9q-fwC0Y-c32ywssBtNzslBesl/view",
  "Kabupaten Trenggalek": "https://drive.google.com/file/d/17JoM_eZr_8XNII1-KpdLZSDlnErowbi0/view",
  "Kabupaten Tuban": "https://drive.google.com/file/d/1pkjSDV_xYhtbzbYJOlKtpOEjiN4YLBwP/view",
  "Kabupaten Tulungagung": "https://drive.google.com/file/d/1trm3BnCOWQKhYQHxSbPTSVhIZKZSz6ZQ/view",
  "Kota Batu": "https://drive.google.com/file/d/1I8cAcMMydve7u2NtKymToyTEK3bePNZN/view",
  "Kota Blitar": "https://drive.google.com/file/d/1v5bUxbAp7GRRbORvVDFjwlN_esA3FzGv/view",
  "Kota Kediri": "https://drive.google.com/file/d/1SXEKwFiaqjggOdDO-VA-vtvb63vHuWnz/view",
  "Kota Madiun": "https://drive.google.com/file/d/1nEiRsIAGyj5xkPsN8kO8deNXUZ6Eot2v/view",
  "Kota Malang": "https://drive.google.com/file/d/1iu7ywDOJG1XX_yBre6hN6LYjzBP1osDZ/view",
  "Kota Mojokerto": "https://drive.google.com/file/d/1Ii2uTuD_I9TOpwkKWl43dPef_kBeEcWE/view",
  "Kota Pasuruan": "https://drive.google.com/file/d/1eM3h8IGNMzKQ3Kj24t4ADBE1OYLx9Q9q/view",
  "Kota Surabaya": "https://drive.google.com/file/d/1FXBNiNjE-vk4RW2kD1Ws4wfQF22szJIb/view"
};

export const RAW_CSV_DATA = `No,Kab/Kota,Nomor Dokumen,Tanggal Ditetapkan,Tahun Anggaran,Gedung Tidak Sederhana,Gedung Sederhana,Rumah Tipe A,Rumah Tipe B,Rumah Tipe CDE,Pagar Gedung Depan,Pagar Gedung Samping,Pagar Gedung Belakang,Pagar Rumah Depan,Pagar Rumah Samping,Pagar Rumah Belakang,PDFUrl
1,Kabupaten Bangkalan,Keputusan Bupati Bangkalan No. 100.3.3.2/237/Kpts/433.013/2025,46014,2026,6970000,6020000,6910000,6490000,5420000,3140000,1660000,2470000,2730000,1630000,2500000,https://drive.google.com/file/d/18bYW65ecvCCB00uAvNCa4rJtyIsoXRAk/view
2,Kabupaten Banyuwangi,Keputusan Bupati Banyuwangi No. 100.3.3.2/289/KEP/429.011/2025,45999,2026,6680000,5340000,6540000,5530000,4800000,2970000,1520000,2270000,2510000,1460000,2170000,https://drive.google.com/file/d/1XwKue7mqaQJDRbz-rUSMLIsZeC6A8HQj/view
3,Kabupaten Blitar,Keputusan Bupati Blitar No. B/180.05/325/409.1.2/KPTS/2024,45646,2025,7810000,6970000,7660000,7790000,6340000,2980000,2380000,2370000,2760000,1730000,1960000,https://drive.google.com/file/d/1syrQSQKhbU6Y4CfF-hg40bKjooLXbnoQ/view
4,Kabupaten Bojonegoro,Keputusan Bupati Bojonegoro No. 188/364/KEP/412.013/2025,45950,2026,7177900,5595700,7015900,5945400,4755500,3239500,2475700,2646900,2296800,1702700,1850800,https://drive.google.com/file/d/1R-XOkyVmhxoOlrESM_S2e_LLUBJuPsFJ/view
5,Kabupaten Bondowoso,Keputusan Bupati Bondowoso No. 100.3.3.2/39/430.4.2/2026,46027,2026,5880000,4730000,5720000,5160000,4260000,2660000,1330000,1330000,2050000,1590000,1590000,https://drive.google.com/file/d/1fjF8hDfxhElOPCWXkI_-_cB04QArAwPA/view
6,Kabupaten Gresik,Peraturan Bupati Gresik No. 33 tahun 2025,45868,2026,10700000,9800000,9620000,9510000,8020000,4060000,1980000,2940000,3420000,1910000,2860000,https://drive.google.com/file/d/1Uzso8Z8sGVGb9WGSls8oTEOMo_TzC0zh/view
7,Kabupaten Jember,Peraturan Bupati Jember Nomor 25 Tahun 2024,45610,2025,6800000,5250000,5900000,5840000,5420000,3420000,2450000,2540000,2660000,1540000,1610000,https://drive.google.com/file/d/1RT4Buu25c_XlKWaSCCJswW0XNH0vgSqq/view
8,Kabupaten Jombang,SK Kepala Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Jombang No. 500.3.10.1/190/415.18/2025,45994,2025,7070000,6140000,7280000,6600000,5680000,5920000,2580000,2670000,5780000,1640000,1830000,https://drive.google.com/file/d/1_7BqkzCnXrjLUDuj2jgQLeEATkWXZ1VS/view
9,Kabupaten Kediri,Peraturan Bupati Kediri No. 17 Tahun 2025,45792,2026,10562100,7740000,8040000,7280000,7220000,2830000,2550000,2670000,2620000,1650000,1760000,https://drive.google.com/file/d/1gZmG2FBbaeJ1Cbdf5ZJbcmY9AYcwOsXW/view
10,Kabupaten Lamongan,Keputusan Bupati Lamongan No. 100.3.3.2/67/KPTS/413.013/2026,46048,2026,6510000,5230000,6470000,5250000,0,2790000,2430000,2550000,2530000,1520000,1620000,https://drive.google.com/file/d/1jbm5OPLE2H5t1p2Q-Usvzq-RDaYYuy-5/view
11,Kabupaten Lumajang,Keputusan Bupati Lumajang No. 100.3.3.2/238/KEP/427.12/2025,45827,2026,5420000,4520000,5250000,4590000,3950000,2330000,1360000,2000000,2000000,1290000,1890000,https://drive.google.com/file/d/1qZWikdEZiMtYs4xT86378l0vHjhdSgke/view
12,Kabupaten Madiun,Peraturan Bupati Madiun No 25 Th 2025,45839,2026,6792518,6076566,6292198,6114729,5029372,1902455,2132701,2229294,1849497,1351320,1406523,https://drive.google.com/file/d/1yquocJn_TvVtx6tgtDREhwe6RZHxxDnY/view
13,Kabupaten Magetan,Keputusan Bupati Magetan No. 100.3.4.2/281/Kept./403.013/2025,45987,2026,6700000,5340000,6380000,6180000,5560000,3050000,2200000,2300000,2850000,1370000,1470000,https://drive.google.com/file/d/12AGZ3gBm_Kp-I6ekLQrvYZnguVs8Jiul/view
14,Kabupaten Malang,,,,0,0,0,0,0,0,0,0,0,0,0,
15,Kabupaten Mojokerto,Keputusan Bupati Mojokerto No. 188.45/240 /HK/416-012/2025,45880,2025,7499517,6698885,0,0,8638896,2098274,2063704,2249928,2346996,1529642,1674895,https://drive.google.com/file/d/1NI-depMjPE8ZBqlEo2U_37qGjVvMHJHl/view
16,Kabupaten Nganjuk,Keputusan Bupati Nganjuk No. 100.3.3.2/27/K/411.013/2026,46034,2026,6959000,5823000,6702000,6413000,5115000,2838000,2306000,2416000,2631000,1433000,1529000,https://drive.google.com/file/d/1lxzJl3LqRvMtGl1DECz6xxk0szsVOsLO/view
17,Kabupaten Ngawi,Keputusan Bupati Ngawi No. 100.3.3.2/491/404.101.2/B/2025,46003,2026,5700000,5110000,5550000,5270000,4680000,2250000,1270000,1860000,1960000,1240000,1850000,https://drive.google.com/file/d/15brHq8Kufb8B_4O-5bE2cRqonxufrIGf/view
18,Kabupaten Pacitan,Keputusan Bupati Pacitan No. 100.3.3.2/35/KPTS/408.12/2025,45659,2025,7030000,5680000,6650000,6440000,5170000,2760000,2330000,2430000,2550000,1480000,1670000,https://drive.google.com/file/d/1T0QQS6oamtiPBXSc5YBBfNiUwZqp8GZd/view
19,Kabupaten Pamekasan,Keputusan Bupati Pamekasan No. 100.3.3.2/25/432.013/2026,46024,2026,8180000,6960000,8120000,7860000,6470000,4000000,2830000,2950000,3750000,1800000,1900000,https://drive.google.com/file/d/1fqyaGHcTV5gCvwfsGg7xB6B_j6Nsf1BJ/view
20,Kabupaten Pasuruan,Keputusan Bupati Pasuruan No. 600.1.15.2/1168/HK/424.013/2025,46022,2026,6020000,4880000,5940000,5230000,4450000,2720000,1540000,2270000,2370000,1490000,2220000,https://drive.google.com/file/d/1GhC9xJCw9zCEBsR2d3VHBJbrm7IYzmX8/view
21,Kabupaten Ponorogo,Keputusan Bupati Ponorogo No. 100.3.3.2/ARH/1252/405.19/2025,45992,2026,7110000,5670000,7000000,6420000,5480000,3380000,2450000,2450000,2620000,2080000,2080000,https://drive.google.com/file/d/1qSMD-wKnaKyOD6R-0B_oHXiKHNUBECT4/view
22,Kabupaten Probolinggo,SK Kepala Dinas Perumahan Kawasan Permukiman dan Pertanahan Kabupaten Probolinggo No. 922/810/426.113/2025,46008,2025,8030000,5820000,7030000,6520000,5760000,3140000,2370000,2440000,2940000,1490000,1550000,https://drive.google.com/file/d/1RkfEXHNnM8Nhu2r1-UoUasbe3vF_MKKA/view
23,Kabupaten Sampang,,,,0,0,0,0,0,0,0,0,0,0,0,
24,Kabupaten Sidoarjo,Peraturan Bupati Sidoarjo No. 75 Th 2025,46015,2026,7274000,7081000,7250000,6918000,6536000,3937000,3123600,2873800,2174000,1968300,1791400,https://drive.google.com/file/d/18qTaKRxeNJZc2jOHSnxhNsVveNSKWcEm/view
25,Kabupaten Situbondo,Keputusan Bupati Situbondo No. 100.3.3.2/89/431.013/2025,45699,2025,8800000,6540000,6960000,6920000,6430000,3060000,2770000,2840000,2780000,1730000,1810000,https://drive.google.com/file/d/1dTqo1fUZ2XIHJyMrH9LXz0KSogCEUkhV/view
26,Kabupaten Sumenep,Keputusan Bupati Sumenep No. 100.3.3.2/318/KEP/013/2025,45943,2026,7430000,6210000,7220000,6540000,5350000,3660000,1730000,2630000,3040000,1650000,2510000,https://drive.google.com/file/d/1VNEkFx9q-fwC0Y-c32ywssBtNzslBesl/view
27,Kabupaten Trenggalek,Keputusan Bupati Trenggalek No. 100.3.3.2/607/406.001.3/2025,46022,2026,6510000,5820000,6410000,6080000,5300000,2610000,1280000,1810000,2290000,1320000,1960000,https://drive.google.com/file/d/17JoM_eZr_8XNII1-KpdLZSDlnErowbi0/view
28,Kabupaten Tuban,Peraturan Bupati Tuban No. 16 tahun 2025,45853,2026,7646016,6875189,0,0,9205859,2120634,2366437,2541134,2162242,1757051,1912400,https://drive.google.com/file/d/1pkjSDV_xYhtbzbYJOlKtpOEjiN4YLBwP/view
29,Kabupaten Tulungagung,Keputusan Bupati Tulungagung No. 100.3.3.2/775/20.01.03/2024,45653,2025,6780000,5200000,6520000,6050000,5140000,2900000,2300000,2390000,2670000,1470000,1560000,https://drive.google.com/file/d/1trm3BnCOWQKhYQHxSbPTSVhIZKZSz6ZQ/view
30,Kota Batu,Peraturan Wali Kota Batu No. 54 Tahun 2025,45996,2026,7923812,6744942,7283770,7231072,6715898,3079118,3171353,2690273,3143429,1683676,1538960,https://drive.google.com/file/d/1I8cAcMMydve7u2NtKymToyTEK3bePNZN/view
31,Kota Blitar,Keputusan Walikota Blitar No. 100.3.3.3/51/HK/410.020.3/2025,45694,2025,5670000,5100000,5950000,5810000,5070000,2770000,1880000,1960000,2600000,1190000,1250000,https://drive.google.com/file/d/1v5bUxbAp7GRRbORvVDFjwlN_esA3FzGv/view
32,Kota Kediri,Peraturan Wali Kota Kediri No. 3 Tahun 2025,45700,2025,8110000,6280000,7560000,7420000,6010000,3420000,2440000,2530000,3210000,1500000,1680000,https://drive.google.com/file/d/1SXEKwFiaqjggOdDO-VA-vtvb63vHuWnz/view
33,Kota Madiun,Keputusan Wali Kota Madiun No. 050-401.110/95/2025,45792,2025,6660000,5310000,6480000,6210000,4890000,2570000,2210000,2280000,2360000,1390000,1460000,https://drive.google.com/file/d/1nEiRsIAGyj5xkPsN8kO8deNXUZ6Eot2v/view
34,Kota Malang,Keputusan Wali Kota Malang No. 100.3.3.3/59/35.73.112/2024,45316,2024,9350000,7060000,8880000,8260000,6290000,3420000,1760000,2570000,2880000,1670000,2430000,https://drive.google.com/file/d/1iu7ywDOJG1XX_yBre6hN6LYjzBP1osDZ/view
35,Kota Mojokerto,Peraturan Wali Kota Mojokerto No. 20 Tahun 2024,45560,2025,7183018,6088392,6465633,6408367,5140283,0,0,0,0,0,0,https://drive.google.com/file/d/1Ii2uTuD_I9TOpwkKWl43dPef_kBeEcWE/view
36,Kota Pasuruan,Keputusan Wali Kota Pasuruan No. 100.3.3.3/75/010.1/2026,46073,2026,5590000,4920000,5800000,5250000,4550000,2580000,1490000,2200000,2260000,1440000,2150000,https://drive.google.com/file/d/1eM3h8IGNMzKQ3Kj24t4ADBE1OYLx9Q9q/view
37,Kota Probolinggo,,,,0,0,0,0,0,0,0,0,0,0,0,
38,Kota Surabaya,Peraturan Wali Kota Surabaya No. 71 Tahun 2025,45994,2026,7208730,6677579,0,0,0,0,0,0,0,0,0,https://drive.google.com/file/d/1FXBNiNjE-vk4RW2kD1Ws4wfQF22szJIb/view`;

export function parseCSVData(csv: string): SHSTRecord[] {
  const lines = csv.trim().split('\n');
  const records: SHSTRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Use regex-based parser or standard loop to respect commas inside quotes if any (e.g. "C, D, E")
    // Wait, the column content "Rumah Tipe C, D, E" doesn't have quotes in this CSV since it's "Rumah Tipe CDE" in header, 
    // but we can parse safely by looking at split components.
    const columns: string[] = [];
    let insideQuotes = false;
    let currentColumn = '';
    
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        columns.push(currentColumn);
        currentColumn = '';
      } else {
        currentColumn += char;
      }
    }
    columns.push(currentColumn);

    const no = parseInt(columns[0]) || i;
    const kabKota = columns[1]?.trim() || '';
    const nomorDokumen = columns[2]?.trim() || '';
    const tanggalRaw = columns[3]?.trim() || '';
    const tahunAnggaran = columns[4]?.trim() || '';

    // Convert Excel date serial to Indonesian if applicable
    const tanggalDitetapkan = tanggalRaw ? excelDateToIndonesian(tanggalRaw) : '';

    const gedungTidakSederhana = parseFloat(columns[5]) || 0;
    const gedungSederhana = parseFloat(columns[6]) || 0;
    const rumahTipeA = parseFloat(columns[7]) || 0;
    const rumahTipeB = parseFloat(columns[8]) || 0;
    const rumahTipeCDE = parseFloat(columns[9]) || 0;
    const pagarGedungDepan = parseFloat(columns[10]) || 0;
    const pagarGedungSamping = parseFloat(columns[11]) || 0;
    const pagarGedungBelakang = parseFloat(columns[12]) || 0;
    const pagarRumahDepan = parseFloat(columns[13]) || 0;
    const pagarRumahSamping = parseFloat(columns[14]) || 0;
    const pagarRumahBelakang = parseFloat(columns[15]) || 0;
    
    // PDF link fallback or mapped Google Drive link
    const pdfUrl = columns[16]?.trim() || GOOGLE_DRIVE_PDF_MAP[kabKota] || '';

    records.push({
      no,
      kabKota,
      nomorDokumen,
      tanggalDitetapkan,
      tahunAnggaran,
      gedungTidakSederhana,
      gedungSederhana,
      rumahTipeA,
      rumahTipeB,
      rumahTipeCDE,
      pagarGedungDepan,
      pagarGedungSamping,
      pagarGedungBelakang,
      pagarRumahDepan,
      pagarRumahSamping,
      pagarRumahBelakang,
      pdfUrl: pdfUrl || undefined
    });
  }

  return records;
}

export function extractGoogleDriveId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) return trimmed;
  const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1 && match1[1]) return match1[1];
  const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match2 && match2[1]) return match2[1];
  return null;
}

export function getGoogleDrivePreviewUrl(url?: string): string | null {
  const fileId = extractGoogleDriveId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url || null;
}

export function getGoogleDriveViewUrl(url?: string): string | null {
  const fileId = extractGoogleDriveId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  }
  return url || null;
}

export function getGoogleDriveDownloadUrl(url?: string): string | null {
  const fileId = extractGoogleDriveId(url);
  if (fileId) {
    return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
  }
  return url || null;
}

export const INITIAL_SHST_DATA: SHSTRecord[] = parseCSVData(RAW_CSV_DATA);

export const DEFAULT_CSV_TEMPLATE = RAW_CSV_DATA;
