# Araştırma Raporu: Akıllı Sözleşme Güvenlik Denetim Sicili
## Piri Reis Üniversitesi Blockchain Akademisi ve Web3 Hub
**Bölüm:** Bilgisayar ve Yazılım Mühendisliği  
**Ders Kimliği:** PRU-CS-2  

---

## 1. Giriş ve Sektörel Kriz Analizi
Geleneksel endüstriyel altyapıda karşılaşılan en büyük dar boğazlardan biri, operasyonların merkezi veritabanlarına, fiziksel evrak dolaşımına ve çok sayıdaki aracı kuruma bağımlı olmasıdır. Bilgisayar ve Yazılım Mühendisliği disiplini özelinde bu kriz, kendisini doğrudan şu sorunlarla hissettirmektedir: **Uygulamaya alınan akıllı sözleşmelerdeki kodlama hataları ve açıklar (hacks) milyonlarca dolarlık fon kayıplarına neden olur.**

Fiziksel belgelerin (konşimento, faturalar, onay formları vb.) kuryeler aracılığıyla taşınması veya merkezi sunucularda saklanması, siber saldırganlar ve kötü niyetli aktörler için tek bir başarısızlık noktası (Single Point of Failure) oluşturur. Belgelerin kaybolması, tahrif edilmesi veya ıslak imzaların taklit edilmesi gibi riskler, iş süreçlerinde milyonlarca dolarlık kayıplara ve haftalar süren yasal uyuşmazlıklara yol açar. Bu bürokratik engeller, modern endüstrilerin ihtiyaç duyduğu gerçek zamanlı veri akışı ve esneklikle taban tabana zıttır.

---

## 2. Blockchain Entegrasyon Vizyonu
Söz konusu operasyonel krizlerin çözümü, güven ilişkisini merkezi kurumlardan alıp matematiksel ve kriptografik kurallarla çalışan dağıtık defter teknolojisine (DLT) devretmekte yatar. Blockchain teknolojisi sayesinde, süreçteki tüm paydaşlar (ihracatçılar, bankalar, liman otoriteleri, yazılımcılar ve mühendisler) ortak, değiştirilemez ve şeffaf bir veri tabanı üzerinde mutabakat sağlarlar.

Blockchain entegrasyonu ile:
- **Veri Güvenilirliği (Immutability):** Kaydedilen hiçbir veri geriye dönük olarak silinemez veya tahrif edilemez.
- **Aracısız Güven (Trustless Consensus):** İş kuralları insan inisiyatifinden bağımsız olarak çalışan akıllı sözleşmelerle yönetilir.
- **Şeffaf Takip (Auditable History):** Hammaddeden nihai teslimata veya sensör verilerinden finansal transferlere kadar her adım zincir üzerinde zaman damgalı olarak izlenebilir.

Bu vizyon, Akıllı Sözleşme Güvenlik Denetim Sicili modelini sadece teknik bir güncelleme olmaktan çıkarıp, tüm sektörü dönüştüren stratejik bir Web3 hamlesine dönüştürür.

---

## 3. Teknik Yazılım ve Akıllı Sözleşme Mimarisi
Sistemin kalbini, EVM (Ethereum Virtual Machine) uyumlu ağlar üzerinde çalışan ve iş kurallarını kodlayan Solidity akıllı sözleşmesi oluşturur. Bu çözüm kapsamında kullanılan mimari ve **Solidity Kod Taslağı** aşağıda gösterilmiştir:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Akıllı Sözleşme Güvenlik Denetim Sicili Mülkiyet ve Kayıt Akıllı Sözleşmesi
 * @notice Piri Reis Üniversitesi Blockchain Akademisi Eğitim Kaynağı.
 */
contract AkllSzlemeGvenlikDenetimSiciliContract is ERC721, Ownable {
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

    constructor() ERC721("Akıllı Sözleşme GüveNFT", "PRUCS-2") Ownable(msg.sender) {}

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
Akıllı Sözleşme Güvenlik Denetim Sicili çözümü, üç temel aşamadan oluşan şeffaf ve otomatik bir iş akışı döngüsünü takip eder:

1. **Aşama 1 - Kod Denetimi:** 
   Yazılım ekibi Solidity sözleşmesini audit firmasına teslim eder.
2. **Aşama 2 - Rapor İmzası:** 
   Denetçi denetimi geçer notla tamamlar ve rapor hash'ini zincire kilitler.
3. **Aşama 3 - Canlıya Alım Güvencesi:** 
   Sistem, sadece denetlenmiş onaylı hash'e sahip kontratların çalışmasına izin verir.

---

## 5. Detaylı Maliyet-Fayda ve Yatırım Dönüş (ROI) Analizi
Sistemin finansal fizibilitesi, geleneksel manuel süreçlerin işletim maliyetleri ile blockchain tabanlı gas ve akıllı sözleşme maliyetlerinin karşılaştırılmasına dayanır.

### Finansal Metrikler:
- **Kurulum / Geliştirme Maliyeti:** Düşük ($15,000)
- **Operasyonel Giderler (Gas & Node):** Çok Düşük
- **Zaman/Maliyet Tasarruf Oranı:** %100 Kod Güvenlik Doğrulaması, Siber Risk Sigorta Primlerinde %30 İndirim
- **Yatırımın Amorti Süresi (ROI):** 6 Ay

### Tasarruf Formülü (ROI Hesaplama):
$$Tasarruf = (M_{geleneksel} - M_{gas}) 	imes N_{islem} - M_{kurulum}$$
Burada $M_{geleneksel}$ geleneksel bürokrasinin işlem başına yarattığı operasyonel maliyeti, $M_{gas}$ blockchain ağındaki gas ücretini, $N_{islem}$ yıllık işlem sayısını, $M_{kurulum}$ ise ilk geliştirme bütçesini ifade eder. Sağlanan **%100 Kod Güvenlik Doğrulaması, Siber Risk Sigorta Primlerinde %30 İndirim** seviyesindeki verimlilik artışı ile sistem, kendini **6 Ay** gibi kısa bir sürede finanse etmektedir.

---

## 6. Küresel Başarı Hikayesi ve Sektörel Canlı Örnekler
Bu vizyonel çözüm sadece teoride kalmayıp, küresel düzeyde devasa ölçekte test edilmiştir. En bilinen canlı örneği şudur: **CertiK and Hacken, akıllı sözleşme denetim raporlarını zincir üstünde doğrulanabilir şekilde yayınlamaktadır.**

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
- C) Yaklaşık 6 Ay içinde
- D) İlk işlemde
* *Cevap:* **C**  
*Açıklama: Finansal raporlama verimlilik kazanımları sayesinde yatırım dönüş süresinin yaklaşık 6 Ay olduğunu belirtmektedir.*
