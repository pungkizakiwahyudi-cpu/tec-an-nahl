import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Phone, MapPin } from 'lucide-react';

/* ============================================================
   KONFIGURASI FLYER
   Ubah bagian ini setiap kali ada pendaftaran baru!
   Kalau tidak ada pendaftaran, set IS_OPEN = false
   ============================================================ */
const FLYER_CONFIG = {
  IS_OPEN: true, // ← true = tampilkan popup, false = sembunyikan

  judul: 'Open Recruitment',
  subjudul: 'Kelas Tahsin Ikhwan & Akhwat Dewasa',
  tagline: 'Pelopor Belajar Al-Qur\'an Yang Mudah & Menyenangkan',

  kelas: [
    {
      nama: 'Kelas Tahsin Ikhwan',
      warna: 'from-green-700 to-green-600',
      items: [
        'Belajar Al-Qur\'an metode Tilawati',
        'KBM 1x/pekan — Pukul 19.30 - 21.00',
        'Fasilitas kelas Full AC & papan tulis kaca',
        'Hari Jum\'at/pekan',
        'Infaq/bulan Rp 50.000',
        'Usia 17 tahun ke atas',
      ],
    },
    {
      nama: 'Kelas Tahsin Akhwat',
      warna: 'from-green-700 to-green-600',
      items: [
        'Belajar Al-Qur\'an metode Tilawati',
        'KBM 1x/pekan — Pukul 09.00 - 10.30',
        'Fasilitas kelas Full AC & papan tulis kaca',
        'Hari Senin/pekan',
        'Infaq/bulan Rp 50.000',
        'Usia 17 tahun ke atas',
      ],
    },
  ],

  kontak: [
    { label: 'Akhwat', nomor: '0857-7552-6387' },
    { label: 'Ikhwan', nomor: '0857-7552-6387' },
  ],

  alamat: 'Kav. Bumi Kahuripan Jl. Arwana 2 No.11 Babelan Bekasi',
  catatan: 'Pendaftaran akan ditutup jika sudah memenuhi kuota/kelas',
};
/* ============================================================ */

const FlyerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!FLYER_CONFIG.IS_OPEN) return;
    // Muncul setelah 2 detik
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!FLYER_CONFIG.IS_OPEN) return null;

  const handleWA = (nomor) => {
    const clean = nomor.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Halo, saya ingin mendaftar ${FLYER_CONFIG.subjudul} di TEC AN-NAHL. Mohon info lebih lanjut 🙏`
    );
    window.open(`https://wa.me/62${clean.startsWith('0') ? clean.slice(1) : clean}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-green-800 to-green-700 px-6 py-5 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="text-center">
                <p className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1">
                  Tilawati Education Center (TEC) AN-NAHL
                </p>
                <p className="text-white/70 text-xs mb-3">{FLYER_CONFIG.tagline}</p>
                <div className="inline-block bg-[#D4AF37] text-white font-bold text-2xl md:text-3xl px-6 py-2 rounded-lg mb-2">
                  {FLYER_CONFIG.judul}
                </div>
                <h2 className="text-white text-xl font-bold mt-2">
                  {FLYER_CONFIG.subjudul}
                </h2>
              </div>
            </div>

            {/* KELAS */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {FLYER_CONFIG.kelas.map((kelas, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className={`bg-gradient-to-r ${kelas.warna} px-4 py-2`}>
                    <h3 className="text-white font-bold text-sm italic">{kelas.nama}</h3>
                  </div>
                  <div className="p-3 space-y-2">
                    {kelas.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* KONTAK */}
            <div className="px-5 pb-3">
              <div className="bg-green-800 rounded-xl px-4 py-3 mb-3">
                <p className="text-white font-bold text-sm mb-3">📞 Info Pendaftaran</p>
                <div className="grid grid-cols-2 gap-2">
                  {FLYER_CONFIG.kontak.map((k, i) => (
                    <button
                      key={i}
                      onClick={() => handleWA(k.nomor)}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <div className="text-left">
                        <p className="text-white/70 text-[10px]">{k.label}</p>
                        <p className="text-white font-semibold text-xs">{k.nomor}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ALAMAT */}
              <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
                <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                <span>{FLYER_CONFIG.alamat}</span>
              </div>

              {/* CATATAN */}
              <div className="bg-amber-50 border-l-4 border-[#D4AF37] rounded-lg px-3 py-2 mb-4">
                <p className="text-xs text-amber-800 italic">{FLYER_CONFIG.catatan}</p>
              </div>

              {/* TOMBOL */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl border-2 border-green-700 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
              >
                Tutup
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlyerPopup;
