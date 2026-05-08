/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Music, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Star, 
  Smile, 
  Sparkles, 
  ChevronRight,
  ShoppingBasket
} from 'lucide-react';

// --- Types ---
interface HeartParticle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rot: number;
  scale: number;
  color: string;
}

interface GameItem {
  id: number;
  x: number;
  y: number;
  speed: number;
}

// --- Components ---

const Navbar = ({ 
  isPlaying, 
  setIsPlaying, 
  volume, 
  setVolume 
}: { 
  isPlaying: boolean, 
  setIsPlaying: (v: boolean) => void, 
  volume: number, 
  setVolume: (v: number) => void 
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b px-6 py-3 flex justify-between items-center max-w-7xl mx-auto rounded-b-3xl mt-2 mx-4">
      <div className="font-display text-2xl font-bold text-tertiary">For Rara</div>
      
      <div className="hidden md:flex gap-8 items-center bg-white/20 px-6 py-2 rounded-full">
        <a href="#story" className="text-sm font-medium text-primary hover:text-secondary transition-colors">Our Story</a>
        <a href="#gallery" className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors">Gallery</a>
        <a href="#notes" className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors">Love Notes</a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-full border border-white/40">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-primary hover:scale-110 transition-transform flex items-center gap-2"
          >
            {!isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
            <span className="text-[10px] uppercase tracking-widest hidden lg:block opacity-60">
              {isPlaying ? "Playing..." : "Music Off"}
            </span>
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-primary/20 rounded-full appearance-none accent-primary cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ onOpenHeart }: { onOpenHeart: () => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary-container/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-tertiary-container/30 rounded-full blur-3xl animate-pulse delay-700" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 bg-primary-container/40 border border-white/50 rounded-full px-6 py-2 backdrop-blur-md mb-8"
      >
        <Heart size={14} className="text-primary fill-primary" />
        <span className="text-xs font-bold text-primary tracking-widest uppercase">VALDY is preparing something special</span>
        <Heart size={14} className="text-primary fill-primary" />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="font-display text-5xl md:text-7xl text-primary mb-6 leading-tight"
      >
        Happy Birthday, <br/>
        <span className="text-secondary italic">Rara ❤️</span>
      </motion.h1>

      <div className="relative w-full max-w-4xl h-[400px] mt-12 flex justify-center items-center">
        {/* Collage Images */}
        <motion.div 
          initial={{ rotate: -15, x: -100, opacity: 0 }}
          whileInView={{ rotate: -8, x: -50, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute left-[10%] top-0 polaroid w-48 md:w-64 z-10"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujAYj53VwvmzsohGhrExBhcVuFg7hdTCixfcaEDZKAIl6Nhxlt_kaZUvvJRMCu7PLy70y0UiMrgGJlaRDpn78XPKXolMfsiXWJp-nxlOiGQ6NM5g5GGrU1mEFZfSp6cIB35ovoTHSwulDX_QYSmJBW1tzh69P8kK4IxOODQJDjUrXqQZ0kLd_qOn6DLJuDBf5IajQql8aic1Swf-c1EVAf0sA2SDWlmnuB4ETaIa_FrVtxeKigZh09PLnxGj5KeVYFn_zdixotOTA" 
            alt="Rara Beautiful" 
            className="w-full aspect-square object-cover"
          />
        </motion.div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute z-20 polaroid w-56 md:w-72 shadow-2xl"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ujJI_LIJou6Rm56zDND_i4v9DZXxJda6p8EwanOJqzm9vdczMa5dUuOmrjgDMt2cZnVXqWObmPcl1Yqtdef1kFJOLUDxwnTaVi7Ry8Bv5oX0LI7XoeaK3iGEb3K7DM-hjlGZ32ZMGhSbJR3bQu5a0VebBwdKzmrZOoV8E3r18h17THKVITwq38FUhvLNYJqRWT0mIm4GJJL5RlANzl5pv6jPuPoTli6eB2MHhin2R08cju9D9c_rjd4IoEW7G8xM0DIX_pOyBRKHYs" 
            alt="Rara Smiling" 
            className="w-full aspect-[3/4] object-cover"
          />
        </motion.div>

        <motion.div 
          initial={{ rotate: 15, x: 100, opacity: 0 }}
          whileInView={{ rotate: 10, x: 50, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute right-[10%] top-10 polaroid w-48 md:w-64 z-10"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0uj8n8ygsh4pm4bMx69wjZfQcWMztgXJIUjO-xt_biSXKvE7kTr8wlI9PX7_ipcnCrPoN_oN7xuKBwzdj7uDy3VhrrOjGDXq3xryNwBlWA3-TSs4isthGW4kV8ybPfMs3poG2hAy05AoiD4LM8Mvlg_4_YYit6ywlY6ove3Ynu15NkdI11EjEV1zR9RMDJrmsxp5v81hzH20GjdtvzqTRVwzxnQxttMIwZud9nrvKewGU-gLBRPWjjh31d2JUVCsMpwStbbaLeGHUg" 
            alt="Rara Cute" 
            className="w-full aspect-square object-cover"
          />
        </motion.div>
      </div>

      <p className="font-cursive text-xl md:text-2xl text-on-surface-variant max-w-2xl mt-8 mb-12">
        A celebration of the most beautiful soul I know. Today is all about you, your smile, and the joy you bring into my world.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-24">
        <button 
          onClick={onOpenHeart}
          className="bg-gradient-to-r from-secondary-container to-primary-container text-primary px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          Open My Heart
        </button>
        <a 
          href="#story"
          className="glass px-10 py-4 rounded-full font-medium hover:bg-white/60 transition-colors flex items-center justify-center"
        >
          Our Love Story
        </a>
      </div>
    </section>
  );
};

const TraitGrid = () => {
  const traits = [
    { icon: <Smile className="text-primary" />, title: "Penyabar", desc: "Your patience is a calming embrace that makes everything feel okay.", color: "bg-primary-container" },
    { icon: <Music className="text-secondary" />, title: "Lucu Banget", desc: "Your laugh is my favorite sound, and your silliness is my favorite view.", color: "bg-secondary-container", offset: "md:translate-y-8" },
    { icon: <Star className="text-tertiary" />, title: "Cantik Luar Biasa", desc: "Inside and out, you shine with a beauty that takes my breath away.", color: "bg-tertiary-container" },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="story">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl text-tertiary mb-4">Why VALDY Loves RARA So Much ❤️</h2>
        <p className="text-on-surface-variant">Just a few of the millions of reasons...</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {traits.map((trait, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-8 rounded-3xl ${trait.offset || ''}`}
          >
            <div className={`w-12 h-12 rounded-2xl ${trait.color} flex items-center justify-center mb-6`}>
              {trait.icon}
            </div>
            <h3 className="font-display text-2xl font-bold text-primary mb-3">{trait.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{trait.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BirthdaySpecial = () => {
  return (
    <section className="py-24 px-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-primary-container/40 to-secondary-container/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-12 md:p-20 max-w-4xl w-full text-center shadow-xl relative overflow-hidden"
      >
        <Sparkles className="absolute top-10 left-10 text-primary/30" />
        <Sparkles className="absolute bottom-10 right-10 text-secondary/30" />
        
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-8">Born on the most beautiful day ever ✨</h2>
        
        <div className="inline-block bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl px-12 py-8 shadow-sm">
          <p className="font-display text-5xl md:text-7xl text-tertiary font-bold">08 Mei 2004</p>
          <p className="font-cursive text-xl text-secondary mt-2 italic">A star fell to earth.</p>
        </div>
      </motion.div>
    </section>
  );
};

const LoveLetter = () => {
  return (
    <section className="py-24 px-6 bg-surface-bright/50" id="notes">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl text-center text-primary mb-16">A Letter for You</h2>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-2xl p-8 md:p-16 shadow-lg relative min-h-[600px]"
        >
          {/* Ruling lines simulation */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_transparent_calc(100%_-_1px),_rgba(208,195,199,0.2)_calc(100%_-_1px),_rgba(208,195,199,0.2)_100%)] bg-[length:100%_2rem] opacity-50 pointer-events-none" />
          
          <div className="relative z-10 font-elegant text-2xl md:text-4xl text-on-surface-variant leading-[3rem] md:leading-[3.5rem]">
            <p className="mb-10">My dearest Rara,</p>
            <p className="mb-6">Hari ini, dunia ikut tersenyum karena kamu lahir. Aku ingin nulis sesuatu yang panjang, tapi sebenernya yang mau aku katakan cuma satu, terima kasih sudah jadi kamu.</p>
            <p className="mb-6">Terima kasih buat sabar yang nggak pernah habis, buat ketawa kamu yang bikin hari paling biasa pun jadi hangat. Kamu nggak pernah tahu betapa lucunya kamu kalau lagi cerita hal-hal kecil.</p>
            <p className="mb-6">Kamu cantik, RARA. Cantik yang jujur, yang nggak perlu effort, yang tetap kelihatan walau kamu ngerasa biasa aja. Kalau ada satu hal yang aku yakin di dunia ini, itu adalah betapa beruntungnya aku bisa lihat kamu setiap hari.</p>
            <p className="mb-6">Aku berharap hari ini, dan setiap hari setelahnya, kamu selalu bahagia. Bahagia yang tenang, yang nggak harus dijelasin ke siapa-siapa. Dan kalau suatu hari kamu nggak bisa bahagia sendirian, aku janji aku akan ada, sedekat napas, sehangat pelukan.</p>
            <p className="mb-10">Selamat ulang tahun, my favorite person. Tetap jadi kamu, ya. Aku sayang kamu, lebih banyak dari yang pernah aku ucapkan.</p>
            <p>Forever yours,</p>
            <p className="text-secondary text-5xl md:text-6xl mt-4">Valdy ❤️</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PhotoGallery = () => {
  const images = [
    {
      src: "https://lh3.googleusercontent.com/aida/ADBb0ugmPz-Uh9qc6xFNWlF9dIT_G-7brEMS2tD0QOX7ucKkyLfG1pVZiMmmNs2F9SnOA01YJGa0r1quoCKuRjOfVK-EeXZdGA9MhSU_QC7DrvEB4rwGctco93YCUDq706HtaEb3eW_2vPKhIl0ft3fadJXhPKniKYAFsrlrOF-dFomUAsgQg8wOYK02OuNY1qH0r_xSjD_ty-Amlwe01QPzbHw7kqglAbmDmWFw4207nvHCKTWmn1g40vRWZj6J_m4nCEuRPi41fW2Up5E",
      caption: "Where it all began",
      tilt: "-rotate-3"
    },
    {
      src: "https://lh3.googleusercontent.com/aida/ADBb0uiYPO_PdffjDV2YzE4lpXL82VpbLUhDTq0_BZtrQYqbpZRDlz9VNneedwUXg59rVRzEAJeHHwQL_Sw-fE4F2ExvsZAmKYDIuO1BRdIEKyuWVQtkTZynlFRp4oZZiQkfU4Y4OwGicE-NMF93NRERMQqEbakqvSmlEHdDKsd5GJbY1KVr-FPe0Mk23BlP5cbsJTrbTglH1-DIxwWbANWeQ4SS5qZFdIsM44prVg4Kv_wOYhVQZJf9DG98y2R6avBhQgUBuNhUOZ3jLcU",
      caption: "That beautiful smile",
      tilt: "rotate-2 translate-y-8"
    },
    {
      src: "https://lh3.googleusercontent.com/aida/ADBb0ujD1zgZCGbJ3f4UA9Kwf3KRQZGHQunm9zzRkxuOAVTXx36d9As6J5YFsGOZPQtd2t9Z5jaOJxzCz3HF1oXkyJYA0OZB9Bi4RTHBwDnxc4giE5H7lMkW7Yt2W8iMu-qY7sPfvmpQhWBqsxSKFJ9Gg92vLy8XUfVbP5daoXwlFknzS0SOt68MiwednrgJ9-caofBPNyswENv56xCVVxg81dIwrdd5N8VKX1vGMeHJMQKz5d1_H0mW1A_Djq2M6HTu7nu5nQX_27AClAI",
      caption: "Forever & Always",
      tilt: "-rotate-1"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="gallery">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl text-secondary mb-4">Our Cherished Moments</h2>
        <p className="text-on-surface-variant">A glimpse into our forever.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`polaroid w-72 ${img.tilt} transition-all duration-500`}
          >
            <div className="aspect-square bg-surface-container overflow-hidden rounded-sm mb-4">
              <img src={img.src} alt={img.caption} className="w-full h-full object-cover grayscale-[10%] sepia-[10%]" />
            </div>
            <p className="font-cursive text-center text-primary text-lg">{img.caption}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const InteractiveLoveButton = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [counter, setCounter] = useState(0);

  const spawnParticles = (e: React.MouseEvent) => {
    setCounter(prev => prev + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      tx: (Math.random() - 0.5) * 200,
      ty: - (Math.random() * 150 + 50),
      rot: Math.random() * 360,
      scale: Math.random() * 1 + 0.5,
      color: ['#f4dce4', '#debbe4', '#ffdad6', '#ffe5dd'][Math.floor(Math.random() * 4)]
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  return (
    <section className="py-24 px-6 flex flex-col items-center">
      <div className="glass-card p-12 rounded-[3rem] max-w-2xl w-full text-center relative overflow-hidden">
        <h2 className="font-display text-4xl text-primary mb-12">How much do you love Valdy?</h2>
        
        <div className="relative inline-block">
          <button 
            onMouseDown={spawnParticles}
            className="relative z-10 bg-gradient-to-r from-primary to-secondary text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl active:scale-95 transition-transform"
          >
            Klik kalau RARA sayang VALDY ❤️
          </button>

          <AnimatePresence>
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
                animate={{ 
                  opacity: 0, 
                  scale: p.scale, 
                  x: p.x + p.tx, 
                  y: p.y + p.ty,
                  rotate: p.rot
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute pointer-events-none text-2xl"
                style={{ color: p.color }}
              >
                ❤️
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="text-on-surface-variant font-medium mt-6">
          {counter === 0 ? "(A little surprise awaits)" : `Love sending... x${counter}`}
        </p>
      </div>
    </section>
  );
};

const CatchLoveGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [basketX, setBasketX] = useState(50); // percentage
  const [items, setItems] = useState<GameItem[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>(0);
  const spawnRef = useRef<number>(0);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setItems([]);
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setItems([]);
  }, []);

  const spawnItem = useCallback(() => {
    const newItem: GameItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5,
      y: -10,
      speed: 1.5 + Math.random() * 1.5
    };
    setItems(prev => [...prev, newItem]);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const update = () => {
      setItems(prev => {
        const next = prev.map(item => ({ ...item, y: item.y + item.speed }));
        
        // Filter out caught or missed items
        return next.filter(item => {
          const caught = item.y > 80 && item.y < 95 && Math.abs(item.x - basketX) < 10;
          if (caught) setScore(s => s + 1);
          return !caught && item.y < 100;
        });
      });
      gameLoopRef.current = requestAnimationFrame(update);
    };

    const spawn = setInterval(spawnItem, 800);
    gameLoopRef.current = requestAnimationFrame(update);

    return () => {
      clearInterval(timer);
      clearInterval(spawn);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, basketX, spawnItem, endGame]);

  const handlePointer = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  return (
    <section className="py-24 px-6 flex justify-center">
      <div className="glass-card p-4 md:p-8 rounded-[3rem] max-w-4xl w-full text-center relative overflow-hidden flex flex-col items-center">
        <h2 className="font-display text-4xl text-primary mb-4">Catch Valdy's Love</h2>
        <p className="text-on-surface-variant mb-8 font-medium italic">Move the basket to catch the falling hearts!</p>

        <div 
          ref={containerRef}
          onPointerMove={handlePointer}
          className="relative h-[400px] w-full max-w-2xl bg-primary-container/20 rounded-2xl border border-white/40 overflow-hidden cursor-none touch-none"
        >
          {!isPlaying ? (
            <div className="absolute inset-0 z-40 bg-surface-bright/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <Heart size={48} className="text-secondary mb-4 animate-pulse fill-secondary" />
              <button 
                onClick={startGame}
                className="bg-gradient-to-r from-secondary to-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-all"
              >
                {timeLeft === 0 ? "Play Again" : "Play Game ✨"}
              </button>
              {timeLeft === 0 && <p className="mt-4 font-bold text-primary">Final Score: {score}</p>}
            </div>
          ) : (
            <>
              {/* HUD */}
              <div className="absolute top-4 left-4 z-20 flex justify-between w-[calc(100%-2rem)]">
                <div className="bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/40 font-bold text-secondary">
                  Score: {score}
                </div>
                <div className="bg-white/60 px-4 py-1 rounded-full backdrop-blur-md border border-white/40 font-bold text-primary">
                  Time: {timeLeft}s
                </div>
              </div>

              {/* Items */}
              {items.map(item => (
                <div 
                  key={item.id}
                  className="absolute pointer-events-none text-2xl transition-all duration-30"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  ❤️
                </div>
              ))}

              {/* Basket */}
              <div 
                className="absolute bottom-8 -translate-x-1/2 flex flex-col items-center transition-all duration-75"
                style={{ left: `${basketX}%` }}
              >
                <div className="bg-white rounded-full px-2 py-0.5 border border-secondary text-[8px] font-bold text-primary mb-1 shadow-sm uppercase">Valdy</div>
                <ShoppingBasket size={48} className="text-secondary drop-shadow-md" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-gradient-to-t from-primary-container/20 to-surface-bright text-center relative overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-display text-3xl md:text-5xl text-primary mb-8"
        >
          For Rara, Thank You For Existing In Valdy's Life ❤️
        </motion.h2>
        
        <div className="flex justify-center items-center gap-6 mb-12">
          <span className="font-elegant text-secondary text-4xl">Forever</span>
          <span className="text-outline-variant opacity-30">•</span>
          <span className="font-elegant text-secondary text-4xl">Always</span>
          <span className="text-outline-variant opacity-30">•</span>
          <span className="font-elegant text-secondary text-4xl">Ours</span>
        </div>

        <div className="w-16 h-px bg-outline-variant/30 mx-auto mb-8" />
        
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
          With love, Valdy — 2026
        </p>
        <p className="text-[10px] text-on-surface-variant/50 italic">
          
        </p>
      </div>

      {/* Floating Hearts in background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-12 pointer-events-none opacity-20">
        {[...Array(3)].map((_, i) => (
          <Heart key={i} size={14} className={`text-primary animate-bounce delay-[${i * 200}ms] fill-primary`} />
        ))}
      </div>
    </footer>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Autoplay blocked, needs user interaction", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="min-h-screen bg-surface-bright selection:bg-primary-container selection:text-primary">
      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src="https://ia802901.us.archive.org/24/items/HowlsMovingCastleOST/01%20-%20Opening%20-%20The%20Merry-Go-Round%20of%20Life.mp3"
        loop
      />

      {/* Decorative Sparkles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-primary-container/40 rounded-full blur-xl animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          />
        ))}
      </div>

      <Navbar 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        volume={volume} 
        setVolume={setVolume} 
      />
      <HeroSection onOpenHeart={() => setIsPlaying(true)} />
      <TraitGrid />
      <BirthdaySpecial />
      <LoveLetter />
      <PhotoGallery />
      <InteractiveLoveButton />
      <CatchLoveGame />
      <Footer />
    </div>
  );
}
