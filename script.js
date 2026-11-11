/* ================================================================
   Manewon Clicker — полная версия (всё сразу)
   HTML + CSS + JS (без внешних зависимостей)
   ================================================================ */

(function () {
  'use strict';

  /* ---------------- Настройки ---------------- */
  const STORAGE_KEY = 'manewon_clicker_v4';
  const COINS_PER_CLICK = 1;
  const MUSIC_FILE = 'plach%20F%23min%20140bpm%20430hz.mp3';

  /* ---------------- Элементы DOM ---------------- */
  const el = {
    btn: document.getElementById('manewonBtn'),
    wrap: document.getElementById('buttonWrap'),
    coinValue: document.getElementById('coinValue'),
    coinIcon: document.getElementById('coinIcon'),
    statClicks: document.getElementById('statClicks'),
    statCoins: document.getElementById('statCoins'),
    statLine: document.getElementById('statLine'),
    statsChip: document.getElementById('statsChip'),
    statTimer: document.getElementById('statTimer'),
    statTime: document.getElementById('statTime'),
    floatLayer: document.getElementById('floatLayer'),
    particleLayer: document.getElementById('particleLayer'),
    musicToggle: document.getElementById('musicToggle'),
    volumeSlider: document.getElementById('volumeSlider'),
    volumeText: document.getElementById('volumeText'),
    resetBtn: document.getElementById('resetBtn'),
    shopBtn: document.getElementById('shopBtn'),
    skinsBtn: document.getElementById('skinsBtn'),
    achievementsBtn: document.getElementById('achievementsBtn'),
    shareBtn: document.getElementById('shareBtn'),
    dayNightBtn: document.getElementById('dayNightBtn'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    shopOverlay: document.getElementById('shopOverlay'),
    shopClose: document.getElementById('shopClose'),
    themeGrid: document.getElementById('themeGrid'),
    shopCoinValue: document.getElementById('shopCoinValue'),
    promoInput: document.getElementById('promoInput'),
    promoBtn: document.getElementById('promoBtn'),
    skinsOverlay: document.getElementById('skinsOverlay'),
    skinsClose: document.getElementById('skinsClose'),
    skinGrid: document.getElementById('skinGrid'),
    skinCoinValue: document.getElementById('skinCoinValue'),
    achievementsOverlay: document.getElementById('achievementsOverlay'),
    achievementsClose: document.getElementById('achievementsClose'),
    achGrid: document.getElementById('achGrid'),
    bgAudio: document.getElementById('bgAudio'),
    toastContainer: document.getElementById('toastContainer'),
    comboBadge: document.getElementById('comboBadge'),
    btnText: document.querySelector('.btn-text'),
    /* Админ */
    adminHiddenBtn: document.getElementById('adminHiddenBtn'),
    adminPromoInput: document.getElementById('adminPromoInput'),
    adminPromoBtn: document.getElementById('adminPromoBtn'),
    adminOverlay: document.getElementById('adminOverlay'),
    adminClose: document.getElementById('adminClose'),
    adminCoins: document.getElementById('adminCoins'),
    adminClicks: document.getElementById('adminClicks'),
    adminEarned: document.getElementById('adminEarned'),
    adminSetBtn: document.getElementById('adminSetBtn'),
    adminUnlockAllBtn: document.getElementById('adminUnlockAllBtn'),
    adminThemeSelect: document.getElementById('adminThemeSelect'),
    adminSetThemeBtn: document.getElementById('adminSetThemeBtn'),
    adminWipeBtn: document.getElementById('adminWipeBtn'),
    adminExportBtn: document.getElementById('adminExportBtn'),
    adminImportJson: document.getElementById('adminImportJson'),
    adminImportBtn: document.getElementById('adminImportBtn'),
    adminRaw: document.getElementById('adminRaw'),
    adminRawText: document.getElementById('adminRawText'),
    adminRefreshRawBtn: document.getElementById('adminRefreshRawBtn')
  };

  /* ---------------- Состояние игры ---------------- */
  const state = {
    coins: 0,
    totalClicks: 0,
    totalCoinsEarned: 0,
    sessionTime: 0,
    sessionStart: Date.now(),
    musicEnabled: false,
    volume: 0.5,
    started: false,
    activeThemeId: 'forest',
    activeSkinId: 'classic',
    dayNightMode: 'auto', // auto | day | night
    adminUnlocked: false,
    maxCombo: 0,
    currentCombo: 0,
    achievements: {},
    purchasedThemes: [],
    purchasedSkins: [],
    konamiActive: false
  };

  /* ---------------- Темы оформления ---------------- */
  const THEMES = [
    {
      id: 'forest',
      name: 'Тёмный лес',
      price: 0,
      purchased: true,
      colors: {
        '--bg-top': '#050a07',
        '--bg-middle': '#0a1a0e',
        '--bg-bottom': '#0c1d12',
        '--ink': '#cfffd6',
        '--ink-soft': '#6ee7b7',
        '--accent': '#39ff14',
        '--accent-dim': '#22c13b',
        '--accent-glow': 'rgba(57, 255, 20, 0.35)',
        '--panel': 'rgba(12, 29, 18, 0.72)',
        '--glass-border': 'rgba(57, 255, 20, 0.18)'
      }
    },
    {
      id: 'dawn',
      name: 'Пастельный рассвет',
      price: 50,
      purchased: false,
      colors: {
        '--bg-top': '#fff1f2',
        '--bg-middle': '#ffe4e1',
        '--bg-bottom': '#fce7f3',
        '--ink': '#7e2f8e',
        '--ink-soft': '#c084fc',
        '--accent': '#f472b6',
        '--accent-dim': '#db2777',
        '--accent-glow': 'rgba(244, 114, 182, 0.35)',
        '--panel': 'rgba(255, 255, 255, 0.7)',
        '--glass-border': 'rgba(244, 114, 182, 0.25)'
      }
    },
    {
      id: 'cyber',
      name: 'Неоновый кибер',
      price: 150,
      purchased: false,
      colors: {
        '--bg-top': '#050505',
        '--bg-middle': '#0a0a12',
        '--bg-bottom': '#0f0f1a',
        '--ink': '#00f2ff',
        '--ink-soft': '#7000ff',
        '--accent': '#00f2ff',
        '--accent-dim': '#7000ff',
        '--accent-glow': 'rgba(0, 242, 255, 0.35)',
        '--panel': 'rgba(10, 10, 20, 0.8)',
        '--glass-border': 'rgba(0, 242, 255, 0.2)'
      }
    },
    {
      id: 'sunset',
      name: 'Закат в пустыне',
      price: 300,
      purchased: false,
      colors: {
        '--bg-top': '#2d1b14',
        '--bg-middle': '#4a2a1e',
        '--bg-bottom': '#8e4a3a',
        '--ink': '#ffe5b4',
        '--ink-soft': '#ff9a3c',
        '--accent': '#ff6b35',
        '--accent-dim': '#f7931e',
        '--accent-glow': 'rgba(255, 107, 53, 0.35)',
        '--panel': 'rgba(45, 27, 20, 0.8)',
        '--glass-border': 'rgba(255, 107, 53, 0.25)'
      }
    },
    {
      id: 'ocean',
      name: 'Глубокий океан',
      price: 500,
      purchased: false,
      colors: {
        '--bg-top': '#001219',
        '--bg-middle': '#005f73',
        '--bg-bottom': '#0a9396',
        '--ink': '#e9f5db',
        '--ink-soft': '#94d8bd',
        '--accent': '#94d8bd',
        '--accent-dim': '#005f73',
        '--accent-glow': 'rgba(148, 216, 189, 0.35)',
        '--panel': 'rgba(0, 18, 25, 0.8)',
        '--glass-border': 'rgba(148, 216, 189, 0.25)'
      }
    },
    {
      id: 'zubila',
      name: 'Zubila Style',
      price: 666,
      purchased: false,
      colors: {
        '--bg-top': '#000000',
        '--bg-middle': '#0a0a0a',
        '--bg-bottom': '#1a1a1a',
        '--ink': '#ff00ff',
        '--ink-soft': '#ff69b4',
        '--accent': '#ff00ff',
        '--accent-dim': '#8b008b',
        '--accent-glow': 'rgba(255, 0, 255, 0.4)',
        '--panel': 'rgba(20, 20, 20, 0.85)',
        '--glass-border': 'rgba(255, 0, 255, 0.25)'
      },
      image: 'zubila.jpg'
    },
    {
      id: 'soundgoodizer',
      name: 'Soundgoodizer',
      price: 0,
      purchased: false,
      secret: true,
      colors: {
        '--bg-top': '#1a0a1a',
        '--bg-middle': '#2d0a2d',
        '--bg-bottom': '#4a0a4a',
        '--ink': '#ff00ff',
        '--ink-soft': '#ff69b4',
        '--accent': '#ff00ff',
        '--accent-dim': '#8b008b',
        '--accent-glow': 'rgba(255, 0, 255, 0.5)',
        '--panel': 'rgba(30, 10, 30, 0.85)',
        '--glass-border': 'rgba(255, 0, 255, 0.3)'
      },
      image: 'goodizer.png'
    }
  ];

  /* ---------------- Скины кнопки ---------------- */
  const SKINS = [
    {
      id: 'classic',
      name: 'Классика',
      price: 0,
      purchased: true,
      emoji: 'MANEWON',
      gradient: 'linear-gradient(135deg, #0f2a1c 0%, #1a4332 45%, #2d6a4f 100%)'
    },
    {
      id: 'cupcake',
      name: 'Кекс',
      price: 100,
      purchased: false,
      emoji: '🧁',
      gradient: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #fde68a 100%)'
    },
    {
      id: 'neon',
      name: 'Неон',
      price: 250,
      purchased: false,
      emoji: '⚡',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    },
    {
      id: 'rainbow',
      name: 'Радуга',
      price: 400,
      purchased: false,
      emoji: '🌈',
      gradient: 'linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)'
    },
    {
      id: 'zubilaSkin',
      name: 'Зубила',
      price: 666,
      purchased: false,
      emoji: 'ZUBILA',
      gradient: 'linear-gradient(135deg, #8b008b 0%, #4b0082 45%, #2e003e 100%)'
    }
  ];

  /* ---------------- Достижения ---------------- */
  const ACHIEVEMENTS = [
    { id: 'first_click', name: 'Первый тап', desc: 'Нажми на кнопку 1 раз', icon: '👆', condition: s => s.totalClicks >= 1 },
    { id: 'century', name: 'Сто монет', desc: 'Накопи 100 Note Coins', icon: '💯', condition: s => s.coins >= 100 },
    { id: 'thousand_clicks', name: 'Зубилиа-холик', desc: 'Сделай 1000 нажатий', icon: '👀', condition: s => s.totalClicks >= 1000 },
    { id: 'zubila_owner', name: 'Зубр', desc: 'Купи тему Zubila Style', icon: '🦬', condition: s => s.purchasedThemes.includes('zubila') },
    { id: 'combo_master', name: 'Быстрый палец', desc: 'Добийся комбо x10', icon: '⚡', condition: s => s.maxCombo >= 10 },
    { id: 'time_waster', name: 'Бессмысленно и быстро', desc: 'Проведи в игре 1 минуту', icon: '⏱️', condition: s => s.sessionTime >= 60 },
    { id: 'rich_clicker', name: 'Миллионер нота-коинов', desc: 'Накопи 1000 Note Coins', icon: '💰', condition: s => s.coins >= 1000 },
    { id: 'skin_collector', name: 'Коллекционер скинов', desc: 'Купи любой скин кнопки', icon: '🎨', condition: s => s.purchasedSkins.length > 1 }
  ];

  /* ---------------- Фоновая музыка ---------------- */
  const Music = (function () {
    const audio = el.bgAudio;
    audio.loop = true;
    audio.volume = state.volume;
    audio.preload = 'auto';
    let ready = false;

    audio.addEventListener('canplaythrough', () => { ready = true; state.musicError = false; });
    audio.addEventListener('canplay', () => { ready = true; state.musicError = false; });
    audio.addEventListener('error', () => {
      state.musicError = true;
      showToast('Музыка не загружена (проверьте файл)');
    });

    function ensureStarted() {
      if (!state.started) {
        state.started = true;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
          const tmp = new AC();
          if (tmp.state === 'suspended') tmp.resume();
          tmp.close();
        }
      }
    }

    function toggle() {
      ensureStarted();
      state.audioReady = ready;

      if (!state.musicEnabled) {
        state.musicEnabled = true;
        el.musicToggle.setAttribute('aria-pressed', 'true');
        audio.volume = state.volume;
        if (state.musicError) {
          startSynthFallback();
        } else {
          const p = audio.play();
          if (p) p.catch(() => {
            setTimeout(() => {
              const p2 = audio.play();
              if (p2) p2.catch(() => startSynthFallback());
            }, 300);
          });
        }
      } else {
        state.musicEnabled = false;
        el.musicToggle.setAttribute('aria-pressed', 'false');
        audio.pause();
        stopSynthFallback();
      }
      return state.musicEnabled;
    }

    function setVolume(v) {
      state.volume = Math.max(0, Math.min(1, v));
      audio.volume = state.volume;
      el.volumeSlider.value = state.volume;
      el.volumeText.textContent = Math.round(state.volume * 100) + '%';
      if (synthGain) synthGain.gain.value = state.musicEnabled ? state.volume : 0;
    }

    return { toggle, setVolume };
  })();

  let synthCtx = null, synthGain = null, synthInterval = null;

  function startSynthFallback() {
    if (synthCtx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    synthCtx = new AC();
    if (synthCtx.state === 'suspended') synthCtx.resume();
    synthGain = synthCtx.createGain();
    synthGain.connect(synthCtx.destination);
    synthGain.gain.value = state.volume;
    const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63, 329.63];
    let i = 0;
    function playNote() {
      if (!state.musicEnabled || !synthCtx) return;
      const f = notes[i % notes.length];
      const osc = synthCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, synthCtx.currentTime);
      osc.connect(synthGain);
      osc.start();
      synthInterval = setTimeout(() => {
        osc.stop();
        osc.disconnect();
        i++;
        if (state.musicEnabled) synthInterval = setTimeout(playNote, 600);
      }, 600);
    }
    playNote();
  }

  function stopSynthFallback() {
    if (synthInterval) clearTimeout(synthInterval);
    if (synthCtx) { synthCtx.close(); synthCtx = null; }
    synthGain = null;
  }

  /* ---------------- Звук клика ---------------- */
  const Sfx = (function () {
    let ctx = null, master = null;
    function ready() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC();
      }
      if (ctx.state === 'suspended') ctx.resume();
      if (!master) {
        master = ctx.createGain();
        master.connect(ctx.destination);
        master.gain.value = state.volume * 0.5;
      }
      return ctx;
    }
    const F = { E5: 659.25, G5: 783.99, B5: 987.77, E6: 1318.51 };
    function note(freq, duration, type = 'triangle', vol = 0.06) {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      osc.connect(gain);
      gain.connect(master);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.start(t);
      osc.stop(t + duration + 0.05);
    }
    function click() {
      ready();
      note(F.E5, 0.05, 'square', 0.05);
      note(F.G5, 0.09, 'triangle', 0.04);
    }
    function coinJingle() {
      ready();
      const t = ctx.currentTime;
      note(F.G5, 0.12, 'triangle', 0.06);
      setTimeout(() => note(F.E6, 0.14, 'triangle', 0.07), 70);
    }
    function setVolume(v) {
      if (master) master.gain.value = v * 0.5;
    }
    return { click, coinJingle, setVolume };
  })();

  /* ---------------- Достижения ---------------- */
  function checkAchievements() {
    ACHIEVEMENTS.forEach(ach => {
      if (!state.achievements[ach.id] && ach.condition(state)) {
        unlockAchievement(ach.id);
      }
    });
  }

  function unlockAchievement(id) {
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach || state.achievements[id]) return;
    state.achievements[id] = true;
    saveState();
    renderAchievements();
    showToast(`${ach.icon} ${ach.name} разблокировано!`);
  }

  function renderAchievements() {
    el.achGrid.innerHTML = '';
    ACHIEVEMENTS.forEach(ach => {
      const unlocked = !!state.achievements[ach.id];
      const card = document.createElement('div');
      card.className = `ach-card ${unlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-info">
          <div class="ach-name">${ach.name}</div>
          <div class="ach-desc">${ach.desc}</div>
        </div>
        <div style="font-weight:800; color: var(--accent);">${unlocked ? '✅' : '🔒'}</div>
      `;
      el.achGrid.appendChild(card);
    });
  }

  /* ---------------- Комбо ---------------- */
  const clickTimes = [];

  function updateCombo() {
    const now = Date.now();
    clickTimes.push(now);
    // оставляем только клики за последнюю секунду
    while (clickTimes.length > 0 && clickTimes[0] < now - 1000) clickTimes.shift();

    const cps = clickTimes.length;
    if (cps >= 5) {
      state.currentCombo = cps;
      if (cps > state.maxCombo) state.maxCombo = cps;
      el.comboBadge.textContent = `x${cps}`;
      el.comboBadge.classList.add('active');
      el.btn.classList.add('combo-active');
    } else {
      state.currentCombo = 0;
      el.comboBadge.classList.remove('active');
      el.btn.classList.remove('combo-active');
    }
    checkAchievements();
  }

  /* ---------------- Таймер сессии ---------------- */
  function updateSessionTimer() {
    state.sessionTime = Math.floor((Date.now() - state.sessionStart) / 1000);
    const m = Math.floor(state.sessionTime / 60);
    const s = state.sessionTime % 60;
    el.statTime.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    checkAchievements();
  }

  let timerInterval = null;

  /* ---------------- Частицы ---------------- */
  function spawnParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'particle';
    const symbols = ['💚', '💛', '💙', '💜', '🧡', '🎵', '⭐'];
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    const tx = (Math.random() - 0.5) * 120;
    const ty = (Math.random() - 0.5) * 120 - 40;
    p.style.setProperty('--tx', tx + 'px');
    p.style.setProperty('--ty', ty + 'px');
    el.particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }

  /* ---------------- Скины ---------------- */
  function applySkin(id) {
    const skin = SKINS.find(s => s.id === id);
    if (!skin) return;
    state.activeSkinId = id;
    el.btnText.textContent = skin.emoji;
    el.btn.style.background = skin.gradient;
    saveState();
    renderSkins();
  }

  function buySkin(id) {
    const skin = SKINS.find(s => s.id === id);
    if (!skin) return;
    if (skin.purchased) {
      applySkin(id);
      return;
    }
    if (state.coins < skin.price) return;
    state.coins -= skin.price;
    skin.purchased = true;
    state.purchasedSkins.push(id);
    applySkin(id);
    saveState();
    render();
    renderSkins();
    checkAchievements();
  }

  function renderSkins() {
    el.skinCoinValue.textContent = state.coins;
    el.skinGrid.innerHTML = '';
    SKINS.forEach(skin => {
      const card = document.createElement('div');
      card.className = 'theme-card' + (state.activeSkinId === skin.id ? ' active' : '');
      const btnText = skin.purchased
        ? (state.activeSkinId === skin.id ? 'Применено' : 'Применить')
        : 'Купить';
      const btnCls = skin.purchased
        ? (state.activeSkinId === skin.id ? 'applied' : 'apply')
        : 'buy';
      const disabled = !skin.purchased && state.coins < skin.price;
      card.innerHTML = `
        <div class="theme-preview" style="
          background: ${skin.gradient};
          border-color: ${skin.emoji === 'ZUBILA' ? '#ff00ff' : '#fff'};
        "></div>
        <div class="theme-info">
          <div class="theme-name">${skin.emoji} ${skin.name}</div>
          <div class="theme-price">
            ${skin.price === 0 ? 'Бесплатно' : skin.price + ' Note Coin' + (skin.price !== 1 ? 'ов' : '')}
          </div>
        </div>
        <button class="theme-btn ${btnCls}" data-id="${skin.id}" ${disabled ? 'disabled' : ''}>
          ${btnText}
        </button>
      `;
      el.skinGrid.appendChild(card);
    });
    el.skinGrid.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => buySkin(btn.dataset.id));
    });
  }

  /* ---------------- Темы ---------------- */
  function applyTheme(id) {
    const theme = THEMES.find(t => t.id === id);
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
    state.activeThemeId = id;

    if (id === 'zubila') {
      document.body.classList.add('theme-zubila');
      if (state.activeSkinId !== 'zubilaSkin') applySkin('zubilaSkin');
      showToast('(отныне он не зубила а жорик...)');
    } else if (id === 'soundgoodizer') {
      document.body.classList.add('theme-soundgoodizer');
      el.btnText.textContent = 'FUCKSOUND';
      showToast('FUCKSOUND — секретная тема активирована!');
    } else {
      document.body.classList.remove('theme-zubila', 'theme-soundgoodizer');
      el.btnText.textContent = 'MANEWON';
    }

    saveState();
  }

  function buyTheme(id) {
    const theme = THEMES.find(t => t.id === id);
    if (!theme) return;
    if (theme.purchased) {
      applyTheme(id);
      renderShop();
      return;
    }
    if (state.coins < theme.price) return;
    state.coins -= theme.price;
    theme.purchased = true;
    state.purchasedThemes.push(id);
    applyTheme(id);
    saveState();
    render();
    renderShop();
    checkAchievements();
  }

  function activatePromo() {
    const code = el.promoInput.value.trim().toLowerCase();
    if (code === 'goodizer') {
      const theme = THEMES.find(t => t.id === 'soundgoodizer');
      if (theme && !theme.purchased) {
        theme.purchased = true;
        state.purchasedThemes.push('soundgoodizer');
        applyTheme('soundgoodizer');
        saveState();
        renderShop();
        el.promoInput.value = '';
        el.promoBtn.disabled = true;
        el.promoBtn.textContent = 'Активировано ✅';
        showToast('FUCKSOUND — секретная тема активирована!');
        checkAchievements();
      } else if (theme && theme.purchased) {
        el.promoInput.value = '';
        el.promoBtn.disabled = true;
        el.promoBtn.textContent = 'Уже активировано ✅';
        showToast('Тема Soundgoodizer уже у тебя!');
      }
    } else {
      showToast('Неверный промокод');
      el.promoInput.value = '';
    }
  }

  function renderShop() {
    el.shopCoinValue.textContent = state.coins;
    el.themeGrid.innerHTML = '';
    THEMES.forEach(theme => {
      if (theme.secret && !theme.purchased) return;
      const card = document.createElement('div');
      card.className = 'theme-card' + (state.activeThemeId === theme.id ? ' active' : '');
      const previewStyle = theme.image
        ? `background: url('${theme.image}') center center / cover; border-color: ${theme.colors['--accent']};`
        : `background: linear-gradient(135deg, ${theme.colors['--bg-top']}, ${theme.colors['--bg-middle']}); border-color: ${theme.colors['--accent']};`;
      const btnText = theme.purchased
        ? (state.activeThemeId === theme.id ? 'Применено' : 'Применить')
        : 'Купить';
      const btnCls = theme.purchased
        ? (state.activeThemeId === theme.id ? 'applied' : 'apply')
        : 'buy';
      const disabled = !theme.purchased && state.coins < theme.price;
      card.innerHTML = `
        <div class="theme-preview" style="${previewStyle}"></div>
        <div class="theme-info">
          <div class="theme-name">${theme.name}</div>
          <div class="theme-price">
            ${theme.price === 0 ? 'Бесплатно' : theme.price + ' Note Coin' + (theme.price !== 1 ? 'ов' : '')}
          </div>
        </div>
        <button class="theme-btn ${btnCls}" data-id="${theme.id}" ${disabled ? 'disabled' : ''}>
          ${btnText}
        </button>
      `;
      el.themeGrid.appendChild(card);
    });
    el.themeGrid.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => buyTheme(btn.dataset.id));
    });
  }

  /* ---------------- День / Ночь ---------------- */
  function applyDayNight() {
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= 6 && hour < 20;

    if (state.dayNightMode === 'auto') {
      document.body.classList.remove('theme-day', 'theme-night');
      document.body.classList.add(isDay ? 'theme-day' : 'theme-night');
    } else if (state.dayNightMode === 'day') {
      document.body.classList.remove('theme-night');
      document.body.classList.add('theme-day');
    } else {
      document.body.classList.remove('theme-day');
      document.body.classList.add('theme-night');
    }

    const labels = { auto: 'Авто', day: 'День', night: 'Ночь' };
    el.dayNightBtn.textContent = labels[state.dayNightMode];
  }

  function toggleDayNight() {
    if (state.dayNightMode === 'auto') state.dayNightMode = 'day';
    else if (state.dayNightMode === 'day') state.dayNightMode = 'night';
    else state.dayNightMode = 'auto';
    saveState();
    applyDayNight();
  }

  /* ---------------- Поделиться ---------------- */
  function shareResult() {
    const text = `Я нажал на MANEWON ${state.totalClicks} раз и заработал ${state.coins} Note Coins. Бесполезно, но мило. 🪙`;
    if (navigator.share) {
      navigator.share({ title: 'Manewon Clicker', text, url: window.location.href }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast('Скопировано в буфер обмена'));
    } else {
      alert(text);
    }
  }

  /* ---------------- Тост ---------------- */
  function showToast(text) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    el.toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* ---------------- Konami Code ---------------- */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  function handleKonami(key) {
    if (key === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        activateKonami();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  }

  function activateKonami() {
    state.konamiActive = true;
    THEMES.forEach(t => { t.purchased = true; });
    SKINS.forEach(s => { s.purchased = true; });
    saveState();
    renderShop();
    renderSkins();
    // Радужный фон на 1 минуту
    document.body.style.transition = 'background 0.5s ease';
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'rainbowMove 8s ease infinite';
    setTimeout(() => {
      document.body.style.animation = '';
      document.body.style.background = '';
      applyTheme(state.activeThemeId);
      state.konamiActive = false;
    }, 60000);
    showToast('⭐ Konami Code активирован! Все темы и скины разблокированы на 1 минуту.');
  }

  /* ---------------- Локальное хранилище ---------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        state.coins = data.coins || 0;
        state.totalClicks = data.totalClicks || 0;
        state.totalCoinsEarned = data.totalCoinsEarned || 0;
        state.sessionTime = data.sessionTime || 0;
        state.sessionStart = Date.now() - (state.sessionTime * 1000);
        state.activeThemeId = data.activeThemeId || 'forest';
        state.activeSkinId = data.activeSkinId || 'classic';
        state.dayNightMode = data.dayNightMode || 'auto';
        state.maxCombo = data.maxCombo || 0;
        state.adminUnlocked = data.adminUnlocked || false;
        state.achievements = data.achievements || {};
        state.purchasedThemes = data.purchasedThemes || ['forest'];
        state.purchasedSkins = data.purchasedSkins || ['classic'];
      } else {
        state.purchasedThemes = ['forest'];
        state.purchasedSkins = ['classic'];
      }
      THEMES.forEach(t => { t.purchased = state.purchasedThemes.includes(t.id); });
      SKINS.forEach(s => { s.purchased = state.purchasedSkins.includes(s.id); });
    } catch (e) {
      console.warn('Не удалось загрузить прогресс', e);
    }
    applyTheme(state.activeThemeId);
    applySkin(state.activeSkinId);
    applyDayNight();
    render();
    renderAchievements();
    renderShop();
    renderSkins();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        coins: state.coins,
        totalClicks: state.totalClicks,
        totalCoinsEarned: state.totalCoinsEarned,
        sessionTime: state.sessionTime,
        activeThemeId: state.activeThemeId,
        activeSkinId: state.activeSkinId,
        dayNightMode: state.dayNightMode,
        maxCombo: state.maxCombo,
        achievements: state.achievements,
        purchasedThemes: state.purchasedThemes,
        purchasedSkins: state.purchasedSkins,
        adminUnlocked: state.adminUnlocked
      }));
    } catch (e) {
      console.warn('Не удалось сохранить прогресс', e);
    }
  }

  /* ---------------- UI ---------------- */
  function render() {
    el.coinValue.textContent = state.coins;
    el.statClicks.textContent = state.totalClicks;
    el.statCoins.textContent = state.totalCoinsEarned;
    if (state.totalClicks > 0 || state.coins > 0) {
      el.statsChip.classList.add('visible');
    }
  }

  function addCoin(amount, event) {
    state.coins += amount;
    state.totalClicks += 1;
    state.totalCoinsEarned += amount;
    saveState();
    render();

    Sfx.click();
    Sfx.coinJingle();
    updateCombo();

    if (navigator.vibrate) navigator.vibrate(10);
    spawnFloatText(event);
    spawnParticle(event ? event.clientX : el.btn.getBoundingClientRect().left + 115,
                  event ? event.clientY : el.btn.getBoundingClientRect().top + 115);

    if (state.totalClicks % 5 === 0) spawnHeart(event);
    checkAchievements();
  }

  function spawnFloatText(event) {
    const rect = el.btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let x = cx, y = cy;
    if (event) {
      x = event.clientX != null ? event.clientX : cx;
      y = event.clientY != null ? event.clientY : cy;
      x += (Math.random() - 0.5) * 70;
      y += (Math.random() - 0.5) * 70;
    }
    const txt = document.createElement('div');
    txt.className = 'float-text';
    txt.textContent = '+1 Note Coin';
    txt.style.left = x + 'px';
    txt.style.top = y + 'px';
    el.floatLayer.appendChild(txt);
    setTimeout(() => txt.remove(), 1000);
  }

  function spawnHeart(event) {
    const rect = el.btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let x = cx, y = cy;
    if (event) {
      x = event.clientX != null ? event.clientX : cx;
      y = event.clientY != null ? event.clientY : cy;
      x += (Math.random() - 0.5) * 100;
      y += (Math.random() - 0.5) * 100;
    }
    const h = document.createElement('div');
    h.className = 'float-text';
    h.textContent = '💚';
    h.style.fontSize = '1.5rem';
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    h.style.color = '#ff4d94';
    h.style.textShadow = '0 0 14px rgba(255, 77, 148, 0.7)';
    el.floatLayer.appendChild(h);
    setTimeout(() => h.remove(), 1100);
  }

  /* ---------------- Парракс фона ---------------- */
  function initParallax() {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const items = document.querySelectorAll('.decor-item');
      items.forEach((item, i) => {
        const speed = 0.04 + (i % 3) * 0.02;
        item.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  /* ---------------- Частицы при движении мыши ---------------- */
  function initMouseParticles() {
    document.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.3) spawnParticle(e.clientX, e.clientY);
    });
    document.addEventListener('touchmove', (e) => {
      if (Math.random() < 0.3) {
        const t = e.touches[0];
        spawnParticle(t.clientX, t.clientY);
      }
    }, { passive: true });
  }

  /* ---------- Активация админ-панели по промокоду ---------- */
  function activateAdminPromo() {
    const code = el.adminPromoInput.value.trim().toUpperCase();
    if (code === 'ADMIN' && !state.adminUnlocked) {
      state.adminUnlocked = true;
      saveState();
      el.adminHiddenBtn.classList.add('unlocked');
      el.adminPromoInput.disabled = true;
      el.adminPromoBtn.disabled = true;
      el.adminPromoBtn.textContent = 'Активировано ✅';
      showToast('Админ-панель разблокирована! Кнопка 🔧 появилась слева снизу.');
    } else if (state.adminUnlocked) {
      el.adminPromoInput.disabled = true;
      el.adminPromoBtn.disabled = true;
      el.adminPromoBtn.textContent = 'Уже активировано ✅';
    } else {
      showToast('Неверный промокод');
      el.adminPromoInput.value = '';
    }
  }

  /* ---------------- Админ панель ---------- */
  function populateAdminThemeSelect() {
    el.adminThemeSelect.innerHTML = '';
    THEMES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.name} ${t.purchased ? '(куплена)' : ''}`;
      el.adminThemeSelect.appendChild(opt);
    });
    el.adminThemeSelect.value = state.activeThemeId;
  }

  function openAdmin() {
    populateAdminThemeSelect();
    el.adminCoins.value = state.coins;
    el.adminClicks.value = state.totalClicks;
    el.adminEarned.value = state.totalCoinsEarned;
    el.adminOverlay.classList.add('open');
    el.adminClose.focus();
  }

  function closeAdmin() {
    el.adminOverlay.classList.remove('open');
    el.adminRaw.style.display = 'none';
  }

  function refreshRaw() {
    el.adminRaw.style.display = 'block';
    el.adminRawText.textContent = JSON.stringify({
      coins: state.coins,
      totalClicks: state.totalClicks,
      totalCoinsEarned: state.totalCoinsEarned,
      activeThemeId: state.activeThemeId,
      activeSkinId: state.activeSkinId,
      purchasedThemes: state.purchasedThemes,
      purchasedSkins: state.purchasedSkins,
      achievements: state.achievements
    }, null, 2);
  }

  function applyAdminValues() {
    const c = parseInt(el.adminCoins.value, 10);
    const cl = parseInt(el.adminClicks.value, 10);
    const e = parseInt(el.adminEarned.value, 10);
    if (!isNaN(c)) state.coins = c;
    if (!isNaN(cl)) state.totalClicks = cl;
    if (!isNaN(e)) state.totalCoinsEarned = e;
    saveState();
    render();
    renderShop();
    renderSkins();
    closeAdmin();
    showToast('Админ значения применены');
  }

  function unlockAllThemes() {
    THEMES.forEach(t => { t.purchased = true; });
    state.purchasedThemes = THEMES.map(t => t.id);
    saveState();
    renderShop();
    renderSkins();
    populateAdminThemeSelect();
    closeAdmin();
    showToast('Все темы разблокированы');
  }

  function setAdminTheme() {
    applyTheme(el.adminThemeSelect.value);
    closeAdmin();
    showToast(`Тема установлена: ${el.adminThemeSelect.value}`);
  }

  function wipeAll() {
    if (!confirm('ПОЛНЫЙ СБРОС? Все данные будут стёрты безвозвратно.')) return;
    state.coins = 0;
    state.totalClicks = 0;
    state.totalCoinsEarned = 0;
    state.sessionTime = 0;
    state.sessionStart = Date.now();
    state.activeThemeId = 'forest';
    state.activeSkinId = 'classic';
    state.maxCombo = 0;
    state.achievements = {};
    state.purchasedThemes = ['forest'];
    state.purchasedSkins = ['classic'];
    applyTheme('forest');
    applySkin('classic');
    saveState();
    render();
    renderShop();
    renderSkins();
    renderAchievements();
    populateAdminThemeSelect();
    closeAdmin();
    showToast('Прогресс стёрт');
  }

  function exportSave() {
    const data = {
      coins: state.coins,
      totalClicks: state.totalClicks,
      totalCoinsEarned: state.totalCoinsEarned,
      sessionTime: state.sessionTime,
      activeThemeId: state.activeThemeId,
      activeSkinId: state.activeSkinId,
      dayNightMode: state.dayNightMode,
      maxCombo: state.maxCombo,
      achievements: state.achievements,
      purchasedThemes: state.purchasedThemes,
      purchasedSkins: state.purchasedSkins
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manewon_save.json';
    a.click();
    URL.revokeObjectURL(url);
    closeAdmin();
    showToast('Сохранение экспортировано');
  }

  function importSave() {
    try {
      const data = JSON.parse(el.adminImportJson.value);
      state.coins = data.coins || 0;
      state.totalClicks = data.totalClicks || 0;
      state.totalCoinsEarned = data.totalCoinsEarned || 0;
      state.sessionTime = data.sessionTime || 0;
      state.sessionStart = Date.now() - (state.sessionTime * 1000);
      state.activeThemeId = data.activeThemeId || 'forest';
      state.activeSkinId = data.activeSkinId || 'classic';
      state.dayNightMode = data.dayNightMode || 'auto';
      state.maxCombo = data.maxCombo || 0;
      state.achievements = data.achievements || {};
      state.purchasedThemes = data.purchasedThemes || ['forest'];
      state.purchasedSkins = data.purchasedSkins || ['classic'];
      THEMES.forEach(t => { t.purchased = state.purchasedThemes.includes(t.id); });
      SKINS.forEach(s => { s.purchased = state.purchasedSkins.includes(s.id); });
      applyTheme(state.activeThemeId);
      applySkin(state.activeSkinId);
      applyDayNight();
      saveState();
      render();
      renderShop();
      renderSkins();
      renderAchievements();
      populateAdminThemeSelect();
      closeAdmin();
      showToast('Сохранение импортировано');
    } catch (err) {
      showToast('Ошибка импорта: неверный JSON');
    }
  }

  /* ---------------- События ---------------- */
  function initButtons() {
    // Главная кнопка
    el.btn.addEventListener('pointerdown', () => {
      if (!state.started) {
        state.started = true;
      }
    });

    el.btn.addEventListener('click', (e) => {
      addCoin(COINS_PER_CLICK, e);
    });

    // Иконка монеты -> модалка
    function openCoinModal() {
      el.modalOverlay.classList.add('open');
      el.modalClose.focus();
    }
    el.coinIcon.addEventListener('click', openCoinModal);
    el.coinIcon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCoinModal(); }
    });

    function closeModal() { el.modalOverlay.classList.remove('open'); }
    el.modalClose.addEventListener('click', closeModal);
    el.modalOverlay.addEventListener('click', (e) => { if (e.target === el.modalOverlay) closeModal(); });
    el.modalClose.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Музыка
    el.musicToggle.addEventListener('click', () => {
      if (!state.started) { state.started = true; }
      Music.toggle();
      el.btn.classList.toggle('playing', state.musicEnabled);
    });

    el.volumeSlider.addEventListener('input', () => {
      Music.setVolume(parseFloat(el.volumeSlider.value));
      Sfx.setVolume(parseFloat(el.volumeSlider.value));
    });

    // Магазин тем
    el.shopBtn.addEventListener('click', () => {
      renderShop();
      el.shopOverlay.classList.add('open');
      el.shopClose.focus();
    });

    function closeShop() { el.shopOverlay.classList.remove('open'); }
    el.shopClose.addEventListener('click', closeShop);
    el.shopOverlay.addEventListener('click', (e) => { if (e.target === el.shopOverlay) closeShop(); });
    el.shopClose.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeShop(); });

    // Промокод
    el.promoBtn.addEventListener('click', activatePromo);
    el.promoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') activatePromo();
    });

    // Скины кнопки
    el.skinsBtn.addEventListener('click', () => {
      renderSkins();
      el.skinsOverlay.classList.add('open');
      el.skinsClose.focus();
    });

    function closeSkins() { el.skinsOverlay.classList.remove('open'); }
    el.skinsClose.addEventListener('click', closeSkins);
    el.skinsOverlay.addEventListener('click', (e) => { if (e.target === el.skinsOverlay) closeSkins(); });
    el.skinsClose.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSkins(); });

    // Достижения
    el.achievementsBtn.addEventListener('click', () => {
      renderAchievements();
      el.achievementsOverlay.classList.add('open');
      el.achievementsClose.focus();
    });

    function closeAch() { el.achievementsOverlay.classList.remove('open'); }
    el.achievementsClose.addEventListener('click', closeAch);
    el.achievementsOverlay.addEventListener('click', (e) => { if (e.target === el.achievementsOverlay) closeAch(); });
    el.achievementsClose.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAch(); });

    // Поделиться
    el.shareBtn.addEventListener('click', shareResult);

    // День / Ночь
    el.dayNightBtn.addEventListener('click', toggleDayNight);

    // Сброс прогресса
    el.resetBtn.addEventListener('click', () => {
      const ok = confirm('Вы уверены, что хотите сбросить весь прогресс?\nЭто действие нельзя отменить.');
      if (!ok) return;
      state.coins = 0;
      state.totalClicks = 0;
      state.totalCoinsEarned = 0;
      state.sessionTime = 0;
      state.sessionStart = Date.now();
      state.activeThemeId = 'forest';
      state.activeSkinId = 'classic';
      state.maxCombo = 0;
      state.achievements = {};
      state.purchasedThemes = ['forest'];
      state.purchasedSkins = ['classic'];
      applyTheme('forest');
      applySkin('classic');
      saveState();
      render();
      renderShop();
      renderSkins();
      renderAchievements();
      el.statsChip.classList.remove('visible');
    });

    // Админ панель
    el.adminHiddenBtn.addEventListener('click', openAdmin);
    el.adminClose.addEventListener('click', closeAdmin);
    el.adminOverlay.addEventListener('click', (e) => { if (e.target === el.adminOverlay) closeAdmin(); });
    el.adminClose.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAdmin(); });

    el.adminSetBtn.addEventListener('click', applyAdminValues);
    el.adminUnlockAllBtn.addEventListener('click', unlockAllThemes);
    el.adminSetThemeBtn.addEventListener('click', setAdminTheme);
    el.adminWipeBtn.addEventListener('click', wipeAll);
    el.adminExportBtn.addEventListener('click', exportSave);
    el.adminImportBtn.addEventListener('click', importSave);
    el.adminRefreshRawBtn.addEventListener('click', refreshRaw);

    // Промокод админа
    el.adminPromoBtn.addEventListener('click', activateAdminPromo);
    el.adminPromoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') activateAdminPromo();
    });

    // Если уже разблокировано ранее — показываем кнопку и блокируем ввод
    if (state.adminUnlocked) {
      el.adminHiddenBtn.classList.add('unlocked');
      el.adminPromoInput.disabled = true;
      el.adminPromoBtn.disabled = true;
      el.adminPromoBtn.textContent = 'Уже активировано ✅';
    }

    // Konami Code (клавиатура)
    document.addEventListener('keydown', (e) => {
      handleKonami(e.key);
    });
  }

  /* ---------------- Запуск ---------------- */
  function init() {
    loadState();
    initButtons();
    initParallax();
    initMouseParticles();
    Music.setVolume(state.volume);
    Sfx.setVolume(state.volume);
    applyDayNight();

    timerInterval = setInterval(() => {
      updateSessionTimer();
    }, 1000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
