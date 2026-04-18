import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Halo TEC AN-NAHL 👋\n\nSaya ingin mendaftar program pembelajaran Al-Qur\'an.\n\nNama: \nUsia: \nProgram yang diminati: \n\nMohon informasinya lebih lanjut 🙏'
    );
    window.open(`https://wa.me/6285775526387?text=${message}`, '_blank');
  };

  const contactItems = [
    { icon: MapPin, label: 'Alamat',  lines: ['Kav. Bumi Kahuripan Jl. Arwana 2', 'RT.03/050 Babelan, Bekasi'] },
    { icon: Phone,  label: 'Telepon', lines: ['+62 857-7552-6387'] },
    { icon: Mail,   label: 'Email',   lines: ['TEC.ANNAHL@GMAIL.COM'] },
  ];

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="page-hero py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="section-eyebrow"
            >
              Bergabung Bersama Kami
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mt-2 mb-6 text-white"
            >
              Hubungi Kami
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80"
            >
              Isi formulir pendaftaran di bawah ini untuk bergabung bersama kami
            </motion.p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

            {/* LEFT — CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-5"
            >
              <Card className="content-card overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-700 to-[#D4AF37]" />
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Informasi Kontak</CardTitle>
                  <CardDescription>Hubungi kami langsung melalui:</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {contactItems.map(({ icon: Icon, label, lines }) => (
                    <div key={label} className="flex gap-4">
                      <div className="info-icon-wrap">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{label}</p>
                        {lines.map((l, i) => (
                          <p key={i} className="text-gray-500 text-sm">{l}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <button
                      className="w-full whatsapp-btn flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white transition-all"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Hubungi via WhatsApp
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Jam Operasional */}
              <Card className="content-card">
                <CardContent className="pt-5 pb-5">
                  <h3 className="font-semibold text-green-800 mb-3">🕐 Jam Operasional</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Senin – Jumat</span>
                      <span className="font-medium text-gray-800">07.00 – 21.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabtu – Minggu</span>
                      <span className="font-medium text-gray-800">07.00 – 17.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* RIGHT — GOOGLE FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <Card className="content-card overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[#D4AF37] to-green-700" />
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Formulir Pendaftaran</CardTitle>
                  <CardDescription>Isi data di bawah ini, kami akan segera menghubungi Anda</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSf8CUL7mTrhpdjDsbNYPL1Q0YsbGr63hAga5xzgM91CybJS0w/viewform?embedded=true"
                    width="100%"
                    height="700"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="Formulir Pendaftaran TEC AN-NAHL"
                    className="rounded-b-xl"
                  >
                    Memuat…
                  </iframe>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
