// --- WEB AUDIO API SFX SYNTHESIZER ---
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBeep(freq, duration, type = 'sine', volume = 0.1) {
    if (!this.enabled) return;
    this.init();
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  playClick() {
    this.playBeep(600, 0.08, 'sine', 0.15);
  }

  playSuccess() {
    this.playBeep(440, 0.1, 'triangle', 0.15);
    setTimeout(() => {
      this.playBeep(880, 0.15, 'triangle', 0.15);
    }, 100);
  }

  playError() {
    this.playBeep(180, 0.3, 'sawtooth', 0.1);
  }

  playLevelUp() {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playBeep(freq, 0.15, 'triangle', 0.2);
      }, index * 80);
    });
  }
}

const sounds = new SoundManager();

// --- STATE MANAGEMENT ---
const DEFAULT_STATE = {
  userConnected: false,
  walletAddress: '',
  walletType: '',
  tokenId: '',
  xp: 0,
  level: 1,
  badges: [],
  completedQuests: [],
  votedProposals: {},
  soundEnabled: true,
  pruBalance: 0,
  lastFaucetClaim: 0,
  qfProjects: [
    { id: 1, name: "Decentralized Voting UI", donors: [100, 200, 50] },
    { id: 2, name: "SBT Badge Smart Contract", donors: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10] }
  ]
};

let state = { ...DEFAULT_STATE };

function loadState() {
  const saved = localStorage.getItem('prubc_state');
  if (saved) {
    try {
      state = JSON.parse(saved);
      // Ensure complex structures exist
      if (!state.qfProjects) state.qfProjects = [...DEFAULT_STATE.qfProjects];
      if (state.pruBalance === undefined) state.pruBalance = 0;
      if (state.lastFaucetClaim === undefined) state.lastFaucetClaim = 0;
      sounds.enabled = state.soundEnabled;
    } catch (e) {
      state = { ...DEFAULT_STATE };
    }
  } else {
    state = { ...DEFAULT_STATE };
  }
}

function saveState() {
  localStorage.setItem('prubc_state', JSON.stringify(state));
}

// --- UTILITIES ---
function formatAddress(addr) {
  if (!addr) return 'Bağlı Değil';
  return addr.length > 15 ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : addr;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'success-toast' : ''}`;
  
  const icon = type === 'success' ? '⚡' : 'ℹ️';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// --- INITIALIZE LEADERBOARD DATA ---
const STATIC_LEADERBOARD = [
  { ensName: 'mert.eth', level: 5, xp: 450, badges: ['solidity', 'meetup', 'tokenomics', 'hackathon'] },
  { ensName: 'selin.eth', level: 4, xp: 380, badges: ['solidity', 'meetup', 'tokenomics'] },
  { ensName: 'can.eth', level: 3, xp: 290, badges: ['solidity', 'meetup'] },
  { ensName: 'pru_dean.eth', level: 1, xp: 85, badges: ['meetup'] }
];

// --- FAUCET CLAIM LOGIC ---
let faucetCooldownInterval = null;

function updateFaucetCooldown() {
  const claimBtn = document.getElementById('btn-claim-faucet');
  const timerDiv = document.getElementById('faucet-cooldown-timer');
  if (!claimBtn || !timerDiv) return;

  const now = Date.now();
  const elapsed = now - state.lastFaucetClaim;
  const cooldownPeriod = 30000; // 30 seconds for testability

  if (elapsed < cooldownPeriod) {
    // Disable button, show timer
    claimBtn.disabled = true;
    claimBtn.textContent = "BEKLEME SÜRESİ";
    timerDiv.style.display = "block";

    const remainingSec = Math.ceil((cooldownPeriod - elapsed) / 1000);
    timerDiv.textContent = `${remainingSec}s`;

    if (!faucetCooldownInterval) {
      faucetCooldownInterval = setInterval(() => {
        updateFaucetCooldown();
      }, 1000);
    }
  } else {
    // Enable button, hide timer
    claimBtn.disabled = false;
    claimBtn.textContent = "100 PRU TALEP ET";
    timerDiv.style.display = "none";
    if (faucetCooldownInterval) {
      clearInterval(faucetCooldownInterval);
      faucetCooldownInterval = null;
    }
  }
}

function claimFaucetTokens() {
  if (!checkWalletConnected()) return;

  const now = Date.now();
  if (now - state.lastFaucetClaim < 30000) {
    sounds.playError();
    showToast("⚠️ Bekleme süresi dolmadan tekrar talep edemezsiniz!", "error");
    return;
  }

  // Simulate claiming
  sounds.playClick();
  const claimBtn = document.getElementById('btn-claim-faucet');
  claimBtn.disabled = true;
  claimBtn.textContent = "İşlem Gönderiliyor...";

  const txHash = "0x" + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
  appendTerminal(`[TX] Faucet.requestTokens(100 PRU) initiated. hash: ${txHash}`, 'cmd');

  setTimeout(() => {
    state.pruBalance += 100;
    state.lastFaucetClaim = Date.now();
    saveState();
    updateUI();
    updateFaucetCooldown();

    sounds.playSuccess();
    showToast("🎉 100 PRU Testnet Tokeni cüzdanınıza başarıyla aktarıldı!", "success");
    appendTerminal(`[TX] Block confirmed. Faucet.requestTokens success. +100 PRU added.`, 'success');
  }, 1200);
}

// --- DYNAMIC CORE FUNCTIONS ---
function updateUI() {
  updateFaucetCooldown();
  // Update Wallet Button
  const connectBtn = document.getElementById('wallet-connect-btn');
  if (state.userConnected) {
    connectBtn.textContent = formatAddress(state.walletAddress);
    connectBtn.classList.add('connected');
  } else {
    connectBtn.textContent = 'CÜZDAN BAĞLA';
    connectBtn.classList.remove('connected');
  }

  // Update SBT Sidebar Card
  const badgeStatus = document.getElementById('sbt-badge-status');
  const tokenIdSpan = document.getElementById('sbt-token-id');
  const avatarChar = document.getElementById('sbt-avatar-char');
  const usernameText = document.getElementById('sbt-username');
  const walletAddrSpan = document.getElementById('sbt-wallet-address');
  const levelVal = document.getElementById('sbt-level-val');
  const xpNumbers = document.getElementById('sbt-xp-numbers');
  const xpBarFill = document.getElementById('sbt-xp-bar-fill');

  if (state.userConnected) {
    badgeStatus.textContent = 'On-Chain SBT';
    badgeStatus.style.borderColor = 'var(--accent-green)';
    badgeStatus.style.color = 'var(--accent-green)';
    badgeStatus.style.background = 'rgba(16, 185, 129, 0.1)';

    tokenIdSpan.textContent = `SBT #${state.tokenId}`;
    avatarChar.textContent = state.walletAddress.substring(0, 4).toUpperCase();
    usernameText.textContent = state.walletAddress;
    walletAddrSpan.textContent = formatAddress(state.walletAddress);
  } else {
    badgeStatus.textContent = 'Web3 Kimliği Yok';
    badgeStatus.style.borderColor = 'var(--accent-cyan)';
    badgeStatus.style.color = 'var(--accent-cyan)';
    badgeStatus.style.background = 'rgba(6, 182, 212, 0.1)';

    tokenIdSpan.textContent = 'SBT #----';
    avatarChar.textContent = '?';
    usernameText.textContent = 'Misafir Üye';
    walletAddrSpan.textContent = 'Cüzdan Bağlı Değil';
  }

  // XP & Level calculations
  levelVal.textContent = state.level;
  const currentXPForLevel = state.xp % 100;
  xpNumbers.textContent = `${currentXPForLevel} / 100 XP`;
  xpBarFill.style.width = `${currentXPForLevel}%`;

  // Update PRU Balance
  const pruBalanceSpan = document.getElementById('sbt-pru-balance');
  if (pruBalanceSpan) {
    pruBalanceSpan.textContent = `${state.pruBalance} PRU`;
  }

  // Update Badges UI
  const badgesList = ['solidity', 'meetup', 'tokenomics', 'hackathon'];
  badgesList.forEach(b => {
    const slot = document.getElementById(`badge-${b}`);
    if (state.badges.includes(b)) {
      slot.classList.add('earned');
      slot.innerHTML = getBadgeEmoji(b) + slot.querySelector('.tooltip').outerHTML;
    } else {
      slot.classList.remove('earned');
      slot.innerHTML = '🔒' + slot.querySelector('.tooltip').outerHTML;
    }
  });

  // Update sound icon
  const soundBtn = document.getElementById('sound-toggle');
  if (state.soundEnabled) {
    soundBtn.classList.remove('muted');
    soundBtn.innerHTML = `
      <svg class="sound-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;
  } else {
    soundBtn.classList.add('muted');
    soundBtn.innerHTML = `
      <svg class="sound-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    `;
  }

  // Update Academy Mission Cards Visual State
  updateMissionCardState('solidity');
  updateMissionCardState('meetup');
  updateMissionCardState('tokenomics');
  updateMissionCardState('hackathon');
  updateMissionCardState('location');

  // Update DAO Votes Rendering
  updateDAOProposals();

  // Render Leaderboard & QF
  renderLeaderboard();
  renderQFSimulator();
}

function getBadgeEmoji(badge) {
  switch (badge) {
    case 'solidity': return '🧙‍♂️';
    case 'meetup': return '🗼';
    case 'tokenomics': return '📊';
    case 'hackathon': return '🏗️';
    default: return '🛡️';
  }
}

function updateMissionCardState(questId) {
  const card = document.getElementById(`mission-${questId}-card`);
  const statusSpan = document.getElementById(`status-${questId}`);
  const btn = document.getElementById(`btn-start-${questId}`);

  if (state.completedQuests.includes(questId)) {
    card.classList.add('completed');
    statusSpan.textContent = 'Tamamlandı';
    statusSpan.className = 'mission-status success';
    statusSpan.innerHTML = '✔ Tamamlandı';
    if (btn) {
      btn.textContent = 'Tamamlandı';
      btn.disabled = true;
    }
  } else {
    card.classList.remove('completed');
    statusSpan.textContent = 'Başlanmadı';
    statusSpan.className = 'mission-status';
    if (btn) {
      btn.textContent = questId === 'meetup' ? 'QR Kod Tarat' : questId === 'solidity' ? 'Görevi Başlat' : questId === 'tokenomics' ? 'Raporu Gönder' : 'MVP Kaydet';
      btn.disabled = false;
    }
  }
}

// Add XP and check for Level Up
function awardXP(amount) {
  const oldLevel = state.level;
  state.xp += amount;
  state.level = Math.floor(state.xp / 100) + 1;

  if (state.level > oldLevel) {
    sounds.playLevelUp();
    showToast(`👑 TEBRİKLER! Seviye atladınız. Yeni Seviye: ${state.level}! Oy gücünüz arttı.`, 'success');
    appendTerminal(`[GAME] LEVEL UP! User leveled up to LVL ${state.level}. Voting weight multiplier updated.`, 'info');
  } else {
    sounds.playSuccess();
  }
  saveState();
  updateUI();
}

// --- TERMINAL LOGGER ---
function appendTerminal(message, type = 'cmd') {
  const terminal = document.getElementById('terminal-output');
  if (!terminal) return;
  
  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;
  
  const time = new Date().toLocaleTimeString();
  line.textContent = `[${time}] ${message}`;
  
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;

  // Limit lines to 15 to keep it clean
  while (terminal.childElementCount > 15) {
    terminal.removeChild(terminal.firstChild);
  }
}

// Simulate network activity on dashboard terminal
setInterval(() => {
  const logs = [
    { text: "Akıllı sözleşme çağrısı sorgulanıyor...", type: "info" },
    { text: "Testnet gaz ücreti: 14 Gwei.", type: "success" },
    { text: "DAO oylaması güncellendi. Yeni oylar sisteme işleniyor...", type: "info" },
    { text: "Zincir üstü IPFS verileri okundu.", type: "success" },
    { text: "Blok #10928 mined. İşlem sayısı: 28.", type: "success" },
    { text: "SBT badge registry kontratı tetiklendi.", type: "info" }
  ];
  const item = logs[Math.floor(Math.random() * logs.length)];
  appendTerminal(item.text, item.type);
}, 6000);

// --- TAB SWITCHING ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    sounds.playClick();
    const targetView = btn.dataset.view;
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`view-${targetView}`).classList.add('active');
    
    appendTerminal(`guest@prubc:~$ navigate_to_${targetView}.sh`, 'cmd');
  });
});

// --- WALLET CONNECT SIMULATOR ---
const walletBtn = document.getElementById('wallet-connect-btn');
const overlayWallet = document.getElementById('overlay-wallet');
const closeWalletBtn = document.getElementById('btn-close-wallet-modal');

walletBtn.addEventListener('click', () => {
  sounds.playClick();
  if (state.userConnected) {
    if (confirm('Cüzdan bağlantısını kesmek istiyor musunuz?')) {
      state.userConnected = false;
      state.walletAddress = '';
      state.walletType = '';
      state.tokenId = '';
      saveState();
      updateUI();
      sounds.playClick();
      showToast('Cüzdan bağlantısı kesildi.', 'info');
      appendTerminal('[SYS] Wallet connection disconnected by user.', 'error');
    }
  } else {
    overlayWallet.classList.add('active');
  }
});

closeWalletBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayWallet.classList.remove('active');
});

document.querySelectorAll('.wallet-option-item').forEach(item => {
  item.addEventListener('click', () => {
    sounds.playClick();
    const wallet = item.dataset.wallet;
    
    // Show Loading
    document.getElementById('wallet-options-list').style.display = 'none';
    const loader = document.getElementById('wallet-connecting-loader');
    loader.style.display = 'flex';
    
    const loadingTexts = [
      "Anahtar eşleşmesi kuruluyor...",
      "On-chain kimlik doğrulanıyor...",
      "Soulbound Token kontrol ediliyor..."
    ];
    
    let textIndex = 0;
    const interval = setInterval(() => {
      document.getElementById('wallet-loading-text').textContent = loadingTexts[textIndex];
      textIndex = (textIndex + 1) % loadingTexts.length;
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      
      // Setup mock connection
      state.userConnected = true;
      state.walletType = wallet;
      
      // Random mock address
      const randomHex = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('');
      state.walletAddress = `pru_member_${randomHex}.eth`;
      state.tokenId = Math.floor(1000 + Math.random() * 9000).toString();
      
      saveState();
      
      // Reset loading dialog UI
      document.getElementById('wallet-options-list').style.display = 'flex';
      loader.style.display = 'none';
      overlayWallet.classList.remove('active');
      
      sounds.playSuccess();
      showToast(`Cüzdan başarıyla bağlandı! Hoş geldiniz ${state.walletAddress}`, 'success');
      appendTerminal(`[SYS] Wallet connected: ${state.walletAddress} via ${wallet}. SBT Token ID: #${state.tokenId}`, 'success');
      
      // Kayıt Dönemi Hoş Geldin Bonusu
      if (!state.completedQuests.includes('registration')) {
        setTimeout(() => {
          state.completedQuests.push('registration');
          state.pruBalance += 100;
          saveState();
          awardXP(25);
          showToast("🎁 Hoş Geldin Bonusu! Kayıt dönemi ödülü +100 PRU ve +25 XP tanımlandı.", "success");
          appendTerminal(`[SYS] First time registration detected. Welcome bonus of 100 PRU minted to SBT.`, 'success');
          updateUI();
        }, 1000);
      }

      updateUI();
    }, 1500);
  });
});

// Helper validation for quests
function checkWalletConnected() {
  if (!state.userConnected) {
    sounds.playError();
    showToast("⚠️ İşlem Hatası: Lütfen önce cüzdanınızı bağlayın!", "error");
    overlayWallet.classList.add('active');
    return false;
  }
  return true;
}

// --- MISSION 1: SOLIDITY QUIZ GOVERNANCE ---
const btnStartSolidity = document.getElementById('btn-start-solidity');
const overlayQuiz = document.getElementById('overlay-quiz');
const closeQuizBtn = document.getElementById('btn-close-quiz-modal');
const btnVideoPlay = document.getElementById('btn-video-play');
const videoTimeline = document.getElementById('video-timeline-bar');
const videoOverlayText = document.getElementById('video-overlay-text');
const quizQuestionBox = document.getElementById('quiz-question-box');

btnStartSolidity.addEventListener('click', () => {
  sounds.playClick();
  if (!checkWalletConnected()) return;
  overlayQuiz.classList.add('active');
  // Reset quiz modal state
  btnVideoPlay.style.display = 'flex';
  videoTimeline.style.width = '0%';
  videoOverlayText.textContent = 'Eğitim Videosunu İzle (5 Saniye)';
  quizQuestionBox.style.display = 'none';
});

closeQuizBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayQuiz.classList.remove('active');
});

btnVideoPlay.addEventListener('click', () => {
  sounds.playClick();
  btnVideoPlay.style.display = 'none';
  videoOverlayText.textContent = 'Eğitim Videosu Oynatılıyor...';
  
  // Animate timeline
  videoTimeline.style.transition = 'width 5s linear';
  videoTimeline.style.width = '100%';
  
  setTimeout(() => {
    sounds.playSuccess();
    videoOverlayText.textContent = 'Eğitim Tamamlandı. Teste Geçebilirsiniz!';
    quizQuestionBox.style.display = 'block';
    renderQuiz();
  }, 5000);
});

const solidityQuizData = {
  question: "Solidity'de hangi anahtar kelime, bir fonksiyonun durum değişkenlerini (state variables) değiştiremeyeceğini ve sadece okuma yapabileceğini belirtir?",
  answers: [
    { text: "A) pure", correct: false },
    { text: "B) view", correct: true },
    { text: "C) payable", correct: false },
    { text: "D) internal", correct: false }
  ]
};

function renderQuiz() {
  const questionText = document.getElementById('quiz-question-text');
  const optionsContainer = document.getElementById('quiz-options-container');
  
  questionText.textContent = solidityQuizData.question;
  optionsContainer.innerHTML = '';
  
  solidityQuizData.answers.forEach(ans => {
    const optBtn = document.createElement('button');
    optBtn.className = 'quiz-option';
    optBtn.textContent = ans.text;
    
    optBtn.addEventListener('click', () => {
      // Disable all buttons
      document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
      
      if (ans.correct) {
        optBtn.classList.add('correct');
        sounds.playSuccess();
        appendTerminal("[GAME] Solidity 101 quiz completed correctly.", "success");
        
        setTimeout(() => {
          state.completedQuests.push('solidity');
          if (!state.badges.includes('solidity')) state.badges.push('solidity');
          overlayQuiz.classList.remove('active');
          awardXP(25);
          showToast("🎉 Solidity rozetiniz Soulbound cüzdanınıza basıldı! +25 XP", "success");
        }, 1500);
      } else {
        optBtn.classList.add('incorrect');
        sounds.playError();
        showToast("❌ Yanlış cevap! Lütfen tekrar deneyin.", "error");
        
        // Re-enable options after a short delay to try again
        setTimeout(() => {
          document.querySelectorAll('.quiz-option').forEach(b => {
            b.disabled = false;
            b.classList.remove('incorrect');
          });
        }, 1500);
      }
    });
    optionsContainer.appendChild(optBtn);
  });
}

// --- MISSION 2: MEETUP QR CODES ---
const btnStartMeetup = document.getElementById('btn-start-meetup');
const overlayQr = document.getElementById('overlay-qr');
const closeQrBtn = document.getElementById('btn-close-qr-modal');
const btnTriggerScan = document.getElementById('btn-trigger-scan');

btnStartMeetup.addEventListener('click', () => {
  sounds.playClick();
  if (!checkWalletConnected()) return;
  overlayQr.classList.add('active');
});

closeQrBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayQr.classList.remove('active');
});

btnTriggerScan.addEventListener('click', () => {
  sounds.playClick();
  btnTriggerScan.disabled = true;
  btnTriggerScan.textContent = "Tarama doğrulanıyor...";
  
  setTimeout(() => {
    sounds.playSuccess();
    state.completedQuests.push('meetup');
    if (!state.badges.includes('meetup')) state.badges.push('meetup');
    overlayQr.classList.remove('active');
    
    btnTriggerScan.disabled = false;
    btnTriggerScan.textContent = "Taramayı Simüle Et";
    
    awardXP(15);
    showToast("🎉 Buluşma katılımı doğrulandı! On-chain rozet basıldı. +15 XP", "success");
    appendTerminal("[GAME] Meetup attendance verified via mock QR code.", "success");
  }, 1800);
});

// --- MISSION 3: TOKENOMICS SUBMISSION ---
const btnStartTokenomics = document.getElementById('btn-start-tokenomics');
const overlayTokenomics = document.getElementById('overlay-tokenomics');
const closeTokenomicsBtn = document.getElementById('btn-close-tokenomics-modal');
const formTokenomics = document.getElementById('form-tokenomics');

btnStartTokenomics.addEventListener('click', () => {
  sounds.playClick();
  if (!checkWalletConnected()) return;
  overlayTokenomics.classList.add('active');
});

closeTokenomicsBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayTokenomics.classList.remove('active');
});

formTokenomics.addEventListener('submit', (e) => {
  e.preventDefault();
  sounds.playClick();
  
  const title = document.getElementById('input-article-title').value;
  const link = document.getElementById('input-article-link').value;
  
  state.completedQuests.push('tokenomics');
  if (!state.badges.includes('tokenomics')) state.badges.push('tokenomics');
  overlayTokenomics.classList.remove('active');
  
  // Clear form
  formTokenomics.reset();
  
  awardXP(40);
  showToast("🎉 Analiz raporunuz iletildi. On-chain rozet basıldı! +40 XP", "success");
  appendTerminal(`[GAME] Tokenomics submitted: "${title}" (Link: ${link}). Verified successfully.`, "success");
});

// --- MISSION 4: HACKATHON MVP SUBMISSION ---
const btnStartHackathon = document.getElementById('btn-start-hackathon');
const overlayHackathon = document.getElementById('overlay-hackathon');
const closeHackathonBtn = document.getElementById('btn-close-hackathon-modal');
const formHackathon = document.getElementById('form-hackathon');

btnStartHackathon.addEventListener('click', () => {
  sounds.playClick();
  if (!checkWalletConnected()) return;
  overlayHackathon.classList.add('active');
});

closeHackathonBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayHackathon.classList.remove('active');
});

formHackathon.addEventListener('submit', (e) => {
  e.preventDefault();
  sounds.playClick();
  
  const title = document.getElementById('input-hackathon-title').value;
  const repo = document.getElementById('input-hackathon-github').value;
  
  state.completedQuests.push('hackathon');
  if (!state.badges.includes('hackathon')) state.badges.push('hackathon');
  overlayHackathon.classList.remove('active');
  
  formHackathon.reset();
  
  awardXP(80);
  showToast("🎉 Hackathon MVP projeniz kaydedildi! On-chain rozet basıldı. +80 XP", "success");
  appendTerminal(`[GAME] Hackathon MVP submitted: "${title}" (GitHub: ${repo}). Contract minted.`, "success");
});

// --- DAO VOTING MECHANICS ---
const btnVoteYes = document.getElementById('btn-vote-yes');
const btnVoteNo = document.getElementById('btn-vote-no');

let baseYesVotes = 34.5;
let baseNoVotes = 21;

function updateDAOProposals() {
  const proposalVoted = state.votedProposals['ipr-12'];
  
  let yesTotal = baseYesVotes;
  let noTotal = baseNoVotes;

  if (proposalVoted === 'yes') {
    yesTotal += state.level; // Weight is equivalent to level
    btnVoteYes.disabled = true;
    btnVoteNo.disabled = true;
    btnVoteYes.textContent = "EVET OYU VERDİNİZ";
  } else if (proposalVoted === 'no') {
    noTotal += state.level;
    btnVoteYes.disabled = true;
    btnVoteNo.disabled = true;
    btnVoteNo.textContent = "HAYIR OYU VERDİNİZ";
  } else {
    btnVoteYes.disabled = false;
    btnVoteNo.disabled = false;
    btnVoteYes.textContent = "EVET OYU VER";
    btnVoteNo.textContent = "HAYIR OYU VER";
  }

  const sum = yesTotal + noTotal;
  const yesPct = Math.round((yesTotal / sum) * 100);
  const noPct = 100 - yesPct;

  document.getElementById('vote-yes-count').textContent = yesTotal;
  document.getElementById('vote-no-count').textContent = noTotal;
  
  document.getElementById('vote-yes-percent').textContent = `${yesPct}% (${yesTotal} Oy)`;
  document.getElementById('vote-no-percent').textContent = `${noPct}% (${noTotal} Oy)`;

  document.getElementById('vote-yes-fill').style.width = `${yesPct}%`;
  document.getElementById('vote-no-fill').style.width = `${noPct}%`;
}

function castVote(choice) {
  if (!checkWalletConnected()) return;
  sounds.playClick();

  state.votedProposals['ipr-12'] = choice;
  saveState();
  sounds.playSuccess();
  showToast(`Oy başarıyla gönderildi! Seviyeniz doğrultusunda oy gücünüz: ${state.level} OY.`, 'success');
  appendTerminal(`[DAO] Vote cast for IPR-12. Choice: ${choice.toUpperCase()}. Weight: ${state.level} votes.`, 'success');
  
  updateUI();
}

btnVoteYes.addEventListener('click', () => castVote('yes'));
btnVoteNo.addEventListener('click', () => castVote('no'));

// --- FAUCET TRIGGER ---
const btnClaimFaucet = document.getElementById('btn-claim-faucet');
if (btnClaimFaucet) {
  btnClaimFaucet.addEventListener('click', () => claimFaucetTokens());
}

// --- QUADRATIC FUNDING SIMULATOR ---
const btnAddProject = document.getElementById('btn-add-qf-project');
const poolInput = document.getElementById('qf-total-pool');

btnAddProject.addEventListener('click', () => {
  sounds.playClick();
  const nextId = state.qfProjects.length > 0 ? Math.max(...state.qfProjects.map(p => p.id)) + 1 : 1;
  state.qfProjects.push({
    id: nextId,
    name: `Yeni Proje #${nextId}`,
    donors: [10]
  });
  saveState();
  renderQFSimulator();
});

poolInput.addEventListener('input', () => {
  renderQFSimulator();
});

function renderQFSimulator() {
  const listContainer = document.getElementById('qf-inputs-list');
  listContainer.innerHTML = '';

  // Render project inputs
  state.qfProjects.forEach(proj => {
    const row = document.createElement('div');
    row.className = 'qf-row';
    row.innerHTML = `
      <input type="text" class="form-input qf-proj-name" value="${proj.name}" data-id="${proj.id}" style="padding: 6px 10px;">
      <input type="text" class="form-input qf-proj-donors" value="${proj.donors.join(', ')}" data-id="${proj.id}" style="font-family: var(--font-mono); padding: 6px 10px;" title="Virgülle ayırarak donor miktarlarını girin">
      <button class="remove-qf-row-btn" data-id="${proj.id}" title="Sil">&times;</button>
    `;
    
    // Listeners for modifications
    row.querySelector('.qf-proj-name').addEventListener('input', (e) => {
      proj.name = e.target.value;
      saveState();
    });

    row.querySelector('.qf-proj-donors').addEventListener('input', (e) => {
      const parsed = e.target.value.split(',')
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x) && x > 0);
      proj.donors = parsed;
      saveState();
      calculateQF();
    });

    row.querySelector('.remove-qf-row-btn').addEventListener('click', () => {
      sounds.playClick();
      state.qfProjects = state.qfProjects.filter(p => p.id !== proj.id);
      saveState();
      renderQFSimulator();
    });

    listContainer.appendChild(row);
  });

  calculateQF();
}

function calculateQF() {
  const poolSize = parseFloat(poolInput.value) || 0;
  
  // Calculate weights
  let totalDirectDonations = 0;
  let totalQFWeight = 0;
  
  const projectsCalc = state.qfProjects.map(proj => {
    const directSum = proj.donors.reduce((a, b) => a + b, 0);
    totalDirectDonations += directSum;
    
    // Quadratic Weight: (sum(sqrt(x)))^2
    const sqrtSum = proj.donors.reduce((a, b) => a + Math.sqrt(b), 0);
    const weight = Math.pow(sqrtSum, 2);
    totalQFWeight += weight;

    return {
      ...proj,
      directSum,
      weight
    };
  });

  const resultsDiv = document.getElementById('qf-matching-results');
  resultsDiv.innerHTML = '';

  const visualBarsContainer = document.createElement('div');
  visualBarsContainer.className = 'qf-visual-bars';

  projectsCalc.forEach(proj => {
    // Normal Ratio share of matching pool
    const directRatio = totalDirectDonations > 0 ? (proj.directSum / totalDirectDonations) : 0;
    const directMatch = directRatio * poolSize;

    // QF Ratio share
    const qfRatio = totalQFWeight > 0 ? (proj.weight / totalQFWeight) : 0;
    const qfMatch = qfRatio * poolSize;

    // UI render
    const item = document.createElement('div');
    item.style.marginBottom = '15px';
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; font-weight:600; font-size:0.85rem; margin-bottom:4px;">
        <span style="display:flex; align-items:center; gap:8px;">
          ${proj.name}
          <button class="qf-donate-btn" data-id="${proj.id}" ${(!state.userConnected || state.pruBalance < 10) ? 'disabled' : ''} title="Cüzdanınızdan 10 PRU bağışlayın">+10 PRU Bağışla</button>
        </span>
        <span style="font-family:var(--font-mono); color:var(--text-muted); font-size:0.75rem;">Bağış: ${proj.directSum} PRU (${proj.donors.length} Kişi)</span>
      </div>
      <div class="qf-visual-bar-group">
        <div class="qf-bar-label">Doğrudan</div>
        <div class="qf-bar-wrapper">
          <div class="qf-bar-fill normal" style="width: ${directRatio * 100}%;"></div>
        </div>
        <div style="font-family:var(--font-mono); font-size:0.75rem; width:80px; text-align:right;">${Math.round(directMatch)} PRU</div>
      </div>
      <div class="qf-visual-bar-group">
        <div class="qf-bar-label" style="color: var(--accent-green);">Karesel</div>
        <div class="qf-bar-wrapper">
          <div class="qf-bar-fill quadratic" style="width: ${qfRatio * 100}%;"></div>
        </div>
        <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-green); width:80px; text-align:right;">${Math.round(qfMatch)} PRU</div>
      </div>
    `;
    resultsDiv.appendChild(item);
  });

  // Bind click listeners for newly rendered buttons
  resultsDiv.querySelectorAll('.qf-donate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!checkWalletConnected()) return;
      const projId = parseInt(btn.dataset.id);
      const project = state.qfProjects.find(p => p.id === projId);
      if (project) {
        if (state.pruBalance < 10) {
          sounds.playError();
          showToast("⚠️ Yetersiz Bakiye! Faucet'tan PRU talep edin.", "error");
          return;
        }
        
        // Execute donation
        sounds.playClick();
        state.pruBalance -= 10;
        project.donors.push(10);
        saveState();
        updateUI();
        
        sounds.playSuccess();
        showToast(`🎉 ${project.name} projesine 10 PRU bağışladınız!`, "success");
        appendTerminal(`[TX] QF.contribute(10 PRU) -> project: "${project.name}". Success!`, "success");
      }
    });
  });
}

// --- LEADERBOARD ---
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-tbody');
  if (!tbody) return;

  // Build full rankings
  let list = [...STATIC_LEADERBOARD];

  // Inject current user
  if (state.userConnected) {
    // If user matches ENS name or add user address
    list.push({
      ensName: formatAddress(state.walletAddress),
      level: state.level,
      xp: state.xp,
      badges: state.badges,
      isUser: true
    });
  } else {
    list.push({
      ensName: 'Misafir Üye (Cüzdan Bağla)',
      level: state.level,
      xp: state.xp,
      badges: state.badges,
      isUser: true,
      disabled: true
    });
  }

  // Sort by XP descending
  list.sort((a, b) => b.xp - a.xp);

  tbody.innerHTML = '';
  list.forEach((member, index) => {
    const rank = index + 1;
    const row = document.createElement('tr');
    row.className = `leaderboard-row ${member.isUser ? 'user-row' : ''}`;
    
    // Rank styling classes
    let rankClass = `rank-col rank-${rank}`;
    if (rank > 3) rankClass = 'rank-col';

    const badgesHTML = member.badges.map(b => getBadgeEmoji(b)).join(' ') || '-';

    row.innerHTML = `
      <td class="${rankClass}">#${rank}</td>
      <td class="identity-col">
        <div class="leaderboard-avatar">${member.ensName.substring(0, 2).toUpperCase()}</div>
        <div>
          <div class="ens-name">${member.ensName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${badgesHTML}</div>
        </div>
      </td>
      <td class="level-col">LVL <span>${member.level}</span></td>
      <td class="xp-col" style="text-align: right;">${member.xp} XP</td>
    `;
    tbody.appendChild(row);
  });
}

// --- GEOLOCATION PRESENCE CHECK-IN ---
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function verifyLocation() {
  if (!checkWalletConnected()) return;

  if (state.completedQuests.includes('location')) {
    sounds.playError();
    showToast("⚠️ Bu görevi zaten tamamladınız!", "error");
    return;
  }

  sounds.playClick();
  const btn = document.getElementById('btn-start-location');
  const coordDisplay = document.getElementById('location-coordinates-display');
  
  btn.disabled = true;
  btn.textContent = "Konum Alınıyor...";
  coordDisplay.style.display = "block";
  coordDisplay.textContent = "GPS uydularına bağlanılıyor...";

  // Simulated target: Piri Reis University coordinates
  const targetLat = 40.8741;
  const targetLng = 29.2720;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        coordDisplay.textContent = `Koordinatlarınız: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        const dist = calculateDistance(lat, lng, targetLat, targetLng);
        
        appendTerminal(`[GPS] Location check received: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}. Distance to PRU: ${dist.toFixed(2)} km`, 'cmd');

        setTimeout(() => {
          if (dist < 1.5) { // Proximity of 1.5 km
            // Real proximity success
            sounds.playSuccess();
            state.completedQuests.push('location');
            state.pruBalance += 50;
            saveState();
            awardXP(15);
            showToast("📍 Konum doğrulandı! Kampüstesiniz. +50 PRU ve +15 XP tanımlandı!", "success");
            appendTerminal(`[SYS] GPS Check-in matched target coordinates. Meşruiyet kanıtı: OK.`, 'success');
          } else {
            // Proximity simulation fallback for testing ease
            sounds.playSuccess();
            state.completedQuests.push('location');
            state.pruBalance += 50;
            saveState();
            awardXP(15);
            showToast(`📍 Kampüs dışındasınız (${dist.toFixed(1)} km). Test için konumunuz onaylandı! +50 PRU / +15 XP`, "success");
            appendTerminal(`[SYS] GPS simulation activated. Proximity override successful.`, 'success');
          }
          updateUI();
        }, 1500);
      },
      (error) => {
        // Error / blocked geolocation fallback
        appendTerminal(`[GPS] Geolocation permission denied or failed. Activating simulation fallback...`, 'error');
        setTimeout(() => {
          sounds.playSuccess();
          state.completedQuests.push('location');
          state.pruBalance += 50;
          
          coordDisplay.textContent = `Koordinatlar (Simüle): ${targetLat.toFixed(4)}, ${targetLng.toFixed(4)} (Kampüs)`;
          
          saveState();
          awardXP(15);
          showToast("📍 GPS devre dışı. Konumunuz simüle edilerek onaylandı! +50 PRU / +15 XP", "success");
          appendTerminal(`[SYS] Geolocation simulation success: ${targetLat.toFixed(4)}, ${targetLng.toFixed(4)} (Piri Reis Üniversitesi)`, 'success');
          updateUI();
        }, 1500);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  } else {
    // Geolocation not supported
    showToast("⚠️ Tarayıcınız konum API'sini desteklemiyor.", "error");
    btn.disabled = false;
    btn.textContent = "Konumu Doğrula";
  }
}

// --- END OF YEAR COUNTDOWN TIMER ---
function startYearEndCountdown() {
  const timerDiv = document.getElementById('prize-countdown-timer');
  if (!timerDiv) return;

  // Let's target the end of the academic year (e.g. 2027-06-15)
  const targetDate = new Date('2027-06-15T00:00:00').getTime();

  function updateTimer() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerDiv.textContent = "Dağıtım Tamamlandı!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerDiv.textContent = `${days}g : ${hours}s : ${minutes}dk : ${seconds}sn`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- SOUND TOGGLE ---
document.getElementById('sound-toggle').addEventListener('click', () => {
  state.soundEnabled = !state.soundEnabled;
  sounds.enabled = state.soundEnabled;
  saveState();
  updateUI();
  sounds.playClick();
});

// --- STATE RESET ---
document.getElementById('reset-system-state').addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('Tüm ilerlemenizi, cüzdan bağlantınızı ve simülatör verilerinizi sıfırlamak istiyor musunuz?')) {
    localStorage.removeItem('prubc_state');
    state = { ...DEFAULT_STATE };
    saveState();
    sounds.playClick();
    showToast('Tüm veriler sıfırlandı.', 'info');
    appendTerminal('[SYS] System state reset to defaults.', 'error');
    updateUI();
  }
});

// --- CORE BOOTSTRAP ---
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateUI();
  startYearEndCountdown();
  
  // Bind location check-in button click
  const btnStartLocation = document.getElementById('btn-start-location');
  if (btnStartLocation) {
    btnStartLocation.addEventListener('click', () => verifyLocation());
  }

  appendTerminal('[SYS] Web3 interface online. Welcome to Piri Reis Blockchain Hub.', 'success');
});
