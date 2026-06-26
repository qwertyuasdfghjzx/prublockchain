const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Ensure lectures directory exists
const LECTURES_DIR = path.join(__dirname, 'lectures');
if (!fs.existsSync(LECTURES_DIR)) {
  fs.mkdirSync(LECTURES_DIR, { recursive: true });
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
  console.warn("⚠️ UYARI: GEMINI_API_KEY çevre değişkeni bulunamadı.");
  console.warn("Lütfen .env dosyası oluşturup GEMINI_API_KEY=your_key_here yazın.");
  console.warn("Veya komutu çalıştırırken sağlayın: $env:GEMINI_API_KEY='key'; node automate_lectures.js");
  console.warn("\nSimülasyon modunda devam edilecek (API isteği gönderilmeyecek, yerel şablon kullanılacak).");
}

// JSON Schema for structured output
const responseSchema = {
  type: "OBJECT",
  properties: {
    id: { type: "STRING" },
    title: { type: "STRING" },
    department: { type: "STRING" },
    slides: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          bullets: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          narrative: { type: "STRING" }
        },
        required: ["title", "bullets", "narrative"]
      }
    }
  },
  required: ["id", "title", "department", "slides"]
};

// Help command
const args = process.argv.slice(2);
const command = args[0] || 'all';

if (command === '--help' || command === '-h') {
  console.log(`
📚 PRU Blockchain Akademi - Ders Kaynağı Oluşturma Otomasyonu
Kullanım:
  node automate_lectures.js [solutionId|all|list]

Komutlar:
  all           - Mevcut tüm 100 kilit çözüm için ders slaytlarını sırayla üretir (API limitlerine dikkat edin).
  list          - Veri tabanındaki tüm bölümleri ve çözüm ID'lerini listeler.
  [solutionId]  - Belirtilen spesifik çözüm için slayt üretir (Örn: mt-1, comp-2, log-5).
  `);
  process.exit(0);
}

if (command === 'list') {
  console.log("\n🏫 PİRİ REİS ÜNİVERSİTESİ BÖLÜM VE ÇÖZÜMLERİ LİSTESİ:\n");
  departments.forEach(dep => {
    console.log(`🔹 Bölüm: ${dep.name} (${dep.id})`);
    dep.solutions.forEach(sol => {
      console.log(`   ➔ [${sol.id}] - ${sol.title}`);
    });
    console.log("");
  });
  process.exit(0);
}

// Run main pipeline
async function main() {
  if (command === 'all') {
    console.log("🚀 Tüm 100 çözüm için ders kaynakları oluşturuluyor...");
    for (const dep of departments) {
      for (const sol of dep.solutions) {
        await processSolution(dep, sol);
      }
    }
  } else {
    // Find the specific solution
    let foundSol = null;
    let foundDep = null;
    for (const dep of departments) {
      const match = dep.solutions.find(s => s.id.toLowerCase() === command.toLowerCase());
      if (match) {
        foundSol = match;
        foundDep = dep;
        break;
      }
    }

    if (!foundSol) {
      console.error(`❌ Hata: '${command}' kimliğine sahip bir çözüm bulunamadı.`);
      console.log("Mevcut kimlikleri listelemek için 'node automate_lectures.js list' komutunu çalıştırabilirsiniz.");
      process.exit(1);
    }

    await processSolution(foundDep, foundSol);
  }
}

async function processSolution(dep, sol) {
  const outputFile = path.join(LECTURES_DIR, `${sol.id}.json`);
  console.log(`\n--------------------------------------------------`);
  console.log(`📖 Konu İşleniyor: [${sol.id}] - ${sol.title}`);
  console.log(`🏫 Bölüm: ${dep.name}`);

  if (fs.existsSync(outputFile)) {
    console.log(`ℹ️ [${sol.id}.json] zaten mevcut. Atlanıyor.`);
    return;
  }

  if (!API_KEY) {
    // Mock simulation generator if no API key is provided
    console.log("📡 Simülasyon modunda şablon verisi üretiliyor...");
    const mockData = generateMockLecture(dep, sol);
    fs.writeFileSync(outputFile, JSON.stringify(mockData, null, 2), 'utf-8');
    console.log(`✅ [${sol.id}.json] başarıyla simüle edilerek kaydedildi.`);
    return;
  }

  // Call Gemini API
  try {
    const { GoogleGenerativeAI } = require('@google/generativeai');
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema
      }
    });

    const prompt = `
      Sen Piri Reis Üniversitesi'nde bir Blockchain ve Web3 Profesörüsün.
      Aşağıdaki blockchain çözümünü detaylı olarak anlatan üniversite düzeyinde 5 slaytlık bir ders hazırlamanı istiyorum.
      
      Bölüm: ${dep.name}
      Çözüm Başlığı: ${sol.title}
      Problem: ${sol.problem}
      Blockchain Çözüm Detayı: ${sol.whyUse}
      Nasıl Geliştirilir (Geliştirme Mimarisi): ${sol.howToDevelop}
      Gerçek Dünya Örneği: ${sol.realWorldExample}
      Maliyet/Fayda ROI Analizi: Kurulum: ${sol.costBenefit.setupCost}, Operasyon: ${sol.costBenefit.operatingCost}, ROI Süresi: ${sol.costBenefit.roi}, Tasarruf Oranı: ${sol.costBenefit.savingRate}

      Her slayt için şunları üretmelisin:
      1. title: Slaytın başlığı.
      2. bullets: Slayt üzerinde görüntülenecek 3-4 kilit maddeden oluşan özet liste.
      3. narrative: Bu slayt ekrandayken hocanın (senin) sınıfa sesli olarak anlatacağın Türkçe detaylı ders konuşma metni (yaklaşık 2-3 uzun cümle, profesyonel, samimi ve akademik bir ton).

      Slayt Yapısı Şöyle Olmalıdır:
      Slayt 1: Giriş ve Problem Tanımı (Sektördeki mevcut sorunlar)
      Slayt 2: Blockchain Çözümü ve Entegrasyon Vizyonu (Neden blockchain kullanılmalı)
      Slayt 3: İş Akış Şeması (Workflow adımlarının açıklaması)
      Slayt 4: Maliyet-Fayda ROI Analizi (Tasarruf oranları ve amorti süreleri)
      Slayt 5: Yazılım Geliştirme ve Mimari (Kullanılacak standartlar, oracles, akıllı sözleşme mimarisi)

      Çıktı kesinlikle belirtilen JSON formatında olmalıdır.
    `;

    console.log("⏳ Gemini API'den ders içeriği talep ediliyor...");
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const lectureJson = JSON.parse(text);

    // Add metadata
    lectureJson.id = sol.id;
    lectureJson.title = sol.title;
    lectureJson.department = dep.name;

    fs.writeFileSync(outputFile, JSON.stringify(lectureJson, null, 2), 'utf-8');
    console.log(`✅ [${sol.id}.json] başarıyla oluşturuldu ve kaydedildi.`);

  } catch (error) {
    console.error(`❌ Hata oluştu [${sol.id}]:`, error.message);
    console.log("Yerel simülasyon moduna geçiliyor...");
    const mockData = generateMockLecture(dep, sol);
    fs.writeFileSync(outputFile, JSON.stringify(mockData, null, 2), 'utf-8');
    console.log(`✅ [${sol.id}.json] yedek şablon kullanılarak kaydedildi.`);
  }
}

// Fallback helper to generate high quality mock data in Turkish
function generateMockLecture(dep, sol) {
  return {
    id: sol.id,
    title: sol.title,
    department: dep.name,
    slides: [
      {
        title: `1. ${sol.title} - Sektörel Kriz`,
        bullets: [
          `Mevcut Sistem Sorunu: ${sol.problem}`,
          "Gecikmeler, manuel kontroller ve idari bürokrasi.",
          "Veri tahrifatı ve güvenlik açıkları verimliliği düşürür.",
          "Paydaşlar arasında şeffaflık eksikliği uyuşmazlıklara yol açar."
        ],
        narrative: `Merhaba arkadaşlar. Bugün ${dep.name} bölümümüz için kritik bir çözüm olan ${sol.title} konusunu inceleyeceğiz. Sektörde karşılaştığımız en büyük problem, ${sol.problem.toLowerCase()} Bu sorun süreçleri yavaşlatıyor ve operasyonel maliyetleri ciddi ölçüde artırıyor.`
      },
      {
        title: "2. Neden Blockchain Teknolojisi?",
        bullets: [
          `Blockchain Çözüm Modeli: ${sol.whyUse}`,
          "Dağıtık defter teknolojisi ile tek gerçeğe dayalı veri havuzu.",
          "Kriptografik kanıtlar sayesinde geriye dönük veri tahrifatı engellenir.",
          "Akıllı sözleşmeler ile iş kuralları arabulucusuz yürütülür."
        ],
        narrative: `Peki neden blockchain kullanmalıyız? Temel sebebimiz, ${sol.whyUse.toLowerCase()} Blockchain sayesinde taraflar arasında güvene dayalı merkezi otoriteleri ortadan kaldırarak değiştirilemez ve kriptografik olarak güvence altına alınmış bir veri tabanı oluşturuyoruz.`
      },
      {
        title: "3. Akıllı Sözleşme İş Akışı",
        bullets: [
          `1. Adım: ${sol.workflow[0] ? sol.workflow[0].title : 'Veri Kaydı'} - ${sol.workflow[0] ? sol.workflow[0].desc : 'Başlangıç telemetri kaydı'}`,
          `2. Adım: ${sol.workflow[1] ? sol.workflow[1].title : 'Doğrulama'} - ${sol.workflow[1] ? sol.workflow[1].desc : 'On-chain doğrulama ve mutabakat'}`,
          `3. Adım: ${sol.workflow[2] ? sol.workflow[2].title : 'Çıktı/Teslimat'} - ${sol.workflow[2] ? sol.workflow[2].desc : 'İşlemin akıllı sözleşmeyle sonlanması'}`
        ],
        narrative: `İş akışına baktığımızda üç adımdan oluşan bir döngü görüyoruz. İlk adımda veri doğrudan zincire kaydedilir. İkinci adımda akıllı sözleşme kuralları doğrulanır ve son adımda ise işlem otomatik olarak tamamlanarak taraflara bildirilir.`
      },
      {
        title: "4. Fayda-Maliyet & Yatırım Analizi",
        bullets: [
          `Geliştirme / Kurulum: ${sol.costBenefit.setupCost}`,
          `İşletim / Gas Ücreti: ${sol.costBenefit.operatingCost}`,
          `Verimlilik Artışı: ${sol.costBenefit.savingRate}`,
          `Yatırım Dönüş Süresi (ROI): ${sol.costBenefit.roi}`
        ],
        narrative: `Maliyet analizine baktığımızda sistem kurulumunun ${sol.costBenefit.setupCost.toLowerCase()} olduğunu görüyoruz. Sağlanan ${sol.costBenefit.savingRate.toLowerCase()} verimlilik artışı sayesinde bu teknoloji kendisini ${sol.costBenefit.roi.toLowerCase()} içinde amorti etmektedir.`
      },
      {
        title: "5. Geliştirme ve Entegrasyon",
        bullets: [
          `Yazılım Mimarisi: ${sol.howToDevelop}`,
          "API ve Oracles entegrasyonu ile sensör verilerinin zincire taşınması.",
          "Web3 kütüphaneleri (Ethers.js) ile portala güvenli cüzdan entegrasyonu.",
          "Liman ve ticaret otoriteleri ile konsorsiyum ağ yapılandırılması."
        ],
        narrative: `Son olarak geliştirmeye değinelim. Yazılım tarafında, ${sol.howToDevelop.toLowerCase()} Bu mimariyi kurarken Chainlink oracle'larından, Solidity akıllı sözleşmelerinden ve kullanıcı arayüzü entegrasyonları için Ethers.js kütüphanesinden yararlanıyoruz. Dinlediğiniz için teşekkür ederim.`
      }
    ]
  };
}

main().catch(err => {
  console.error("Fatal Error in main:", err);
});
