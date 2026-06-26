const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Retrieve arguments
const args = process.argv.slice(2);
const solutionId = args[0];

if (!solutionId || solutionId === '--help' || solutionId === '-h') {
  console.log(`
📚 NotebookLM Yükleme Otomasyonu (automate_notebooklm.js)
Kullanım:
  node automate_notebooklm.js [solutionId]

Örnekler:
  node automate_notebooklm.js mt-1
  node automate_notebooklm.js comp-1
  `);
  process.exit(0);
}

// Find source document
const sourceFile = path.join(__dirname, 'sources', `${solutionId.toLowerCase()}.md`);
if (!fs.existsSync(sourceFile)) {
  console.error(`❌ Hata: '${solutionId}.md' kaynak dosyası bulunamadı.`);
  console.log("Lütfen önce 'node generate_sources.js' çalıştırarak kaynakları üretin.");
  process.exit(1);
}

const markdownContent = fs.readFileSync(sourceFile, 'utf-8');
const fileTitle = `${solutionId.toUpperCase()} Blockchain Çözüm Raporu`;

// Get current Windows username dynamically
const username = process.env.USERNAME || 'askx';
const defaultUserDataDir = `C:\\Users\\${username}\\AppData\\Local\\Google\\Chrome\\User Data`;

async function run() {
  console.log(`📖 Yüklenecek Kaynak: ${sourceFile}`);
  console.log("🚀 Puppeteer Chrome oturumu başlatılıyor...");
  console.log(`👤 Kullanıcı Profil Dizini: ${defaultUserDataDir}`);
  console.log("⚠️ ÖNEMLİ: Eğer Chrome şu an bilgisayarınızda açıksa, profil kilidinden dolayı hata alabilirsiniz.");
  console.log("Hata alırsanız açık olan tüm Chrome pencerelerini kapatıp scripti tekrar çalıştırın.");

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false, // Görsel takip için headful
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Standart Windows Chrome yolu
      args: [
        `--user-data-dir=${defaultUserDataDir}`,
        `--profile-directory=Default`,
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      defaultViewport: null
    });
  } catch (err) {
    console.warn("\n⚠️ Varsayılan Chrome profil klasörü kilitli veya erişilemiyor.");
    console.log("Yeni ve temiz bir geçici Chrome profili ile Puppeteer başlatılıyor...");
    console.log("Açılan pencerede Google hesabınızla manuel giriş yapmanız gerekecektir.");
    
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: null
    });
  }

  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();

  console.log("🔗 NotebookLM açılıyor...");
  await page.goto('https://notebooklm.google.com/', { waitUntil: 'networkidle2' });

  console.log("\n🔐 Lütfen açılan tarayıcı ekranında Google hesabınızla giriş yapıldığından emin olun...");
  console.log("Not Defteri Paneli yüklenene kadar bekleniyor (Maksimum 2 dakika)...");

  try {
    // Wait for the Dashboard to load by looking for the "New Notebook" card
    const newNotebookBtn = await page.waitForSelector(
      'xpath///div[contains(text(), "New notebook") or contains(text(), "Yeni not defteri") or contains(text(), "Yeni Not Defteri") or contains(text(), "Yeni not")]',
      { timeout: 120000 }
    );
    console.log("✅ NotebookLM paneli başarıyla yüklendi!");

    console.log("➕ Yeni not defteri oluşturuluyor...");
    await newNotebookBtn.click();
    await delay(5000);

    console.log("📄 Kaynak Ekleme paneli bekleniyor...");
    // Look for "Copied text" or "Kopyalanan metin" to paste markdown directly
    const copiedTextBtn = await page.waitForSelector(
      'xpath///div[contains(text(), "Copied text") or contains(text(), "Kopyalanan metin") or contains(text(), "Copied Text")]',
      { timeout: 30000 }
    );
    console.log("✅ Metin yapıştırma seçeneği bulundu. Tıklanıyor...");
    await copiedTextBtn.click();
    await delay(3000);

    // Fill Title and Content
    console.log("📝 Rapor içeriği aktarılıyor...");
    await page.evaluate((title, content) => {
      // Find Title Input
      const titleInput = document.querySelector('input[placeholder*="Title"], input[placeholder*="Başlık"]');
      if (titleInput) {
        titleInput.value = title;
        titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Find Content Textarea/Editable area
      const contentInput = document.querySelector('textarea, div[contenteditable="true"]');
      if (contentInput) {
        if (contentInput.tagName === 'TEXTAREA') {
          contentInput.value = content;
        } else {
          contentInput.innerText = content;
        }
        contentInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, fileTitle, markdownContent);

    await delay(2000);

    // Click "Add" or "Yükle" button to save
    console.log("💾 Doküman sisteme kaydediliyor...");
    const saveBtn = await page.waitForSelector(
      'xpath///button[contains(., "Add") or contains(., "Yükle") or contains(., "Kaydet") or contains(., "Save") or contains(., "Ekle")]',
      { timeout: 15000 }
    );
    await saveBtn.click();
    console.log("✅ Rapor başarıyla eklendi! Kaynağın işlenmesi bekleniyor (10 sn)...");
    await delay(12000);

    // Try to trigger Audio Overview Generation (Podcast)
    console.log("🎧 Sesli özet (Audio Overview) oluşturucu aranıyor...");
    const generateBtn = await page.waitForSelector(
      'xpath///button[contains(., "Generate") or contains(., "Oluştur") or contains(., "Podcast") or contains(., "Hızlı özet")]',
      { timeout: 30000 }
    );
    
    console.log("⚡ Sesli özet üretimi tetikleniyor...");
    await generateBtn.click();
    console.log("\n🎉 BAŞARILI: Sesli Özet (Deep Dive Podcast) üretimi başlatıldı!");
    console.log("Google sunucularında podcastin tamamlanması 2-4 dakika sürebilir.");
    console.log("Süreci açılan Chrome penceresinden takip edebilirsiniz. Tarayıcıyı manuel olarak kapatabilirsiniz.");

  } catch (error) {
    console.error("\n⚠️ Otomatik arayüz işlemleri sırasında bir hata oluştu veya NotebookLM arayüzü değişti.");
    console.log("Hata Detayı:", error.message);
    console.log("\n💡 Ancak tarayıcı pencereniz şu an açık durumdadır!");
    console.log("Lütfen şu adımları manuel olarak tamamlayın:");
    console.log("1. Ekrandaki 'Yeni Not Defteri' (New Notebook) seçeneğine tıklayın.");
    console.log(`2. 'sources/${solutionId.toLowerCase()}.md' dosyasını yükleyin veya içeriğini kopyalayıp 'Metin Yapıştır' (Copied text) alanına ekleyin.`);
    console.log("3. Sağ taraftaki 'Generate Audio Overview' (Sesli Özet Oluştur) butonuna basarak podcast üretimi başlatın.");
  }
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

run();
