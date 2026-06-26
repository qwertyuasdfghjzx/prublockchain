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
  networkMode: 'simulation', // 'simulation' or 'onchain'
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
  burnedPru: 0,
  eventsList: [],
  qfProjects: [],
  customProposals: [],
  userRole: 'guest',
  storeInventory: [
    { id: 1, name: "PRU Blockchain Hoodie (Sweatshirt)", cost: 300, stock: 12, category: "Giyim / Merch" },
    { id: 2, name: "Kampüs Kafeterya Kahve Kuponu", cost: 50, stock: 85, category: "Kafeterya Ayrıcalığı" },
    { id: 3, name: "Web3 Başlangıç Donanım Cüzdanı (Ledger vb.)", cost: 750, stock: 3, category: "Teknoloji Kitleri" }
  ],
  pendingSubmissions: [],
  redeemedVouchers: []
};

let state = { ...DEFAULT_STATE };

// --- WEB3 ON-CHAIN CONFIGURATION ---
const CONTRACT_ADDRESSES = {
  PRUToken: "0x85dFD16aA6D5ec60375B6C0e60F09bbE1A277896", // Sepolia Deployed Address
  PRUMembershipSBT: "0xfDB6963188112a1fa05fcA0Ce9842cCa2814D482",
  PRUClubPortal: "0x7C8f014D380992464f25AcC2785f2Afd39Ceb430"
};

const ABI_PRU_TOKEN = [
  "function balanceOf(address) view returns (uint256)",
  "function claimFaucet() external",
  "function getFaucetRewardAmount() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function approve(address, uint256) returns (bool)",
  "function allowance(address, address) view returns (uint256)"
];

const ABI_PRU_SBT = [
  "function addressToTokenId(address) view returns (uint256)",
  "function getProfile(uint256) view returns (uint256, uint256, string, string[])",
  "function getProfileByAddress(address) view returns (uint256, uint256, uint256, string, string[])",
  "function isQuestCompleted(uint256, string) view returns (bool)",
  "function hasEarnedBadge(uint256, string) view returns (bool)"
];

const ABI_PRU_PORTAL = [
  "function registerProfile(string) external",
  "function submitQuestReport(string, string, string, string, uint256, uint256) external",
  "function approveSubmission(uint256) external",
  "function rejectSubmission(uint256) external",
  "function purchaseStoreItem(uint256, string) external",
  "function createDAOProposal(string, string, string) external",
  "function castDAOVote(uint256, bool) external",
  "function registerEvent(string, string, uint256, uint256) external",
  "function claimEventAttendance(uint256) external",
  "function claimLocationCheckin() external",
  "function getSubmissionsCount() view returns (uint256)",
  "function getProposalsCount() view returns (uint256)",
  "function getEventsCount() view returns (uint256)",
  "function submissions(uint256) view returns (uint256, address, string, string, string, string, uint256, uint256, bool, bool)",
  "function proposals(uint256) view returns (string, string, string, uint256, uint256, bool, address)",
  "function eventsList(uint256) view returns (uint256, string, string, uint256, uint256, uint256)",
  "function storeInventory(uint256) view returns (uint256, string, uint256, uint256, string)",
  "function hasAttendedEvent(uint256, address) view returns (bool)"
];

let web3Provider, web3Signer, tokenContract, sbtContract, portalContract;

function loadState() {
  const saved = localStorage.getItem('prubc_state');
  if (saved) {
    try {
      state = JSON.parse(saved);
      // Ensure complex structures exist
      if (state.networkMode === undefined) state.networkMode = 'simulation';
      if (!state.qfProjects) state.qfProjects = [...DEFAULT_STATE.qfProjects];
      if (state.pruBalance === undefined) state.pruBalance = 0;
      if (state.lastFaucetClaim === undefined) state.lastFaucetClaim = 0;
      if (state.burnedPru === undefined) state.burnedPru = 0;
      if (!state.eventsList) state.eventsList = [...DEFAULT_STATE.eventsList];
      if (!state.customProposals) state.customProposals = [];
      if (state.userRole === undefined) state.userRole = 'guest';
      if (!state.storeInventory) state.storeInventory = [...DEFAULT_STATE.storeInventory];
      if (!state.pendingSubmissions) state.pendingSubmissions = [];
      if (!state.redeemedVouchers) state.redeemedVouchers = [];
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

// --- WEB3 DATA SYNC LOGIC ---
async function connectWeb3AndSync() {
  if (typeof window.ethereum === 'undefined') {
    showToast("⚠️ Web3 cüzdanı bulunamadı. Lütfen MetaMask yükleyin.", "error");
    const netModeSelect = document.getElementById('select-network-mode');
    if (netModeSelect) netModeSelect.value = 'simulation';
    state.networkMode = 'simulation';
    saveState();
    return;
  }

  try {
    web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await web3Provider.listAccounts();
    if (accounts.length > 0) {
      web3Signer = web3Provider.getSigner();
      const addr = await web3Signer.getAddress();

      // Instantiate ethers contracts
      tokenContract = new ethers.Contract(CONTRACT_ADDRESSES.PRUToken, ABI_PRU_TOKEN, web3Signer);
      sbtContract = new ethers.Contract(CONTRACT_ADDRESSES.PRUMembershipSBT, ABI_PRU_SBT, web3Signer);
      portalContract = new ethers.Contract(CONTRACT_ADDRESSES.PRUClubPortal, ABI_PRU_PORTAL, web3Signer);

      await syncDataFromBlockchain(addr);
    } else {
      // Disconnected state
      state.userConnected = false;
      state.walletAddress = '';
      state.userRole = 'guest';
      state.tokenId = '';
      state.xp = 0;
      state.level = 1;
      state.badges = [];
      state.completedQuests = [];
      updateUI();
    }
  } catch (e) {
    console.error("Web3 Connection Error:", e);
    showToast("⚠️ Akıllı sözleşme bağlantısı kurulamadı.", "error");
  }
}

async function syncDataFromBlockchain(userAddress) {
  try {
    state.userConnected = true;
    state.walletAddress = userAddress;
    state.walletType = 'metamask';

    // 1. Load SBT Membership card details
    const tokenIdRaw = await sbtContract.addressToTokenId(userAddress);
    const tokenIdVal = tokenIdRaw.toNumber();

    if (tokenIdVal !== 0) {
      state.tokenId = tokenIdVal.toString();
      
      const profile = await sbtContract.getProfile(tokenIdVal);
      // profile returns (xp, level, role, earnedBadges)
      state.xp = profile[0].toNumber();
      state.level = profile[1].toNumber();
      state.userRole = profile[2];
      state.badges = profile[3];

      // Sync completed quests
      state.completedQuests = [];
      const questKeys = ['registration', 'solidity', 'meetup', 'tokenomics', 'hackathon', 'location'];
      for (const qKey of questKeys) {
        const isComp = await sbtContract.isQuestCompleted(tokenIdVal, qKey);
        if (isComp) {
          state.completedQuests.push(qKey);
        }
      }
    } else {
      // Address does not own an SBT profile card
      state.tokenId = '';
      state.xp = 0;
      state.level = 1;
      state.userRole = 'guest';
      state.badges = [];
      state.completedQuests = [];
    }

    // 2. Load PRU Token balance & total supply
    const balRaw = await tokenContract.balanceOf(userAddress);
    state.pruBalance = Math.round(parseFloat(ethers.utils.formatEther(balRaw)));
    try {
      const supplyRaw = await tokenContract.totalSupply();
      state.totalSupply = Math.round(parseFloat(ethers.utils.formatEther(supplyRaw)));
    } catch (e) {
      console.error("Error fetching total supply:", e);
    }

    // 3. Load dynamic on-chain Events
    const eventsCount = await portalContract.getEventsCount();
    const evCountVal = eventsCount.toNumber();
    state.eventsList = [];
    for (let i = 0; i < evCountVal; i++) {
      const ev = await portalContract.eventsList(i);
      state.eventsList.push({
        id: ev[0].toNumber(),
        name: ev[1],
        date: ev[2],
        xp: ev[3].toNumber(),
        pru: ev[4].toNumber(),
        attendees: ev[5].toNumber()
      });

      // Check if user attended this event on-chain
      const hasAttended = await portalContract.hasAttendedEvent(ev[0].toNumber(), userAddress);
      if (hasAttended) {
        state.completedQuests.push(`event_${ev[0].toNumber()}`);
      }
    }

    // 4. Load dynamic on-chain proposals
    const propCount = await portalContract.getProposalsCount();
    const propCountVal = propCount.toNumber();
    state.customProposals = [];
    for (let i = 0; i < propCountVal; i++) {
      const prop = await portalContract.proposals(i);
      state.customProposals.push({
        id: prop[0], // iprId
        title: prop[1],
        desc: prop[2],
        yesVotes: prop[3].toNumber(),
        noVotes: prop[4].toNumber(),
        closed: prop[5],
        creator: prop[6]
      });
    }

    // 5. Load pending academic submissions from the queue
    const subCount = await portalContract.getSubmissionsCount();
    const subCountVal = subCount.toNumber();
    state.pendingSubmissions = [];
    for (let i = 0; i < subCountVal; i++) {
      const sub = await portalContract.submissions(i);
      // Struct: id, student, questId, questTitle, title, detail, xp, pru, approved, rejected
      if (!sub[8] && !sub[9]) { // Pending review
        state.pendingSubmissions.push({
          id: i.toString(), // Store array index to pass into approval tx!
          student: formatAddress(sub[1]),
          questId: sub[2],
          questTitle: sub[3],
          title: sub[4],
          detail: sub[5],
          xp: sub[6].toNumber(),
          pru: sub[7].toNumber()
        });
      }
    }

    // 6. Load store stocks
    for (let i = 0; i < 3; i++) {
      const item = await portalContract.storeInventory(i);
      const invItem = state.storeInventory.find(inv => inv.id === item[0].toNumber());
      if (invItem) {
        invItem.stock = item[3].toNumber();
        invItem.cost = Math.round(parseFloat(ethers.utils.formatEther(item[2])));
      }
    }

    updateUI();
  } catch (err) {
    console.error("Error syncing on-chain data:", err);
  }
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
const STATIC_LEADERBOARD = [];

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

  if (state.networkMode === 'onchain') {
    sounds.playClick();
    const claimBtn = document.getElementById('btn-claim-faucet');
    if (claimBtn) {
      claimBtn.disabled = true;
      claimBtn.textContent = "İşlem Gönderiliyor...";
    }
    
    showToast("⏳ Musluk talebi gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
    
    tokenContract.claimFaucet()
      .then(async (tx) => {
        appendTerminal(`[TX] Faucet.claimFaucet() pending: ${tx.hash}`, 'cmd');
        const receipt = await tx.wait();
        sounds.playSuccess();
        showToast("🎉 Faucet başarıyla talep edildi!", "success");
        appendTerminal(`[TX] Confirmed: Faucet claimed in block ${receipt.blockNumber}`, 'success');
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Faucet işlemi başarısız veya reddedildi.", "error");
        appendTerminal(`[TX] Faucet Error: ${err.message || err}`, 'error');
        updateUI();
      });
    return;
  }

  const now = Date.now();
  if (now - state.lastFaucetClaim < 30000) {
    sounds.playError();
    showToast("⚠️ Bekleme süresi dolmadan tekrar talep edemezsiniz!", "error");
    return;
  }

  // Simulate claiming
  sounds.playClick();
  const claimBtn = document.getElementById('btn-claim-faucet');
  if (claimBtn) {
    claimBtn.disabled = true;
    claimBtn.textContent = "İşlem Gönderiliyor...";
  }

  const circulating = Math.max(0, 1500 + state.pruBalance - state.burnedPru);
  const rewardAmount = getFaucetRewardAmount(circulating);

  const txHash = "0x" + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
  appendTerminal(`[TX] Faucet.requestTokens(${rewardAmount} PRU) initiated. hash: ${txHash}`, 'cmd');

  setTimeout(() => {
    state.pruBalance += rewardAmount;
    state.lastFaucetClaim = Date.now();
    saveState();
    updateUI();
    updateFaucetCooldown();

    sounds.playSuccess();
    showToast(`🎉 ${rewardAmount} PRU Testnet Tokeni cüzdanınıza başarıyla aktarıldı!`, "success");
    appendTerminal(`[TX] Block confirmed. Faucet.requestTokens success. +${rewardAmount} PRU added.`, 'success');
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

  const roleBadge = document.getElementById('sbt-role-badge');

  if (state.userConnected) {
    badgeStatus.textContent = 'On-Chain SBT';
    badgeStatus.style.borderColor = 'var(--accent-green)';
    badgeStatus.style.color = 'var(--accent-green)';
    badgeStatus.style.background = 'rgba(16, 185, 129, 0.1)';

    tokenIdSpan.textContent = `SBT #${state.tokenId}`;
    avatarChar.textContent = state.walletAddress.substring(0, 4).toUpperCase();
    usernameText.textContent = state.walletAddress;
    walletAddrSpan.textContent = formatAddress(state.walletAddress);
    
    if (roleBadge) {
      if (state.userRole === 'officer') {
        roleBadge.textContent = 'ROL: YÖNETİCİ';
        roleBadge.style.color = 'var(--accent-purple)';
        roleBadge.style.borderColor = 'var(--accent-purple)';
      } else {
        roleBadge.textContent = 'ROL: ÜYE';
        roleBadge.style.color = 'var(--accent-cyan)';
        roleBadge.style.borderColor = 'rgba(6, 182, 212, 0.3)';
      }
    }
  } else {
    badgeStatus.textContent = 'Web3 Kimliği Yok';
    badgeStatus.style.borderColor = 'var(--accent-cyan)';
    badgeStatus.style.color = 'var(--accent-cyan)';
    badgeStatus.style.background = 'rgba(6, 182, 212, 0.1)';

    tokenIdSpan.textContent = 'SBT #----';
    avatarChar.textContent = '?';
    usernameText.textContent = 'Misafir Üye';
    walletAddrSpan.textContent = 'Cüzdan Bağlı Değil';
    
    if (roleBadge) {
      roleBadge.textContent = 'ROL: MİSAFİR';
      roleBadge.style.color = 'var(--text-muted)';
      roleBadge.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  }

  // Guard Yönetim & Tokenomics Tab visibility (now always visible to allow anyone to inspect Tokenomics)
  const adminTabBtn = document.querySelector('button[data-view="admin"]');
  if (adminTabBtn) {
    adminTabBtn.style.display = 'inline-block';
  }

  // Toggle officer actions vs lock placeholder
  const officerPanels = document.getElementById('admin-officer-panels');
  const lockPlaceholder = document.getElementById('admin-officer-lock-placeholder');
  if (officerPanels && lockPlaceholder) {
    if (state.userRole === 'officer') {
      officerPanels.style.display = 'flex';
      lockPlaceholder.style.display = 'none';
    } else {
      officerPanels.style.display = 'none';
      lockPlaceholder.style.display = 'block';
    }
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

  // Render Tokenomics Metrics & Admin Panel
  renderTokenomicsAndAdmin();

  // Render Merch Store & submissions
  renderStore();
  renderAdminSubmissions();
}

function getFaucetRewardAmount(circulating) {
  if (circulating < 5000000) return 100;
  if (circulating < 15000000) return 50;
  return 25;
}

function renderTokenomicsAndAdmin() {
  let circulating = Math.max(0, 1000000 + state.pruBalance - state.burnedPru);
  if (state.networkMode === 'onchain' && state.totalSupply !== undefined) {
    circulating = state.totalSupply;
  }

  const circText = document.getElementById('tokenomics-circulating');
  const circBar = document.getElementById('tokenomics-circulating-bar');
  const burnedText = document.getElementById('tokenomics-burned-pru');
  const halvingText = document.getElementById('tokenomics-halving-target');
  const faucetBtn = document.getElementById('btn-claim-faucet');

  if (circText) circText.textContent = circulating.toLocaleString();
  if (circBar) {
    const pct = Math.min(100, (circulating / 21000000) * 100);
    circBar.style.width = `${pct}%`;
  }
  if (burnedText) burnedText.textContent = state.burnedPru.toLocaleString();

  const reward = getFaucetRewardAmount(circulating);
  if (faucetBtn && !faucetBtn.disabled) {
    faucetBtn.textContent = `${reward} PRU TALEP ET`;
  }

  let nextTarget = 21000000;
  if (circulating < 5000000) {
    nextTarget = 5000000;
  } else if (circulating < 15000000) {
    nextTarget = 15000000;
  }
  if (halvingText) halvingText.textContent = nextTarget.toLocaleString();

  const tbody = document.getElementById('admin-events-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  state.eventsList.forEach(ev => {
    const row = document.createElement('tr');
    row.className = 'leaderboard-row';
    row.innerHTML = `
      <td><strong>${ev.name}</strong></td>
      <td style="font-family: var(--font-mono);">${ev.date}</td>
      <td style="text-align: center; font-family: var(--font-mono); color: var(--accent-cyan); font-weight: bold;">+${ev.xp} XP / +${ev.pru} PRU</td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="mission-btn qr-btn" data-id="${ev.id}" style="padding: 4px 8px; font-size: 0.75rem; border-color: var(--accent-purple); color: var(--accent-purple); margin-right: 5px;">QR Göster</button>
        <button class="mission-btn delete-btn" data-id="${ev.id}" style="padding: 4px 8px; font-size: 0.75rem; border-color: var(--accent-red); color: var(--accent-red);">Sil</button>
      </td>
    `;

    // QR click
    row.querySelector('.qr-btn').addEventListener('click', () => {
      sounds.playClick();
      openEventQRModal(ev);
    });

    // Delete click
    row.querySelector('.delete-btn').addEventListener('click', () => {
      sounds.playClick();
      if (confirm(`"${ev.name}" etkinliğini listeden silmek istediğinize emin misiniz?`)) {
        state.eventsList = state.eventsList.filter(e => e.id !== ev.id);
        saveState();
        updateUI();
        showToast('Etkinlik başarıyla silindi.', 'info');
        appendTerminal(`[ADMIN] Event removed from register: "${ev.name}"`, 'error');
      }
    });

    tbody.appendChild(row);
  });
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
  } else if (state.pendingSubmissions && state.pendingSubmissions.some(s => s.questId === questId)) {
    card.classList.remove('completed');
    statusSpan.textContent = 'Onay Bekliyor';
    statusSpan.className = 'mission-status';
    statusSpan.innerHTML = '⏳ Onay Bekliyor';
    if (btn) {
      btn.textContent = 'İletildi (Onay Bekliyor)';
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

// --- WALLET CONNECT SIMULATOR & WEB3 ---
const walletBtn = document.getElementById('wallet-connect-btn');
const overlayWallet = document.getElementById('overlay-wallet');
const closeWalletBtn = document.getElementById('btn-close-wallet-modal');

walletBtn.addEventListener('click', async () => {
  sounds.playClick();
  if (state.userConnected) {
    if (confirm('Cüzdan bağlantısını kesmek istiyor musunuz?')) {
      state.userConnected = false;
      state.walletAddress = '';
      state.walletType = '';
      state.tokenId = '';
      state.userRole = 'guest';
      state.xp = 0;
      state.level = 1;
      state.badges = [];
      state.completedQuests = [];
      saveState();
      updateUI();
      sounds.playClick();
      showToast('Cüzdan bağlantısı kesildi.', 'info');
      appendTerminal('[SYS] Wallet connection disconnected by user.', 'error');
    }
  } else {
    // Reset modal internal views to start from wallet provider selection
    document.getElementById('wallet-options-list').style.display = 'flex';
    document.getElementById('wallet-role-selection').style.display = 'none';
    document.getElementById('wallet-pin-container').style.display = 'none';
    document.getElementById('wallet-connecting-loader').style.display = 'none';
    document.getElementById('input-admin-pin').value = '';
    
    // Toggle warning based on network mode
    const warnEl = document.getElementById('onchain-wallet-warning');
    if (warnEl) {
      warnEl.style.display = state.networkMode === 'onchain' ? 'block' : 'none';
    }

    overlayWallet.classList.add('active');
  }
});

closeWalletBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayWallet.classList.remove('active');
});

let selectedWallet = '';

document.querySelectorAll('#wallet-options-list .wallet-option-item').forEach(item => {
  item.addEventListener('click', async () => {
    sounds.playClick();
    selectedWallet = item.dataset.wallet;
    
    if (state.networkMode === 'onchain') {
      if (typeof window.ethereum === 'undefined') {
        showToast("⚠️ Web3 cüzdanı bulunamadı. Lütfen MetaMask yükleyin.", "error");
        return;
      }
      
      const loader = document.getElementById('wallet-connecting-loader');
      if (loader) {
        loader.style.display = 'flex';
        document.getElementById('wallet-loading-text').textContent = "Cüzdan bağlantısı onaylanıyor...";
      }
      
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          web3Signer = web3Provider.getSigner();
          const addr = accounts[0];
          
          tokenContract = new ethers.Contract(CONTRACT_ADDRESSES.PRUToken, ABI_PRU_TOKEN, web3Signer);
          sbtContract = new ethers.Contract(CONTRACT_ADDRESSES.PRUMembershipSBT, ABI_PRU_SBT, web3Signer);
          portalContract = new ethers.Contract(CONTRACT_ADDRESSES.PRUClubPortal, ABI_PRU_PORTAL, web3Signer);
          
          // Check if SBT exists
          const tokenIdRaw = await sbtContract.addressToTokenId(addr);
          const tokenIdVal = tokenIdRaw.toNumber();
          
          if (loader) loader.style.display = 'none';
          
          if (tokenIdVal !== 0) {
            // Already registered! Just sync and close modal
            await syncDataFromBlockchain(addr);
            overlayWallet.classList.remove('active');
            sounds.playSuccess();
            showToast(`Cüzdan başarıyla bağlandı! Hoş geldiniz ${formatAddress(addr)}`, 'success');
          } else {
            // Not registered yet! Show role selection so they can register
            document.getElementById('wallet-options-list').style.display = 'none';
            document.getElementById('wallet-role-selection').style.display = 'flex';
          }
        }
      } catch (err) {
        console.error(err);
        if (loader) loader.style.display = 'none';
        sounds.playError();
        showToast("❌ Cüzdan bağlantısı reddedildi.", "error");
      }
      return;
    }
    
    // Simulation fallback
    document.getElementById('wallet-options-list').style.display = 'none';
    document.getElementById('wallet-role-selection').style.display = 'flex';
  });
});

// Role selection - Member
const roleSelectMember = document.getElementById('role-select-member');
if (roleSelectMember) {
  roleSelectMember.addEventListener('click', async () => {
    sounds.playClick();
    document.getElementById('wallet-role-selection').style.display = 'none';
    
    if (state.networkMode === 'onchain') {
      const loader = document.getElementById('wallet-connecting-loader');
      if (loader) {
        loader.style.display = 'flex';
        document.getElementById('wallet-loading-text').textContent = "Üye SBT kaydı oluşturuluyor...";
      }
      
      try {
        showToast("⏳ Üyelik kaydı işlemi gönderildi. Lütfen cüzdanınızdan onaylayın...", "info");
        const tx = await portalContract.registerProfile("member");
        appendTerminal(`[TX] Register profile transaction sent: ${tx.hash}`, 'cmd');
        
        await tx.wait();
        if (loader) loader.style.display = 'none';
        
        const addr = await web3Signer.getAddress();
        await syncDataFromBlockchain(addr);
        
        overlayWallet.classList.remove('active');
        sounds.playSuccess();
        showToast(`🎉 Üyelik kaydı başarılı! SBT kartınız basıldı.`, 'success');
      } catch (err) {
        console.error(err);
        if (loader) loader.style.display = 'none';
        sounds.playError();
        showToast("❌ Kayıt işlemi başarısız.", "error");
      }
      return;
    }

    connectWalletSimulate(selectedWallet, 'member');
  });
}

// Role selection - Officer
const roleSelectOfficer = document.getElementById('role-select-officer');
if (roleSelectOfficer) {
  roleSelectOfficer.addEventListener('click', () => {
    sounds.playClick();
    document.getElementById('wallet-role-selection').style.display = 'none';
    document.getElementById('wallet-pin-container').style.display = 'flex';
  });
}

// PIN Back button
const btnBackRole = document.getElementById('btn-back-role');
if (btnBackRole) {
  btnBackRole.addEventListener('click', (e) => {
    e.preventDefault();
    sounds.playClick();
    document.getElementById('wallet-pin-container').style.display = 'none';
    document.getElementById('wallet-role-selection').style.display = 'flex';
  });
}

// Verify PIN trigger
function verifyOfficerPinAndConnect() {
  const pinInput = document.getElementById('input-admin-pin');
  const pin = pinInput.value.trim();
  
  if (pin === 'PRU2026' || pin === '1234') {
    sounds.playClick();
    document.getElementById('wallet-pin-container').style.display = 'none';
    
    if (state.networkMode === 'onchain') {
      const loader = document.getElementById('wallet-connecting-loader');
      if (loader) {
        loader.style.display = 'flex';
        document.getElementById('wallet-loading-text').textContent = "Yönetici SBT kaydı oluşturuluyor...";
      }
      
      showToast("⏳ Yönetici kaydı işlemi gönderildi. Lütfen cüzdanınızdan onaylayın...", "info");
      
      portalContract.registerProfile("officer")
        .then(async (tx) => {
          appendTerminal(`[TX] Officer registration transaction: ${tx.hash}`, 'cmd');
          await tx.wait();
          if (loader) loader.style.display = 'none';
          
          const addr = await web3Signer.getAddress();
          await syncDataFromBlockchain(addr);
          
          overlayWallet.classList.remove('active');
          sounds.playSuccess();
          showToast(`🎉 Yönetici kaydı başarılı! Yetkili SBT kartınız basıldı.`, 'success');
        })
        .catch((err) => {
          console.error(err);
          if (loader) loader.style.display = 'none';
          sounds.playError();
          showToast("❌ Kayıt işlemi başarısız.", "error");
        });
      return;
    }
    
    connectWalletSimulate(selectedWallet, 'officer');
  } else {
    sounds.playError();
    showToast("⚠️ Hatalı PIN kodu! Yetkili girişi engellendi.", "error");
    pinInput.style.borderColor = 'var(--accent-red)';
    setTimeout(() => {
      pinInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }, 1500);
  }
}

const btnSubmitAdminPin = document.getElementById('btn-submit-admin-pin');
if (btnSubmitAdminPin) {
  btnSubmitAdminPin.addEventListener('click', (e) => {
    e.preventDefault();
    verifyOfficerPinAndConnect();
  });
}

const inputAdminPin = document.getElementById('input-admin-pin');
if (inputAdminPin) {
  inputAdminPin.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      verifyOfficerPinAndConnect();
    }
  });
}

function connectWalletSimulate(wallet, role) {
  const loader = document.getElementById('wallet-connecting-loader');
  loader.style.display = 'flex';
  
  const loadingTexts = [
    "Anahtar eşleşmesi kuruluyor...",
    "On-chain kimlik doğrulanıyor...",
    "Soulbound Token kontrol ediliyor...",
    role === 'officer' ? "Yetkili imzası alınıyor..." : "Üye kaydı kontrol ediliyor..."
  ];
  
  let textIndex = 0;
  const interval = setInterval(() => {
    document.getElementById('wallet-loading-text').textContent = loadingTexts[textIndex];
    textIndex = (textIndex + 1) % loadingTexts.length;
  }, 450);

  setTimeout(() => {
    clearInterval(interval);
    
    // Setup state
    state.userConnected = true;
    state.walletType = wallet;
    state.userRole = role;
    
    // Generate address depending on role
    const randomHex = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('');
    if (role === 'officer') {
      state.walletAddress = `pru_officer_${randomHex}.eth`;
    } else {
      state.walletAddress = `pru_member_${randomHex}.eth`;
    }
    state.tokenId = Math.floor(1000 + Math.random() * 9000).toString();
    
    saveState();
    
    // Reset loader/modal display
    loader.style.display = 'none';
    overlayWallet.classList.remove('active');
    
    sounds.playSuccess();
    showToast(`Cüzdan başarıyla bağlandı! Hoş geldiniz ${state.walletAddress}`, 'success');
    appendTerminal(`[SYS] Wallet connected: ${state.walletAddress} via ${wallet}. SBT Token ID: #${state.tokenId}. Role: ${role.toUpperCase()}`, 'success');
    
    // Welcome Bonus for Members & Officers
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
}

// Helper validation for quests
function checkWalletConnected() {
  if (!state.userConnected) {
    sounds.playError();
    showToast("⚠️ İşlem Hatası: Lütfen önce cüzdanınızı bağlayın!", "error");
    
    // Reset modal internal views to start from wallet provider selection
    document.getElementById('wallet-options-list').style.display = 'flex';
    document.getElementById('wallet-role-selection').style.display = 'none';
    document.getElementById('wallet-pin-container').style.display = 'none';
    document.getElementById('wallet-connecting-loader').style.display = 'none';
    document.getElementById('input-admin-pin').value = '';

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
          if (state.networkMode === 'onchain') {
            showToast("⏳ Solidity görevi sunuluyor. Lütfen cüzdanınızdan onaylayın...", "info");
            portalContract.submitQuestReport("solidity", "Solidity Geliştirici Eğitimi", "Quiz Başarılı", "Sorular doğru yanıtlandı.", 25, 0)
              .then(async (tx) => {
                appendTerminal(`[TX] Solidity task submit: ${tx.hash}`, 'cmd');
                await tx.wait();
                sounds.playSuccess();
                overlayQuiz.classList.remove('active');
                showToast("⏳ Göreviniz iletildi. Yönetici onayından sonra ödülünüz eklenecektir.", "info");
                await syncDataFromBlockchain(state.walletAddress);
              })
              .catch((err) => {
                console.error(err);
                sounds.playError();
                showToast("❌ İşlem başarısız.", "error");
              });
            return;
          }

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
const btnLaunchCamera = document.getElementById('btn-launch-camera');
const qrCameraInput = document.getElementById('qr-camera-input');

btnStartMeetup.addEventListener('click', () => {
  sounds.playClick();
  if (!checkWalletConnected()) return;
  overlayQr.classList.add('active');
});

closeQrBtn.addEventListener('click', () => {
  sounds.playClick();
  overlayQr.classList.remove('active');
});

// Helper for scanner loading and verification sequence
function simulateQRVerification(sourceLabel) {
  btnTriggerScan.disabled = true;
  if (btnLaunchCamera) btnLaunchCamera.disabled = true;
  btnTriggerScan.textContent = "Analiz ediliyor...";
  
  appendTerminal(`[GPS] Image data received from ${sourceLabel}. Checking hashes...`, 'info');
  
  setTimeout(() => {
    btnTriggerScan.textContent = "On-Chain Doğrulanıyor...";
    appendTerminal(`[SYS] QR Signature verification request sent to testnet.`, 'info');
    
    setTimeout(() => {
      if (state.networkMode === 'onchain') {
        showToast("⏳ Buluşma katılımı gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
        portalContract.submitQuestReport("meetup", "Haftalık Buluşma Katılımı", "Katılım Doğrulaması", "Taratılan Kaynak: " + sourceLabel, 15, 0)
          .then(async (tx) => {
            appendTerminal(`[TX] Meetup submit: ${tx.hash}`, 'cmd');
            await tx.wait();
            sounds.playSuccess();
            overlayQr.classList.remove('active');
            btnTriggerScan.disabled = false;
            if (btnLaunchCamera) btnLaunchCamera.disabled = false;
            btnTriggerScan.textContent = "Taramayı Simüle Et";
            showToast("⏳ Katılım raporu iletildi. Onaydan sonra ödüller yansıyacaktır.", "info");
            await syncDataFromBlockchain(state.walletAddress);
          })
          .catch((err) => {
            console.error(err);
            sounds.playError();
            btnTriggerScan.disabled = false;
            if (btnLaunchCamera) btnLaunchCamera.disabled = false;
            btnTriggerScan.textContent = "Taramayı Simüle Et";
            showToast("❌ İşlem başarısız.", "error");
          });
        return;
      }

      sounds.playSuccess();
      state.completedQuests.push('meetup');
      if (!state.badges.includes('meetup')) state.badges.push('meetup');
      
      overlayQr.classList.remove('active');
      
      btnTriggerScan.disabled = false;
      if (btnLaunchCamera) btnLaunchCamera.disabled = false;
      btnTriggerScan.textContent = "Taramayı Simüle Et";
      
      awardXP(15);
      showToast("🎉 Buluşma katılımı doğrulandı! On-chain rozet basıldı. +15 XP", "success");
      appendTerminal(`[GAME] Meetup attendance verified via ${sourceLabel} signature contract.`, "success");
      
      updateUI();
    }, 1200);
  }, 1200);
}

if (btnTriggerScan) {
  btnTriggerScan.addEventListener('click', () => {
    sounds.playClick();
    simulateQRVerification("Simulator");
  });
}

if (btnLaunchCamera && qrCameraInput) {
  btnLaunchCamera.addEventListener('click', () => {
    sounds.playClick();
    qrCameraInput.click(); // Trigger mobile file upload camera capture
  });
  
  qrCameraInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      sounds.playClick();
      simulateQRVerification("Mobile Camera Capture");
    }
  });
}

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
  
  if (state.networkMode === 'onchain') {
    showToast("⏳ Tokenomics raporu gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
    portalContract.submitQuestReport("tokenomics", "Tokenomics Analiz Gönderimi", title, link, 40, 25)
      .then(async (tx) => {
        appendTerminal(`[TX] Tokenomics submit pending: ${tx.hash}`, 'cmd');
        await tx.wait();
        sounds.playSuccess();
        overlayTokenomics.classList.remove('active');
        formTokenomics.reset();
        showToast("⏳ Raporunuz iletildi. Onaydan sonra ödüller yansıyacaktır.", "info");
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Gönderim başarısız.", "error");
      });
    return;
  }
  
  if (!state.pendingSubmissions) state.pendingSubmissions = [];
  
  const subId = "sub_" + Math.floor(1000 + Math.random() * 9000);
  state.pendingSubmissions.push({
    id: subId,
    student: formatAddress(state.walletAddress),
    questId: 'tokenomics',
    questTitle: 'Tokenomics Analiz Gönderimi',
    title: title,
    detail: link,
    xp: 40,
    pru: 25
  });
  
  saveState();
  overlayTokenomics.classList.remove('active');
  formTokenomics.reset();
  
  showToast("⏳ Raporunuz iletildi. Yetkili veya Hoca onayından sonra ödülleriniz yansıyacaktır.", "info");
  appendTerminal(`[GAME] Tokenomics submitted: "${title}" queued for validation (ID: ${subId}).`, "info");
  
  updateUI();
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
  
  if (state.networkMode === 'onchain') {
    showToast("⏳ Hackathon MVP'si gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
    portalContract.submitQuestReport("hackathon", "Hackathon MVP Geliştirme", title, repo, 80, 50)
      .then(async (tx) => {
        appendTerminal(`[TX] Hackathon submit pending: ${tx.hash}`, 'cmd');
        await tx.wait();
        sounds.playSuccess();
        overlayHackathon.classList.remove('active');
        formHackathon.reset();
        showToast("⏳ Projeniz iletildi. Onaydan sonra ödüller yansıyacaktır.", "info");
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Gönderim başarısız.", "error");
      });
    return;
  }
  
  if (!state.pendingSubmissions) state.pendingSubmissions = [];
  
  const subId = "sub_" + Math.floor(1000 + Math.random() * 9000);
  state.pendingSubmissions.push({
    id: subId,
    student: formatAddress(state.walletAddress),
    questId: 'hackathon',
    questTitle: 'Hackathon MVP Geliştirme',
    title: title,
    detail: repo,
    xp: 80,
    pru: 50
  });
  
  saveState();
  overlayHackathon.classList.remove('active');
  formHackathon.reset();
  
  showToast("⏳ Projeniz iletildi. Yetkili veya Hoca onayından sonra ödülleriniz yansıyacaktır.", "info");
  appendTerminal(`[GAME] Hackathon MVP submitted: "${title}" queued for validation (ID: ${subId}).`, "info");
  
  updateUI();
});

// --- DAO VOTING MECHANICS ---
const btnVoteYes = document.getElementById('btn-vote-yes');
const btnVoteNo = document.getElementById('btn-vote-no');

let baseYesVotes = 0;
let baseNoVotes = 0;

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

  // Render dynamic custom proposals
  renderCustomProposals();
}

function castVote(choice) {
  if (!checkWalletConnected()) return;
  sounds.playClick();

  if (state.networkMode === 'onchain') {
    showToast("⏳ Oy gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
    portalContract.castDAOVote(0, choice === 'yes')
      .then(async (tx) => {
        appendTerminal(`[TX] Vote cast for IPR-12: ${tx.hash}`, 'cmd');
        await tx.wait();
        sounds.playSuccess();
        showToast(`Oy başarıyla gönderildi!`, 'success');
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Oy verme işlemi başarısız.", "error");
      });
    return;
  }

  state.votedProposals['ipr-12'] = choice;
  saveState();
  sounds.playSuccess();
  showToast(`Oy başarıyla gönderildi! Seviyeniz doğrultusunda oy gücünüz: ${state.level} OY.`, 'success');
  appendTerminal(`[DAO] Vote cast for IPR-12. Choice: ${choice.toUpperCase()}. Weight: ${state.level} votes.`, 'success');
  
  updateUI();
}

btnVoteYes.addEventListener('click', () => castVote('yes'));
btnVoteNo.addEventListener('click', () => castVote('no'));

// --- DYNAMIC CUSTOM PROPOSALS ---
function renderCustomProposals() {
  const container = document.getElementById('custom-proposals-container');
  if (!container) return;
  
  container.innerHTML = '';
  if (!state.customProposals) state.customProposals = [];
  
  state.customProposals.forEach(prop => {
    const proposalVoted = state.votedProposals[prop.id];
    
    const userYes = proposalVoted === 'yes' ? state.level : 0;
    const userNo = proposalVoted === 'no' ? state.level : 0;
    
    const yesTotal = prop.yesVotes + userYes;
    const noTotal = prop.noVotes + userNo;
    const sum = yesTotal + noTotal;
    const yesPct = sum > 0 ? Math.round((yesTotal / sum) * 100) : 0;
    const noPct = sum > 0 ? (100 - yesPct) : 0;
    
    const card = document.createElement('div');
    card.className = 'proposal-card';
    card.style.marginTop = '20px';
    card.innerHTML = `
      <div class="proposal-meta">
        <span class="proposal-status-badge">Aktif Oylama</span>
        <span class="proposal-id">${prop.id}</span>
      </div>
      <h3 class="proposal-title">${prop.title}</h3>
      <p class="proposal-desc">${prop.desc}</p>
      
      <div class="proposal-vote-bars">
        <div class="vote-bar-group">
          <div class="vote-bar-label">
            <span>EVET</span>
            <span id="vote-yes-percent-${prop.id}">${yesPct}% (${yesTotal} Oy)</span>
          </div>
          <div class="vote-bar-bg">
            <div class="vote-bar-fill yes" id="vote-yes-fill-${prop.id}" style="width: ${yesPct}%;"></div>
          </div>
        </div>
        <div class="vote-bar-group">
          <div class="vote-bar-label">
            <span>HAYIR</span>
            <span id="vote-no-percent-${prop.id}">${noPct}% (${noTotal} Oy)</span>
          </div>
          <div class="vote-bar-bg">
            <div class="vote-bar-fill no" id="vote-no-fill-${prop.id}" style="width: ${noPct}%;"></div>
          </div>
        </div>
      </div>

      <div class="vote-actions">
        <button class="vote-btn yes-btn" id="btn-vote-yes-${prop.id}" ${proposalVoted ? 'disabled' : ''}>
          ${proposalVoted === 'yes' ? 'EVET OYU VERDİNİZ' : 'EVET OYU VER'}
        </button>
        <button class="vote-btn no-btn" id="btn-vote-no-${prop.id}" ${proposalVoted ? 'disabled' : ''}>
          ${proposalVoted === 'no' ? 'HAYIR OYU VERDİNİZ' : 'HAYIR OYU VER'}
        </button>
      </div>
    `;
    
    card.querySelector(`#btn-vote-yes-${prop.id}`).addEventListener('click', () => {
      castCustomVote(prop.id, 'yes');
    });
    card.querySelector(`#btn-vote-no-${prop.id}`).addEventListener('click', () => {
      castCustomVote(prop.id, 'no');
    });
    
    container.appendChild(card);
  });
}

function castCustomVote(proposalId, choice) {
  if (!checkWalletConnected()) return;
  sounds.playClick();

  if (state.networkMode === 'onchain') {
    const idx = state.customProposals.findIndex(p => p.id === proposalId);
    if (idx === -1) {
      showToast("❌ Teklif bulunamadı.", "error");
      return;
    }
    
    showToast("⏳ Oy gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
    portalContract.castDAOVote(idx, choice === 'yes')
      .then(async (tx) => {
        appendTerminal(`[TX] Vote cast for ${proposalId}: ${tx.hash}`, 'cmd');
        await tx.wait();
        sounds.playSuccess();
        showToast(`Oy başarıyla gönderildi!`, 'success');
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Oy verme işlemi başarısız.", "error");
      });
    return;
  }

  state.votedProposals[proposalId] = choice;
  saveState();
  sounds.playSuccess();
  showToast(`Oy başarıyla gönderildi! Seviyeniz doğrultusunda oy gücünüz: ${state.level} OY.`, 'success');
  appendTerminal(`[DAO] Vote cast for ${proposalId}. Choice: ${choice.toUpperCase()}. Weight: ${state.level} votes.`, 'success');
  
  updateUI();
}

// Bind custom proposal creation
const formCreateProposal = document.getElementById('form-create-proposal');
if (formCreateProposal) {
  formCreateProposal.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkWalletConnected()) return;
    
    const propId = document.getElementById('input-proposal-id').value.trim();
    const propTitle = document.getElementById('input-proposal-title').value.trim();
    const propDesc = document.getElementById('input-proposal-desc').value.trim();
    
    if (state.networkMode === 'onchain') {
      showToast("⏳ Teklif oluşturuluyor. Lütfen cüzdanınızdan onaylayın...", "info");
      
      const fee = ethers.utils.parseEther("50");
      tokenContract.allowance(state.walletAddress, CONTRACT_ADDRESSES.PRUClubPortal)
        .then(async (allowance) => {
          if (allowance.lt(fee)) {
            showToast("⏳ Token harcama onayı bekleniyor...", "info");
            const approveTx = await tokenContract.approve(CONTRACT_ADDRESSES.PRUClubPortal, ethers.constants.MaxUint256);
            appendTerminal(`[TX] PRU Token approve sent: ${approveTx.hash}`, 'cmd');
            await approveTx.wait();
          }
          
          showToast("⏳ Teklif yayınlama işlemi gönderiliyor...", "info");
          const tx = await portalContract.createDAOProposal(propId, propTitle, propDesc);
          appendTerminal(`[TX] Create DAO Proposal: ${tx.hash}`, 'cmd');
          
          await tx.wait();
          sounds.playSuccess();
          showToast(`🏛️ Teklif başarıyla yayınlandı!`, "success");
          formCreateProposal.reset();
          await syncDataFromBlockchain(state.walletAddress);
        })
        .catch((err) => {
          console.error(err);
          sounds.playError();
          showToast("❌ Teklif oluşturma başarısız.", "error");
        });
      return;
    }
    
    if (state.pruBalance < 50) {
      sounds.playError();
      showToast("⚠️ Yetersiz Bakiye! Teklif oluşturmak için 50 PRU yakmanız gerekir.", "error");
      return;
    }
    
    sounds.playClick();
    
    // Deduct and burn
    state.pruBalance -= 50;
    state.burnedPru += 50;
    
    // Create new custom proposal
    if (!state.customProposals) state.customProposals = [];
    state.customProposals.push({
      id: propId,
      title: propTitle,
      desc: propDesc,
      yesVotes: 0,
      noVotes: 0
    });
    
    saveState();
    sounds.playSuccess();
    showToast(`🏛️ Teklif başarıyla yayınlandı ve 50 PRU yakıldı!`, "success");
    appendTerminal(`[DAO] New proposal published: ${propId} - "${propTitle}". 50 PRU burned.`, 'success');
    
    formCreateProposal.reset();
    updateUI();
  });
}

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
          if (state.networkMode === 'onchain') {
            showToast("⏳ Konum kanıtı gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
            portalContract.claimLocationCheckin()
              .then(async (tx) => {
                appendTerminal(`[TX] Geolocation checkin transaction: ${tx.hash}`, 'cmd');
                await tx.wait();
                sounds.playSuccess();
                showToast("📍 Konum doğrulandı! +50 PRU ve +15 XP tanımlandı!", "success");
                appendTerminal(`[SYS] GPS Check-in on-chain matching successful.`, 'success');
                await syncDataFromBlockchain(state.walletAddress);
              })
              .catch((err) => {
                console.error(err);
                sounds.playError();
                showToast("❌ Konum kanıtı gönderilemedi.", "error");
                btn.disabled = false;
                btn.textContent = "Konumu Doğrula";
              });
            return;
          }

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
          if (state.networkMode === 'onchain') {
            showToast("⏳ Konum kanıtı gönderiliyor. Lütfen cüzdanınızdan onaylayın...", "info");
            portalContract.claimLocationCheckin()
              .then(async (tx) => {
                appendTerminal(`[TX] Geolocation simulation checkin transaction: ${tx.hash}`, 'cmd');
                await tx.wait();
                sounds.playSuccess();
                coordDisplay.textContent = `Koordinatlar (Simüle): ${targetLat.toFixed(4)}, ${targetLng.toFixed(4)} (Kampüs)`;
                showToast("📍 Konum simüle edilerek onaylandı! +50 PRU / +15 XP", "success");
                await syncDataFromBlockchain(state.walletAddress);
              })
              .catch((err) => {
                console.error(err);
                sounds.playError();
                showToast("❌ Konum kanıtı gönderilemedi.", "error");
                btn.disabled = false;
                btn.textContent = "Konumu Doğrula";
              });
            return;
          }

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

// --- EVENT MANAGEMENT & REPORT MODULE ---
let activeQREvent = null;

function openEventQRModal(event) {
  activeQREvent = event;
  const modal = document.getElementById('overlay-event-qr');
  const title = document.getElementById('event-qr-modal-title');
  const rewards = document.getElementById('event-qr-modal-rewards');
  
  if (modal && title && rewards) {
    title.textContent = `"${event.name}" Katılım QR Kodu`;
    rewards.textContent = `+${event.xp} XP / +${event.pru} PRU`;
    modal.classList.add('active');
  }
}

// Close Event QR modal listener
const closeEventQRBtn = document.getElementById('btn-close-event-qr-modal');
if (closeEventQRBtn) {
  closeEventQRBtn.addEventListener('click', () => {
    sounds.playClick();
    const modal = document.getElementById('overlay-event-qr');
    if (modal) modal.classList.remove('active');
    activeQREvent = null;
  });
}

// Simulate event attendance registration
const btnSimulateAttendance = document.getElementById('btn-simulate-event-attendance');
if (btnSimulateAttendance) {
  btnSimulateAttendance.addEventListener('click', () => {
    if (!activeQREvent) return;
    if (!checkWalletConnected()) return;
    
    sounds.playClick();
    btnSimulateAttendance.disabled = true;
    btnSimulateAttendance.textContent = "Kaydediliyor...";
    
    if (state.networkMode === 'onchain') {
      showToast("⏳ Katılım kaydediliyor. Lütfen cüzdanınızdan onaylayın...", "info");
      
      portalContract.claimEventAttendance(activeQREvent.id)
        .then(async (tx) => {
          appendTerminal(`[TX] Claim event attendance: ${tx.hash}`, 'cmd');
          await tx.wait();
          
          const modal = document.getElementById('overlay-event-qr');
          if (modal) modal.classList.remove('active');
          
          btnSimulateAttendance.disabled = false;
          btnSimulateAttendance.textContent = "Taramayı Simüle Et";
          
          sounds.playSuccess();
          showToast(`🎉 Etkinlik katılımı doğrulandı! Ödülleriniz cüzdanınıza eklendi.`, "success");
          appendTerminal(`[GAME] Attended event: "${activeQREvent.name}".`, "success");
          
          await syncDataFromBlockchain(state.walletAddress);
        })
        .catch((err) => {
          console.error(err);
          btnSimulateAttendance.disabled = false;
          btnSimulateAttendance.textContent = "Taramayı Simüle Et";
          sounds.playError();
          showToast("❌ Katılım kaydı başarısız.", "error");
        });
      return;
    }
    
    setTimeout(() => {
      // Close modal
      const modal = document.getElementById('overlay-event-qr');
      if (modal) modal.classList.remove('active');
      
      btnSimulateAttendance.disabled = false;
      btnSimulateAttendance.textContent = "Taramayı Simüle Et";
      
      // Process attendance
      // Find the event in the list and increment attendees
      const ev = state.eventsList.find(e => e.id === activeQREvent.id);
      if (ev) {
        ev.attendees = (ev.attendees || 0) + 1;
      }
      
      // Check if user already claimed this event to prevent double claiming
      if (!state.completedQuests.includes(`event_${activeQREvent.id}`)) {
        state.completedQuests.push(`event_${activeQREvent.id}`);
        state.pruBalance += activeQREvent.pru;
        awardXP(activeQREvent.xp);
        showToast(`🎉 Etkinlik katılımı doğrulandı! +${activeQREvent.xp} XP ve +${activeQREvent.pru} PRU cüzdanınıza eklendi.`, "success");
        appendTerminal(`[GAME] Attended event: "${activeQREvent.name}". Claimed +${activeQREvent.xp} XP and +${activeQREvent.pru} PRU.`, "success");
      } else {
        sounds.playSuccess();
        showToast(`✔ Katılımınız zaten kayıtlı, ancak katılım sayacı güncellendi.`, "success");
        appendTerminal(`[GAME] Attended event: "${activeQREvent.name}" (Already claimed rewards).`, "info");
      }
      
      activeQREvent = null;
      saveState();
      updateUI();
    }, 1200);
  });
}

const btnPrintEventQR = document.getElementById('btn-print-event-qr');
if (btnPrintEventQR) {
  btnPrintEventQR.addEventListener('click', () => {
    if (!activeQREvent) return;
    sounds.playClick();
    printQRFlyer(activeQREvent);
  });
}

function printQRFlyer(event) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast("⚠️ Yazdırma penceresi engellendi! Lütfen pop-up engelleyicisini kapatın.", "error");
    return;
  }
  
  printWindow.document.write(`
    <html>
    <head>
      <title>Etkinlik QR Afişi - ${event.name}</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding: 40px; color: #070A13; background: #fff; }
        .card { border: 4px double #8B5CF6; padding: 50px 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header { font-size: 1.1rem; font-weight: bold; color: #8B5CF6; margin-bottom: 25px; letter-spacing: 1.5px; text-transform: uppercase; }
        .title { font-size: 2.2rem; margin: 25px 0; font-weight: 800; line-height: 1.2; }
        .date { font-size: 1.2rem; color: #4b5563; margin-bottom: 20px; font-weight: bold; }
        .qr-box { border: 3px solid #8B5CF6; padding: 20px; display: inline-block; background: #fff; margin-bottom: 25px; border-radius: 8px; }
        .rewards { font-size: 1.4rem; font-weight: bold; color: #10B981; margin-bottom: 30px; }
        .instructions { font-size: 1rem; color: #374151; line-height: 1.6; text-align: left; background: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 5px solid #8B5CF6; }
        .instructions strong { color: #8B5CF6; }
        @media print {
          body { padding: 0; background: none; }
          .card { border: none; box-shadow: none; max-width: 100%; }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">🔗 PİRİ REİS ÜNİVERSİTESİ BLOCKCHAIN KULÜBÜ</div>
        <hr style="border: 0; border-top: 2px dashed #8B5CF6; margin-bottom: 20px;">
        <div class="title">${event.name}</div>
        <div class="date">📅 Tarih: ${event.date}</div>
        <div class="rewards">🎁 Katılım Ödülü: +${event.xp} XP / +${event.pru} PRU</div>
        <div class="qr-box">
          <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="1.5">
            <rect x="2" y="2" width="6" height="6" rx="0.5"></rect>
            <rect x="16" y="2" width="6" height="6" rx="0.5"></rect>
            <rect x="2" y="16" width="6" height="6" rx="0.5"></rect>
            <rect x="7" y="7" width="2" height="2" fill="#8B5CF6"></rect>
            <rect x="15" y="7" width="2" height="2" fill="#8B5CF6"></rect>
            <rect x="7" y="15" width="2" height="2" fill="#8B5CF6"></rect>
            <path d="M12 2v6M12 12v6M16 12h6M16 16h6M2 12h6M12 16h2v2h-2z" stroke-linecap="round"></path>
          </svg>
        </div>
        <div class="instructions">
          <strong>Katılım ve Ödül Talep Adımları:</strong><br>
          1. Akıllı telefonunuzdan <strong>prubc.github.io</strong> portalına girin ve cüzdanınızı bağlayın.<br>
          2. Arayüzdeki <strong>"Akademi & Görevler"</strong> sekmesine giderek <strong>"Buluşma QR Kod Tarat"</strong> butonuna basın.<br>
          3. Açılan kameranız ile bu QR kodu taratın ve ödülünüzü anında cüzdanınıza (SBT) tanımlayın!
        </div>
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 300);
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
  appendTerminal(`[ADMIN] QR Flyer generated and print triggered for: "${event.name}"`, 'success');
}

// Event creation form submit
const formCreateEvent = document.getElementById('form-create-event');
if (formCreateEvent) {
  formCreateEvent.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('input-event-name').value.trim();
    const date = document.getElementById('input-event-date').value.trim();
    const xp = parseInt(document.getElementById('input-event-xp').value) || 0;
    const pru = parseInt(document.getElementById('input-event-pru').value) || 0;
    
    sounds.playClick();
    
    if (state.networkMode === 'onchain') {
      showToast("⏳ Etkinlik oluşturuluyor. Lütfen cüzdanınızdan onaylayın...", "info");
      portalContract.registerEvent(name, date, xp, pru)
        .then(async (tx) => {
          appendTerminal(`[TX] Create Event: ${tx.hash}`, 'cmd');
          await tx.wait();
          sounds.playSuccess();
          showToast(`📅 "${name}" etkinliği başarıyla eklendi!`, "success");
          formCreateEvent.reset();
          await syncDataFromBlockchain(state.walletAddress);
        })
        .catch((err) => {
          console.error(err);
          sounds.playError();
          showToast("❌ Etkinlik oluşturma başarısız.", "error");
        });
      return;
    }
    
    // Determine next id
    const nextId = state.eventsList.length > 0 ? Math.max(...state.eventsList.map(e => e.id)) + 1 : 1;
    
    const newEvent = {
      id: nextId,
      name: name,
      date: date,
      xp: xp,
      pru: pru,
      attendees: 0
    };
    
    state.eventsList.push(newEvent);
    saveState();
    sounds.playSuccess();
    showToast(`📅 "${name}" etkinliği başarıyla eklendi!`, "success");
    appendTerminal(`[ADMIN] New event registered: "${name}" (+${xp} XP / +${pru} PRU)`, 'success');
    
    formCreateEvent.reset();
    updateUI();
  });
}

const btnDownloadEventReport = document.getElementById('btn-download-event-report');
if (btnDownloadEventReport) {
  btnDownloadEventReport.addEventListener('click', () => {
    sounds.playClick();
    
    // Header with BOM for Excel Turkish characters
    let csvContent = "\ufeff";
    csvContent += "Etkinlik ID,Etkinlik Adı,Tarih,XP Ödülü,PRU Ödülü,Katılımcı Sayısı,Toplam Dağıtılan PRU,Toplam Dağıtılan XP\n";
    
    state.eventsList.forEach(ev => {
      const totalPru = (ev.attendees || 0) * ev.pru;
      const totalXp = (ev.attendees || 0) * ev.xp;
      // Escape quote marks in names
      const escapedName = `"${ev.name.replace(/"/g, '""')}"`;
      const escapedDate = `"${ev.date.replace(/"/g, '""')}"`;
      
      csvContent += `${ev.id},${escapedName},${escapedDate},${ev.xp},${ev.pru},${ev.attendees || 0},${totalPru},${totalXp}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "pru_etkinlik_raporu_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("📊 Yıllık Etkinlik Raporu CSV olarak indirildi.", "success");
    appendTerminal(`[ADMIN] Event report exported successfully. Total events: ${state.eventsList.length}`, 'success');
  });
}

// --- KULÜP MAĞAZASI (STORE) MODULE ---
function renderStore() {
  const grid = document.getElementById('store-items-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  if (!state.storeInventory) state.storeInventory = [...DEFAULT_STATE.storeInventory];
  
  state.storeInventory.forEach(item => {
    const card = document.createElement('div');
    card.className = `mission-card ${item.stock === 0 ? 'completed' : ''}`;
    
    const costText = `${item.cost} PRU`;
    const stockText = item.stock > 0 ? `${item.stock} Adet` : "Tükendi";
    
    card.innerHTML = `
      <div class="mission-header">
        <span class="mission-xp-badge" style="background: rgba(139, 92, 246, 0.1); border-color: var(--accent-purple); color: var(--accent-purple); font-family: var(--font-mono);">${costText}</span>
        <span class="mission-status" style="font-family: var(--font-mono); font-size: 0.8rem;">Stok: ${stockText}</span>
      </div>
      <h3 class="mission-title" style="margin-top: 10px; font-size: 1.15rem;">${item.name}</h3>
      <p class="mission-desc" style="min-height: auto; margin-bottom: 15px; font-size: 0.82rem;">Kategori: <strong>${item.category}</strong></p>
      <div class="mission-footer">
        <button class="mission-btn" id="btn-redeem-${item.id}" ${(!state.userConnected || state.pruBalance < item.cost || item.stock === 0) ? 'disabled' : ''} style="width: 100%; border-color: var(--accent-green); color: var(--accent-green);">
          ${item.stock === 0 ? 'Tükendi' : 'Kupon Al (Redeem)'}
        </button>
      </div>
    `;
    
    grid.appendChild(card);
    
    const btnRedeem = card.querySelector(`#btn-redeem-${item.id}`);
    if (btnRedeem && item.stock > 0) {
      // Styling hover state if enabled
      btnRedeem.addEventListener('mouseover', () => {
        if (!btnRedeem.disabled) {
          btnRedeem.style.backgroundColor = 'var(--accent-green)';
          btnRedeem.style.color = 'var(--bg-main)';
        }
      });
      btnRedeem.addEventListener('mouseout', () => {
        if (!btnRedeem.disabled) {
          btnRedeem.style.backgroundColor = 'transparent';
          btnRedeem.style.color = 'var(--accent-green)';
        }
      });
      
      btnRedeem.addEventListener('click', () => {
        purchaseStoreItem(item.id);
      });
    }
  });
}

function purchaseStoreItem(itemId) {
  if (!checkWalletConnected()) return;
  
  const item = state.storeInventory.find(i => i.id === itemId);
  if (!item) return;
  
  if (state.networkMode === 'onchain') {
    sounds.playClick();
    showToast("⏳ Ürün alımı başlatıldı. Lütfen cüzdanınızdan onaylayın...", "info");
    
    const costWei = ethers.utils.parseEther(item.cost.toString());
    const code = `PRU-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    tokenContract.allowance(state.walletAddress, CONTRACT_ADDRESSES.PRUClubPortal)
      .then(async (allowance) => {
        if (allowance.lt(costWei)) {
          showToast("⏳ Token harcama onayı bekleniyor...", "info");
          const approveTx = await tokenContract.approve(CONTRACT_ADDRESSES.PRUClubPortal, ethers.constants.MaxUint256);
          appendTerminal(`[TX] PRU Token approve sent: ${approveTx.hash}`, 'cmd');
          await approveTx.wait();
        }
        
        showToast("⏳ Satın alma işlemi gönderiliyor...", "info");
        const tx = await portalContract.purchaseStoreItem(itemId, code);
        appendTerminal(`[TX] Store purchase: ${tx.hash}`, 'cmd');
        
        await tx.wait();
        sounds.playSuccess();
        
        if (!state.redeemedVouchers) state.redeemedVouchers = [];
        state.redeemedVouchers.push({
          code: code,
          itemId: item.id,
          itemName: item.name,
          timestamp: Date.now()
        });
        
        // Show voucher modal
        const modal = document.getElementById('overlay-voucher');
        const codeDisplay = document.getElementById('voucher-code-display');
        if (modal && codeDisplay) {
          codeDisplay.textContent = code;
          modal.classList.add('active');
        }
        
        showToast(`🎉 ${item.name} kuponu başarıyla alındı!`, "success");
        appendTerminal(`[TX] Store redemption successful. Spent ${item.cost} PRU. Voucher: ${code}`, 'success');
        
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Satın alma işlemi başarısız.", "error");
      });
    return;
  }

  if (state.pruBalance < item.cost) {
    sounds.playError();
    showToast("⚠️ Yetersiz Bakiye! Görev yaparak PRU kazanın.", "error");
    return;
  }
  
  if (item.stock <= 0) {
    sounds.playError();
    showToast("⚠️ Ürün tükendi!", "error");
    return;
  }
  
  sounds.playClick();
  
  // Deduct tokens, burn them
  state.pruBalance -= item.cost;
  state.burnedPru += item.cost;
  item.stock -= 1;
  
  // Generate coupon code
  const code = `PRU-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
  if (!state.redeemedVouchers) state.redeemedVouchers = [];
  state.redeemedVouchers.push({
    code: code,
    itemId: item.id,
    itemName: item.name,
    timestamp: Date.now()
  });
  
  saveState();
  sounds.playSuccess();
  
  // Show voucher modal
  const modal = document.getElementById('overlay-voucher');
  const codeDisplay = document.getElementById('voucher-code-display');
  if (modal && codeDisplay) {
    codeDisplay.textContent = code;
    modal.classList.add('active');
  }
  
  showToast(`🎉 ${item.name} kuponu başarıyla alındı!`, "success");
  appendTerminal(`[TX] Store redemption. Spent ${item.cost} PRU (Burned). Voucher: ${code}`, 'success');
  
  updateUI();
}

const btnCloseVoucherModal = document.getElementById('btn-close-voucher-modal');
if (btnCloseVoucherModal) {
  btnCloseVoucherModal.addEventListener('click', () => {
    sounds.playClick();
    document.getElementById('overlay-voucher').classList.remove('active');
  });
}

const btnCloseVoucher = document.getElementById('btn-close-voucher');
if (btnCloseVoucher) {
  btnCloseVoucher.addEventListener('click', () => {
    sounds.playClick();
    document.getElementById('overlay-voucher').classList.remove('active');
  });
}

// --- ACADEMIC SUBMISSIONS ON-CHAIN VERIFICATION ---
function renderAdminSubmissions() {
  const tbody = document.getElementById('admin-submissions-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  if (!state.pendingSubmissions) state.pendingSubmissions = [];
  
  if (state.pendingSubmissions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">
          Onay bekleyen akademik ödev veya rapor bulunmamaktadır.
        </td>
      </tr>
    `;
    return;
  }
  
  state.pendingSubmissions.forEach(sub => {
    const row = document.createElement('tr');
    row.className = 'leaderboard-row';
    row.innerHTML = `
      <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan);">${sub.student}</td>
      <td><strong>${sub.questTitle}</strong></td>
      <td style="font-size: 0.8rem;">
        <span style="display:block; font-weight:600;">"${sub.title}"</span>
        <a href="${sub.detail}" target="_blank" style="color: var(--accent-purple); text-decoration: underline; font-family: var(--font-mono);">${sub.detail}</a>
      </td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="mission-btn approve-sub-btn" data-id="${sub.id}" style="padding: 4px 8px; font-size: 0.75rem; border-color: var(--accent-green); color: var(--accent-green); margin-right: 5px;">Onayla</button>
        <button class="mission-btn reject-sub-btn" data-id="${sub.id}" style="padding: 4px 8px; font-size: 0.75rem; border-color: var(--accent-red); color: var(--accent-red);">Reddet</button>
      </td>
    `;
    
    tbody.appendChild(row);
    
    // Bind approve click
    row.querySelector('.approve-sub-btn').addEventListener('click', () => {
      approveSubmission(sub.id);
    });
    
    // Bind reject click
    row.querySelector('.reject-sub-btn').addEventListener('click', () => {
      rejectSubmission(sub.id);
    });
  });
}

function approveSubmission(subId) {
  sounds.playClick();
  const sub = state.pendingSubmissions.find(s => s.id === subId);
  if (!sub) return;
  
  if (state.networkMode === 'onchain') {
    showToast("⏳ Ödev onaylanıyor. Lütfen cüzdanınızdan onaylayın...", "info");
    
    const subIdx = parseInt(subId);
    portalContract.approveSubmission(subIdx)
      .then(async (tx) => {
        appendTerminal(`[TX] Approve submission ${subId}: ${tx.hash}`, 'cmd');
        await tx.wait();
        sounds.playSuccess();
        showToast(`🎉 Rapor onaylandı! Ödüller dağıtıldı.`, "success");
        await syncDataFromBlockchain(state.walletAddress);
      })
      .catch((err) => {
        console.error(err);
        sounds.playError();
        showToast("❌ Onay işlemi başarısız.", "error");
      });
    return;
  }

  state.completedQuests.push(sub.questId);
  if (!state.badges.includes(sub.questId)) state.badges.push(sub.questId);
  
  state.pruBalance += sub.pru;
  
  // Remove from queue
  state.pendingSubmissions = state.pendingSubmissions.filter(s => s.id !== subId);
  
  saveState();
  awardXP(sub.xp); // triggers sounds.playSuccess() and UI updates
  
  showToast(`🎉 "${sub.title}" raporu onaylandı! Öğrenciye +${sub.xp} XP ve +${sub.pru} PRU basıldı.`, "success");
  appendTerminal(`[ADMIN] Approved submission ${subId}. Minted rewards for "${sub.title}" to SBT card.`, 'success');
  
  updateUI();
}

function rejectSubmission(subId) {
  sounds.playClick();
  const sub = state.pendingSubmissions.find(s => s.id === subId);
  if (!sub) return;
  
  if (state.networkMode === 'onchain') {
    if (confirm(`"${sub.title}" teslimini reddetmek istediğinize emin misiniz?`)) {
      showToast("⏳ Reddetme işlemi cüzdandan onaylanıyor...", "info");
      
      const subIdx = parseInt(subId);
      portalContract.rejectSubmission(subIdx)
        .then(async (tx) => {
          appendTerminal(`[TX] Reject submission ${subId}: ${tx.hash}`, 'cmd');
          await tx.wait();
          sounds.playSuccess();
          showToast(`❌ "${sub.title}" teslimi reddedildi.`, "info");
          await syncDataFromBlockchain(state.walletAddress);
        })
        .catch((err) => {
          console.error(err);
          sounds.playError();
          showToast("❌ Reddetme işlemi başarısız.", "error");
        });
    }
    return;
  }

  if (confirm(`"${sub.title}" teslimini reddetmek istediğinize emin misiniz?`)) {
    state.pendingSubmissions = state.pendingSubmissions.filter(s => s.id !== subId);
    saveState();
    
    sounds.playError();
    showToast(`❌ "${sub.title}" teslimi reddedildi.`, "info");
    appendTerminal(`[ADMIN] Rejected submission ${subId} for "${sub.title}".`, 'error');
    
    updateUI();
  }
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

// --- INITIALIZATION ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  // Load state from local storage
  loadState();

  // Bind network mode switcher selection
  const netModeSelect = document.getElementById('select-network-mode');
  if (netModeSelect) {
    netModeSelect.value = state.networkMode;
    netModeSelect.addEventListener('change', async (e) => {
      sounds.playClick();
      state.networkMode = e.target.value;
      saveState();

      const modeName = state.networkMode === 'onchain' ? 'On-Chain (Web3)' : 'Simülasyon';
      showToast(`Şebeke Modu Değiştirildi: ${modeName}`, 'info');
      appendTerminal(`[SYS] Network mode set to: ${state.networkMode.toUpperCase()}`, 'info');

      if (state.networkMode === 'onchain') {
        await connectWeb3AndSync();
      } else {
        // Fallback to simulation mode: reset Web3 status and load local storage
        state.userConnected = false;
        state.walletAddress = '';
        state.userRole = 'guest';
        loadState();
        updateUI();
      }
    });
  }

  // Bind Location Check-in button click
  const btnStartLocation = document.getElementById('btn-start-location');
  if (btnStartLocation) {
    btnStartLocation.addEventListener('click', verifyLocation);
  }

  // Bind Landing page buttons
  const btnHeroEnterPortal = document.getElementById('btn-hero-enter-portal');
  if (btnHeroEnterPortal) {
    btnHeroEnterPortal.addEventListener('click', () => {
      sounds.playClick();
      // Switch active tab to dashboard
      const dashBtn = document.querySelector('button[data-view="dashboard"]');
      if (dashBtn) {
        dashBtn.click();
      }
      // If wallet not connected, prompt connect
      if (!state.userConnected) {
        const connectBtn = document.getElementById('wallet-connect-btn');
        if (connectBtn) connectBtn.click();
      }
    });
  }

  const btnHeroLearnToken = document.getElementById('btn-hero-learn-token');
  if (btnHeroLearnToken) {
    btnHeroLearnToken.addEventListener('click', () => {
      sounds.playClick();
      const tokenSec = document.getElementById('landing-vision-grid');
      if (tokenSec) {
        tokenSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Render initial interface and start prize countdown
  updateUI();
  startYearEndCountdown();

  // If previous state had onchain mode saved, automatically connect Web3
  if (state.networkMode === 'onchain') {
    connectWeb3AndSync();
  }
});



