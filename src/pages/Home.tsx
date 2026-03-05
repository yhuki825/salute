/**
 * salute - Business Solution Partner
 * Design Philosophy: Architectural Minimalism
 * - Deep Navy (#0F172A) × Clean White × Steel Blue accent
 * - Asymmetric layout with bold typographic contrast
 * - Framer Motion scroll-triggered animations
 * - Noto Sans JP with weight contrast for hierarchy
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion';
import {
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Mail,
  MapPin,
  User,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const HERO_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384923944/E3kYCqrdercptMRtfdHkju/hero-main-PQYiVJ5evnpXeui4NhxdNm.webp';
const ABOUT_IMG1 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384923944/E3kYCqrdercptMRtfdHkju/about-collage-1-kz9pmYThSEEbD3mTc4Qtb3.webp';
const ABOUT_IMG2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663384923944/E3kYCqrdercptMRtfdHkju/about-collage-2-C79J2FYD5xcSZ3UGohn52T.webp';

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

// ─── Animated Section Wrapper ──────────────────────────────────────────────────
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav Links ─────────────────────────────────────────────────────────────────
const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Services', id: 'services' },
  { name: 'About', id: 'about' },
  { name: 'Profile', id: 'profile' },
  { name: 'Information', id: 'info' },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl py-4 border-b border-slate-100 shadow-sm'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 bg-slate-900 flex items-center justify-center text-white font-black text-lg tracking-tighter group-hover:bg-blue-700 transition-colors duration-300">
              S
            </div>
            <span
              className={`font-black text-xl tracking-[0.12em] uppercase transition-colors duration-300 ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              salute
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300 relative group ${
                  isScrolled ? 'text-slate-500 hover:text-slate-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-8 py-10">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 hover:text-white text-sm font-bold tracking-[0.2em] uppercase transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section id="home" ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroImgY }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={HERO_IMG}
            alt="Business Partnership"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              {/* Label */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-8 h-px bg-blue-400" />
                <span className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase">
                  Business Solution Partner
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-white font-black leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
              >
                あなたの事業に、
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                  最良の推進力
                </span>
                を。
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-white/70 text-lg leading-relaxed mb-12 max-w-xl font-light"
              >
                「salute」は、請負・業務委託・営業代行を通じて、
                クライアント企業の成長を技術と情熱でサポートするパートナーです。
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex items-center gap-6"
              >
                <button
                  onClick={() => scrollToSection('services')}
                  className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-blue-900/40 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                >
                  事業内容を見る
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/60 hover:text-white text-sm font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  私たちについて
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <AnimatedSection className="mb-20">
            <div className="flex items-start gap-16">
              <div className="flex-shrink-0">
                <p className="section-label mb-4">Our Services</p>
                <div className="divider-line" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  多角的なアプローチで
                  <br />
                  <span className="text-blue-600">課題を解決</span>
                </h2>
              </div>
            </div>
          </AnimatedSection>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-px bg-slate-100">
            {[
              {
                num: '01',
                icon: <Briefcase size={28} />,
                title: '請負業',
                desc: 'プロジェクトの企画から実行まで、責任を持って完遂。確かなクオリティで価値を提供します。',
                detail: 'Project Delivery',
              },
              {
                num: '02',
                icon: <ShieldCheck size={28} />,
                title: '業務委託',
                desc: '専門的なスキルを活かし、チームの不可欠なピースとして業務を円滑にサポートいたします。',
                detail: 'Outsourcing',
              },
              {
                num: '03',
                icon: <TrendingUp size={28} />,
                title: '営業代行',
                desc: '貴社の強みを深く理解し、戦略的なアプローチで新規開拓やリレーション構築を代行します。',
                detail: 'Sales Agency',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={idx * 0.15}
                className="group bg-white p-10 md:p-12 hover:bg-slate-900 transition-all duration-500 cursor-default relative overflow-hidden"
              >
                {/* Background number */}
                <div className="absolute top-6 right-8 text-8xl font-black text-slate-50 group-hover:text-white/5 transition-colors duration-500 select-none leading-none">
                  {service.num}
                </div>

                {/* Icon */}
                <div className="mb-8 w-14 h-14 bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>

                {/* Content */}
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-blue-400 mb-3 transition-colors duration-500">
                  {service.detail}
                </p>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-5 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-slate-500 group-hover:text-white/70 leading-relaxed text-sm transition-colors duration-500">
                  {service.desc}
                </p>

                {/* Arrow */}
                <div className="mt-10 flex items-center gap-2 text-blue-600 group-hover:text-blue-400 transition-colors duration-500">
                  <div className="w-8 h-px bg-current" />
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Mission ── */}
      <section id="about" className="py-32 bg-slate-950 text-white overflow-hidden relative">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Text */}
            <div>
              <AnimatedSection>
                <p className="section-label text-blue-400 mb-6">Mission</p>
              </AnimatedSection>

              <motion.h2
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="text-4xl md:text-5xl font-black leading-tight mb-8"
              >
                <span className="text-white/40 italic text-2xl font-light block mb-3">"</span>
                Salute your vision,
                <br />
                <span className="text-blue-400">Drive your growth.</span>
                <span className="text-white/40 italic text-2xl font-light">"</span>
              </motion.h2>

              <AnimatedSection>
                <p className="text-white/60 text-lg leading-relaxed mb-12 font-light">
                  私たちは、クライアント様が掲げるビジョンに深く敬意（Salute）を表し、
                  その実現のためにあらゆるリソースを尽くします。単なるアウトソーシングではなく、
                  共に未来を創る「同志」として、伴走し続けることを約束します。
                </p>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection>
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {[
                    { num: '01', label: 'Commitment', sub: '確かな実行力' },
                    { num: '02', label: 'Partnership', sub: '共に歩む姿勢' },
                  ].map((stat) => (
                    <div key={stat.num} className="bg-slate-900/50 p-8">
                      <div className="text-4xl font-black text-blue-400 mb-2">{stat.num}</div>
                      <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-1">{stat.label}</div>
                      <div className="text-white font-medium">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Image Collage */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-10">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={ABOUT_IMG1}
                    alt="Vision"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                  />
                </div>
                <div className="bg-blue-600 p-8 aspect-square flex flex-col justify-end">
                  <p className="text-2xl font-black text-white leading-tight">
                    信頼を、
                    <br />
                    カタチに。
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800 p-6 aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-white/10 mb-2">S</div>
                    <div className="text-xs font-bold tracking-[0.3em] uppercase text-white/30">Salute</div>
                  </div>
                </div>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={ABOUT_IMG2}
                    alt="Work"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Profile ── */}
      <section id="profile" className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <p className="section-label mb-4">Representative</p>
            <div className="divider-line" />
          </AnimatedSection>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-[auto_1fr] gap-16 items-start"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-slate-200 overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-200 to-slate-300">
                  <User size={72} strokeWidth={1} />
                </div>
                {/* Decorative border */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-blue-600 -z-10" />
              </div>
            </div>

            {/* Info */}
            <div className="pt-2">
              <div className="mb-6">
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-1">小林 広樹</h3>
                <p className="text-slate-400 font-light tracking-wider">Hiroki Kobayashi</p>
              </div>

              <div className="w-12 h-px bg-blue-600 mb-8" />

              <p className="text-slate-600 leading-relaxed text-lg font-light max-w-2xl">
                請負業・営業代行の分野において、現場での実行力と戦略的な視点を大切に活動しています。
                変化の激しい現代において、クライアント様の「今、最も必要な支援」は何かを常に追求し、
                迅速かつ確実な成果をお届けすることを使命としています。
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-px bg-slate-200" />
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
                  代表 / Representative
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Information ── */}
      <section id="info" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <div className="flex items-center gap-6">
              <div>
                <p className="section-label mb-4">Information</p>
                <div className="divider-line" />
              </div>
              <h2 className="text-4xl font-black text-slate-900">事業所概要</h2>
            </div>
          </AnimatedSection>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="border border-slate-100"
          >
            {[
              {
                icon: <Briefcase size={18} />,
                label: '屋号',
                value: 'salute（サリュート）',
                isLarge: true,
              },
              {
                icon: <MapPin size={18} />,
                label: '所在地',
                value: '神奈川県横浜市港北区日吉本町2-20-3',
                isLarge: false,
              },
              {
                icon: <Mail size={18} />,
                label: '連絡先',
                value: 'salute.5884@gmail.com',
                isLarge: false,
                isEmail: true,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx * 0.1}
                className={`flex flex-col sm:flex-row sm:items-center gap-6 p-8 md:p-10 ${
                  idx < 2 ? 'border-b border-slate-100' : ''
                } group hover:bg-slate-50 transition-colors duration-300`}
              >
                {/* Label */}
                <div className="flex items-center gap-3 text-blue-600 sm:w-44 flex-shrink-0">
                  {item.icon}
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
                    {item.label}
                  </span>
                </div>

                {/* Value */}
                <div className="flex-1">
                  {item.isEmail ? (
                    <a
                      href={`mailto:${item.value}`}
                      className={`font-semibold text-slate-900 hover:text-blue-600 transition-colors ${
                        item.isLarge ? 'text-2xl md:text-3xl font-black' : 'text-lg'
                      }`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className={`font-semibold text-slate-900 ${
                        item.isLarge ? 'text-2xl md:text-3xl font-black' : 'text-lg'
                      }`}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <AnimatedSection className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-6">お問い合わせはメールにてお気軽にどうぞ</p>
            <a
              href="mailto:salute.5884@gmail.com"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-blue-700 text-white px-10 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-blue-900/30"
            >
              <Mail size={16} />
              メールで問い合わせる
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12 pb-12 border-b border-white/10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white flex items-center justify-center text-slate-900 font-black text-sm">
                  S
                </div>
                <span className="font-black text-white text-lg tracking-[0.15em] uppercase">salute</span>
              </div>
              <p className="text-white/30 text-sm font-light max-w-xs leading-relaxed">
                請負・業務委託・営業代行を通じて、
                クライアント企業の成長をサポートします。
              </p>
            </div>

            {/* Nav */}
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-xs font-bold text-white/30 hover:text-white uppercase tracking-[0.18em] transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} salute. All rights reserved.
            </p>
            <p className="text-white/20 text-xs tracking-wider">
              神奈川県横浜市港北区日吉本町2-20-3
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
