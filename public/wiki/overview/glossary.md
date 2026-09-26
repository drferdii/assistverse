# Glosarium

## Istilah klinis

| Istilah                       | Definisi                                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anamnesa**                  | Dokumentasi riwayat dan keluhan pasien dalam praktik klinis Indonesia. Bagian pertama dari kunjungan ePuskesmas.                                                    |
| **CDSS**                      | Clinical Decision Support System. Perangkat lunak yang menganalisis data klinis untuk memberikan saran, peringatan, atau panduan kepada penyedia layanan kesehatan. |
| **Diagnosa**                  | Bagian diagnosis dalam ePuskesmas. Berisi kode ICD-10 primer dan sekunder, jenis kasus, dan klasifikasi kunjungan.                                                  |
| **DAS**                       | Data Ascension System. Subsistem scraping DOM adaptif dan pengisian formulir otomatis yang mengekstrak data pasien dari ePuskesmas dan mengisi bidang formulir.     |
| **DDI**                       | Drug-Drug Interaction. Reaksi antara dua atau lebih obat yang dapat mengubah efektivitas atau menyebabkan efek samping.                                             |
| **ePuskesmas**                | Sistem rekam medis elektronik layanan kesehatan primer Indonesia. EMR host yang diintegrasikan oleh Sentra Assist.                                                  |
| **FKTP**                      | Fasilitas Kesehatan Tingkat Primer. Fasilitas layanan kesehatan primer, termasuk puskesmas.                                                                         |
| **HMOD**                      | Hypertensive Mediated Organ Damage. Kerusakan organ yang disebabkan oleh tekanan darah tinggi yang berkelanjutan.                                                   |
| **ICD-10**                    | International Classification of Diseases, 10th Revision. Kumpulan kode diagnosis standar yang digunakan untuk penagihan dan epidemiologi.                           |
| **Iskandar Diagnosis Engine** | Pipa klinis deterministik yang menggerakkan saran diagnosis Sentra Assist. Dinamai menurut pendiri, dr. Ferdi Iskandar.                                             |
| **Puskesmas**                 | Pusat Kesehatan Masyarakat. Pusat kesehatan komunitas Indonesia, fasilitas layanan primer.                                                                          |
| **Resep**                     | Bagian resep dalam ePuskesmas. Berisi nama obat, dosis, durasi, dan instruksi.                                                                                      |
| **RME**                       | Rekam Medis Elektronik. Sistem rekam medis pasien digital.                                                                                                          |
| **SYMPHONY**                  | Jembatan keamanan yang memetakan hasil analisis trajektori ke peringatan CDSS. Mengkonversi tingkat keparahan trajektori ke peringatan yang dapat ditindaklanjuti.  |
| **TTV**                       | Tanda-Tanda Vital. Tanda vital: tekanan darah, nadi, frekuensi pernapasan, suhu, SpO2.                                                                              |

## Istilah teknis

| Istilah                | Definisi                                                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content script**     | Skrip yang disuntikkan ke halaman web yang dapat membaca dan memodifikasi DOM. Dalam Sentra Assist, digunakan untuk scraping ePuskesmas dan pengisian formulir.   |
| **Feature flag**       | Variabel lingkungan yang mengaktifkan atau menonaktifkan modul. Semua fitur opsional dalam Sentra Assist dikendalikan oleh flag `SENTRA_*` atau `VITE_FEATURE_*`. |
| **KB**                 | Knowledge Base. Sistem aturan berbasis deterministik yang digunakan untuk pencocokan diagnosis. Selalu tersedia sebagai cadangan saat LLM tidak tersedia.         |
| **LLM**                | Large Language Model. Digunakan secara opsional untuk menata ulang saran diagnosis. Mendukung DeepSeek dan Ollama lokal.                                          |
| **Main world**         | Konteks eksekusi halaman web host (ePuskesmas), berbeda dengan konteks skrip konten terisolasi. Beberapa manipulasi formulir memerlukan injeksi main-world.       |
| **Manifest V3**        | Format manifest ekstensi Chrome saat ini. Menggantikan halaman latar belakang dengan service worker dan mengubah cara ekstensi berinteraksi dengan peramban.      |
| **Offscreen document** | Dokumen tersembunyi yang digunakan oleh ekstensi Manifest V3 untuk tugas yang tidak dapat berjalan di service worker, seperti pemutaran audio.                    |
| **PII**                | Personally Identifiable Information. Data pasien yang harus dilindungi. Sentra Assist meng-hash PII sebelum transmisi jaringan.                                   |
| **Service worker**     | Skrip latar belakang dalam Manifest V3. Berjalan independen dari UI dan menangani peristiwa, pesan, dan panggilan API.                                            |
| **Shadow mode**        | Mode evaluasi non-blokir di mana versi mesin baru berjalan paralel tanpa menggantikan jalur produksi. Digunakan untuk Diagnosis V2.                               |
| **Sidepanel**          | API panel samping Chrome. Panel persisten yang terbuka di samping konten peramban, digunakan sebagai antarmuka utama Sentra Assist.                               |
| **Traffic light**      | Sistem visualisasi keamanan: hijau (aman), kuning (waspada), merah (kritis). Diterapkan pada saran diagnosis dan tanda vital.                                     |
| **WXT**                | Web Extension Toolkit. Kerangka build yang digunakan untuk Sentra Assist. Menangani Manifest V3/V2, hot reload, dan build lintas peramban.                        |

## Singkatan

| Singkatan  | Bentuk lengkap                                     |
| ---------- | -------------------------------------------------- |
| **ACS**    | Acute Coronary Syndrome                            |
| **AVPU**   | Alert, Voice, Pain, Unresponsive (skala kesadaran) |
| **BP**     | Blood Pressure                                     |
| **DKA**    | Diabetic Ketoacidosis                              |
| **GDS**    | Gula Darah Sewaktu (random blood glucose)          |
| **GDP**    | Gula Darah Puasa (fasting blood glucose)           |
| **HbA1c**  | Hemoglobin A1c                                     |
| **HHS**    | Hyperosmolar Hyperglycemic State                   |
| **HR**     | Heart Rate                                         |
| **HTN**    | Hypertension                                       |
| **RR**     | Respiratory Rate                                   |
| **SBP**    | Systolic Blood Pressure                            |
| **SpO2**   | Peripheral Oxygen Saturation                       |
| **2JTTGO** | 2 Jam Tes Toleransi Glukosa Oral (2-hour OGTT)     |

## Halaman terkait

- [Ikhtisar](index.md) — Pengenalan proyek
- [Arsitektur](architecture.md) — Arsitektur sistem
