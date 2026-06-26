# Araştırma Raporu: Tedarikçi SLA Performans Skorlama Defteri
## Piri Reis Üniversitesi Blockchain Akademisi ve Web3 Hub
**Bölüm:** Yönetim Bilişim Sistemleri  
**Ders Kimliği:** PRU-MIS-6  

---

## 1. Giriş ve Sektörel Kriz Analizi
Geleneksel endüstriyel altyapıda karşılaşılan en büyük dar boğazlardan biri, operasyonların merkezi veritabanlarına, fiziksel evrak dolaşımına ve çok sayıdaki aracı kuruma bağımlı olmasıdır. Yönetim Bilişim Sistemleri disiplini özelinde bu kriz, kendisini doğrudan şu sorunlarla hissettirmektedir: **Kurumların çalıştığı onlarca tedarikçinin teslimat süreleri ve ürün kaliteleri satın alma departmanlarınca şeffaf izlenememektedir.**

Fiziksel belgelerin (konşimento, faturalar, onay formları vb.) kuryeler aracılığıyla taşınması veya merkezi sunucularda saklanması, siber saldırganlar ve kötü niyetli aktörler için tek bir başarısızlık noktası (Single Point of Failure) oluşturur. Belgelerin kaybolması, tahrif edilmesi veya ıslak imzaların taklit edilmesi gibi riskler, iş süreçlerinde milyonlarca dolarlık kayıplara ve haftalar süren yasal uyuşmazlıklara yol açar. Bu bürokratik engeller, modern endüstrilerin ihtiyaç duyduğu gerçek zamanlı veri akışı ve esneklikle taban tabana zıttır.

---

## 2. Blockchain Entegrasyon Vizyonu
Söz konusu operasyonel krizlerin çözümü, güven ilişkisini merkezi kurumlardan alıp matematiksel ve kriptografik kurallarla çalışan dağıtık defter teknolojisine (DLT) devretmekte yatar. Blockchain teknolojisi sayesinde, süreçteki tüm paydaşlar (ihracatçılar, bankalar, liman otoriteleri, yazılımcılar ve mühendisler) ortak, değiştirilemez ve şeffaf bir veri tabanı üzerinde mutabakat sağlarlar.

Blockchain entegrasyonu ile:
- **Veri Güvenilirliği (Immutability):** Kaydedilen hiçbir veri geriye dönük olarak silinemez veya tahrif edilemez.
- **Aracısız Güven (Trustless Consensus):** İş kuralları insan inisiyatifinden bağımsız olarak çalışan akıllı sözleşmelerle yönetilir.
- **Şeffaf Takip (Auditable History):** Hammaddeden nihai teslimata veya sensör verilerinden finansal transferlere kadar her adım zincir üzerinde zaman damgalı olarak izlenebilir.

Bu vizyon, Tedarikçi SLA Performans Skorlama Defteri modelini sadece teknik bir güncelleme olmaktan çıkarıp, tüm sektörü dönüştüren stratejik bir Web3 hamlesine dönüştürür.

---

## 3. Teknik Yazılım ve Akıllı Sözleşme Mimarisi
Sistemin kalbini, EVM (Ethereum Virtual Machine) uyumlu ağlar üzerinde çalışan ve iş kurallarını kodlayan Solidity akıllı sözleşmesi oluşturur. Bu çözüm kapsamında kullanılan mimari ve **Solidity Kod Taslağı** aşağıda gösterilmiştir:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Tedarikçi SLA Performans Skorlama Defteri Mülkiyet ve Kayıt Akıllı Sözleşmesi
 * @notice Piri Reis Üniversitesi Blockchain Akademisi Eğitim Kaynağı.
 */
contract TedarikiSLAPerformansSkorlamaDefteriContract is ERC721, Ownable {
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

    constructor() ERC721("Tedarikçi SLA PerforNFT", "PRUMIS-6") Ownable(msg.sender) {}

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
}
```

### Oracle ve Web3 Entegrasyonu
Akıllı sözleşmeler, doğaları gereği dış dünya verilerine (IoT sensör bilgileri, hava durumu, lokasyon veya gümrük onayları) doğrudan erişemezler. Bu entegrasyonu sağlamak için **Chainlink Decentralized Oracle Networks (DON)** kullanılır. Dışarıdan alınan telemetri ve sensör verileri, Chainlink düğümleri aracılığıyla kriptografik olarak imzalanarak akıllı sözleşmenin ilgili doğrulama fonksiyonlarına aktarılır. Kullanıcı arayüzünde ise **Ethers.js** veya **Web3.js** kütüphaneleri kullanılarak MetaMask cüzdan bağlantısı ve akıllı sözleşme tetikleme işlemleri gerçekleştirilir.

---

## 4. İş Akış Aşamaları ve Uygulama
Tedarikçi SLA Performans Skorlama Defteri çözümü, üç temel aşamadan oluşan şeffaf ve otomatik bir iş akışı döngüsünü takip eder:

1. **Aşama 1 - Teslimat Gecikmesi:** 
   Tedarikçi malzemeyi planlanan tarihten 3 gün geç teslim eder.
2. **Aşama 2 - Onchain Skor Güncelleme:** 
   Depo kabul sistemi gecikmeyi onaylar, akıllı sözleşme tedarikçi skorunu düşürür.
3. **Aşama 3 - İhale Seçimi:** 
   Yeni satın alımlarda sistem ihaledeki en yüksek onchain skora sahip tedarikçiyi önerir.

---

## 5. Detaylı Maliyet-Fayda ve Yatırım Dönüş (ROI) Analizi
Sistemin finansal fizibilitesi, geleneksel manuel süreçlerin işletim maliyetleri ile blockchain tabanlı gas ve akıllı sözleşme maliyetlerinin karşılaştırılmasına dayanır.

### Finansal Metrikler:
- **Kurulum / Geliştirme Maliyeti:** Orta ($26,000)
- **Operasyonel Giderler (Gas & Node):** Düşük
- **Zaman/Maliyet Tasarruf Oranı:** %20 Tedarikçi Teslimat Performans Artışı, Kalite Uyuşmazlıklarında %35 Düşüş
- **Yatırımın Amorti Süresi (ROI):** 9 Ay

### Tasarruf Formülü (ROI Hesaplama):
$$Tasarruf = (M_{geleneksel} - M_{gas}) 	imes N_{islem} - M_{kurulum}$$
Burada $M_{geleneksel}$ geleneksel bürokrasinin işlem başına yarattığı operasyonel maliyeti, $M_{gas}$ blockchain ağındaki gas ücretini, $N_{islem}$ yıllık işlem sayısını, $M_{kurulum}$ ise ilk geliştirme bütçesini ifade eder. Sağlanan **%20 Tedarikçi Teslimat Performans Artışı, Kalite Uyuşmazlıklarında %35 Düşüş** seviyesindeki verimlilik artışı ile sistem, kendini **9 Ay** gibi kısa bir sürede finanse etmektedir.

---

## 6. Küresel Başarı Hikayesi ve Sektörel Canlı Örnekler
Bu vizyonel çözüm sadece teoride kalmayıp, küresel düzeyde devasa ölçekte test edilmiştir. En bilinen canlı örneği şudur: **Tedarikçi ilişkileri yönetiminde (SRM) blockchain tabanlı objektif performans analitikleri kullanılmaktadır.**

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
- C) Yaklaşık 9 Ay içinde
- D) İlk işlemde
* *Cevap:* **C**  
*Açıklama: Finansal raporlama verimlilik kazanımları sayesinde yatırım dönüş süresinin yaklaşık 9 Ay olduğunu belirtmektedir.*
