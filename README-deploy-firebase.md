# Otomatisasi Deploy ke Firebase Hosting

Aplikasi ini sudah terintegrasi dengan GitHub Actions untuk otomatis deploy ke Firebase Hosting setiap ada perubahan di branch `master`.

## Cara Setup Token Firebase

1. **Dapatkan token Firebase:**
   - Buka terminal dan jalankan:
     ```
     firebase login:ci
     ```
   - Copy token yang muncul (contoh: `1//0gyGccNXgOD55...`).

2. **Tambahkan token ke GitHub:**
   - Buka repository Anda di GitHub.
   - Masuk ke **Settings → Secrets and variables → Actions**.
   - Klik **New repository secret**.
   - Nama: `FIREBASE_TOKEN`
   - Value: paste token dari langkah 1.

## Proses Deploy Otomatis
- Setiap kali Anda push ke branch `master`, workflow akan otomatis build dan deploy ke Firebase Hosting.
- Tidak perlu deploy manual, semua proses sudah otomatis.

## File Workflow
File workflow otomatis ada di:
```
.github/workflows/firebase-hosting.yml
```

Jika ada pertanyaan atau kendala, silakan hubungi maintainer repository ini.
