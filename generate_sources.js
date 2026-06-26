const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Ensure sources directory exists
const SOURCES_DIR = path.join(__dirname, 'sources');
if (!fs.existsSync(SOURCES_DIR)) {
  fs.mkdirSync(SOURCES_DIR, { recursive: true });
}

// Load departments data by mocking window object
global.window = {};
try {
  require('./departmentsData.js');
} catch (e) {
  console.error("❌ departmentsData.js dosyası yüklenemedi:", e.message);
  process.exit(1);
}
const departments = global.window.departmentsData;

// Retrieve API Key
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.log("ℹ️ GEMINI_API_KEY çevre değişkeni bulunamadı. Yerel zengin şablon motoru ile 100 kaynak dosyası üretilecek.");
} else {
  console.log("📡 Gemini API aktif. Akademik zenginleştirmeli dosya üretimi başlatılacak.");
}

async function main() {
  console.log("🚀 Detaylı kaynak dokümanlarının üretimi başlatılıyor...");
  
  for (const dep of departments) {
    for (const sol of dep.solutions) {
      await processSource(dep, sol);
    }
  }
  
  console.log("\n🎉 İşlem tamamlandı! Tüm kaynak dokümanları 'sources/' klasörüne kaydedildi.");
}

async function processSource(dep, sol) {
  const outputFile = path.join(SOURCES_DIR, `${sol.id}.md`);
  console.log(`📝 Rapor Oluşturuluyor: [${sol.id}] - ${sol.title}`);

  if (fs.existsSync(outputFile)) {
    console.log(`   ➔ [${sol.id}.md] zaten mevcut. Atlanıyor.`);
    return;
  }

  let markdownContent = "";

  if (API_KEY) {
    // Generate via Gemini API
    try {
      const { GoogleGenerativeAI } = require('@google/generativeai');
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Sen Piri Reis Üniversitesi'nde Kıdemli Blockchain Araştırmacısı ve Yazılım Mimarı profesörüsün.
        Aşağıdaki blockchain çözümü hakkında NotebookLM'e yüklenmeye hazır, yaklaşık 800-1000 kelimelik, son derece detaylı akademik ve teknik bir araştırma raporu (Markdown formatında) hazırlamanı istiyorum.
        
        Bölüm: ${dep.name}
        Çözüm Başlığı: ${sol.title}
        Problem: ${sol.problem}
        Çözüm Özeti: ${sol.whyUse}
        Geliştirme Mimarisi: ${sol.howToDevelop}
        Gerçek Dünya Canlı Örneği: ${sol.realWorldExample}
        ROI Analizi: Kurulum: ${sol.costBenefit.setupCost}, Operasyon: ${sol.costBenefit.operatingCost}, ROI Süresi: ${sol.costBenefit.roi}, Tasarruf Oranı: ${sol.costBenefit.savingRate}
        
        Rapor şu yapısal başlıkları (H2 olarak) içermelidir:
        1. Giriş ve Sektörel Kriz Analizi (Mevcut merkezi veya geleneksel sistemin yarattığı bürokrasi, gecikme, güvenlik ve tahrifat riskleri detaylandırılacak)
        2. Blockchain Entegrasyon Vizyonu (Merkeziyetsiz dağıtık defterlerin, akıllı sözleşmelerin ve şeffaflığın getirdiği güven ortamı ve vizyonel kazanımlar)
        3. Teknik Yazılım ve Akıllı Sözleşme Mimarisi (Bu çözüm için tasarladığın örnek bir Solidity akıllı sözleşme kod taslağı - Markdown Solidity kod bloğu olarak - içermeli. ERC-20, ERC-721 veya ERC-1155 standartlarından hangisi uygunsa o kullanılmalı. State variables, events, mappings, constructor ve kritik fonksiyonlar bulunmalı. Ayrıca Chainlink Oracle veya web3 entegrasyon şeması anlatılmalı.)
        4. İş Akış Aşamaları ve Uygulama (3 aşamalı iş akış adımları: 1- ${sol.workflow[0] ? sol.workflow[0].title : ''}, 2- ${sol.workflow[1] ? sol.workflow[1].title : ''}, 3- ${sol.workflow[2] ? sol.workflow[2].title : ''} adımları geniş şekilde açıklanacak.)
        5. Detaylı Maliyet-Fayda ve Yatırım Dönüş (ROI) Analizi (Kurulum maliyeti, operasyonel gas ücretleri ve zaman/maliyet tasarruf oranları matematiksel formüllerle veya mantıksal hesaplamalarla açıklanmalı)
        6. Küresel Başarı Hikayesi ve Sektörel Canlı Örnekler (${sol.realWorldExample} örneği genişletilerek anlatılmalı)
        7. Kendini Sına (Öğrencilerin makaleyi okuduktan sonra çözebileceği, doğru cevapları ve açıklamaları altta gizlenmiş olan 3 adet çoktan seçmeli test sorusu)
        
        Dil tamamen profesyonel, akademik ve akıcı bir Türkçe olmalıdır. Başlıkları Markdown formatında (# ve ##) düzgünce biçimlendir.
      `;

      const result = await model.generateContent(prompt);
      markdownContent = result.response.text();
    } catch (error) {
      console.warn(`⚠️ Gemini API hatası [${sol.id}]:`, error.message, "Yerel şablon motoruna geçiliyor.");
      markdownContent = generateTemplateMarkdown(dep, sol);
    }
  } else {
    // Generate via local rich templates
    markdownContent = generateTemplateMarkdown(dep, sol);
  }

  fs.writeFileSync(outputFile, markdownContent, 'utf-8');
  console.log(`   ✅ [${sol.id}.md] başarıyla kaydedildi.`);
}

function generateTemplateMarkdown(dep, sol) {
  const isFinancial = sol.id.startsWith('ib') || sol.id.startsWith('mb') || sol.title.toLowerCase().includes('defi') || sol.title.toLowerCase().includes('token') || sol.title.toLowerCase().includes('ödeme');
  const contractType = isFinancial ? "ERC20" : "ERC721";
  const nameSafe = sol.title.replace(/[^a-zA-Z0-9]/g, '');

  const solidityCode = isFinancial 
? `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ${sol.title} Finansal Akıllı Sözleşmesi
 * @notice Piri Reis Üniversitesi Blockchain Akademisi Eğitim Kaynağı.
 */
contract ${nameSafe}Contract is ERC20, Ownable {
    
    struct TransactionRecord {
        uint256 amount;
        uint256 timestamp;
        string invoiceHash; // IPFS hash'i
        bool isSettled;
    }
    
    mapping(address => TransactionRecord[]) public transactionLedger;
    
    event TransactionInitiated(address indexed sender, address indexed receiver, uint256 amount, string invoiceHash);
    event TransactionSettled(address indexed sender, uint256 index);

    constructor() ERC20("${sol.title.substring(0,20)}Token", "PRU${sol.id.toUpperCase()}") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function initiateTransfer(address to, uint256 amount, string memory invoiceHash) public returns (bool) {
        require(balanceOf(msg.sender) >= amount, "Yetersiz bakiye");
        transfer(to, amount);
        
        transactionLedger[msg.sender].push(TransactionRecord(amount, block.timestamp, invoiceHash, false));
        emit TransactionInitiated(msg.sender, to, amount, invoiceHash);
        return true;
    }

    function settleTransaction(uint256 index) public onlyOwner {
        require(index < transactionLedger[msg.sender].length, "Gecersiz index");
        transactionLedger[msg.sender][index].isSettled = true;
        emit TransactionSettled(msg.sender, index);
    }
}`
: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ${sol.title} Mülkiyet ve Kayıt Akıllı Sözleşmesi
 * @notice Piri Reis Üniversitesi Blockchain Akademisi Eğitim Kaynağı.
 */
contract ${nameSafe}Contract is ERC721, Ownable {
    uint256 private _nextTokenId;
    
    struct RegistryInfo {
        string dataHash; // IPFS'teki telemetri/sensör/doküman verisi
        uint256 timestamp;
        address registeredBy;
        bool isVerified;
    }
    
    mapping(uint256 => RegistryInfo) public registry;
    
    event AssetRegistered(uint256 indexed tokenId, string dataHash, address indexed creator);
    event AssetVerified(uint256 indexed tokenId);

    constructor() ERC721("${sol.title.substring(0,20)}NFT", "PRU${sol.id.toUpperCase()}") Ownable(msg.sender) {}

    function registerAsset(address to, string memory dataHash) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        
        registry[tokenId] = RegistryInfo(dataHash, block.timestamp, msg.sender, false);
        emit AssetRegistered(tokenId, dataHash, msg.sender);
        return tokenId;
    }

    function verifyAsset(uint256 tokenId) public onlyOwner {
        require(registry[tokenId].registeredBy != address(0), "Kayit bulunamadi");
        registry[tokenId].isVerified = true;
        emit AssetVerified(tokenId);
    }
}`;

  return `# Araştırma Raporu: ${sol.title}
## Piri Reis Üniversitesi Blockchain Akademisi ve Web3 Hub
**Bölüm:** ${dep.name}  
**Ders Kimliği:** PRU-${sol.id.toUpperCase()}  

---

## 1. Giriş ve Sektörel Kriz Analizi
Geleneksel endüstriyel altyapıda karşılaşılan en büyük dar boğazlardan biri, operasyonların merkezi veritabanlarına, fiziksel evrak dolaşımına ve çok sayıdaki aracı kuruma bağımlı olmasıdır. ${dep.name} disiplini özelinde bu kriz, kendisini doğrudan şu sorunlarla hissettirmektedir: **${sol.problem}**

Fiziksel belgelerin (konşimento, faturalar, onay formları vb.) kuryeler aracılığıyla taşınması veya merkezi sunucularda saklanması, siber saldırganlar ve kötü niyetli aktörler için tek bir başarısızlık noktası (Single Point of Failure) oluşturur. Belgelerin kaybolması, tahrif edilmesi veya ıslak imzaların taklit edilmesi gibi riskler, iş süreçlerinde milyonlarca dolarlık kayıplara ve haftalar süren yasal uyuşmazlıklara yol açar. Bu bürokratik engeller, modern endüstrilerin ihtiyaç duyduğu gerçek zamanlı veri akışı ve esneklikle taban tabana zıttır.

---

## 2. Blockchain Entegrasyon Vizyonu
Söz konusu operasyonel krizlerin çözümü, güven ilişkisini merkezi kurumlardan alıp matematiksel ve kriptografik kurallarla çalışan dağıtık defter teknolojisine (DLT) devretmekte yatar. Blockchain teknolojisi sayesinde, süreçteki tüm paydaşlar (ihracatçılar, bankalar, liman otoriteleri, yazılımcılar ve mühendisler) ortak, değiştirilemez ve şeffaf bir veri tabanı üzerinde mutabakat sağlarlar.

Blockchain entegrasyonu ile:
- **Veri Güvenilirliği (Immutability):** Kaydedilen hiçbir veri geriye dönük olarak silinemez veya tahrif edilemez.
- **Aracısız Güven (Trustless Consensus):** İş kuralları insan inisiyatifinden bağımsız olarak çalışan akıllı sözleşmelerle yönetilir.
- **Şeffaf Takip (Auditable History):** Hammaddeden nihai teslimata veya sensör verilerinden finansal transferlere kadar her adım zincir üzerinde zaman damgalı olarak izlenebilir.

Bu vizyon, ${sol.title} modelini sadece teknik bir güncelleme olmaktan çıkarıp, tüm sektörü dönüştüren stratejik bir Web3 hamlesine dönüştürür.

---

## 3. Teknik Yazılım ve Akıllı Sözleşme Mimarisi
Sistemin kalbini, EVM (Ethereum Virtual Machine) uyumlu ağlar üzerinde çalışan ve iş kurallarını kodlayan Solidity akıllı sözleşmesi oluşturur. Bu çözüm kapsamında kullanılan mimari ve **Solidity Kod Taslağı** aşağıda gösterilmiştir:

\`\`\`solidity
${solidityCode}
\`\`\`

### Oracle ve Web3 Entegrasyonu
Akıllı sözleşmeler, doğaları gereği dış dünya verilerine (IoT sensör bilgileri, hava durumu, lokasyon veya gümrük onayları) doğrudan erişemezler. Bu entegrasyonu sağlamak için **Chainlink Decentralized Oracle Networks (DON)** kullanılır. Dışarıdan alınan telemetri ve sensör verileri, Chainlink düğümleri aracılığıyla kriptografik olarak imzalanarak akıllı sözleşmenin ilgili doğrulama fonksiyonlarına aktarılır. Kullanıcı arayüzünde ise **Ethers.js** veya **Web3.js** kütüphaneleri kullanılarak MetaMask cüzdan bağlantısı ve akıllı sözleşme tetikleme işlemleri gerçekleştirilir.

---

## 4. İş Akış Aşamaları ve Uygulama
${sol.title} çözümü, üç temel aşamadan oluşan şeffaf ve otomatik bir iş akışı döngüsünü takip eder:

1. **Aşama 1 - ${sol.workflow[0] ? sol.workflow[0].title : 'Veri Kayıt ve Varlık Oluşturma'}:** 
   ${sol.workflow[0] ? sol.workflow[0].desc : 'Sürecin ilk adımında varlık veya işlem verileri sisteme girilir ve akıllı sözleşme ile hashlenerek zincire yazılır.'}
2. **Aşama 2 - ${sol.workflow[1] ? sol.workflow[1].title : 'Kriptografik Doğrulama ve Onay'}:** 
   ${sol.workflow[1] ? sol.workflow[1].desc : 'Oracle bağlantıları ve paydaşların çoklu imzaları (Multisig) ile verinin doğruluğu zincir üzerinde onaylanır.'}
3. **Aşama 3 - ${sol.workflow[2] ? sol.workflow[2].title : 'Otomatik İşlem Sonlanması ve Dağıtım'}:** 
   ${sol.workflow[2] ? sol.workflow[2].desc : 'Doğrulanan işlemler doğrultusunda hak sahiplerine token transferi veya fiziksel teslimat yetkisi otomatik olarak dağıtılır.'}

---

## 5. Detaylı Maliyet-Fayda ve Yatırım Dönüş (ROI) Analizi
Sistemin finansal fizibilitesi, geleneksel manuel süreçlerin işletim maliyetleri ile blockchain tabanlı gas ve akıllı sözleşme maliyetlerinin karşılaştırılmasına dayanır.

### Finansal Metrikler:
- **Kurulum / Geliştirme Maliyeti:** ${sol.costBenefit.setupCost}
- **Operasyonel Giderler (Gas & Node):** ${sol.costBenefit.operatingCost}
- **Zaman/Maliyet Tasarruf Oranı:** ${sol.costBenefit.savingRate}
- **Yatırımın Amorti Süresi (ROI):** ${sol.costBenefit.roi}

### Tasarruf Formülü (ROI Hesaplama):
$$Tasarruf = (M_{geleneksel} - M_{gas}) \times N_{islem} - M_{kurulum}$$
Burada $M_{geleneksel}$ geleneksel bürokrasinin işlem başına yarattığı operasyonel maliyeti, $M_{gas}$ blockchain ağındaki gas ücretini, $N_{islem}$ yıllık işlem sayısını, $M_{kurulum}$ ise ilk geliştirme bütçesini ifade eder. Sağlanan **${sol.costBenefit.savingRate}** seviyesindeki verimlilik artışı ile sistem, kendini **${sol.costBenefit.roi}** gibi kısa bir sürede finanse etmektedir.

---

## 6. Küresel Başarı Hikayesi ve Sektörel Canlı Örnekler
Bu vizyonel çözüm sadece teoride kalmayıp, küresel düzeyde devasa ölçekte test edilmiştir. En bilinen canlı örneği şudur: **${sol.realWorldExample}**

Bu canlı uygulama, blockchain teknolojisinin sadece yazılımsal bir heves olmadığını, küresel ticaret ağlarında, limanlarda ve lojistik hatlarda darboğazları aşmak için vazgeçilmez bir altyapı olduğunu tüm dünyaya kanıtlamıştır.

---

## 7. Kendini Sına (Öğrenci Değerlendirme Soruları)

**Soru 1:** Bu sistemde kullanılan akıllı sözleşmenin tahrif edilmesini engelleyen temel blockchain özelliği hangisidir?
- A) Akıllı sözleşmelerin hızı
- B) Değiştirilemezlik (Immutability) ve dağıtık konsensüs
- C) Web3.js kütüphanesinin kullanımı
- D) Sunucu yedeklemeleri
* *Cevap:* **B**  
*Açıklama: Blockchain üzerindeki bloklar kriptografik özetler (hash) ile birbirine bağlıdır ve çoğunluk konsensüsü olmadan geriye dönük veri tahrifatı yapmak matematiksel olarak imkansızdır.*

**Soru 2:** Akıllı sözleşmenin dış dünyadaki IoT sensör verilerine erişebilmesi için kullanılan ara katman nedir?
- A) LocalStorage
- B) EVM Derleyicisi
- C) Chainlink Oracle Servisi
- D) MetaMask Cüzdanı
* *Cevap:* **C**  
*Açıklama: Oracle'lar (örn. Chainlink), zincir dışındaki verileri güvenli ve doğrulanmış bir şekilde zincir içine taşıyan merkeziyetsiz veri köprüleridir.*

**Soru 3:** Raporlanan ROI (Yatırım Dönüşü) analizine göre, bu sistemin kurulum maliyeti ne kadar sürede amorti edilmektedir?
- A) 5 Yılda
- B) Asla amorti edilemez
- C) Yaklaşık ${sol.costBenefit.roi} içinde
- D) İlk işlemde
* *Cevap:* **C**  
*Açıklama: Finansal raporlama verimlilik kazanımları sayesinde yatırım dönüş süresinin yaklaşık ${sol.costBenefit.roi} olduğunu belirtmektedir.*
`;
}

main().catch(err => {
  console.error("Fatal Error in generate_sources main:", err);
});
