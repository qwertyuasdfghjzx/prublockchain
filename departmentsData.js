// Piri Reis University Blockchain Club
// Departments Blockchain Solutions Dataset (10 Departments x 10 Solutions = 100 Solutions)

window.departmentsData = [
  {
    id: "maritime-transport",
    name: "Deniz Ulaştırma İşletme Mühendisliği",
    icon: "🚢",
    description: "Güverte, gemi yönetimi, seyir emniyeti, liman operasyonları ve küresel deniz ticaret hukuku entegrasyonu.",
    solutions: [
      {
        id: "mt-1",
        title: "Akıllı Konşimento (Smart Bill of Lading)",
        problem: "Kağıt konşimentoların fiziki olarak postalanması günlerce sürer; kaybolma, tahrifat ve sahtecilik riskleri çok yüksektir.",
        whyUse: "Konşimentoların NFT (ERC-721) olarak basılmasıyla mülkiyet saniyeler içinde doğrulanabilir ve güvenli şekilde transfer edilebilir.",
        howToDevelop: "Solidity'de ERC-721 tabanlı bir akıllı sözleşme yazılır. Yükün teslim alındığı andaki detayları IPFS'e kaydedilip metadata olarak NFT'ye bağlanır. Transfer yetkileri çoklu imza (Multisig) ile korunur.",
        realWorldExample: "CargoX platformu, Mısır gümrüklerinde akıllı konşimento kullanarak evrak işlemlerini 10 günden 10 dakikaya indirmiştir.",
        costBenefit: {
          setupCost: "Orta ($20,000)",
          operatingCost: "Çok Düşük (Gas fee)",
          savingRate: "%90 Hız, %65 Maliyet Tasarrufu",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "NFT Minting", desc: "Taşıyıcı yükü teslim aldığında akıllı sözleşme ile NFT konşimento üretir." },
          { step: 2, title: "Zincir İçi Onay", desc: "Yük sahipleri, bankalar ve gümrük otoriteleri NFT transferini onaylar." },
          { step: 3, title: "Yük Teslimi", desc: "Alıcı, limanda NFT'yi geri göndererek fiziki yükü teslim alır." }
        ],
        metrics: { speed: 95, security: 98, costSaving: 85, compliance: 90 }
      },
      {
        id: "mt-2",
        title: "Parametrik Deniz Sigortası (Marine Insurance)",
        problem: "Deniz kazaları veya kötü hava koşulları sonrasındaki hasar tespit ve tazminat ödeme süreçleri aylarca sürmektedir.",
        whyUse: "Akıllı sözleşmeler ve hava durumu oracle'ları (Chainlink) sayesinde koşullar gerçekleştiğinde ödemeler anında ve otomatik yapılır.",
        howToDevelop: "Chainlink oracles entegrasyonu ile gemi GPS ve deniz meteoroloji verileri çekilir. Hasar eşik değerleri (örn. dalga boyu > 8m) aşıldığında ödeme tetiklenecek şekilde akıllı sözleşme kodlanır.",
        realWorldExample: "Arbol ve EY, denizcilik ve tarım sektörleri için parametrik blockchain sigorta modelleri sunmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($35,000)",
          operatingCost: "Düşük (Oracle abonelik)",
          savingRate: "%95 Zaman Tasarrufu, %40 Uyuşmazlık Azalması",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Poliçe Akıllı Sözleşmesi", desc: "Sigortalı prim öder ve akıllı sözleşmeye kaza/hava eşik şartları yazılır." },
          { step: 2, title: "Oracle Veri Akışı", desc: "Hava durumu veya kaza telemetrisi Chainlink oracle ile zincire aktarılır." },
          { step: 3, title: "Otomatik Hasar Ödemesi", desc: "Şartlar ihlal edildiğinde akıllı sözleşme tazminatı anında alıcıya öder." }
        ],
        metrics: { speed: 98, security: 92, costSaving: 70, compliance: 95 }
      },
      {
        id: "mt-3",
        title: "SBT Tabanlı Mürettebat Sertifikasyonu",
        problem: "Denizcilerin STCW sertifikalarının ve ehliyetlerinin sahteciliği, liman denetimlerinde (PSC) ciddi cezalara yol açar.",
        whyUse: "Devredilemez Soulbound Token'lar (SBT) sayesinde denizcilerin sertifikaları doğrudan akademiler tarafından cüzdanlarına basılır.",
        howToDevelop: "ERC-5192 standardı (Soulbound Token) kullanılarak transfer edilemeyen akıllı sözleşmeler yazılır. Yalnızca yetkili denizcilik okulu adresi mint yetkisine sahiptir.",
        realWorldExample: "Singapur Denizcilik ve Liman Otoritesi (MPA), denizci sertifikalarını blockchain üzerinde doğrulamaktadır.",
        costBenefit: {
          setupCost: "Düşük ($10,000)",
          operatingCost: "Çok Düşük (SBT basım gas fee)",
          savingRate: "%100 Sahtecilik Engelleme, %80 Denetim Kolaylığı",
          roi: "3 Ay"
        },
        workflow: [
          { step: 1, title: "Sınav Başarısı", desc: "Denizci eğitimini tamamlar ve sınavı geçer." },
          { step: 2, title: "SBT Basımı", desc: "Akademi (örn. PRU), öğrencinin cüzdan adresine devredilemez SBT gönderir." },
          { step: 3, title: "Liman Denetimi", desc: "Liman denetçisi denizcinin karekodunu okutarak sertifikayı zincirde doğrular." }
        ],
        metrics: { speed: 90, security: 99, costSaving: 80, compliance: 98 }
      },
      {
        id: "mt-4",
        title: "Liman Giriş-Çıkış Otomasyonu",
        problem: "Gemilerin limana girmeden önce doldurmak zorunda olduğu onlarca farklı gümrük ve sağlık formu bürokrasiye boğulmuştur.",
        whyUse: "Liman otoriteleri, gümrük ve acenteler ortak bir dağıtık defter (DLT) üzerinden verileri güvenle ve tek noktadan onaylar.",
        howToDevelop: "Hyperledger Fabric veya özel izinli bir EVM ağı üzerinde liman paydaşları için ortak konsorsiyum akıllı sözleşmesi oluşturulur.",
        realWorldExample: "Rotterdam Limanı, 'Portbase' ve blockchain entegrasyonları ile gümrük onay sürelerini yarıya indirmiştir.",
        costBenefit: {
          setupCost: "Çok Yüksek ($80,000)",
          operatingCost: "Orta (Ağ bakım)",
          savingRate: "%60 Bekleme Süresi Azalması, %50 Personel Tasarrufu",
          roi: "18 Ay"
        },
        workflow: [
          { step: 1, title: "Gemi Bildirimi", desc: "Gemi limana 24 saat kala yük ve mürettebat listesini zincire yazar." },
          { step: 2, title: "Paydaş Onayları", desc: "Gümrük, Sahil Güvenlik ve Liman Başkanlığı eşzamanlı evrakları doğrular." },
          { step: 3, title: "Yanaşma İzni", desc: "Akıllı sözleşme onaylar tamamlandığında gemiye dijital giriş izni üretir." }
        ],
        metrics: { speed: 85, security: 95, costSaving: 75, compliance: 92 }
      },
      {
        id: "mt-5",
        title: "Gemi Yakıtı (Bunker) Yaşam Döngüsü Takibi",
        problem: "Gemi yakıt alımlarında miktar hileleri, kalitesiz yakıt karışımları ve karbon emisyonu beyanlarında usulsüzlükler yaşanmaktadır.",
        whyUse: "Rafineriden gemi tankına kadar olan tüm akış blockchain üzerinde izlenerek yakıtın kalitesi ve kaynağı manipüle edilemez kılınır.",
        howToDevelop: "Bunker barçlarındaki IoT debimetreleri ve kalite sensörleri API'ler ve oracles aracılığıyla akıllı sözleşmeye veri sağlar. Her yakıt transferi onaylanır.",
        realWorldExample: "BHP ve Lloyd's Register denizcilik yakıt tedarik zincirinde blockchain denemelerini başarıyla tamamlamıştır.",
        costBenefit: {
          setupCost: "Yüksek ($45,000)",
          operatingCost: "Orta (Sensör entegrasyonu)",
          savingRate: "%100 Veri Güvenilirliği, %30 Kalite Uyuşmazlığı Azalması",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Rafineri Çıkışı", desc: "Yakıt kalitesi test edilir and batch verileri blockchain'e kaydedilir." },
          { step: 2, title: "Barç Transferi", desc: "Tedarikçi gemisi yakıtı aldığında sensör verileriyle transfer doğrulanır." },
          { step: 3, title: "Gemi Tank Alımı", desc: "Gemi baş mühendisi yakıtı aldığında debi ve kalite onchain olarak onaylanır." }
        ],
        metrics: { speed: 80, security: 96, costSaving: 88, compliance: 90 }
      },
      {
        id: "mt-6",
        title: "Defter Üzerinde Gemi Erişim Günlüğü",
        problem: "Uluslararası limanlarda gemiye yasadışı binişler, kaçak yolcular ve mürettebat dışı giriş-çıkışların takibinde zafiyetler vardır.",
        whyUse: "Gemi giriş-çıkış günlükleri blockchain üzerinde tutularak geriye dönük değiştirilemez bir güvenlik denetim kaydı oluşturulur.",
        howToDevelop: "Gemi iskelesine (gangway) yerleştirilen RFID/Biyometrik okuyucular yerel bir düğüm aracılığıyla işlemleri doğrudan blokzincirine kaydeder.",
        realWorldExample: "Bazı askeri ve özel ticari filolar, limanlarda ISPS Kod uyumluluğu için DLT kayıt sistemleri kullanmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($12,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Kayıt Güvenliği, ISPS Denetimlerinde Sıfır Hata",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Kart Tarama", desc: "Gemiye binen kişi RFID kartını veya biyometrik verisini gangway'de taratır." },
          { step: 2, title: "Zaman Damgası", desc: "Giriş saati ve kişi bilgileri hash'lenerek blokzincirine bloklanır." },
          { step: 3, title: "Yetkisiz Erişim Alarmı", desc: "Yetkisiz bir kart algılandığında akıllı sözleşme liman güvenliğine alarm iletir." }
        ],
        metrics: { speed: 92, security: 99, costSaving: 60, compliance: 97 }
      },
      {
        id: "mt-7",
        title: "Deniz Haydutluğu ve Olay Raporlama Ağı",
        problem: "Deniz haydutluğu (piracy) saldırıları ve tehlikeli bölgelerdeki olaylar armatörler ve sigorta şirketleri arasında geç paylaşılmaktadır.",
        whyUse: "Merkeziyetsiz ve anonim raporlama ağı ile gemiler maruz kaldıkları tehditleri anında, sansürlenemez biçimde tüm filolara duyurur.",
        howToDevelop: "Gemi uydu iletişim terminallerine entegre şifreli mesajlaşma protokolü ile çalışan, IPFS ve ethereum tabanlı acil durum uyarı akıllı sözleşmesi yazılır.",
        realWorldExample: "IMB Piracy Reporting Centre verilerinin blockchain üzerinde dağıtık olarak saklanması çalışmaları mevcuttur.",
        costBenefit: {
          setupCost: "Orta ($22,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%99 İletişim Hızı Artışı, %100 Sansür Koruması",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Tehlike Raporu", desc: "Saldırıya uğrayan gemi tek tuşla saldırı koordinatlarını zincire gönderir." },
          { step: 2, title: "Merkeziyetsiz Dağıtım", desc: "Veri anında tüm bölgedeki gemilerin ve sigorta şirketlerinin node'larına yayılır." },
          { step: 3, title: "Rota Değişikliği", desc: "Diğer gemiler akıllı sözleşme uyarısı ile rotalarını otomatik günceller." }
        ],
        metrics: { speed: 97, security: 95, costSaving: 65, compliance: 88 }
      },
      {
        id: "mt-8",
        title: "Soğutmalı Konteyner (Reefer) Takibi",
        problem: "Soğuk zincir gerektiren gıda ve ilaç yüklerinde yolculuk sırasında sıcaklık dalgalanmaları yaşanmakta ve sorumluluk tespit edilememektedir.",
        whyUse: "IoT sıcaklık sensörleri sürekli veri gönderir; belirlenen sıcaklık aşılırsa akıllı sözleşme cezaları ve sorumluyu otomatik belirler.",
        howToDevelop: "Reefer konteynerlere yerleştirilen hücresel/uydu IoT sensörleri Chainlink oracles kullanarak akıllı sözleşmeye saatlik sıcaklık logları aktarır.",
        realWorldExample: "Maersk, soğuk zincir lojistiğinde blockchain tabanlı sıcaklık ve telemetri takip sistemleri kullanmıştır.",
        costBenefit: {
          setupCost: "Yüksek ($38,000)",
          operatingCost: "Orta (Her IoT cihazı için veri ücreti)",
          savingRate: "%100 Sorumluluk Netliği, %50 Bozulmuş Ürün Kaybı Azalması",
          roi: "11 Ay"
        },
        workflow: [
          { step: 1, title: "Sıcaklık Sınırları", desc: "Akıllı sözleşmede taşınacak ürün için sıcaklık aralığı (örn: -18C ila -22C) tanımlanır." },
          { step: 2, title: "Düzenli Log Gönderimi", desc: "IoT cihazı 30 dakikada bir sıcaklığı hash'leyerek zincire gönderir." },
          { step: 3, title: "İhlal ve Hasar Bildirimi", desc: "Sıcaklık bozulduğunda akıllı sözleşme navlun bedelinden hasar kesintisi yapar." }
        ],
        metrics: { speed: 88, security: 94, costSaving: 80, compliance: 93 }
      },
      {
        id: "mt-9",
        title: "Liman Slot Kiralama ve DAO Port",
        problem: "Limanlardaki rıhtım ve yanaşma slotlarının verimsiz planlanması gemilerin liman dışında günlerce demirde beklemesine neden olur.",
        whyUse: "Liman slotları tokenize edilerek bir pazar yerinde listelenir; gemiler kendi aralarında slot takasını akıllı sözleşmelerle yapar.",
        howToDevelop: "Her yanaşma slotu ve saat aralığı bir ERC-1155 tokeni olarak tanımlanır. Gemiler ihtiyaç duymadıkları slotu başka gemilere kiralayabilir.",
        realWorldExample: "Hamburg Limanı ve liman lojistiği konsorsiyumları slot yönetimi için blockchain tabanlı optimizasyonlar geliştirmektedir.",
        costBenefit: {
          setupCost: "Yüksek ($50,000)",
          operatingCost: "Düşük",
          savingRate: "%35 Yakıt ve Bekleme Tasarrufu, %20 Liman Kapasite Artışı",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "Slot Tokenizasyonu", desc: "Liman yönetimi günlük yanaşma saatlerini ERC-1155 tokeni olarak basar." },
          { step: 2, title: "Pazar Yeri İşlemleri", desc: "Geciken gemi, elindeki slot tokenini zamanında varacak gemiye satar." },
          { step: 3, title: "Yanaşma ve Akıllı Mutabakat", desc: "Gemi limana vardığında tokeni yakarak yanaşma hakkını kullanır." }
        ],
        metrics: { speed: 91, security: 90, costSaving: 90, compliance: 85 }
      },
      {
        id: "mt-10",
        title: "Balast Suyu Uyum ve Defter Kayıtları",
        problem: "Gemilerin balast suyu deşarj kayıtları üzerinde oynama yapması istilacı türlerin yayılmasına ve deniz ekolojisinin bozulmasına neden olur.",
        whyUse: "Balast operasyonları sensörler aracılığıyla doğrudan blokzincire yazılarak çevre bakanlıklarına değiştirilemez kanıtlar sunulur.",
        howToDevelop: "Balast pompalarına takılan debimetre ve UV arıtma sensörleri, her balast operasyonunu (lokasyon, hacim, arıtma durumu) zincire kaydeder.",
        realWorldExample: "Uluslararası Denizcilik Örgütü (IMO) standartlarına uyum için yeşil blockchain takip projeleri geliştirilmektedir.",
        costBenefit: {
          setupCost: "Orta ($28,000)",
          operatingCost: "Düşük",
          savingRate: "%100 IMO Regülasyon Uyumu, Ceza Risklerinin Sıfırlanması",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Balast Alımı", desc: "Gemi kalkış limanında balast aldığında lokasyon ve hacim veri tabanına işlenir." },
          { step: 2, title: "Arıtma Aktivasyonu", desc: "UV sterilizasyon ünitesinin çalışma verileri onchain doğrulanır." },
          { step: 3, title: "Uyumlu Deşarj", desc: "Varış limanında deşarj izni için sensör kayıtları gümrük onayına sunulur." }
        ],
        metrics: { speed: 82, security: 97, costSaving: 68, compliance: 99 }
      }
    ]
  },
  {
    id: "marine-engineering",
    name: "Gemi Makineleri İşletme Mühendisliği",
    icon: "⚙️",
    description: "Ana makine, jeneratörler, yardımcı sistemler, kuru havuz (drydock) operasyonları ve makine dairesi IoT sensör ağları.",
    solutions: [
      {
        id: "me-1",
        title: "Blokzincir Tabanlı Motor Bakım Kayıtları",
        problem: "Gemi ana makinelerinin bakım geçmişlerinin manuel defterlere tutulması, verilerin değiştirilmesine veya kaybolmasına yol açar.",
        whyUse: "Geriye dönük değiştirilemeyen kayıtlar, geminin satış değerini korur ve makine arızalarından kaynaklı sigorta uyuşmazlıklarını önler.",
        howToDevelop: "Hyperledger Fabric üzerinde gemi işletmecisi, klas kuruluşu ve makine üreticisi (MAN, Wärtsilä vb.) arasında ortak bir bakım veritabanı kurulur.",
        realWorldExample: "Kongsberg Maritime, gemi sistemleri için veri bütünlüğü çözümlerinde DLT araştırmaları yapmaktadır.",
        costBenefit: {
          setupCost: "Orta ($25,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Veri Güvenilirliği, %15 İkinci El Gemi Değer Artışı",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Bakım Girişi", desc: "Gemi Baş Mühendisi tamamlanan bakımı fotoğrafları ve parça detaylarıyla sisteme yükler." },
          { step: 2, title: "Üretici Onayı", desc: "Orijinal yedek parça kodu ve montaj adımları makine üretici node'u tarafından onaylanır." },
          { step: 3, title: "Klas Onayı", desc: "Sörveyör yıllık denetimde bakım kayıtlarını zincir üzerinden inceler ve onay imzası atar." }
        ],
        metrics: { speed: 80, security: 98, costSaving: 75, compliance: 96 }
      },
      {
        id: "me-2",
        title: "Yedek Parça Orijinallik Kanıtı",
        problem: "Makine dairesinde kullanılan sahte veya kalitesiz yedek parçalar kritik motor arızalarına ve can kayıplarına neden olabilir.",
        whyUse: "Her kritik parça (örn. piston kafası, yataklar) fabrikadan çıkışında NFT olarak tokenize edilerek zincir üzerinde takip edilir.",
        howToDevelop: "Fabrikada parçalara kazınan kriptografik QR/NFC etiketleri, ERC-1155 token kimliğiyle eşleştirilir. Gemiye teslimatta doğrulama yapılır.",
        realWorldExample: "Wärtsilä ve blockchain ortakları, yedek parça sahteciliğini önlemek amacıyla pilot DLT projeleri yürütmektedir.",
        costBenefit: {
          setupCost: "Yüksek ($40,000)",
          operatingCost: "Düşük (Etiket maliyeti)",
          savingRate: "%100 Orijinallik Garantisi, %30 Ekipman Ömrü Uzaması",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Üretim ve Kayıt", desc: "Üretici parça üzerine benzersiz çip yerleştirir ve NFT'sini zincire basar." },
          { step: 2, title: "Tedarik Transferi", desc: "Distribütör ve gümrük üzerinden geçen parçanın mülkiyeti zincirde el değiştirir." },
          { step: 3, title: "Gemi Kurulumu", desc: "Baş Mühendis parçayı takmadan önce NFC'yi okutarak orijinal olduğunu doğrular." }
        ],
        metrics: { speed: 85, security: 99, costSaving: 80, compliance: 92 }
      },
      {
        id: "me-3",
        title: "Emisyon Raporlama ve Karbon Kredisi Entegrasyonu",
        problem: "Uluslararası denizcilikte (IMO/EU ETS) gemilerin emisyon raporlarında elle tahrifat yapılması ve yeşil aklama (greenwashing) yaygındır.",
        whyUse: "Ana makine baca analizörlerinden doğrudan çekilen CO2, SOx emisyon verileri değiştirilemez biçimde zincire yazılarak otomatik vergilendirilir.",
        howToDevelop: "Baca sensörleri verileri doğrudan toplayıp Chainlink oracles ile akıllı sözleşmeye iletir. Sözleşme emisyonu hesaplayıp karbon tokeni yakar.",
        realWorldExample: "EU ETS denizcilik karbon izleme kurallarına uyum için DNV ve denizcilik şirketleri blockchain izleme sistemleri kurmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($48,000)",
          operatingCost: "Orta (Sensör kalibrasyon)",
          savingRate: "%100 Doğru Beyan, %90 Raporlama Zaman Tasarrufu",
          roi: "14 Ay"
        },
        workflow: [
          { step: 1, title: "Emisyon Ölçümü", desc: "Baca sensörü sürekli emisyon verilerini toplar ve hash değerini zincire gönderir." },
          { step: 2, title: "Karbon Vergisi Hesaplama", desc: "Akıllı sözleşme gidilen mil başına üretilen emisyonu hesaplar." },
          { step: 3, title: "Karbon Kredisi Mahsubu", desc: "Armatörün cüzdanından otomatik olarak ceza tutarında Karbon Tokeni (CO2) düşülür." }
        ],
        metrics: { speed: 90, security: 97, costSaving: 70, compliance: 99 }
      },
      {
        id: "me-4",
        title: "Yağ Analizi Kayıt Defteri",
        problem: "Gemi sistemlerindeki yağlama yağlarının analiz sonuçlarının geç gelmesi veya yanlış girilmesi yatak sarması gibi büyük hasarlara sebep olur.",
        whyUse: "Laboratuvardan çıkan analiz sonuçları değiştirilemez biçimde doğrudan blokzincire yazılarak makine dairesi ekibinin doğru aksiyon alması garanti edilir.",
        howToDevelop: "Bağımsız yağ analiz laboratuvarları (örn. Mobil Gard, Shell Lube) ürettikleri PDF ve sayısal verileri IPFS'e yükleyip hash'ini gemi profil sözleşmesine bağlar.",
        realWorldExample: "Shell LubeAnalyst verilerinin blockchain entegrasyonu üzerine akademik çalışmalar bulunmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($15,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Veri Güvenilirliği, %40 Büyük Arıza Önleme Başarısı",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Numune Alımı", desc: "Gemi makine ekibi yağ numunesi alır, barkodunu zincirde gemiye kaydeder." },
          { step: 2, title: "Laboratuvar Girişi", desc: "Analiz laboratuvarı testi yapar, verileri doğrudan blockchain API'sine imzalı gönderir." },
          { step: 3, title: "Kritik Uyarı", desc: "Eğer metal aşınma oranı yüksekse akıllı sözleşme gemi ekibine acil alarm iletir." }
        ],
        metrics: { speed: 89, security: 95, costSaving: 92, compliance: 90 }
      },
      {
        id: "me-5",
        title: "IoT Entegre Motor Telemetri Günlükleri",
        problem: "Masaüstünde incelenen gemi performans raporları makine dairesinden gelen filtre edilmiş veya süslenmiş manuel verilere dayanır.",
        whyUse: "Sensör telemetrisi doğrudan blokzincir düğümlerine aktarılarak verilerin ham ve manipüle edilmemiş hali şirket yönetimlerine sunulur.",
        howToDevelop: "Gemi otomasyon sistemi (Alarm Monitoring System - AMS) verileri bir IoT Gateway aracılığıyla şifreli olarak izinli blokzincir ağına aktarılır.",
        realWorldExample: "DNV GL Veracity platformu denizcilikte veri kalitesi ve bütünlüğü için DLT teknolojilerini entegre etmektedir.",
        costBenefit: {
          setupCost: "Yüksek ($55,000)",
          operatingCost: "Orta (Uydu bant genişliği)",
          savingRate: "%100 Güvenilir Telemetri, %20 Yakıt Optimizasyonu Analizi",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "Otomasyon Veri Çıkışı", desc: "AMS sistemi motor devri, sıcaklık ve basınç değerlerini anlık toplar." },
          { step: 2, title: "Hash ve Paketleme", desc: "Toplanan veriler saatlik paketler halinde şifrelenir ve hash'i zincire yazılır." },
          { step: 3, title: "Merkez Ofis Kontrolü", desc: "Armatörün teknik ofisi, gelen hash'leri eşleştirerek verilerin orijinalliğini teyit eder." }
        ],
        metrics: { speed: 87, security: 96, costSaving: 85, compliance: 88 }
      },
      {
        id: "me-6",
        title: "Makine Performans ve Verimlilik Audit Trail",
        problem: "Gemi makinelerinin verimlilik kayıpları ve aşırı yakıt tüketimleri operasyon ekiplerinden saklanabilir veya yanlış teşhis edilebilir.",
        whyUse: "Değiştirilemez performans denetim izi (audit trail), makinelerin gerçek yıpranma oranlarını şeffafça ortaya koyar.",
        howToDevelop: "Gemi indikatör cihazlarından alınan silindir basınç diyagramları ve güç verileri akıllı sözleşme üzerindeki formüllere beslenir.",
        realWorldExample: "Bazı büyük konteyner işletmecileri makine performans optimizasyonunda DLT tabanlı denetim mekanizmaları denemektedir.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Düşük",
          savingRate: "%25 Yakıt Tasarrufu Analiz Gücü, %100 Şeffaf Denetim",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Performans Ölçümü", desc: "Gemi mühendisleri ana makine indikatör kartlarını alır ve verileri girer." },
          { step: 2, title: "Zincir İçi Değerlendirme", desc: "Akıllı sözleşme, makinenin fabrika spesifikasyon sapmalarını hesaplar." },
          { step: 3, title: "Rapor Kilitleme", desc: "Oluşturulan performans indeksi klas kuruluşu ve şirket için zincire kilitlenir." }
        ],
        metrics: { speed: 83, security: 94, costSaving: 89, compliance: 91 }
      },
      {
        id: "me-7",
        title: "Sörvey Akreditasyon ve Klas Kayıtları",
        problem: "Makine dairesindeki sörvey denetimlerinin (yıllık kazan sörveyi vb.) fiziki sertifikalarının takibi zor ve bürokratiktir.",
        whyUse: "Klas kuruluşu denetçisi her sörveyi tamamladığında ilgili ekipmana zincir üzerinde onay basar. Bu durum dijital klas takibini sağlar.",
        howToDevelop: "Her kritik makine (Kazan, Kompresör vb.) NFT olarak temsil edilir. Klas sörveyörleri akıllı sözleşmeye sörvey geçerlilik tarihi imzalar.",
        realWorldExample: "Lloyd's Register and ClassNK dijital sörvey ve blockchain tabanlı sertifika doğrulama sistemleri üzerinde çalışmaktadır.",
        costBenefit: {
          setupCost: "Orta ($20,000)",
          operatingCost: "Düşük",
          savingRate: "%90 Daha Hızlı Klas Onayları, Evrak İşlerinin Sıfırlanması",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Ekipman NFT Kaydı", desc: "Gemideki ana kazan ve makineler sisteme benzersiz NFT'ler olarak tanımlanır." },
          { step: 2, title: "Fiziki Sörvey Denetimi", desc: "Klas denetçisi gemiye gelir, testi gerçekleştirir ve onayını cüzdanıyla imzalar." },
          { step: 3, title: "On-Chain Statü Güncellemesi", desc: "Ekipman NFT'sinin sörvey durumu otomatik olarak 'Uyumlu/Sörveyli' durumuna geçer." }
        ],
        metrics: { speed: 91, security: 98, costSaving: 72, compliance: 99 }
      },
      {
        id: "me-8",
        title: "Gemi Jeneratör Verimlilik Teşvik Sistemi",
        problem: "Mürettebatın gemide gereksiz yere birden fazla jeneratör çalıştırması (paralel alma) aşırı yakıt sarfiyatına ve motor aşınmasına neden olur.",
        whyUse: "Optimum jeneratör kullanım profili çizen gemi ekipleri, yakıt tasarrufundan elde edilen gelirin bir kısmını token olarak kazanır.",
        howToDevelop: "Jeneratör yük dağılım verileri otomatik toplanır. Akıllı sözleşme optimum kullanım sürelerini hesaplayarak ekibe PRU benzeri ödüller dağıtır.",
        realWorldExample: "Yeşil denizcilik teşvikleri kapsamında mürettebat ödüllendirme sistemlerinde blockchain kullanımı teorize edilmiştir.",
        costBenefit: {
          setupCost: "Orta ($24,000)",
          operatingCost: "Orta (Mürettebat ödül bütçesi)",
          savingRate: "%12 Yakıt Tasarrufu, %100 Personel Motivasyonu",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Yük İzleme", desc: "Jeneratörlerin kW yükleri ve yakıt tüketim logları zincire işlenir." },
          { step: 2, title: "Optimizasyon Skoru", desc: "Akıllı sözleşme ekibin gereksiz çift jeneratör çalıştırma sürelerini analiz eder." },
          { step: 3, title: "Token Ödülü", desc: "Yüksek verimlilik skoru yakalayan makine ekibine cüzdanları üzerinden prim tokeni ödenir." }
        ],
        metrics: { speed: 86, security: 91, costSaving: 95, compliance: 80 }
      },
      {
        id: "me-9",
        title: "Kuru Havuz (Drydock) Bakım Escrow Sözleşmeleri",
        problem: "Kuru havuz süreçlerinde tersanenin yaptığı ekstra işler, gecikmeler ve ödemeler konusunda taraflar arasında kronik uyuşmazlıklar yaşanır.",
        whyUse: "İş aşamaları (milestones) akıllı sözleşme ile escrow'a (emanet hesabı) bağlanır; havuzlama işi onaylandıkça bütçe tersaneye otomatik aktarılır.",
        howToDevelop: "Solidity'de çok taraflı bir Escrow sözleşmesi yazılır. İş kalemleri (örn: raspa boya, pervane bakımı) onaylandığında fonlar serbest bırakılır.",
        realWorldExample: "Denizcilik finansmanında ve akıllı sözleşmelerde çok taraflı emanet hesapları (Escrow) kullanımı yaygınlaşmaktadır.",
        costBenefit: {
          setupCost: "Orta ($26,000)",
          operatingCost: "Çok Düşük (Escrow komisyonsuzdur)",
          savingRate: "%100 Ödeme Güvenliği, %45 Süreç Uyuşmazlığı Azalması",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Bütçe Kilitleme", desc: "Armatör drydock bütçesini akıllı sözleşme escrow hesabına yatırır." },
          { step: 2, title: "Aşama Doğrulaması", desc: "Gemi enspektörü ve klas denetçisi tamamlanan pervane bakımını onaylar." },
          { step: 3, title: "Otomatik Ödeme", desc: "Akıllı sözleşme, bütçenin o aşamaya ait kısmını anında tersanenin cüzdanına gönderir." }
        ],
        metrics: { speed: 94, security: 96, costSaving: 83, compliance: 90 }
      },
      {
        id: "me-10",
        title: "Tehlikeli Atık (Sintine/Sludge) Tahliye Kanıtı",
        problem: "Gemilerin sintine ve sludge gibi petrol atıklarını liman kabul tesislerine vermeyip denizlere kaçak deşarj etmesi çevre felaketlerine yol açar.",
        whyUse: "Liman kabul tesisinin atık teslim makbuzları blockchain üzerinde imzalanarak çevre denetim kuruluşlarına değiştirilemez denetim kanıtı sunulur.",
        howToDevelop: "Tahliye sayaçları IoT verileri ile liman atık alım formları birleştirilerek gümrük ve liman otoriteleriyle paylaşılan DLT ağına işlenir.",
        realWorldExample: "MARPOL Ek-I uyumluluğu için Akdeniz ve Baltık denizlerindeki liman otoriteleri blockchain denemeleri yapmaktadır.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Düşük",
          savingRate: "%100 MARPOL Uyumluluğu, Çevre Cezalarının Önlenmesi",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Atık Miktar Ölçümü", desc: "Gemideki atık tankı seviyesi ve pompa debisi sensor ile zincire yazılır." },
          { step: 2, title: "Liman Alım Tesisi Onayı", desc: "Liman atık tesisi teslim aldığı miktarı dijital imzasıyla zincire kaydeder." },
          { step: 3, title: "MARPOL Sertifikasyonu", desc: "Akıllı sözleşme verilerin uyuştuğunu onaylayarak gemiye dijital MARPOL makbuzu basar." }
        ],
        metrics: { speed: 85, security: 97, costSaving: 78, compliance: 99 }
      }
    ]
  },
  {
    id: "naval-architecture",
    name: "Gemi İnşaatı ve Gemi Makineleri Mühendisliği",
    icon: "📐",
    description: "Gemi dizaynı, sac kalınlığı takibi, kaynak kalite kontrolü, inşa hakediş escrow sistemleri ve yeşil gemi geri dönüşüm sertifikasyonu.",
    solutions: [
      {
        id: "na-1",
        title: "Gemi Tasarım Planları Fikri Mülkiyet Takibi",
        problem: "Gemi dizayn ofislerinin çizdiği özgün gövde ve endüstriyel tasarımlar izinsiz kopyalanmakta ve telif hakları korunamamaktadır.",
        whyUse: "Tasarım dosyalarının hash'leri zamana damgalı olarak blockchain'e yazılır ve sahiplik hakkı telif NFT'leri ile tescil edilir.",
        howToDevelop: "CAD/dizayn dosyalarının SHA-256 hash'leri oluşturulur. ERC-721 standardı ile patent NFT'leri üretilerek yaratıcısına tanımlanır.",
        realWorldExample: "Fikri mülkiyet ve telif haklarının korunması için Bernstein ve benzeri DLT tescil sistemleri kullanılmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($12,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Fikri Mülkiyet Güvencesi, Hızlı Telif Hak Talepleri",
          roi: "4 Ay"
        },
        workflow: [
          { step: 1, title: "Tasarım Hash'leme", desc: "Mühendis CAD plan dosyasını yükler, sistem dosyanın benzersiz hash'ini alır." },
          { step: 2, title: "NFT Tescili", desc: "Hash değeri ve mühendis imzası ile telif NFT'si zincirde basılır." },
          { step: 3, title: "Lisanslama", desc: "Tersane tasarımı kullanmak istediğinde lisans sözleşmesini akıllı sözleşmeyle imzalar." }
        ],
        metrics: { speed: 92, security: 98, costSaving: 75, compliance: 85 }
      },
      {
        id: "na-2",
        title: "Çelik Sac Kalınlığı ve Menşei Doğrulama",
        problem: "Gemi inşasında kalitesiz, mukavemeti yetersiz veya geri dönüştürülmüş kaçak çelik kullanılması yapısal kırılmalara yol açabilir.",
        whyUse: "Çelik levhaların döküm fabrikasından tersaneye kadar olan sertifika ve kalınlık verileri blokzincir ile izlenir.",
        howToDevelop: "Çelik fabrikasının spektroskopi ve laboratuvar sertifikaları, plakalara lazerle kazınan karekodlarla DLT üzerinde eşleştirilir.",
        realWorldExample: "Tersaneler ve klas kuruluşları, malzeme kalitesini izlemek için Hyperledger tabanlı çelik izlenebilirlik ağları kullanmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($42,000)",
          operatingCost: "Orta (Lazer etiketleme)",
          savingRate: "%100 Mukavemet Güvencesi, Sörvey İnceleme Kolaylığı",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "Çelik Döküm Girişi", desc: "Metalürji laboratuvarı çelik plaka analiz sertifikasını zincire yazar." },
          { step: 2, title: "Tersane Kabulü", desc: "Tersaneye gelen saclar ultrasonik ölçümle taranır, veriler onchain doğrulanır." },
          { step: 3, title: "Gemi Gövde Haritası", desc: "Sacın geminin hangi postasında kullanıldığı dijital ikiz üzerinde DLT'ye işlenir." }
        ],
        metrics: { speed: 82, security: 97, costSaving: 80, compliance: 95 }
      },
      {
        id: "na-3",
        title: "Gemi İnşa Hakediş Akıllı Sözleşmeleri",
        problem: "Gemi inşası sırasında tersane ile armatör arasında hakediş (milestone) onayları ve ödemelerde büyük gecikmeler yaşanmaktadır.",
        whyUse: "İnşa aşamaları (örn: omurganın kızağa konması, lansman) onaylandığında ödemeler armatörün bloke ettiği hesaptan otomatik serbest kalır.",
        howToDevelop: "Solidity'de yazılan hakediş sözleşmesinde Klas kuruluşu (IACS üyesi sörveyör) hakem (oracle/mutat imzacı) olarak tanımlanır.",
        realWorldExample: "Denizcilik finansmanı konsorsiyumları akıllı sözleşme tabanlı hakediş serbest bırakma mekanizmaları tasarlamaktadır.",
        costBenefit: {
          setupCost: "Orta ($28,000)",
          operatingCost: "Düşük (Banka komisyonlarından tasarruf)",
          savingRate: "%80 Hızlı Likidite Akışı, Finansman Maliyetlerinde Düşüş",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Proje Kilometre Taşları", desc: "İnşa sözleşmesindeki 5 ana aşama ve hakediş tutarları zincire kodlanır." },
          { step: 2, title: "Sörvey Doğrulaması", desc: "Omurga kızağa indiğinde denetçi sörveyör onchain onay imzasını atar." },
          { step: 3, title: "Otomatik Ödeme Gönderimi", desc: "Sözleşme escrow'daki hakediş tutarını anında tersane hesabına transfer eder." }
        ],
        metrics: { speed: 96, security: 95, costSaving: 88, compliance: 91 }
      },
      {
        id: "na-4",
        title: "Kaynak Kalite Kontrol ve Mühendis İtibar Sistemi",
        problem: "Gemi inşasında en kritik yapısal aşamalardan biri olan kaynakların kalitesiz yapılması, gövde çatlamalarına yol açar.",
        whyUse: "Her kaynağı yapan personelin sertifikası ve kaynak röntgen testleri (NDT) zincire işlenerek personel kalite karnesi oluşturulur.",
        howToDevelop: "Kaynak röntgen test cihazı (Ultrasonic NDT) çıktıları hash'lenerek, kaynakçının cüzdan adresi ve sertifikasıyla DLT üzerinde eşleştirilir.",
        realWorldExample: "Uluslararası kaynakçı ve NDT sertifikasyon kuruluşları, DLT uyumluluk sertifikaları vermektedir.",
        costBenefit: {
          setupCost: "Orta ($22,000)",
          operatingCost: "Düşük",
          savingRate: "%100 İzlenebilirlik, Kaynak Hatalarından Kaynaklı Hasarlarda %40 Azalma",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Kaynak İşlemi", desc: "Kaynakçı işi tamamlar ve RFID kimliğiyle kaynağı kendi üzerine kaydeder." },
          { step: 2, title: "Tahribatsız Muayene (NDT)", desc: "NDT teknisyeni ultrason taramasını yapar, raporu zincire ekler." },
          { step: 3, title: "Kalite İtibarı", desc: "Başarılı kaynaklar sonrası kaynakçının onchain kalite puanı (SBT) artar." }
        ],
        metrics: { speed: 85, security: 99, costSaving: 75, compliance: 96 }
      },
      {
        id: "na-5",
        title: "Gemi Dijital İkizi Blokzincir Senkronizasyonu",
        problem: "Gemi işletilirken yapılan modifikasyonlar ve parça değişimleri tasarım dosyalarına (As-Built) yansıtılmaz ve dijital ikiz güncelliğini yitirir.",
        whyUse: "Gemi üzerinde yapılan her fiziksel değişiklik blokzincir işlemiyle dijital ikiz dosyalarına kilitlenerek eşzamanlı güncellik sağlanır.",
        howToDevelop: "BIM/CAD modellerinin revizyon kontrol sistemi (Git benzeri), akıllı sözleşmeler ve IPFS üzerindeki sürüm hash'leri ile entegre edilir.",
        realWorldExample: "GE Digital and Siemens, endüstriyel IoT ve dijital ikiz veri doğruluğu için blockchain mimarileri kurmaktadır.",
        costBenefit: {
          setupCost: "Çok Yüksek ($75,000)",
          operatingCost: "Orta (Bant veri senkronizasyonu)",
          savingRate: "%100 Güncel Dijital İkiz, %30 Bakım Planlama Verimliliği",
          roi: "18 Ay"
        },
        workflow: [
          { step: 1, title: "Tersane Modifikasyonu", desc: "Gemideki bir pompa değiştirildiğinde yeni CAD çizimleri sisteme yüklenir." },
          { step: 2, title: "On-Chain Sürüm Güncelleme", desc: "Akıllı sözleşme, dijital ikiz dosya hash'ini yeni sürümüne günceller." },
          { step: 3, title: "Eşzamanlı Bildirim", desc: "Klas ve donatan, geminin en son güncel yapısını anında zincirden çeker." }
        ],
        metrics: { speed: 88, security: 94, costSaving: 82, compliance: 90 }
      },
      {
        id: "na-6",
        title: "Gemi Stabilite ve Meyil Test Kayıtları",
        problem: "Gemilerin inşa sonrasındaki meyil ve stabilite testi sonuçlarında hesaplama hataları veya manipülasyon yapılması batma riskini artırır.",
        whyUse: "Sensörler ve meyil test cihazı verileri insan müdahalesi olmadan doğrudan zincire yazılır, geminin stabilite sınırları kesinleşir.",
        howToDevelop: "Meyil testi sırasında kullanılan inclinometer ve yük sensörleri, ölçüm anında verileri kriptografik imza ile DLT düğümüne basar.",
        realWorldExample: "Denizcilik emniyet standartlarının (SOLAS) blockchain tabanlı otomasyonu için geliştirilen pilot uygulamalar vardır.",
        costBenefit: {
          setupCost: "Orta ($18,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Güvenilir Stabilite Raporları, SOLAS Denetimlerinde Tam Uyum",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Sensör Kurulumu", desc: "Meyil testi için gemiye kalibre sensörler yerleştirilir." },
          { step: 2, title: "Ölçüm ve İmzalama", desc: "Açısal sapma ve draft değerleri sensör donanım anahtarıyla zincire imzalanır." },
          { step: 3, title: "Stabilite Kitapçığı Onayı", desc: "Akıllı sözleşme ham veriyi onaylar ve SOLAS uyumlu stabilite raporunu kilitler." }
        ],
        metrics: { speed: 90, security: 98, costSaving: 70, compliance: 99 }
      },
      {
        id: "na-7",
        title: "Tasarım Havuzu Deneyleri Veri Havuzu",
        problem: "Towing tank (çekme tankı) ve kavitation tüneli deneylerinin maliyetleri çok yüksektir; toplanan verilerin saklanması zordur.",
        whyUse: "Üniversite ve tersaneler arasında deney verileri tokenize edilerek şifreli bir biçimde satılabilir veya akademik paylaşıma açılabilir.",
        howToDevelop: "Deney verileri şifrelenerek IPFS'e yüklenir. Erişim şifreleri akıllı sözleşme ve ERC-20 token transferi (DeFi veri pazarı) ile satılır.",
        realWorldExample: "Ocean Protocol, bilimsel veri setlerinin blockchain üzerinde güvenli ve kontrollü satılmasını sağlamaktadır.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Düşük (Pazar yeri komisyonları)",
          savingRate: "%60 Deney Verisi Edinme Maliyet Düşüşü, Yeni Gelir Modelleri",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Veri Şifreleme", desc: "PRU Towing Tank ekibi deney sonuçlarını kriptografik olarak şifreler." },
          { step: 2, title: "Veri Tokeni Listeleme", desc: "Veriye erişim sağlayan NFT/Token pazar yerinde satışa sunulur." },
          { step: 3, title: "Satın Alma ve Dekript", desc: "Tersane tokeni satın alır, akıllı sözleşme dosya şifre anahtarını teslim eder." }
        ],
        metrics: { speed: 93, security: 95, costSaving: 91, compliance: 80 }
      },
      {
        id: "na-8",
        title: "Gemi Yapısal Gerilme (Stress) İzleme Arşivi",
        problem: "Büyük yük gemilerinin dalgalı denizlerde maruz kaldığı yapısal gerilme (stress) ve yorulma verileri analiz edilmezse anlık gövde kırılmaları yaşanabilir.",
        whyUse: "Gövde üzerine yerleştirilen strain-gauge sensörlerinin verileri değiştirilemez bir DLT veri tabanında saklanarak gemi ömrü doğru analiz edilir.",
        howToDevelop: "Strain-gauge ve ivmeölçer verileri gemideki edge-computing cihazıyla işlenerek saatlik stres endeksleri halinde zincire yazılır.",
        realWorldExample: "Büyük cevher ve konteyner gemilerinde yapısal sağlık izleme (Structural Health Monitoring) sistemleri DLT entegrasyonu aşamasındadır.",
        costBenefit: {
          setupCost: "Yüksek ($50,000)",
          operatingCost: "Orta (Uydu telemetri)",
          savingRate: "%100 Gerçek Zamanlı Yorulma Arşivi, Kaza Risklerinde %30 Azalma",
          roi: "18 Ay"
        },
        workflow: [
          { step: 1, title: "Gerilme Ölçümü", desc: "Gövde sacındaki strain-gauge sensörleri mikro-gerilmeleri kaydeder." },
          { step: 2, title: "Veri Sıkıştırma", desc: "Kritik tepe gerilme değerleri şifrelenip zaman damgasıyla zincire yollanır." },
          { step: 3, title: "Yapısal Risk Analizi", desc: "Klas ve Donatan, geminin yorulma geçmişini doğrulanmış veriyle analiz eder." }
        ],
        metrics: { speed: 86, security: 96, costSaving: 85, compliance: 92 }
      },
      {
        id: "na-9",
        title: "Yeşil Gemi Geri Dönüşüm Sertifikasyonu",
        problem: "Ömrünü tamamlamış gemilerin söküm tersanelerinde çevre standartlarına uymadan sökülmesi yüksek çevre kirliliğine ve cezalara neden olur.",
        whyUse: "Hong Kong Konvansiyonu uyumluluğu için asbest ve tehlikeli maddelerin envanteri (IHM) blockchain ile doğrulanarak söküm sertifikalandırılır.",
        howToDevelop: "Geminin Tehlikeli Maddeler Envanteri (IHM) bir SBT NFT'si olarak oluşturulur. Söküm aşamalarında her tehlikeli maddenin bertaraf kaydı zincire girilir.",
        realWorldExample: "Gemi Söküm Sanayicileri Derneği ve AB çevre denetçileri DLT tabanlı yeşil söküm sertifikası pilot çalışmaları yapmaktadır.",
        costBenefit: {
          setupCost: "Orta ($25,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Hong Kong Konvansiyon Uyumu, Çevre Denetim Hızı 2 Kat Artış",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "IHM NFT Oluşturma", desc: "İnşa veya bakım aşamasında gemideki asbest ve kurşun envanteri DLT'ye kilitlenir." },
          { step: 2, title: "Söküm Kontrolü", desc: "Söküm tersanesi kurşun levhaları söktüğünde bertaraf makbuzunu zincire ekler." },
          { step: 3, title: "Yeşil Söküm Sertifikası", desc: "Tüm envanter bertaraf edildiğinde akıllı sözleşme 'Yeşil Söküm' onayını yayınlar." }
        ],
        metrics: { speed: 89, security: 98, costSaving: 70, compliance: 99 }
      },
      {
        id: "na-10",
        title: "Tersane Malzeme Kabul ve Tedarik Zinciri Ledger",
        problem: "Gemi inşasında tersaneye giren binlerce valf, boru ve ekipmanın tedarik gecikmeleri ve sertifika eksiklikleri inşaat duruşlarına sebep olur.",
        whyUse: "Malzemelerin tedarikçi çıkışı, gümrük geçişi ve tersane depo kabulü ortak bir akıllı sözleşme defteriyle senkronize izlenir.",
        howToDevelop: "ERP sistemleri ile entegre, izinli blokzincir ağı üzerinde çalışan tedarik siparişi takip akıllı sözleşmesi yazılır.",
        realWorldExample: "Tersaneler tedarik zinciri görünürlüğü için TradeLens ve benzeri lojistik blokzincir ağlarına bağlanmaktadır.",
        costBenefit: {
          setupCost: "Çok Yüksek ($65,000)",
          operatingCost: "Orta (ERP entegrasyonu)",
          savingRate: "%40 Depolama Maliyet Düşüşü, Tedarik Gecikmelerinde %30 Azalma",
          roi: "14 Ay"
        },
        workflow: [
          { step: 1, title: "Satın Alma Onayı", desc: "Tersane satın alma birimi siparişi onaylar ve tedarik sözleşmesini zincirde açar." },
          { step: 2, title: "Tedarikçi Sevkiyatı", desc: "Tedarikçi parçayı kargolayıp sertifika dosyasını zincire ekler." },
          { step: 3, title: "Depo Kabul", desc: "Tersane barkod okuyucu depo personeli ürünü onaylar, tersane bakiyesi otomatik güncellenir." }
        ],
        metrics: { speed: 84, security: 95, costSaving: 88, compliance: 87 }
      }
    ]
  },
  {
    id: "logistics-transport",
    name: "Uluslararası Lojistik ve Taşımacılık",
    icon: "📦",
    description: "Multimodal lojistik takibi, soğuk zincir IoT sözleşmeleri, akıllı navlun escrow'ları ve teslimat kanıtı (Proof of Delivery) sistemleri.",
    solutions: [
      {
        id: "lt-1",
        title: "Multimodal Konteyner Takip Ağı",
        problem: "Konteynerlerin deniz, demiryolu ve karayolu geçişlerinde mülkiyet ve sorumluluk transferi şeffaf takip edilememektedir.",
        whyUse: "Konteynerlerin taşıyıcılar arasındaki her el değiştirmesi blokzincire yazılarak kayıplar ve gecikme sorumluları net olarak belirlenir.",
        howToDevelop: "Her konteyner bir NFT olarak tanımlanır. Liman RFID okuyucuları ve tren/tır entegrasyon API'leri ile NFT transferleri otomatize edilir.",
        realWorldExample: "Global Shipping Business Network (GSBN), dünya genelinde milyonlarca konteynerin takibini DLT üzerinde yapmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($55,000)",
          operatingCost: "Orta (Barkod/RFID tarama)",
          savingRate: "%100 Konteyner Görünürlüğü, Uyuşmazlık Çözüm Süresinde %80 Düşüş",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Konteyner NFT Çıkışı", desc: "Depodan çıkan konteynerin başlangıç durumu ve barkodu zincire kaydedilir." },
          { step: 2, title: "Taşıyıcı Değişimi", desc: "Konteyner gemiden trene yüklendiğinde tren işletmecisi dijital teslimat imzası atar." },
          { step: 3, title: "Son Teslimat", desc: "Alıcı konteyneri teslim aldığında zincirdeki NFT durumu 'Teslim Edildi'ye döner." }
        ],
        metrics: { speed: 90, security: 96, costSaving: 85, compliance: 90 }
      },
      {
        id: "lt-2",
        title: "Soğuk Zincir IoT ve SLA Doğrulama",
        problem: "Gıda ve medikal lojistikte soğuk zincirin bozulması durumunda sorumluluğun kimde olduğu tespit edilememekte, ürünler heba olmaktadır.",
        whyUse: "IoT ısı sensörü verileri DLT'ye yazılır; Service Level Agreement (SLA) aşılırsa akıllı sözleşme cezaları otomatik tahsil eder.",
        howToDevelop: "Chainlink oracles entegreli akıllı sözleşme, soğutucu konteynerdeki IoT sıcaklık ölçümlerini saatlik kontrol eder.",
        realWorldExample: "Walmart, Çin ve ABD genelinde gıda güvenliğini izlemek için IBM Food Trust blockchain ağını kullanmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($45,000)",
          operatingCost: "Orta (IoT veri)",
          savingRate: "%50 Ürün Fire Oranı Azalması, %100 Otomatik SLA Cezaları",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "SLA Tanımlama", desc: "Taşıma sözleşmesi sıcaklık limitleri (-18C ila -20C) akıllı sözleşmeye girilir." },
          { step: 2, title: "IoT Log Akışı", desc: "Konteyner içi sensör, verilerini şifreli olarak oracles vasıtasıyla zincire yazar." },
          { step: 3, title: "Otomatik Cezalandırma", desc: "Sıcaklık -15C'ye çıktığında sözleşme navlun bedelinden hasar tazminatını otomatik keser." }
        ],
        metrics: { speed: 92, security: 95, costSaving: 83, compliance: 96 }
      },
      {
        id: "lt-3",
        title: "Gümrük Beyannameleri ve Evrak Entegrasyonu",
        problem: "İthalat-ihracat işlemlerindeki gümrük beyannameleri ve menşe belgelerinin sahteliği ülkeler arası ticareti yavaşlatır.",
        whyUse: "Gümrük belgelerinin hash'leri ticaret ortaklarının ve gümrük otoritelerinin ortak blokzincirinde saklanarak sahtecilik önlenir.",
        howToDevelop: "Hyperledger Fabric tabanlı gümrük izin ağı kurulur. İhracatçı, gümrük müşaviri ve gümrük idaresi belgeleri onaylar.",
        realWorldExample: "Singapur ve Abu Dabi gümrük otoriteleri, sınır geçiş evraklarını blockchain ile entegre doğrulamaktadır.",
        costBenefit: {
          setupCost: "Çok Yüksek ($70,000)",
          operatingCost: "Orta (İzinli ağ node yönetimi)",
          savingRate: "%70 Gümrük İşlemleri Hızlanması, Evrak Hatalarında %90 Azalba",
          roi: "16 Ay"
        },
        workflow: [
          { step: 1, title: "Beyanname Yükleme", desc: "İhracatçı gümrük beyannamesini hazırlar ve onay hash'ini zincire kaydeder." },
          { step: 2, title: "Gümrük Onayı", desc: "Çıkış gümrüğü muayene sonucunu DLT üzerinde dijital olarak imzalar." },
          { step: 3, title: "Varış Bildirimi", desc: "İthalat gümrüğü, çıkış gümrüğünün onay imzasını kontrol ederek malın girişine izin verir." }
        ],
        metrics: { speed: 89, security: 99, costSaving: 70, compliance: 98 }
      },
      {
        id: "lt-4",
        title: "Akıllı Navlun Escrow (Freight Settlement) Sözleşmesi",
        problem: "Lojistik sektöründe taşıyıcılara navlun bedellerinin ödenmesinde 90 güne varan gecikmeler ve likidite sorunları yaşanır.",
        whyUse: "Yük teslim edildiğinde akıllı sözleşme escrow hesabındaki navlun bedelini taşıyıcıya anında ve komisyonsuz transfer eder.",
        howToDevelop: "Solidity'de ERC-20 (stabilcoin) kabul eden bir Escrow akıllı sözleşmesi yazılır. Alıcı teslimat onayını girdiğinde fon serbest kalır.",
        realWorldExample: "DexFreight platformu, kamyon taşımacılığında akıllı sözleşme tabanlı anlık navlun ödemeleri gerçekleştirmektedir.",
        costBenefit: {
          setupCost: "Orta ($24,000)",
          operatingCost: "Çok Düşük (Sadece gas fee)",
          savingRate: "%95 Ödeme Hızlanması, Finansal Mutabakat Sürelerinde %50 Azalma",
          roi: "7 Ay"
        },
        workflow: [
          { step: 1, title: "Navlun Depozitosu", desc: "Yükleyici, anlaşılan navlun bedelini stabilcoin olarak akıllı sözleşmeye kilitler." },
          { step: 2, title: "Taşıma ve Varış", desc: "Taşıyıcı yükü adrese ulaştırır ve alıcıya onay kodu taratır." },
          { step: 3, title: "Bakiye Serbest Bırakma", desc: "Alıcının onayıyla sözleşme navlun tutarını taşıyıcının cüzdanına gönderir." }
        ],
        metrics: { speed: 97, security: 95, costSaving: 88, compliance: 85 }
      },
      {
        id: "lt-5",
        title: "Teslimat Kanıtı (Proof of Delivery / POD) NFT",
        problem: "Teslimat kanıtı makbuzlarının fiziki imzalanması, faturalandırma süreçlerini geciktirir ve kaybolan evraklar ihtilaflara sebep olur.",
        whyUse: "Alıcının teslimat anında ürettiği kriptografik imza (POD NFT), teslimatın yapıldığının inkar edilemez kanıtıdır.",
        howToDevelop: "Alıcının mobil uygulaması üzerinden ürettiği özel anahtar imzası, akıllı sözleşmeyle eşsiz bir teslimat NFT'si basımını tetikler.",
        realWorldExample: "Lojistik devleri (DHL, FedEx) blockchain tabanlı teslimat kanıtı (POD) pilot denemeleri gerçekleştirmektedir.",
        costBenefit: {
          setupCost: "Orta ($20,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 İade Edilemez Teslimat Kanıtı, %60 Faturalandırma Hızlanması",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Kurye Teslimatı", desc: "Kurye adrese ulaşır ve paketi alıcıya sunar." },
          { step: 2, title: "Kriptografik İmza", desc: "Alıcı mobil cüzdanı ile teslimatı onaylayarak işlem imzası üretir." },
          { step: 3, title: "POD NFT Basımı", desc: "Akıllı sözleşme POD NFT'sini basıp göndericiye iletir, fatura süreci başlar." }
        ],
        metrics: { speed: 94, security: 98, costSaving: 80, compliance: 90 }
      },
      {
        id: "lt-6",
        title: "Depolama Alanı Paylaşım ve Kiralama Platformu",
        problem: "Tersine lojistik veya sezonluk dalgalanmalarda atıl kalan antrepo ve depo alanlarının kiralanması yüksek aracı komisyonlarına tabidir.",
        whyUse: "Depoların kullanılmayan alanları ve süreleri akıllı sözleşme ile tokenize edilerek aracısız pazar yerinde eşler arası (P2P) kiralanır.",
        howToDevelop: "Depo metrekare/gün kapasiteleri ERC-1155 tokeni olarak basılır. Pazar yerinde akıllı sözleşme üzerinden kiralamalar yönetilir.",
        realWorldExample: "Depo kapasitesi optimizasyonunda DLT tabanlı merkeziyetsiz paylaşım platformları geliştirilmektedir.",
        costBenefit: {
          setupCost: "Orta ($32,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%30 Kiralama Maliyet Düşüşü, %25 Boş Depo Kapasite Verimliliği",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Kapasite Tokenizasyonu", desc: "Depo sahibi boş 100 m2 alanı 30 günlüğüne token olarak listeler." },
          { step: 2, title: "Kiralama İmzası", desc: "İthalatçı, ihtiyacı olan metrekare tokenlerini akıllı sözleşmeden satın alır." },
          { step: 3, title: "Giriş ve Yakma", desc: "İthalatçı malları depoya koyduğunda kiralama tokenleri yakılır." }
        ],
        metrics: { speed: 91, security: 92, costSaving: 92, compliance: 80 }
      },
      {
        id: "lt-7",
        title: "SBT Tabanlı Lojistik Taşıyıcı İtibar Sistemi",
        problem: "Navlun borsalarında yük sahiplerinin güvenilir olmayan, malı geciktiren veya hasarlı teslim eden taşıyıcıları ayırt etmesi zordur.",
        whyUse: "Taşıyıcıların geçmiş teslimat performansları, hasar oranları ve zamanlama başarıları cüzdanlarındaki SBT itibar rozetleriyle izlenir.",
        howToDevelop: "ERC-5192 standardıyla devredilemeyen itibar tokenleri yazılır. Her başarılı teslimat taşıyıcının onchain itibar skorunu artırır.",
        realWorldExample: "CargoX ve lojistik ağları, akreditasyon ve güven kanıtları için DLT tabanlı kimlik sistemleri kurmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($14,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Güvenilir Taşıyıcı Seçimi, Hasarlı Taşıma Riskinde %50 Düşüş",
          roi: "5 Ay"
        },
        workflow: [
          { step: 1, title: "Taşıyıcı SBT Kaydı", desc: "Lojistik firması on-chain doğrulanmış üye SBT kimliği alır." },
          { step: 2, title: "Performans Puanlaması", desc: "Başarılı tamamlanan her taşıma sonrası akıllı sözleşme firmaya itibar puanı ekler." },
          { step: 3, title: "Yük İhalesi Avantajı", desc: "Yük sahibi, ihalede en yüksek onchain itibar skoruna sahip taşıyıcıyı seçer." }
        ],
        metrics: { speed: 85, security: 99, costSaving: 75, compliance: 93 }
      },
      {
        id: "lt-8",
        title: "Tersine Lojistik ve İade Ürün Doğrulama Ağı",
        problem: "Müşterilerin iade ettiği lüks veya kritik ürünlerin orijinalliği tersine lojistik deposunda tespit edilememekte, dolandırıcılık yapılmaktadır.",
        whyUse: "Ürünlerin ilk satın alma anındaki dijital pasaportu (NFT) ile iade edilen ürünün çip verileri zincirde karşılaştırılarak orijinalliği onaylanır.",
        howToDevelop: "Lüks ürünlerdeki NFC mikroçipleri, ERC-721 dijital pasaportuyla eşleştirilir. İade sürecinde NFC imzası doğrulanmadan iade kabul edilmez.",
        realWorldExample: "Aura Blockchain Consortium, lüks markaların (LVMH, Prada) iade ve orijinallik takibinde DLT kullanmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($38,000)",
          operatingCost: "Düşük",
          savingRate: "%100 İade Sahteciliği Engelleme, %40 İade Süreç Hızlanması",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "İade Talebi", desc: "Müşteri iade talebi oluşturur ve ürünün dijital pasaport NFT'sini geçici olarak kilitler." },
          { step: 2, title: "Depo Kontrolü", desc: "Depo personeli iade gelen ürünün NFC çipini taratır." },
          { step: 3, title: "İade Onayı", desc: "Akıllı sözleşme çip ve NFT eşleşmesini onaylayarak müşteriye para iadesi gönderir." }
        ],
        metrics: { speed: 90, security: 99, costSaving: 85, compliance: 88 }
      },
      {
        id: "lt-9",
        title: "Sınır Geçiş Otorizasyonu ve Dijital Geçiş Belgeleri",
        problem: "Tırların sınır kapılarındaki geçiş belgelerinin (Dozvola) fiziki basılması ve dağıtımı karayolu taşımacılığında uzun kuyruklara yol açar.",
        whyUse: "Geçiş belgeleri her tır plakasına özel tokenler olarak basılır; sınır kapısında saniyeler içinde onchain sorgulanır.",
        howToDevelop: "Ulaştırma Bakanlıkları ortak bir DLT düğümü kurarak geçiş kotalarını ERC-1155 tokeni olarak dağıtır.",
        realWorldExample: "AB sınır geçişlerinde yeşil koridor ve dijital transit geçiş izinlerinde DLT kullanımı planlanmaktadır.",
        costBenefit: {
          setupCost: "Çok Yüksek ($60,000)",
          operatingCost: "Düşük",
          savingRate: "%80 Sınır Geçiş Hızlanması, Dozvola Kağıt Bürokrasi Tasarrufu",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "Quota Dağıtımı", desc: "Devlet otoritesi lojistik firmasının cüzdanına yıllık sınır geçiş hakkı tokeni gönderir." },
          { step: 2, title: "Plaka Eşleştirme", desc: "Firma geçiş yapacak tırın plakasını token metadata alanına kaydeder." },
          { step: 3, title: "Gümrük Geçiş Kanıtı", desc: "Sınır gümrüğü tırı algıladığında plakaya kayıtlı tokeni yakarak geçiş verir." }
        ],
        metrics: { speed: 96, security: 95, costSaving: 78, compliance: 97 }
      },
      {
        id: "lt-10",
        title: "Hasarlı Kargo İhtilaf ve Tahkim Escrow Sistemi",
        problem: "Taşıma sırasında kargonun hasar görmesi halinde sigorta ve lojistik firmaları hasarın hangi taşıma ayağında olduğunu tartışır.",
        whyUse: "Dağıtık defterdeki IoT sensör ve depo kabul verileri objektif hakemlik sağlar, uyuşmazlıklar akıllı sözleşme tahkimiyle çözülür.",
        howToDevelop: "Sensör ihlal kayıtları DLT'ye yazılır. Hasar kanıtı sunulduğunda akıllı sözleşme tahkim modülü devreye girer.",
        realWorldExample: "Deniz ve karayolu sigortacılığında DLT tabanlı hakemlik (arbitration) modelleri geliştirilmektedir.",
        costBenefit: {
          setupCost: "Orta ($28,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%90 Mahkeme Dışı Çözüm Hızı, Hukuki Süreç Giderlerinde %70 Düşüş",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Hasar Kaydı", desc: "Alıcı malı hasarlı aldığında sensör verilerini ve fotoğrafları zincire yükler." },
          { step: 2, title: "Merkeziyetsiz Değerlendirme", desc: "Akıllı sözleşme taşıma loglarını tarayarak hasarın oluştuğu sıcaklık/sarsıntı anını bulur." },
          { step: 3, title: "Teminat Transferi", desc: "Hasarın oluştuğu taşıma aşaması sorumlusunun bloke ettiği teminat alıcıya ödenir." }
        ],
        metrics: { speed: 93, security: 97, costSaving: 90, compliance: 94 }
      }
    ]
  },
  {
    id: "maritime-business",
    name: "Denizcilik İşletmeleri Yönetimi",
    icon: "💼",
    description: "Gemi yatırım ortaklığı tokenizasyonu (DeFi), zaman çarteri akıllı ödeme sözleşmeleri ve liman vergileri dağıtım sistemleri.",
    solutions: [
      {
        id: "mb-1",
        title: "Gemi Yatırım Ortaklığı Tokenizasyonu (Fractional Ownership)",
        problem: "Gemi yatırımları milyonlarca dolar gerektirir; küçük yatırımcıların gemi mülkiyetine ve navlun gelirlerine ortak olması imkansızdır.",
        whyUse: "Gemi hisseleri tokenize edilerek (ERC-20/ERC-1400) küçük paylara bölünür, küresel likidite ve fractional gemi yatırımı sağlanır.",
        howToDevelop: "Gemi mülkiyetini temsil eden Special Purpose Vehicle (SPV) şirketi hisseleri güvenlik tokenleri (Security Tokens) olarak basılır.",
        realWorldExample: "Shipowner.io platformu, gemi finansmanını tokenize ederek küçük yatırımlarla gemi satın alımını kolaylaştırmıştır.",
        costBenefit: {
          setupCost: "Yüksek ($60,000)",
          operatingCost: "Orta (Regülatör uyum maliyetleri)",
          savingRate: "%100 Yatırım Demokratikleşmesi, Gemi Finansmanı Bulma Süresinde %50 Hızlanma",
          roi: "18 Ay"
        },
        workflow: [
          { step: 1, title: "Gemi SPV Şirketi", desc: "Gemi için yasal şirket kurulur ve gemi değeri kadar ERC-1400 hisse tokeni basılır." },
          { step: 2, title: "Güvenlik Token Arzı (STO)", desc: "Yatırımcılar KYC süreçlerini tamamlayarak stabilcoin ile gemi tokenleri satın alır." },
          { step: 3, title: "Navlun Gelir Dağıtımı", desc: "Gemi işletildikçe elde edilen navlun kârı akıllı sözleşme ile token sahiplerine temettü (dividend) ödenir." }
        ],
        metrics: { speed: 85, security: 97, costSaving: 80, compliance: 95 }
      },
      {
        id: "mb-2",
        title: "Zaman Çarteri (Time Charter) Akıllı Sözleşmeleri",
        problem: "Zaman çarteri gemi kiralamalarında, geminin hız kaybı (off-hire) durumlarında kira bedeli kesintilerinin hesaplanması uyuşmazlıklara yol açar.",
        whyUse: "Gemi telemetri verileriyle off-hire süreleri saniyelik hesaplanır ve kira ödemeleri akıllı sözleşme ile adil olarak kesilir.",
        howToDevelop: "Solidity'de zaman bazlı kiralama akıllı sözleşmesi yazılır. Chainlink oracle geminin hız ve durma loglarını doğrular.",
        realWorldExample: "Denizcilik finans kurumları ve armatörler DLT tabanlı akıllı kiralama (Smart Charter Party) prototipleri denemektedir.",
        costBenefit: {
          setupCost: "Orta ($35,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Uyuşmazlık Çözümü, Finansal Mutabakat Süresinde %85 Düşüş",
          roi: "11 Ay"
        },
        workflow: [
          { step: 1, title: "Çarter Mukavelesi", desc: "Günlük gemi kira bedeli ve performans kriterleri akıllı sözleşmeye girilir." },
          { step: 2, title: "Performans İzleme", desc: "Gemi arıza veya yavaşlama yaptığında oracle arıza süresini (off-hire) belgeler." },
          { step: 3, title: "Kira Tahsilatı", desc: "Akıllı sözleşme off-hire süresini düşerek kiracının cüzdanından armatöre net ödeme yapar." }
        ],
        metrics: { speed: 94, security: 96, costSaving: 87, compliance: 90 }
      },
      {
        id: "mb-3",
        title: "Liman Vergileri ve Ücretleri Dağıtım Sistemi",
        problem: "Gemilerin liman yanaşmalarında ödediği fener ücreti, kılavuzluk, römorkör gibi çeşitli ücretlerin dağıtımı ve muhasebesi hantaldır.",
        whyUse: "Ödenen tek liman harcı, akıllı sözleşme aracılığıyla kılavuzluk, römorkör ve liman işletmesi cüzdanlarına anında ve otomatik bölünür.",
        howToDevelop: "Liman otoritesi adına ödeme alan bir akıllı sözleşme yazılır. Sözleşme gelen ETH/Stabilcoin'i paydaş cüzdan adreslerine split (bölüştürme) eder.",
        realWorldExample: "Singapur Limanı, liman içi hizmet ödemelerinde akıllı sözleşme tabanlı otomatik bölüştürme modelleri test etmektedir.",
        costBenefit: {
          setupCost: "Orta ($22,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Muhasebe Hızı, Dağıtım İşlemlerinde %70 Yönetim Gider Tasarrufu",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Liman Harcı Ödemesi", desc: "Gemi acentesi yanaşma öncesi toplam liman harcını akıllı sözleşmeye gönderir." },
          { step: 2, title: "Pay Dağıtımı", desc: "Sözleşme kılavuzluk (%20), römorkör (%30) ve belediye (%10) paylarını anında hesaplar." },
          { step: 3, title: "Anlık Transfer", desc: "Hesaplanan paylar ilgili hizmet sağlayıcıların cüzdanlarına saniyeler içinde aktarılır." }
        ],
        metrics: { speed: 98, security: 95, costSaving: 90, compliance: 92 }
      },
      {
        id: "mb-4",
        title: "Armatörlük ve Gemi Acenteliği DAO Yönetimi",
        problem: "Büyük armatörlük kooperatifleri veya acentelik ağlarındaki ortak kararların (yeni gemi alımı vb.) alınması ve oylanması bürokrasiye takılır.",
        whyUse: "Yönetim kurulu kararları onchain oylamaya (DAO) dökülür; karesel oylama ile küçük ortakların da hakları gözetilerek şeffaflık sağlanır.",
        howToDevelop: "Acentelik veya armatörlük ortaklığı için ERC-20 yönetim tokeni basılır. Tally veya Snapshot benzeri bir DAO arayüzü kurulur.",
        realWorldExample: "Denizcilik havuzlarında (chartering pools) ortak gelir paylaşımı ve karar alma için DAO yapıları araştırılmaktadır.",
        costBenefit: {
          setupCost: "Orta ($20,000)",
          operatingCost: "Düşük (L2 zincirlerinde oylama neredeyse ücretsizdir)",
          savingRate: "%90 Daha Hızlı Karar Alma, Karar Süreçlerinde %100 Şeffaflık",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Teklif Sunma", desc: "Ortaklardan biri 'Gemiye yeni scrubber takılsın' teklifini zincirde açar." },
          { step: 2, title: "On-Chain Oylama", desc: "Tüm ortaklar cüzdanlarındaki token ağırlığı veya SBT yetkileriyle oy kullanır." },
          { step: 3, title: "Otomatik Karar İcrası", desc: "Teklif geçerse akıllı sözleşme kasadan bütçeyi teknik departmana aktarır." }
        ],
        metrics: { speed: 93, security: 98, costSaving: 80, compliance: 85 }
      },
      {
        id: "mb-5",
        title: "Navlun Fiyat Risk Yönetimi ve Hedging (DEX)",
        problem: "Navlun fiyatlarının (örn: Baltic Dry Index) aşırı dalgalanması, armatörlerin ve kiralayıcıların finansal iflas riskiyle karşılaşmasına neden olur.",
        whyUse: "Merkeziyetsiz finans (DeFi) üzerinde oluşturulan navlun türev araçları (FFAs) sayesinde taraflar navlun fiyatlarını hedge eder.",
        howToDevelop: "Baltic Dry Index verilerini alan Chainlink oracles ile çalışan, navlun vadeli (futures) ve opsiyon akıllı sözleşmeleri kodlanır.",
        realWorldExample: "DeFi türev borsalarında (Synthetix vb.) denizcilik endekslerinin sentetik varlık olarak işlem görmesi çalışmaları mevcuttur.",
        costBenefit: {
          setupCost: "Yüksek ($50,000)",
          operatingCost: "Orta",
          savingRate: "%100 DeFi Likiditesi, Aracı Yatırım Bankası Komisyonlarında %80 Tasarrufu",
          roi: "14 Ay"
        },
        workflow: [
          { step: 1, title: "Hedging Havuzu", desc: "Armatör navlun fiyatının düşüşüne karşı koruma almak için havuza teminat yatırır." },
          { step: 2, title: "Endeks Fiyat Takibi", desc: "Chainlink, Baltic Dry Index fiyatını günlük olarak akıllı sözleşmeye günceller." },
          { step: 3, title: "Vade Sonu Kâr/Zarar Tahsili", desc: "Endeks düştüğünde akıllı sözleşme oluşan zararı karşılamak için havuzdan ödeme yapar." }
        ],
        metrics: { speed: 95, security: 94, costSaving: 82, compliance: 88 }
      },
      {
        id: "mb-6",
        title: "Gemi Değerleme ve Finansal Sörvey Sicili",
        problem: "Gemilerin ikinci el satışlarında veya kredi teminatı gösterilirken yapılan değerleme raporlarında şeffaflık eksikliği vardır.",
        whyUse: "Değerleme uzmanlarının ve sörveyörlerin hazırladığı geçmiş raporlar zincire işlenerek geminin finansal geçmişi şeffaf hale gelir.",
        howToDevelop: "Gemi değerleme raporları şifrelenerek IPFS'e atılır. Rapor hash'i, değerleme firmasının imzasıyla DLT'ye tescil edilir.",
        realWorldExample: "Maritime Asset Registry DLT projeleri gemi değerleme ve ipotek tescillerini blockchain'e taşımaktadır.",
        costBenefit: {
          setupCost: "Düşük ($15,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Güvenilir Finansal Geçmiş, Kredi Onay Süreçlerinde %50 Hızlanma",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Değerleme Talebi", desc: "Banka gemi satışı öncesi bağımsız değerleme kuruluşundan rapor ister." },
          { step: 2, title: "Rapor İmzalanması", desc: "Değerleme uzmanı rapor hash değerini cüzdanı ile onaylayarak zincire yazar." },
          { step: 3, title: "Teminat Onayı", desc: "Banka zincirdeki raporu kontrol ederek gemi ipoteğini onchain tescil eder." }
        ],
        metrics: { speed: 90, security: 97, costSaving: 88, compliance: 93 }
      },
      {
        id: "mb-7",
        title: "Mürettebat Maaş ve SGK Ödemeleri Sözleşmesi",
        problem: "Uluslararası sularda çalışan denizcilerin farklı para birimlerinde maaş alması, sınır ötesi transfer kesintileri ve gecikmeler yaratır.",
        whyUse: "Maaşlar stabilcoin (USDC/USDT) ile akıllı sözleşmeler üzerinden ödenir. SGK primleri de eşzamanlı olarak devlet kurumuna aktarılır.",
        howToDevelop: "Gemi insanı iş sözleşmeleri akıllı sözleşmeye dökülür. Her ay sonu otomatik maaş ve vergi ödemeleri L2 ağlarında tetiklenir.",
        realWorldExample: "Kripto para ile bordro ödeyen küresel insan kaynakları platformları (Deel, Bitwage) denizcilikte de kullanılmaya başlamıştır.",
        costBenefit: {
          setupCost: "Orta ($25,000)",
          operatingCost: "Çok Düşük (Sınır ötesi banka komisyonları ödenmez)",
          savingRate: "%98 Daha Ucuz Transfer, Maaş Gecikmelerinin Sıfırlanması",
          roi: "5 Ay"
        },
        workflow: [
          { step: 1, title: "Denizci Cüzdan Tanımlama", desc: "Denizci, işe başlarken SBT kimliğiyle stabilcoin cüzdan adresini kaydeder." },
          { step: 2, title: "Maaş Blokajı", desc: "Armatör aylık maaş fonlarını akıllı sözleşmeye bloke eder." },
          { step: 3, title: "Otomatik Dağıtım", desc: "Ayın 1'i geldiğinde sözleşme maaşı denizciye, primleri kuruma gönderir." }
        ],
        metrics: { speed: 99, security: 96, costSaving: 94, compliance: 90 }
      },
      {
        id: "mb-8",
        title: "Liman Operasyon Verimlilik Teşvikleri",
        problem: "Limanlarda gemi tahliye operasyonlarının yavaş ilerlemesi demuraj (gecikme) cezalarına ve armatörün zarar etmesine neden olur.",
        whyUse: "Tahliye hız sınırlarını aşan liman işçilerine ve operatörlerine akıllı sözleşmeler aracılığıyla anlık prim tokeni dağıtılır.",
        howToDevelop: "Tahliye vinçlerindeki (crane) IoT yük verileri zincire akıtılır. Hedef tonaj/saat aşıldığında işçi cüzdanlarına otomatik prim ödenir.",
        realWorldExample: "Liman verimlilik optimizasyonlarında akıllı sözleşme ve IoT entegrasyonlu prim modelleri tartışılmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($36,000)",
          operatingCost: "Orta (Teşvik bütçesi)",
          savingRate: "%20 Tahliye Hızı Artışı, Demuraj Cezalarında %40 Azalma",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Tahliye Hedefi", desc: "Gemi yanaşırken saatte 1000 ton tahliye hedefi akıllı sözleşmeye girilir." },
          { step: 2, title: "IoT Hız Analizi", desc: "Liman vinç sensörleri anlık tahliye hızını zincire yazar." },
          { step: 3, title: "Anlık Prim Ödemesi", desc: "Tahliye süresinden 5 saat önce bitirildiğinde tasarruf edilen paranın %10'u işçilere token olarak dağıtılır." }
        ],
        metrics: { speed: 92, security: 90, costSaving: 88, compliance: 80 }
      },
      {
        id: "mb-9",
        title: "Deniz Ticaret Hukuku Arabuluculuk Arşivi",
        problem: "Denizcilik uyuşmazlıklarının mahkemelerce çözülmesi yıllarca sürebilir ve dava dosyalarının tarafsız saklanması kritiktir.",
        whyUse: "Uyuşmazlık delilleri ve tahkim kararları blockchain üzerinde şifreli saklanarak değiştirilemez bir hukuki içtihat arşivi oluşturulur.",
        howToDevelop: "Arabuluculuk belgeleri hash'lenerek DLT'ye tescil edilir. Hakem heyetinin oylamaları akıllı sözleşmelerle yönetilir.",
        realWorldExample: "Deniz Hukuku Tahkim Dernekleri, DLT tabanlı şeffaf delil tescil sistemlerini incelemektedir.",
        costBenefit: {
          setupCost: "Düşük ($18,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%70 Uyuşmazlık Çözüm Süresi Ksalması, Hukuki Arşiv Güvenliği",
          roi: "7 Ay"
        },
        workflow: [
          { step: 1, title: "Delil Tescili", desc: "Armatör ve kiracı uyuşmazlık delil evraklarını hash'leyerek zincire yükler." },
          { step: 2, title: "Hakem Değerlendirmesi", desc: "Atanan 3 bağımsız deniz hukukçusu delilleri inceleyip zincirde oylarını kullanır." },
          { step: 3, title: "Karar Yayını", desc: "Akıllı sözleşme çoğunluk oyuna göre arabuluculuk kararını taraflara onaylatır." }
        ],
        metrics: { speed: 88, security: 99, costSaving: 85, compliance: 95 }
      },
      {
        id: "mb-10",
        title: "Gemi Yakıt Tedarik (Bunkering) DeFi Ticaret Finansmanı",
        problem: "Gemilerin sefere çıkmadan önce yakıt (bunker) satın almak için kullandığı akreditif kredileri yüksek banka faizlerine tabidir.",
        whyUse: "Armatörler DeFi likidite havuzlarından (stabilcoin) teminat karşılığı bunker finansmanını dakikalar içinde temin eder.",
        howToDevelop: "Gemi mülkiyet tokenleri (NFT) teminat gösterilerek DeFi havuzlarından borç alma (Lending) akıllı sözleşmesi oluşturulur.",
        realWorldExample: "Centrifuge ve MakerDAO, gerçek dünya varlıklarını (RWA) teminat göstererek ticaret finansmanı sağlammaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($55,000)",
          operatingCost: "Orta (DeFi faiz oranları)",
          savingRate: "%85 Finansman Erişim Hızı, Banka Kredi Masraflarında %50 Düşüş",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Gemi NFT Teminatı", desc: "Armatör gemi hisse NFT'sini borç alma akıllı sözleşmesine teminat kilitler." },
          { step: 2, title: "Stabilcoin Kredisi", desc: "DeFi havuzundan yakıt alımı için gerekli stabilcoin armatör cüzdanına geçer." },
          { step: 3, title: "Geri Ödeme ve Kilit Açma", desc: "Sefer navlunu tahsil edildiğinde kredi faiziyle ödenerek gemi NFT'si geri alınır." }
        ],
        metrics: { speed: 96, security: 95, costSaving: 80, compliance: 86 }
      }
    ]
  },
  {
    id: "computer-software",
    name: "Bilgisayar ve Yazılım Mühendisliği",
    icon: "💻",
    description: "Merkeziyetsiz kimlik (DID), akıllı sözleşme güvenliği, ZK-Proofs konum gizliliği, IPFS veri saklama ve Web3 otantike portalları.",
    solutions: [
      {
        id: "cs-1",
        title: "Merkeziyetsiz Kimlik (DID) Altyapısı",
        problem: "Lojistik ve denizcilik paydaşlarının yüzlerce farklı portalda ayrı şifreler kullanması kimlik hırsızlığına ve veri sızıntılarına yol açar.",
        whyUse: "Kullanıcılar tek bir W3C uyumlu Merkeziyetsiz Kimlik (DID) ile tüm küresel liman ve lojistik uygulamalarına şifresiz giriş yapar.",
        howToDevelop: "W3C DID standardı kullanılarak EVM tabanlı bir kimlik doğrulama akıllı sözleşmesi yazılır. Kullanıcılar private key'leriyle imza atarak giriş yapar.",
        realWorldExample: "SpruceID and Microsoft Entra Verified ID, kurumsal Web3 kimlik doğrulama standartları sunmaktadır.",
        costBenefit: {
          setupCost: "Orta ($25,000)",
          operatingCost: "Çok Düşük (Sıfır lisans ücreti)",
          savingRate: "%100 Şifresiz Güvenlik, Kimlik Yönetim Maliyetlerinde %80 Azalma",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "DID Oluşturma", desc: "Liman çalışanı cüzdanı üzerinden kendine özel W3C uyumlu DID tescil eder." },
          { step: 2, title: "Yetki Tanımlama", desc: "Liman yönetimi, çalışanın DID adresine 'Gantry Crane Yetkilisi' SBT rozeti basar." },
          { step: 3, title: "Şifresiz Giriş", desc: "Çalışan vinç kontrol ekranındaki QR kodu cüzdanıyla imzalayarak oturum açar." }
        ],
        metrics: { speed: 95, security: 99, costSaving: 85, compliance: 96 }
      },
      {
        id: "cs-2",
        title: "Akıllı Sözleşme Güvenlik Denetim Sicili",
        problem: "Uygulamaya alınan akıllı sözleşmelerdeki kodlama hataları ve açıklar (hacks) milyonlarca dolarlık fon kayıplarına neden olur.",
        whyUse: "Sözleşmelerin audit (güvenlik denetimi) raporları ve derlenmiş kod hash'leri zincire işlenerek doğruluğu garanti altına alınır.",
        howToDevelop: "Auditor firmalar denetledikleri Github commit hash değerlerini ve rapor PDF hash'ini DLT üzerindeki audit siciline yazar.",
        realWorldExample: "CertiK and Hacken, akıllı sözleşme denetim raporlarını zincir üstünde doğrulanabilir şekilde yayınlamaktadır.",
        costBenefit: {
          setupCost: "Düşük ($15,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Kod Güvenlik Doğrulaması, Siber Risk Sigorta Primlerinde %30 İndirim",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Kod Denetimi", desc: "Yazılım ekibi Solidity sözleşmesini audit firmasına teslim eder." },
          { step: 2, title: "Rapor İmzası", desc: "Denetçi denetimi geçer notla tamamlar ve rapor hash'ini zincire kilitler." },
          { step: 3, title: "Canlıya Alım Güvencesi", desc: "Sistem, sadece denetlenmiş onaylı hash'e sahip kontratların çalışmasına izin verir." }
        ],
        metrics: { speed: 85, security: 99, costSaving: 70, compliance: 95 }
      },
      {
        id: "cs-3",
        title: "ZKP ile Gemi Konum Gizliliği (Zero-Knowledge Proofs)",
        problem: "Gemilerin korsanlık riski olan bölgelerde güvenlik nedeniyle AIS konumlarını kapatması yasal denetimlerde (PSC) sorun yaratır.",
        whyUse: "Sıfır Bilgi Kanıtları (ZKP) sayesinde gemi tam koordinatını açıklamadan, 'güvenli bölge sınırları içinde' olduğunu kanıtlar.",
        howToDevelop: "Circom veya ZoKrates kullanılarak ZK-SNARK devreleri yazılır. Gemi koordinat verilerini ifşa etmeden yasal kanıt üretir.",
        realWorldExample: "Gizlilik odaklı Web3 projeleri (Aleo, Mina), lokasyon doğrulamalarında ZKP şablonları sunmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($50,000)",
          operatingCost: "Orta (Kriptografik kanıt üretme)",
          savingRate: "%100 Konum Gizliliği, Regülasyon Cezalarından Tam Koruma",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "ZKP Kanıt Üretimi", desc: "Gemi bilgisayarı koordinatları ve gizli anahtarı kullanarak bir ZK-Proof üretir." },
          { step: 2, title: "Zincire Gönderim", desc: "Gemi, gerçek konumu yerine sadece üretilen ZK Kanıtını uydu üzerinden zincire yollar." },
          { step: 3, title: "Liman Doğrulaması", desc: "Liman yetkilisi kanıtı doğrular; geminin rotada olduğunu teyit eder ama koordinatını göremez." }
        ],
        metrics: { speed: 80, security: 98, costSaving: 75, compliance: 92 }
      },
      {
        id: "cs-4",
        title: "Dağıtık Dosya Depolama Entegrasyonu (IPFS/Arweave)",
        problem: "Denizcilikdeki devasa tarama, dizayn ve yük fotoğraflarının SQL veritabanlarında saklanması yüksek sunucu maliyetleri ve veri kaybı riski taşır.",
        whyUse: "Dosyalar merkeziyetsiz olarak IPFS veya Arweave'e yüklenir; hash kodları akıllı sözleşmede tutularak kalıcı ve ucuz arşiv elde edilir.",
        howToDevelop: "Web3 uygulaması dosya yükleme anında dosyayı parçalara bölüp IPFS ağına dağıtır ve dönen benzersiz Content ID (CID) değerini zincire yazar.",
        realWorldExample: "Filecoin and Arweave, dünya genelinde petabaytlarca kurumsal veriyi merkeziyetsiz depolama ağlarında saklamaktadır.",
        costBenefit: {
          setupCost: "Düşük ($10,000)",
          operatingCost: "Çok Düşük (AWS S3 maliyetlerinden %90 daha ucuz)",
          savingRate: "%90 Depolama Maliyet Tasarrufu, %100 Veri Kayıp Koruması",
          roi: "3 Ay"
        },
        workflow: [
          { step: 1, title: "Dosya Yükleme", desc: "Gemi enspektörü hasar fotoğraflarını portal üzerinden yükler." },
          { step: 2, title: "IPFS CID Üretimi", desc: "Dosya IPFS'e atılır ve benzersiz CID (örn: QmXoyp...) adresi alınır." },
          { step: 3, title: "Sözleşmeye Kilitlenme", desc: "CID adresi hasar tespit akıllı sözleşmesine kaydedilerek sonsuza kadar kilitlenir." }
        ],
        metrics: { speed: 88, security: 97, costSaving: 95, compliance: 90 }
      },
      {
        id: "cs-5",
        title: "Düğüm (Node) Operatörlüğü Teşvik Sistemi",
        problem: "Denizcilik izinli DLT ağlarında paydaşların (acente, liman, donatan) sunucu (node) çalıştırma motivasyonu düşüktür.",
        whyUse: "Blok üreten ve işlemleri doğrulayan paydaşlar, ağın işlem ücretlerinden (gas fees) veya kulüp tokenlerinden pay kazanır.",
        howToDevelop: "Ağ konsensüs kuralları içine validatör ödüllendirme mekanizmaları kodlanır. Her blok onayında cüzdanlara otomatik token aktarılır.",
        realWorldExample: "Chainlink Node Operatörleri ve Ethereum validatörleri ağ güvenliğini sağlama karşılığında düzenli ödül alırlar.",
        costBenefit: {
          setupCost: "Orta ($20,000)",
          operatingCost: "Orta (Sunucu giderleri)",
          savingRate: "%100 Kesintisiz Ağ Güvenliği, Düğüm Yönetim Giderlerinin Amortisi",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Node Kurulumu", desc: "Tersane kendi bilgi işlem odasında izinli ağ için doğrulayıcı node kurar." },
          { step: 2, title: "Blok Doğrulama", desc: "Node ağda dönen akıllı konşimento işlemlerini doğrular ve bloka ekler." },
          { step: 3, title: "Ödül Dağıtımı", desc: "Sistem her başarılı blok için tersanenin validatör cüzdanına PRU token yansıtır." }
        ],
        metrics: { speed: 94, security: 96, costSaving: 70, compliance: 85 }
      },
      {
        id: "cs-6",
        title: "Kriptografik İmza ile OTA Gemi Yazılım Güncellemesi",
        problem: "Gemi navigasyon ve makine otomasyon sistemlerine uzaktan yapılan yazılım güncellemeleri siber korsanlarca sabote edilebilir.",
        whyUse: "Güncelleme paketlerinin kriptografik imzaları blokzincire yazılır; gemideki bilgisayar imzayı doğrulamadan güncellemeyi açmaz.",
        howToDevelop: "Yazılım üreticisi (örn. Wärtsilä) güncelleme binary hash değerini ECDSA özel anahtarıyla zincire imzalar. Gemi onchain imza kontrolü yapar.",
        realWorldExample: "Otomotiv ve havacılık sektörlerinde güvenli OTA güncellemeleri için blockchain imza arşivleri kullanılmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($38,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Sabotaj Engelleme, Siber Güvenlik İhlallerinde %95 Azalma",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Güncelleme Yayını", desc: "Geliştirici yazılımı tamamlar, dosya hash'ini ve üretici dijital imzasını zincire yazar." },
          { step: 2, title: "Paket İndirme", desc: "Gemi bilgisayarı uydu üzerinden güncelleme paketini indirir." },
          { step: 3, title: "On-Chain İmza Doğrulama", desc: "Gemi yazılımı zincirdeki hash ile paket hash'ini karşılaştırır, eşleşirse yükleme başlar." }
        ],
        metrics: { speed: 90, security: 99, costSaving: 80, compliance: 94 }
      },
      {
        id: "cs-7",
        title: "Web3 Cüzdan ile SSO (Single Sign-On) Giriş Portalı",
        problem: "Şirket içi çalışanların zayıf şifre tercihleri siber saldırıların %80'inin ana nedenidir.",
        whyUse: "Çalışanlar kullanıcı adı ve şifre girmeden, sadece soğuk donanım cüzdan imza doğrulaması ile kurumsal portallara giriş yapar.",
        howToDevelop: "Ethereum'un 'Sign-In with Ethereum' (EIP-4361) standardı kurumsal Active Directory / Single Sign-On altyapısına entegre edilir.",
        realWorldExample: "SIWE (Sign-In with Ethereum) protokolü dünya genelinde binlerce dApp ve kurumsal portalda şifresiz giriş için kullanılmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($8,000)",
          operatingCost: "Sıfır",
          savingRate: "%100 Şifre Kırma Saldırılarının Önlenmesi, Destek Taleplerinde %60 Azalma",
          roi: "3 Ay"
        },
        workflow: [
          { step: 1, title: "Giriş İsteği", desc: "Kullanıcı portalda 'Cüzdan ile Giriş Yap' butonuna basar." },
          { step: 2, title: "İmza Talebi", desc: "Portal, anlık bir mesaj (nonce) üretip kullanıcının cüzdanına gönderir." },
          { step: 3, title: "Kriptografik Onay", desc: "Kullanıcı mesajı cüzdanıyla imzalar, portal imzayı onchain doğrular ve oturum açar." }
        ],
        metrics: { speed: 96, security: 99, costSaving: 88, compliance: 90 }
      },
      {
        id: "cs-8",
        title: "Lojistik API Entegrasyonları için Oracle Ağ Geçitleri",
        problem: "Akıllı sözleşmeler doğaları gereği blokzincir dışındaki (gümrük, meteoroloji vb.) API sunucularına doğrudan bağlanamazlar.",
        whyUse: "Merkeziyetsiz oracle ağ geçitleri (Chainlink) dış dünyadaki verileri doğrulanabilir ve güvenli biçimde akıllı sözleşmelere taşır.",
        howToDevelop: "Chainlink Node üzerinde çalışan özel bir API adaptörü (External Adapter) yazılır. API cevapları düğümlerce doğrulanıp zincire yazılır.",
        realWorldExample: "Chainlink, DeFi ve endüstriyel blockchain entegrasyonlarında ana veri sağlayıcı oracle altyapısını sunar.",
        costBenefit: {
          setupCost: "Orta ($22,000)",
          operatingCost: "Orta (Oracle çalıştırma gaz gideri)",
          savingRate: "%100 Güvenli API Bağlantısı, Veri Manipülasyonlarının Önlenmesi",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Veri Talebi", desc: "Akıllı sözleşme 'Gemi limana vardı mı?' sorgusunu oracle kontratına gönderir." },
          { step: 2, title: "API Sorgusu", desc: "Chainlink düğümleri Liman AIS API'sine eşzamanlı sorgu atar." },
          { step: 3, title: "Mutabakat ve Yazım", desc: "Düğümler gelen cevaplarda mutabık kaldıktan sonra doğrulanmış veriyi kontrata yazar." }
        ],
        metrics: { speed: 91, security: 96, costSaving: 75, compliance: 93 }
      },
      {
        id: "cs-9",
        title: "Merkeziyetsiz Git Deposu ve Akıllı Kod Sürüm Kontrolü",
        problem: "GitHub gibi merkezi kod depolarının hack'lenmesi veya hesapların kapatılması durumunda yazılım projeleri riske girer.",
        whyUse: "Yazılım kod tabanı Radicle gibi merkeziyetsiz P2P ağlarda ve blokzincir tescilli versiyon geçmişlerinde saklanır.",
        howToDevelop: "Radicle ağı entegrasyonu yapılır. Geliştiriciler kod commit'lerini Ethereum akıllı sözleşmesiyle tescil eder.",
        realWorldExample: "Radicle projesi, geliştiricilerin kodlarını merkezi sansür mekanizmalarından uzak saklamasını sağlamaktadır.",
        costBenefit: {
          setupCost: "Düşük ($12,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Kod Koruma ve Kesintisiz Erişim, Sansür Engelleme",
          roi: "5 Ay"
        },
        workflow: [
          { step: 1, title: "Kod Commit", desc: "Yazılımcı yeni sürüm kodunu yerel bilgisayarında Radicle P2P ağına yükler." },
          { step: 2, title: "Hash Tescili", desc: "Kod commit'inin benzersiz hash'i akıllı sözleşmeye gönderilerek mühürlenir." },
          { step: 3, title: "Doğrulanmış Deployment", desc: "Sunucular güncellemeyi sadece zincirdeki doğrulanmış commit hash'inden çeker." }
        ],
        metrics: { speed: 87, security: 98, costSaving: 82, compliance: 85 }
      },
      {
        id: "cs-10",
        title: "DeFi Likidite ve Token Havuzları Entegrasyon API'si",
        problem: "Klasik e-ticaret ve sadakat puanı yazılımlarının likiditesi yoktur; kazanılan puanlar başka platformlarda harcanamaz.",
        whyUse: "Portalların sadakat puanları ERC-20 token olarak basılarak Uniswap benzeri DEX'lerde diğer kripto paralara dönüştürülebilir hale gelir.",
        howToDevelop: "Uniswap V3 SDK'sı kullanılarak dApp arayüzüne likidite havuzu, swap (takas) ve token ekleme modülleri entegre edilir.",
        realWorldExample: "Uniswap API'leri, yüzlerce Web3 cüzdanı ve oyunu tarafından anlık token takası sağlamak için kullanılmaktadır.",
        costBenefit: {
          setupCost: "Orta ($26,000)",
          operatingCost: "Düşük (Likit havuz maliyeti)",
          savingRate: "%100 Token Likiditesi, Kullanıcı Sadakat Oranlarında %40 Artış",
          roi: "7 Ay"
        },
        workflow: [
          { step: 1, title: "Token Kazanımı", desc: "Öğrenci kulüp görevinden 100 PRU token kazanır." },
          { step: 2, title: "Takas Talebi", desc: "Arayüz üzerinden Uniswap router'ı çağırarak PRU tokenlerini MATIC'e dönüştürmek ister." },
          { step: 3, title: "DEX Takası", desc: "Akıllı sözleşme işlemi onaylar, likidite havuzundan PRU çekilip cüzdanına MATIC yatırılır." }
        ],
        metrics: { speed: 96, security: 95, costSaving: 80, compliance: 88 }
      }
    ]
  },
  {
    id: "electrical-electronics",
    name: "Elektrik-Elektronik Mühendisliği",
    icon: "⚡",
    description: "Gemi otopilot IoT doğrulaması, akıllı şebeke (smart grid) enerji ticareti, donanımsal güvenlik modülleri (HSM) ve PLC logları.",
    solutions: [
      {
        id: "ee-1",
        title: "Otopilot IoT Telemetri Doğrulama",
        problem: "Otonom gemilerin otopilot sistemlerine yapılan siber müdahaleler rota sapmalarına ve çarpışmalara yol açabilir.",
        whyUse: "Otopilotun ürettiği dümen ve rota komutları milisaniyelik hash'lerle DLT'ye yazılarak dışarıdan manipülasyon engellenir.",
        howToDevelop: "Otopilot mikrodenetleyicisi (ARM/STM32), her rota değişim komutunu kendi özel anahtarıyla şifreleyerek yerel blockchain düğümüne yollar.",
        realWorldExample: "Otonom araçların seyir verilerinin DLT ile korunması üzerine endüstriyel konsorsiyum çalışmaları bulunmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($45,000)",
          operatingCost: "Orta (Edge computing donanımı)",
          savingRate: "%100 Rota Değiştirilemezliği, Siber Ele Geçirme Risklerinde %90 Azalma",
          roi: "14 Ay"
        },
        workflow: [
          { step: 1, title: "Rota Komutu Üretimi", desc: "Otopilot işlemcisi rota açısını 'iskele 10' olarak hesaplar." },
          { step: 2, title: "Komut Hash'leme", desc: "İşlemci donanımsal olarak komut verisini hash'ler ve imzalar." },
          { step: 3, title: "Zincir İçi Doğrulama", desc: "Dümen motoru sürücüsü, gelen komut imzasını zincirden doğrulamadan hareket etmez." }
        ],
        metrics: { speed: 93, security: 98, costSaving: 65, compliance: 90 }
      },
      {
        id: "ee-2",
        title: "Akıllı Şebeke (Smart Grid) P2P Enerji Ticareti",
        problem: "Kampüslerde veya gemilerdeki mikro-jeneratörlerin (güneş, rüzgar) ürettiği fazla enerjinin diğer binalara satışı merkezi aracı kurumlara tabidir.",
        whyUse: "Akıllı sayaçlar akıllı sözleşmeler üzerinden birbirleriyle doğrudan P2P enerji takası yapar ve ödemeler tokenle anında tamamlanır.",
        howToDevelop: "Enerji üretimi ve tüketimini ölçen akıllı sayaçlar EVM ağına bağlanır. Fiyatlandırma arz-talebe göre akıllı sözleşmeyle belirlenir.",
        realWorldExample: "Power Ledger platformu, Avustralya ve ABD'de mahalleler arası P2P güneş enerjisi ticareti sağlamaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($50,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%30 Elektrik Fatura Düşüşü, %40 Enerji Verimliliği Artışı",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "Fazla Enerji İlanı", desc: "A Blok çatısındaki rüzgar gülü fazla 50 kWh enerjiyi akıllı sözleşmede listeler." },
          { step: 2, title: "Satın Alma Eşleşmesi", desc: "B Blok enerji ihtiyacı için teklifi kabul eder ve stabilcoin'i bloke eder." },
          { step: 3, title: "Fiziki Akım and Transfer", desc: "Akıllı şebeke elektriği yönlendirir, sayaç doğrulamasıyla token depo sahibine ödenir." }
        ],
        metrics: { speed: 92, security: 94, costSaving: 92, compliance: 88 }
      },
      {
        id: "ee-3",
        title: "HSM Tabanlı Donanımsal Ledger İmzalama",
        problem: "IoT cihazlarının ürettiği veriler veri tabanına yüklenirken sunucu katmanında siber saldırganlarca değiştirilebilir.",
        whyUse: "Sensörlerin içine entegre edilen Donanımsal Güvenlik Modülleri (HSM) veriyi kaynağında imzalayarak DLT'ye gönderir.",
        howToDevelop: "Secure Element (örn. ATECC608A) çipleri IoT devre kartına eklenir. Kriptografik özel anahtar çipten asla dışarı çıkarılamaz.",
        realWorldExample: "Ledger ve Infineon, IoT cihazlarının zincire güvenli veri göndermesi için HSM-chips üretmektedir.",
        costBenefit: {
          setupCost: "Orta ($28,000)",
          operatingCost: "Düşük (Sensör birim maliyeti artar)",
          savingRate: "%100 Donanım Güvenliği, Uçtan Uca %100 Veri Bütünlüğü",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Veri Ölçümü", desc: "Sensör sıcaklık verisini (+24.5 C) okur." },
          { step: 2, title: "Çip İçi İmzalama", desc: "Entegre HSM çipi veriyi kendi içindeki private key ile imzalar." },
          { step: 3, title: "DLT Doğrulama", desc: "Veri buluta ulaştığında DLT düğümü imzayı kontrol eder, sahteyse veriyi çöpe atar." }
        ],
        metrics: { speed: 91, security: 99, costSaving: 70, compliance: 95 }
      },
      {
        id: "ee-4",
        title: "Köprüüstü Alarm Log Arşivi",
        problem: "Deniz kazalarından sonra gemi karakutusundaki (VDR) alarm loglarının silinmesi veya değiştirilmesi kaza tespitini imkansız kılar.",
        whyUse: "Köprüüstü alarm panellerinin ürettiği tüm alarmlar eşzamanlı olarak blokzincire yazılarak silinemez kaza kanıtları elde edilir.",
        howToDevelop: "Köprüüstü NMEA-0183/2000 alarm veriyolu, izole bir gateway ile dinlenir. Alarmlar anlık hash'lenerek uyduyla L2 DLT'ye yazılır.",
        realWorldExample: "Deniz kazalarında sigorta mahkemeleri, VDR verilerinin DLT tabanlı kopyalarını delil kabul etmektedir.",
        costBenefit: {
          setupCost: "Orta ($22,000)",
          operatingCost: "Orta (Uydu SMS/veri ücreti)",
          savingRate: "%100 Delil Güvenilirliği, Kaza Hukuki Davalarında %70 Zaman Tasarrufu",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Alarm Tetiklenmesi", desc: "Radar çarpışma uyarısı (CPA alarmı) köprüüstünde çalar." },
          { step: 2, title: "Anlık Hash Gönderimi", desc: "Alarm kodu ve saniyesi hash'lenerek uyduyla blokzincirine bloklanır." },
          { step: 3, title: "Kaza Sonrası Denetim", desc: "Kaza sonrası savcılık, alarm saatlerini zincir üstünden değiştirilemez biçimde okur." }
        ],
        metrics: { speed: 96, security: 98, costSaving: 60, compliance: 97 }
      },
      {
        id: "ee-5",
        title: "Elektrikli Gemiler için Batarya Sağlık Durumu (SoH) Kaydı",
        problem: "Elektrikli yolcu motorlarının veya hibrit gemilerin bataryalarının gerçek sağlık (SoH) durumlarının gizlenmesi, ikinci el satışta alıcıları aldatır.",
        whyUse: "Batarya Yönetim Sistemi (BMS) şarj döngüsü ve SoH verilerini düzenli olarak blockchain'e yazarak şeffaf pil karnesi sunar.",
        howToDevelop: "BMS kartı mikrodenetleyicisi, CAN-bus üzerinden aldığı hücre voltajı ve sıcaklık loglarını şifreli olarak DLT'ye gönderir.",
        realWorldExample: "Volvo and Tesla, batarya metallerinin ve SoH durumlarının izlenmesi için blockchain konsorsiyumlarına üyedir.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Şeffaf Pil Sağlığı, İkinci El Satış Güveninde %40 Artış",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "BMS Veri Çıkışı", desc: "BMS bataryanın kapasite kaybını (%94 SoH) hesaplar." },
          { step: 2, title: "Zaman Damgalı Kayıt", desc: "Sağlık verisi şarj döngüsü sayısıyla birlikte DLT'ye yazılır." },
          { step: 3, title: "Alıcı Sorgusu", desc: "Gemi alıcısı batarya NFT'sini taratarak geçmiş şarj alışkanlıklarını görür." }
        ],
        metrics: { speed: 85, security: 96, costSaving: 88, compliance: 92 }
      },
      {
        id: "ee-6",
        title: "PLC Güvenlik ve Konfigürasyon Logları",
        problem: "Tersanelerdeki veya gemi makinelerindeki Programmable Logic Controller (PLC) ayarlarının siber saldırıyla (Stuxnet vb.) değiştirilmesi felakete yol açar.",
        whyUse: "PLC'lerin firmware ve konfigürasyon hash'leri düzenli taranır; zincirdeki hash ile uyuşmayan PLC'ler otomatik durdurulur.",
        howToDevelop: "PLC kontrol yazılımı, her başlatmada mevcut ladder logic kod hash'ini akıllı sözleşmedeki onaylı hash ile karşılaştırır.",
        realWorldExample: "Endüstriyel siber güvenlik firmaları, kritik altyapı PLC güvenlik denetimlerinde blockchain entegrasyonu kullanmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($40,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Sabotaj Koruması, Kritik Duruş Sürelerinde %50 Azalma",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Config Yükleme", desc: "Mühendis PLC'ye yeni kontrol kodu yükler ve kod hash'ini zincire kaydeder." },
          { step: 2, title: "Periyodik Kontrol", desc: "Güvenlik watchdog yazılımı PLC bellek kodunu 10 dakikada bir tarar." },
          { step: 3, title: "Acil Duruş", desc: "Kod hash'i değiştiğinde (siber müdahale) akıllı sözleşme tetiklenir ve PLC'yi güvenli moda alır." }
        ],
        metrics: { speed: 90, security: 99, costSaving: 80, compliance: 93 }
      },
      {
        id: "ee-7",
        title: "RFID Entegre Akıllı Kargo Kilidi",
        problem: "Konteynerlerin gümrük kapılarında veya liman depolarında yetkisiz kişilerce açılması (kargo hırsızlığı) küresel lojistikte milyarlarca dolar kayba yol açar.",
        whyUse: "Akıllı kilitlerin açma/kapatma şifreleri akıllı sözleşme tarafından yönetilir; kilidin açıldığı anın coğrafi konum bilgisi zincire mühürlenir.",
        howToDevelop: "Bluetooth/NFC entegreli akıllı kilit, açılma komutunu sadece zincirdeki alıcı cüzdanından gelen imzalı işlem ile tetikler.",
        realWorldExample: "Lojistik güvenliğinde akıllı asma kilitler ve blockchain kilit açma yetkilendirmesi pilot projelerde yer almaktadır.",
        costBenefit: {
          setupCost: "Orta ($32,000)",
          operatingCost: "Orta (Her kilit donanım ücreti)",
          savingRate: "%99 Hırsızlık Önleme, Gümrük Muayene Sürelerinde %50 Hızlanma",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Kilit Kilitleme", desc: "Yükleyici kargo kapısına akıllı kilidi takar ve kilidi zincirde aktif eder." },
          { step: 2, title: "Konum Uyum Kontrolü", desc: "Kilit gümrük kapısına ulaştığında GPS koordinatını doğrular." },
          { step: 3, title: "Yetkili Açılış", desc: "Alıcı cüzdanıyla imzalı işlem yollar, kilit kilidini açar ve açılış kaydı zincire düşer." }
        ],
        metrics: { speed: 94, security: 99, costSaving: 85, compliance: 89 }
      },
      {
        id: "ee-8",
        title: "Sensör Kalibrasyon Geçmişi Sicili",
        problem: "Gemi yük tanklarındaki seviye ve gaz sensörlerinin kalibre edilmemesi hatalı ölçümlere ve patlamalara neden olabilir.",
        whyUse: "Sensörlerin kalibrasyon tarihleri ve kalibre eden firmanın sertifikası DLT'de tutularak denetimlerde kesinlik sağlanır.",
        howToDevelop: "Kalibrasyon yapan teknik servis, ölçüm kalibrasyon sapma raporunu kendi imzasıyla doğrudan gemi ekipman veritabanına yazar.",
        realWorldExample: "Endüstriyel denetim ve kalibrasyon sertifikaları, ISO standartları uyumluluğu için DLT'ye tescil edilmektedir.",
        costBenefit: {
          setupCost: "Düşük ($12,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Doğru Ölçüm Güvencesi, Liman PSC Denetimlerinde Kusursuzluk",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "Kalibrasyon Hizmeti", desc: "Mühendis gaz dedektörünü kalibre eder ve kalibrasyon gazı değerlerini girer." },
          { step: 2, title: "Onchain İmza", desc: "Mühendis cüzdanıyla kalibrasyon logunu onaylayarak zincire gönderir." },
          { step: 3, title: "Denetim Uyumu", desc: "Denetçi dedektör üzerindeki QR kodu taratarak kalibrasyon geçerliliğini doğrular." }
        ],
        metrics: { speed: 88, security: 95, costSaving: 75, compliance: 98 }
      },
      {
        id: "ee-9",
        title: "PMS (Güç Yönetim Sistemi) Veri Güvenliği",
        problem: "Gemilerde elektrik yük dağılımını yöneten Power Management System (PMS) verilerindeki hatalar blackout (tüm elektriğin kesilmesi) riskini tetikler.",
        whyUse: "PMS kararları ve generatör devreye girme logları değiştirilemez DLT üzerinde saklanarak blackout nedenleri doğru analiz edilir.",
        howToDevelop: "PMS kontrol kartı serial port çıkışı, izole bir DLT node geçidiyle dinlenerek kritik güç olayları zincire mühürlenir.",
        realWorldExample: "Kritik askeri ve ticari gemi otomasyonlarında veri bütünlüğü için DLT mimarileri kullanılmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($42,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Veri Bütünlüğü, Blackout Sonrası Kök Neden Analiz Süresinde %80 Azalma",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "PMS Olayı", desc: "Gemi şebeke yükü aşırı artar ve PMS 2. Jeneratörü devreye alır." },
          { step: 2, title: "Olay Zaman Damgası", desc: "Jeneratörün devreye girme milisaniyesi ve şebeke yükü (kW) zincire işlenir." },
          { step: 3, title: "Kök Neden Analizi", desc: "Mühendisler arıza sonrası tüm yük loglarını zincirdeki güvenilir veriyle inceler." }
        ],
        metrics: { speed: 92, security: 97, costSaving: 80, compliance: 91 }
      },
      {
        id: "ee-10",
        title: "Mikro-Jenerasyon Enerji Sertifikasyonu (RECs)",
        problem: "Yenilenebilir yeşil enerji üreten işletmelerin Renewable Energy Certificates (REC) alması hantal ve pahalı bir süreçtir.",
        whyUse: "Yeşil enerji üreten güneş panelleri ürettikleri her MWh enerji için zincir üstünde otomatik yeşil sertifika tokeni (REC) kazanır.",
        howToDevelop: "Güneş inverteri çıkış sayacı, akıllı sözleşmeyle entegre çalışır. Her 1 MWh üretimde cüzdana 1 REC NFT'si basılır.",
        realWorldExample: "Energy Web Foundation, yeşil enerji üretim sertifikalarının blockchain ile takibini ve ticaretini sağlamaktadır.",
        costBenefit: {
          setupCost: "Orta ($26,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%90 Daha Ucuz Sertifikasyon, REC Satışlarından Yeni Ek Gelir",
          roi: "7 Ay"
        },
        workflow: [
          { step: 1, title: "Yeşil Üretim", desc: "Kampüs rüzgar türbini 1 MWh temiz elektrik üretir." },
          { step: 2, title: "Otomatik Basım", desc: "Akıllı sayaç üretimi zincire raporlar, sözleşme yeşil enerji NFT'si basar." },
          { step: 3, title: "Sertifika Satışı", desc: "Karbon ayak izini düşürmek isteyen tersane, bu REC tokenini satın alarak karbonunu sıfırlar." }
        ],
        metrics: { speed: 95, security: 96, costSaving: 90, compliance: 97 }
      }
    ]
  },
  {
    id: "industrial-engineering",
    name: "Endüstri Mühendisliği",
    icon: "📊",
    description: "Yalın üretim, tersane iş akışları, OEE takibi, Just-In-Time tedarik zinciri ve karesel oylama ile karar destek modelleri.",
    solutions: [
      {
        id: "ie-1",
        title: "Yalın Üretim Kalite Kontrol Blokzinciri",
        problem: "Montaj hattındaki hataların ve firelerin geç fark edilmesi, tüm üretim serisinin bozulmasına ve geri çağırmalara yol açar.",
        whyUse: "Her kalite kontrol kontrol noktası (Kaizen) blokzincire işlenerek üretim aşamalarındaki hatalar anında durdurulur ve izlenir.",
        howToDevelop: "Üretim bandındaki her istasyon onayını akıllı sözleşmeye bildirir. Hatalı parça tespitinde sonraki istasyon kilitlenir.",
        realWorldExample: "BMW, parça tedarik zincirinde kalite denetimi için PartChain blockchain projesini uygulamaya almıştır.",
        costBenefit: {
          setupCost: "Yüksek ($40,000)",
          operatingCost: "Orta (İstasyon başı API entegrasyonu)",
          savingRate: "%100 Hatalı Parça İzlenebilirliği, Üretim Hatalarında %35 Azalma",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "İstasyon Onayı", desc: "1. İstasyon işini bitirir, parçanın RFID barkodunu taratarak zincire 'Başarılı' kaydeder." },
          { step: 2, title: "Hata Algılama", desc: "2. İstasyonda boyut hatası algılanır ve parça 'Hatalı' olarak zincire işaretlenir." },
          { step: 3, title: "Hattın Durdurulması", desc: "Sözleşme hattı durdurur; hatalı parça montaja girmeden hattan ayrılır." }
        ],
        metrics: { speed: 88, security: 95, costSaving: 90, compliance: 85 }
      },
      {
        id: "ie-2",
        title: "Tersane İş Akışı Tıkanıklık Analizi Defteri",
        problem: "Gemi inşası gibi devasa projelerde hangi taşeron ekibin işi geciktirdiği tespit edilemez, cezai sorumluluklar belirsiz kalır.",
        whyUse: "Taşeron iş bitim bildirimleri onchain zaman damgasıyla tutulur; gantt şeması tıkanıklıkları DLT verileriyle tarafsız analiz edilir.",
        howToDevelop: "Tersane yönetim yazılımı (Gantt Scheduler) DLT ile senkronize edilir. İş bitişleri mobil uygulamadan işçilerce imzalanır.",
        realWorldExample: "İnşaat ve tersane yönetiminde DLT tabanlı performans denetim mekanizmaları geliştirilmektedir.",
        costBenefit: {
          setupCost: "Yüksek ($45,000)",
          operatingCost: "Düşük",
          savingRate: "%25 Proje Gecikme Azalması, Taşeron Uyuşmazlıklarında %60 Düşüş",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "İş Emri Başlangıcı", desc: "Raspa boya ekibi iş emrini alır ve cüzdanıyla işe başlama imzası atar." },
          { step: 2, title: "İş Bitim Beyanı", desc: "Ekip boyayı bitirir, fotoğrafları IPFS'e atıp bitiş işlemini zincire gönderir." },
          { step: 3, title: "Otomatik Gecikme Cezası", desc: "Planlanan süreyi aşarsa akıllı sözleşme taşeron hak edişinden otomatik ceza keser." }
        ],
        metrics: { speed: 85, security: 93, costSaving: 87, compliance: 90 }
      },
      {
        id: "ie-3",
        title: "OEE (Ekipman Etkinlik Derecesi) Takip Defteri",
        problem: "Tersanedeki cnc kesim, plazma kaynak gibi makinelerin duruş süreleri ve verimlilik (OEE) oranları manuel raporlarda abartılır.",
        whyUse: "Makinelerin çalışma, durma ve hız verileri doğrudan PLC/sensörden blokzincire akar; OEE denetim raporu şeffaflaşır.",
        howToDevelop: "Makinelerin IoT çıkışları, OEE formülüne (Kullanılabilirlik x Performans x Kalite) göre akıllı sözleşmeyle hesaplanıp kaydedilir.",
        realWorldExample: "Endüstri 4.0 ve akıllı fabrikalarda OEE verilerinin DLT ile tescili üzerine çalışmalar mevcuttur.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Orta",
          savingRate: "%15 OEE Verimlilik Artışı, %100 Doğru Raporlama Güvencesi",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Makine İzleme", desc: "Plazma kesim tezgahının çalışma ve durma süreleri sensörlerce toplanır." },
          { step: 2, title: "OEE Hesaplama", desc: "Akıllı sözleşme makinenin OEE oranını (%82) onchain hesaplar." },
          { step: 3, title: "Verim Raporu Kilidi", desc: "Günlük verimlilik karnesi şirket içi denetçiler için zincirde kilitlenir." }
        ],
        metrics: { speed: 90, security: 94, costSaving: 89, compliance: 85 }
      },
      {
        id: "ie-4",
        title: "Just-In-Time (JIT) Tedarik Zinciri Akıllı Sözleşmeleri",
        problem: "Tam zamanında (JIT) üretimde en ufak bir tedarik gecikmesi tüm fabrikanın durmasına neden olur ve yüksek stok maliyetleri yaratır.",
        whyUse: "Tedarikçinin tırı fabrikaya yaklaştığında akıllı sözleşme üretim hattına sinyal gönderir; parçalar doğrudan montaj bandına indirilir.",
        howToDevelop: "Tırların GPS konumları Chainlink oracles ile izlenir. Fabrika kapısına giriş anında depo kabul ve ödeme işlemleri otomatik tetiklenir.",
        realWorldExample: "Toyota benzeri JIT otomotiv devleri, tedarik zinciri entegrasyonu için akıllı sözleşme modelleri araştırmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($55,000)",
          operatingCost: "Orta (Oracle ve konum verileri)",
          savingRate: "%45 Stok Alanı Tasarrufu, %30 Daha Hızlı Montaj Akışı",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Yük Yola Çıkışı", desc: "Tedarikçi tırı yükleyip yola çıktığında akıllı sözleşmede varış süresi sayacı başlar." },
          { step: 2, title: "Konum Doğrulama", desc: "Tır fabrikaya 10 km kaldığında GPS oracles ile sistem uyarılır, montaj hattı hazırlanır." },
          { step: 3, title: "Depo Giriş ve Ödeme", desc: "Tır kapıdan girdiğinde kilit açılır ve parçalar doğrudan banda alınarak ödeme serbest bırakılır." }
        ],
        metrics: { speed: 95, security: 92, costSaving: 94, compliance: 86 }
      },
      {
        id: "ie-5",
        title: "Envanter Değerleme ve Audit Trail Platformu",
        problem: "Yıl sonu envanter sayımlarında kayıp malların tespiti, sahte stok kayıtları ve vergi usulsüzlükleri denetimlerde sıkça yakalanır.",
        whyUse: "Envanter hareketleri (giriş, çıkış, sarf) blockchain üzerinde değiştirilemez bir izle (audit trail) saklanarak stok hileleri imkansız kılınır.",
        howToDevelop: "Tersane/Fabrika depo ERP programı, her stok hareketinde veri paketini hash'leyerek blokzincir API'sine yazar.",
        realWorldExample: "Kurumsal denetim firmaları (PwC, EY), envanter denetimlerinde blockchain onay mekanizmaları kullanmaktadır.",
        costBenefit: {
          setupCost: "Orta ($25,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Güvenilir Stok Raporları, Yıl Sonu Denetim Sürelerinde %80 Azalma",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Stok Girişi", desc: "Depoya 50 ton kaynak elektrodu girer ve barkod okuyucuyla zincire işlenir." },
          { step: 2, title: "Sarf ve Çıkış", desc: "İnşaat için depodan 5 ton çekildiğinde mühendisin cüzdan onayıyla stok düşülür." },
          { step: 3, title: "Envanter Mutabakatı", desc: "Denetçi, fiziksel stoklar ile zincirdeki onaylı log geçmişini saniyeler içinde karşılaştırır." }
        ],
        metrics: { speed: 91, security: 98, costSaving: 85, compliance: 97 }
      },
      {
        id: "ie-6",
        title: "Ergonomi ve İş Güvenliği İhlal Günlüğü",
        problem: "Tersane gibi tehlikeli iş yerlerinde iş güvenliği (İSG) kurallarına uyulmaması can kayıplarına ve ağır hukuki davalara yol açar.",
        whyUse: "Baret, emniyet kemeri sensörlerinin ürettiği İSG ihlal verileri blockchain'e yazılarak işverenin ve çalışanın sorumluluğu tarafsızca belgelenir.",
        howToDevelop: "Akıllı baret ve kemerlerdeki Bluetooth/sensör donanımları, İSG yazılımı üzerinden ihlal anlarını zincire tescil eder.",
        realWorldExample: "İşçi sağlığı ve güvenliği izleme sistemlerinde DLT tabanlı veri saklama çözümleri geliştirilmektedir.",
        costBenefit: {
          setupCost: "Orta ($28,000)",
          operatingCost: "Orta",
          savingRate: "%40 İş Kazası Azalması, %100 Hukuki İltica Kanıt Gücü",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Baret Çıkarma Olayı", desc: "İşçi iskele üzerinde baretini çıkardığında baret basınç sensörü uyarılır." },
          { step: 2, title: "İhlal Tescili", desc: "Sensör ihlal olayını ve işçinin cüzdan imzasını doğrudan zincire loglar." },
          { step: 3, title: "Uyarı ve Eğitim", desc: "Akıllı sözleşme İSG uzmanına uyarı yollar, işçinin onchain eğitim rozeti sorgulanır." }
        ],
        metrics: { speed: 89, security: 97, costSaving: 80, compliance: 99 }
      },
      {
        id: "ie-7",
        title: "MCDM (Çok Kriterli Karar Verme) DAO Oylaması",
        problem: "Mühendislik projelerinde makine veya tersane tedarikçisi seçilirken kararlar sübjektif veya şeffaf olmayan yöntemlerle alınabilir.",
        whyUse: "Çok kriterli karar verme (AHP, TOPSIS) ağırlıkları DAO oylamasına dökülür; tüm mühendislerin oylarıyla en rasyonel karar seçilisin.",
        howToDevelop: "TOPSIS karar matrisi akıllı sözleşme içine kodlanır. Mühendisler kriter ağırlıklarını on-chain oylarla belirler.",
        realWorldExample: "Merkeziyetsiz organizasyonlarda (DAO) karmaşık finans ve mühendislik kararları için MCDM oylama kontratları kullanılmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($15,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Şeffaf Tedarikçi Seçimi, Karar Verme Sürelerinde %60 Ksalma",
          roi: "5 Ay"
        },
        workflow: [
          { step: 1, title: "Kriter Girişi", desc: "Karar için Fiyat (%40), Kalite (%30), Garanti (%30) kriterleri sisteme yüklenir." },
          { step: 2, title: "Onchain Puanlama", desc: "Uzman mühendisler teklif veren 3 tersaneyi bu kriterlere göre zincirde puanlar." },
          { step: 3, title: "En İyi Tedarikçi", desc: "Akıllı sözleşme TOPSIS formülünü çalıştırır ve kazanan tedarikçiyi ilan eder." }
        ],
        metrics: { speed: 94, security: 95, costSaving: 85, compliance: 88 }
      },
      {
        id: "ie-8",
        title: "Tahmini Bakım SLA Sözleşmeleri",
        problem: "Kritik makinelerin arızalanmadan önce yapılması gereken tahmini bakımları (predictive maintenance) zamanında yapılmazsa üretim durur.",
        whyUse: "Makine titreşim sensör verileri DLT'ye yazılır; arıza olasılığı eşiği aşıldığında akıllı sözleşme bakım ekibini otomatik çağırır.",
        howToDevelop: "CNC tezgahı titreşim verileri edge node ile izlenir. Anomali tespiti durumunda bakım iş emri akıllı sözleşmesi tetiklenir.",
        realWorldExample: "Endüstriyel bakım sağlayıcıları, servis seviyesi taahhütlerini (SLA) akıllı sözleşmelere bağlamaya başlamıştır.",
        costBenefit: {
          setupCost: "Yüksek ($48,000)",
          operatingCost: "Orta",
          savingRate: "%30 Plansız Duruş Süresi Azalması, %20 Bakım Gider Tasarrufu",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Sensör İzleme", desc: "Rulman yatağındaki sıcaklık ve titreşim değerleri sürekli izlenir." },
          { step: 2, title: "Anomali Algılama", desc: "Sensör limit aşımı algıladığında titreşim imzasını zincire raporlar." },
          { step: 3, title: "Otomatik İş Emri", desc: "Akıllı sözleşme en yakın servis firmasına iş emri ve ödeme teminatını yollar." }
        ],
        metrics: { speed: 92, security: 93, costSaving: 91, compliance: 90 }
      },
      {
        id: "ie-9",
        title: "Kaynak Dağıtım ve Vardiya Planlama Doğrulama",
        problem: "Üretim tesislerinde işçi vardiyalarının ve makine sürelerinin adil dağıtılmaması, iş gücü memnuniyetsizliği yaratır.",
        whyUse: "Vardiya planları ve fazla mesai saatleri blokzincirde tutularak tahrif edilmesi önlenir, sendikal denetimler kolaylaşır.",
        howToDevelop: "Çalışan giriş kartları (RFID) ve mesai saatleri DLT'ye kilitlenir. Hak edilen mesai ücretleri akıllı sözleşmeyle hesaplanır.",
        realWorldExample: "Çalışan hakları ve iş yasası uyumluluğu için DLT tabanlı bordro ve mesai takip sistemleri kullanılmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($18,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Adil Vardiya Planlaması, Mesai Uyuşmazlıklarında %90 Düşüş",
          roi: "7 Ay"
        },
        workflow: [
          { step: 1, title: "Mesai Başlangıcı", desc: "İşçi turnikeden kartını okutarak mesaisini zincire zaman damgalı kaydeder." },
          { step: 2, title: "Vardiya Doğrulama", desc: "Planlanan vardiya ile gerçek çalışma süresi eşleştirilir." },
          { step: 3, title: "Mesai Token Hesabı", desc: "Akıllı sözleşme fazla mesaiyi hesaplar ve işçinin cüzdanına prim tokeni yükler." }
        ],
        metrics: { speed: 90, security: 96, costSaving: 80, compliance: 95 }
      },
      {
        id: "ie-10",
        title: "Karbon Ayak İzi Yaşam Döngüsü Analizi (LCA)",
        problem: "Bir ürünün üretiminde hammadde eldesinden lojistiğe kadar oluşan gerçek karbon salınımını doğrulamak zordur.",
        whyUse: "Ürünün üretimindeki her tedarikçi kendi karbon logunu parça barkoduna ekler; son üründe değiştirilemez karbon pasaportu oluşur.",
        howToDevelop: "Her parça üretimi emisyonu toplanarak son ürünün ERC-721 Dijital Karbon Pasaportu NFT'si basılır.",
        realWorldExample: "Volvo, elektrikli araçlarında akü metallerinin karbon ayak izini blockchain ile izleyerek 'Karbon Pasaportu' sunmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($50,000)",
          operatingCost: "Orta (Emisyon denetçi onayları)",
          savingRate: "%100 Doğrulanmış Karbon Karnesi, Sınırda Karbon Vergisi Kolaylığı",
          roi: "14 Ay"
        },
        workflow: [
          { step: 1, title: "Hammadde Emisyonu", desc: "Maden ocağı çeliğin çıkarılmasındaki CO2 miktarını sac NFT'sine yazar." },
          { step: 2, title: "Üretim Emisyonu", desc: "Tersane gemiyi inşa ederken harcadığı elektriğin karbon logunu ekler." },
          { step: 3, title: "Karbon Pasaportu", desc: "Gemi tamamlandığında tüm yaşam döngüsü karbon salınımı doğrulanmış NFT olarak basılır." }
        ],
        metrics: { speed: 85, security: 98, costSaving: 75, compliance: 99 }
      }
    ]
  },
  {
    id: "international-business",
    name: "Uluslararası İşletmecilik ve Ticaret",
    icon: "🪙",
    description: "Akreditif (Letter of Credit) DeFi entegrasyonu, sınır ötesi CBDC ödemeleri, menşei şahadetnameleri ve AML/KYC sicilleri.",
    solutions: [
      {
        id: "ib-1",
        title: "DeFi Akreditif (Letter of Credit) Sözleşmesi",
        problem: "Dış ticarette bankaların düzenlediği akreditif mektupları haftalar alır ve %3'e varan yüksek komisyonlar içerir.",
        whyUse: "Alıcı ve satıcı arasındaki akreditif şartları akıllı sözleşmeyle kurulur; evraklar yüklendiğinde ödeme saniyeler içinde tamamlanır.",
        howToDevelop: "Solidity'de çok imzalı ve zaman kilitli (Time-locked Escrow) akreditif sözleşmesi yazılır. Belgeler IPFS'e yüklenir.",
        realWorldExample: "HSBC ve Contour platformu, blockchain tabanlı akreditif kullanarak işlem süresini 10 günden 24 saate düşürmüştür.",
        costBenefit: {
          setupCost: "Yüksek ($45,000)",
          operatingCost: "Çok Düşük (Banka komisyonu ödenmez)",
          savingRate: "%90 Uyuşmazlık Çözüm Hızı, İşlem Masraflarında %75 Düşüş",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Akreditif Açma", desc: "İthalatçı akreditif bedelini stabilcoin olarak akıllı sözleşmeye kilitler." },
          { step: 2, title: "Sevkiyat ve Belgeler", desc: "İhracatçı yükleme belgelerini (akıllı konşimento) sözleşmeye ibraz eder." },
          { step: 3, title: "Otomatik Tahsilat", desc: "Sözleşme belgelerin doğruluğunu teyit eder ve fonları ihracatçıya gönderir." }
        ],
        metrics: { speed: 96, security: 98, costSaving: 92, compliance: 91 }
      },
      {
        id: "ib-2",
        title: "Gümrük Tarifesi ve Otomatik Vergilendirme",
        problem: "İthalat kapılarında gümrük tarifelerinin (HS Kodları) manuel hesaplanması vergi kaçakçılığına ve gecikmelere yol açar.",
        whyUse: "Fatura verileri ve HS kodları zincir üzerinde eşleştirilerek gümrük vergileri akıllı sözleşme ile otomatik hesaplanır ve tahsil edilir.",
        howToDevelop: "Dünya Gümrük Örgütü HS Kod veri tabanı ile entegre, ithalat beyanı gümrük vergisi ödeme akıllı sözleşmesi yazılır.",
        realWorldExample: "Dünya Ticaret Örgütü (WTO) gümrük vergilerinin blockchain ile otomatize edilmesi projelerini desteklemektedir.",
        costBenefit: {
          setupCost: "Çok Yüksek ($65,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Doğru Vergilendirme, Gümrük Geçiş Sürelerinde %50 Azalma",
          roi: "15 Ay"
        },
        workflow: [
          { step: 1, title: "Beyan Girişi", desc: "İthalatçı malın HS kodunu ve fatura değerini zincirde beyan eder." },
          { step: 2, title: "Tarife Hesaplama", desc: "Akıllı sözleşme ülkenin güncel gümrük vergisini onchain hesaplar." },
          { step: 3, title: "Vergi Tahsili", desc: "Vergi tutarı ithalatçı cüzdanından gümrük bakanlığı cüzdanına aktarılır ve ithalat onaylanır." }
        ],
        metrics: { speed: 94, security: 96, costSaving: 80, compliance: 98 }
      },
      {
        id: "ib-3",
        title: "Emtia Finansmanı ve DeFi Borç Havuzları",
        problem: "İhracatçıların hammadde alımı için ihtiyaç duyduğu ticaret finansmanı kredilerine ulaşması uzun sürer ve yüksek teminatlar gerektirir.",
        whyUse: "İhracata konu emtialar (örn: demir cevheri, tahıl) tokenize edilerek DeFi havuzlarında teminat gösterilip kredi çekilir.",
        howToDevelop: "Yoldaki malları temsil eden akıllı konşimento NFT'leri, borç verme platformlarına teminat olarak kilitlenir.",
        realWorldExample: "Centrifuge, gerçek dünya varlıklarını (RWA) DeFi protokollerinde (MakerDAO) teminatlaştırarak kredi sağlamaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($55,000)",
          operatingCost: "Orta (Kredi faizleri)",
          savingRate: "%80 Daha Hızlı Kredi Onayı, Teminat Maliyetlerinde %40 Düşüş",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Yük Tokenizasyonu", desc: "İhracatçı yoldaki demir cevheri yükünü temsil eden NFT'yi çıkarır." },
          { step: 2, title: "Kredi Çekme", desc: "NFT DeFi kredi havuzuna kilitlenir and stabilcoin borç alınır." },
          { step: 3, title: "Kapatma", desc: "İthalatçı malı teslim alıp ödemeyi yaptığında kredi kapatılır, NFT serbest kalır." }
        ],
        metrics: { speed: 92, security: 95, costSaving: 85, compliance: 89 }
      },
      {
        id: "ib-4",
        title: "KOBİ İhracat Destek Mikro-Finansman Havuzları",
        problem: "Küçük ve orta ölçekli işletmelerin (KOBİ) ihracat yaparken maruz kaldığı nakit sıkışıklıkları bankalar tarafından finanse edilmemektedir.",
        whyUse: "Merkeziyetsiz mikro-finansman havuzları sayesinde dünya genelindeki yatırımcılar doğrudan KOBİ ihracat faturalarını fonlar.",
        howToDevelop: "KOBİ ihracat faturaları (invoices) tokenize edilir. Yatırımcılar bu havuzlara likidite sağlayarak faiz geliri elde eder.",
        realWorldExample: "Hiveterminal and InvoiceCoin, fatura finansmanını blockchain üzerinde P2P olarak çözmektedir.",
        costBenefit: {
          setupCost: "Orta ($35,000)",
          operatingCost: "Düşük",
          savingRate: "%30 Daha Düşük Faiz Oranları, KOBİ Finansmana Erişim Hızı 5 Kat Artış",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Fatura Tokenizasyonu", desc: "KOBİ, onaylı ihracat faturasını platformda tokenize eder." },
          { step: 2, title: "Havuz Fonlaması", desc: "Küresel yatırımcılar havuzdan fatura hissesi satın alarak fonlama sağlar." },
          { step: 3, title: "Tahsilat ve Dağıtım", desc: "Yurtdışı alıcı faturayı ödediğinde anapara ve faiz yatırımcılara dağıtılır." }
        ],
        metrics: { speed: 95, security: 93, costSaving: 90, compliance: 84 }
      },
      {
        id: "ib-5",
        title: "Sınır Ötesi Ticarette CBDC Ödeme Protokolü",
        problem: "Farklı para birimlerindeki sınır ötesi transferlerde (SWIFT) muhabir banka kesintileri ve 3-5 günlük gecikmeler yaşanır.",
        whyUse: "Dijital Merkez Bankası Paraları (CBDC) akıllı sözleşmelerle doğrudan cüzdandan cüzdana saniyeler içinde transfer edilir.",
        howToDevelop: "Merkez Bankalarının çıkardığı izinli CBDC tokenleri (örn: e-TRY, e-USD) arasında anlık köprü (bridge) sözleşmesi yazılır.",
        realWorldExample: "mBridge projesi (Çin, BAE, Tayland, HK Merkez Bankaları), CBDC ile sınır ötesi ticareti DLT'de gerçekleştirmektedir.",
        costBenefit: {
          setupCost: "Çok Yüksek ($85,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%99 Transfer Hızı Artışı, SWIFT Masraflarının Sıfırlanması",
          roi: "18 Ay"
        },
        workflow: [
          { step: 1, title: "CBDC Kilit Açma", desc: "İthalatçı kendi Merkez Bankasından dijital CBDC satın alır." },
          { step: 2, title: "Anlık Takas", desc: "Akıllı sözleşme e-USD'yi alıp anlık kurla e-TRY'ye çevirerek satıcıya gönderir." },
          { step: 3, title: "Bakiye Teslimi", desc: "Satıcı kendi yerel cüzdanında CBDC bakiyesini anında görür." }
        ],
        metrics: { speed: 99, security: 98, costSaving: 95, compliance: 99 }
      },
      {
        id: "ib-6",
        title: "Döviz Kuru Riskinden Korunma (FX Hedging) Akıllı Sözleşmesi",
        problem: "İthalatçıların vadeli alımlarda döviz kuru dalgalanmaları nedeniyle zarar etmesi ticari sürdürülebilirliği baltalar.",
        whyUse: "Akıllı sözleşmeler aracı banka olmadan, önceden belirlenmiş kur üzerinden gelecekteki ödemeleri kilitler (FX Forward).",
        howToDevelop: "Chainlink kur oracle'ı kullanan, vade sonunda belirlenen kurdan stabilcoin takasını garanti eden opsiyon kontratı yazılır.",
        realWorldExample: "DeFi opsiyon platformları (Lyra, Hegic), kur hedging işlemleri için akıllı sözleşmeler sunmaktadır.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Kur Riskinden Korunma, Banka Forward Komisyonlarında %80 Düşüş",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Forward Anlaşması", desc: "Taraflar 3 ay sonrası için $1 = 32 TL kuru üzerinden anlaşma açar." },
          { step: 2, title: "Teminat Blokesi", desc: "Her iki taraf kur farkı riskine karşı sözleşmeye teminat stabilcoin yatırır." },
          { step: 3, title: "Vade Sonu Takas", desc: "Vade günü geldiğinde oracle kuru kaç olursa olsun takas 32 TL üzerinden yapılır." }
        ],
        metrics: { speed: 96, security: 95, costSaving: 88, compliance: 90 }
      },
      {
        id: "ib-7",
        title: "Menşe Şahadetnamesi (Certificate of Origin) Doğrulama",
        problem: "İthalatta gümrük vergisi muafiyetinden yararlanmak için kullanılan Menşe Şahadetnamelerinin sahteliği sıkça yaşanır.",
        whyUse: "Menşe belgesi Ticaret Odası tarafından dijital olarak imzalanıp zincire kaydedilerek sahtecilik kesin olarak önlenir.",
        howToDevelop: "Ticaret Odaları cüzdan yetkilendirmesi yapılır. Oda yetkilisi belgenin hash değerini zincire tescil eder.",
        realWorldExample: "Milletlerarası Ticaret Odası (ICC), gümrük belgelerinin blockchain tescili standartlarını hazırlamaktadır.",
        costBenefit: {
          setupCost: "Orta ($20,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Evrak Güvenilirliği, Gümrük Muayene Süresinde 4 Kat Hızlanma",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Menşe Talebi", desc: "Üretici yerel Ticaret Odasından ürün için menşe onayı ister." },
          { step: 2, title: "Oda Onay İmzası", desc: "Ticaret Odası belgenin hash'ini kendi özel anahtarıyla zincire yazar." },
          { step: 3, title: "Gümrük Doğrulaması", desc: "İthalat gümrüğü kodu okutarak belgenin oda tarafından imzalandığını zincirde doğrular." }
        ],
        metrics: { speed: 92, security: 99, costSaving: 75, compliance: 98 }
      },
      {
        id: "ib-8",
        title: "On-Chain KYC/AML Uyumluluk Sicili",
        problem: "Şirketlerin her dış ticaret işleminde bankalar ve finans kuruluşları için mükerrer KYC ve AML (Kara Para Aklama) kontrolleri yapması zaman alır.",
        whyUse: "Şirketler bir kez on-chain doğrulanmış KYC/AML sertifikası (SBT) alır ve bu kimliği tüm finans kurumlarına anında ibraz eder.",
        howToDevelop: "Doğrulanmış KYC denetçileri, şirketin cüzdan adresine devredilemez ve süreli bir KYC/AML SBT'si basar.",
        realWorldExample: "Kleros and Quadrata, Web3 platformları için on-chain uyumluluk ve kimlik sicili çözümleri sunmaktadır.",
        costBenefit: {
          setupCost: "Orta ($25,000)",
          operatingCost: "Düşük (Yıllık yenileme)",
          savingRate: "%90 KYC Süreç Hızlanması, Mükerrer Belge Hazırlama Giderlerinde %70 Tasarrufu",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "KYC Başvurusu", desc: "Şirket gerekli yasal evrakları denetçi kuruma sunar." },
          { step: 2, title: "SBT Kimlik Basımı", desc: "Kurum, şirketin cüzdanına 1 yıl geçerli 'AML Uyumlu' SBT kimliği gönderir." },
          { step: 3, title: "Anlık Kredi Girişi", desc: "Şirket bankaya kredi başvurusu yaptığında cüzdanındaki SBT'yi göstererek KYC'yi saniyede geçer." }
        ],
        metrics: { speed: 97, security: 96, costSaving: 82, compliance: 99 }
      },
      {
        id: "ib-9",
        title: "Çok Uluslu Ortak Girişim Gelir Paylaşımı",
        problem: "Konsorsiyumlar veya ortak girişimlerde (Joint Ventures) elde edilen gelirlerin ortaklar arasında paylaşılması ve muhasebeleştirilmesi aylar sürer.",
        whyUse: "Gelirler ortak hesaba yattığı anda akıllı sözleşme ortaklık payları oranında transferleri otomatik ve anlık yapar.",
        howToDevelop: "Gelir split sözleşmesi yazılır. Ortakların pay oranları (örn: %40, %30, %30) kontrat adresinde sabitlenir.",
        realWorldExample: "DeFi protokollerinde ve NFT projelerinde otomatik telif ve gelir bölüştürme sözleşmeleri yaygın kullanılmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($15,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Şeffaflık, Gelir Dağıtım ve Denetim Giderlerinde %90 Azalma",
          roi: "4 Ay"
        },
        workflow: [
          { step: 1, title: "Müşteri Ödemesi", desc: "Müşteri ortak girişim adına açılan akıllı sözleşmeye ödeme yapar." },
          { step: 2, title: "Pay Dağıtım Tetikleyici", desc: "Ödeme geldiğinde sözleşme otomatik çalışarak payları böler." },
          { step: 3, title: "Transfer", desc: "Ortak A, B ve C firmalarının kurumsal cüzdanlarına payları saniyeler içinde aktarılır." }
        ],
        metrics: { speed: 99, security: 95, costSaving: 92, compliance: 85 }
      },
      {
        id: "ib-10",
        title: "Adil Ticaret (Fair Trade) Tedarik Zinciri Kanıtı",
        problem: "Kahve, kakao veya tekstil ithalatında ürünün gerçekten adil ticaret (Fair Trade) standartlarında üretildiğini kanıtlamak zordur.",
        whyUse: "Çiftçiden alınan ürünlerin her adımı blockchain ile izlenir; ürün üzerindeki QR kod tüketicilere tüm üretim adil ödeme kanıtlarını sunar.",
        howToDevelop: "Çiftçilere yapılan mikro-ödemeler ve kooperatif nakliye evrakları DLT'ye yazılır. Tüketici için doğrulama arayüzü kurulur.",
        realWorldExample: "Starbucks ve Nestle, kahve çekirdeklerinin tarladan bardağa izlenmesi için DLT altyapıları kullanmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($38,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Güvenilir Sürdürülebilirlik İddiası, Marka Değerinde %20 Artış",
          roi: "11 Ay"
        },
        workflow: [
          { step: 1, title: "Çiftçi Satışı", desc: "Afrikalı kakao çiftçisi ürünü sattığında aldığı ödeme makbuzu DLT'ye yazılır." },
          { step: 2, title: "İşleme ve Kargo", desc: "Ürünün fabrikada işlenmesi ve gemiye yüklenmesi işlemleri onaylanır." },
          { step: 3, title: "Tüketici Sorgusu", desc: "Tüketici çikolata paketindeki QR'ı okutarak ödenen adil fiyat kanıtını görür." }
        ],
        metrics: { speed: 88, security: 97, costSaving: 70, compliance: 95 }
      }
    ]
  },
  {
    id: "management-info-systems",
    name: "Yönetim Bilişim Sistemleri",
    icon: "🖥️",
    description: "Kurumsal bilgi güvenliği günlükleri, CRM sadakat tokenleri, BI veri menşe doğrulamaları ve tedarikçi performans skorlamaları.",
    solutions: [
      {
        id: "mis-1",
        title: "Kurumsal Bilgi Güvenliği Denetim Günlükleri",
        problem: "Şirket içi hassas dosyalara yapılan yetkisiz erişimlerin loglarının sistem yöneticileri tarafından silinmesi iç tehditleri gizler.",
        whyUse: "Erişim günlükleri (read/write logs) anlık olarak blokzincire yazılır; veri tabanı yöneticileri dahi bu logları silemez.",
        howToDevelop: "OS/Database denetim yazılımı (Audit Log Daemon), her erişim olayını toplayıp hash'lerini L2 EVM ağına gönderir.",
        realWorldExample: "Siber güvenlik firmaları log bütünlüğü denetimlerinde WORM (Write Once Read Many) alternatifi olarak blockchain kullanır.",
        costBenefit: {
          setupCost: "Orta ($24,000)",
          operatingCost: "Çok Düşük (L2 gas ücretleri)",
          savingRate: "%100 Log Güvenliği, İç Tehdit Tespit Oranlarında %50 Artış",
          roi: "7 Ay"
        },
        workflow: [
          { step: 1, title: "Dosya Erişimi", desc: "Kullanıcı insan kaynakları maaş tablosu dosyasını açar." },
          { step: 2, title: "Log Hash'leme", desc: "Sistem 'Kullanıcı X, Dosya Y'ye erişti' logunu üretir ve anında hash'ler." },
          { step: 3, title: "Zincire Kilitlenme", desc: "Hash değeri blokzincirine bloklanır, böylece log geçmişi manipüle edilemez kılınır." }
        ],
        metrics: { speed: 94, security: 99, costSaving: 78, compliance: 98 }
      },
      {
        id: "mis-2",
        title: "CRM Müşteri İlişkileri Sadakat Tokenları",
        problem: "Klasik CRM sistemlerindeki puanlar sadece o markada geçerlidir, devredilemez ve müşteride gerçek bir sahiplik hissi yaratmaz.",
        whyUse: "Sadakat puanları ERC-20 tokeni olarak basılarak müşterilere gerçek dijital varlık mülkiyeti verilir ve takas imkanı sunulur.",
        howToDevelop: "CRM yazılımı (örn. Salesforce) API ile ERC-20 token kontratına bağlanır. Müşteri alışveriş yaptıkça token mint edilir.",
        realWorldExample: "Socios ve spor kulüpleri, taraftar etkileşim tokenleri (Fan Tokens) ile CRM sadakatini Web3'e taşımıştır.",
        costBenefit: {
          setupCost: "Orta ($30,000)",
          operatingCost: "Düşük (L2 gas fee)",
          savingRate: "%35 Müşteri Etkileşim Artışı, Kampanya Yönetim Giderlerinde %40 Düşüş",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Alışveriş Kaydı", desc: "Müşteri mağazadan alışveriş yapar ve CRM sisteminde işlem onaylanır." },
          { step: 2, title: "Token Minting", desc: "CRM API'si tetiklenir ve müşterinin Web3 cüzdanına 50 sadakat tokeni gönderilir." },
          { step: 3, title: "Kullanım veya Takas", desc: "Müşteri tokenleri mağaza indiriminde kullanır veya borsada başka bir tokene çevirir." }
        ],
        metrics: { speed: 96, security: 95, costSaving: 82, compliance: 85 }
      },
      {
        id: "mis-3",
        title: "BI (İş Zekası) Veri Kaynağı Doğrulama (Data Provenance)",
        problem: "İş zekası panellerinde (PowerBI, Tableau) analiz edilen verilerin kaynağının doğruluğu şüpheliyse yanlış stratejik kararlar alınır.",
        whyUse: "BI raporlarına beslenen ham verilerin toplandığı kaynak ve zaman damgası zincir üstünde doğrulanarak veri manipülasyonu önlenir.",
        howToDevelop: "Veri ambarına (Data Warehouse) giren her veri setinin SHA-256 hash'i alınarak giriş anında DLT'ye tescil edilir.",
        realWorldExample: "Veri bilimi platformları, veri setlerinin bütünlüğünü korumak için blockchain tabanlı veri şeceresi (provenance) modelleri kullanır.",
        costBenefit: {
          setupCost: "Orta ($28,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Veri Güvenilirliği, Hatalı Analizlerden Kaynaklı Zararlarda %30 Düşüş",
          roi: "10 Ay"
        },
        workflow: [
          { step: 1, title: "Veri Girişi", desc: "Fabrika üretim verisi veri ambarına akar ve anında hash değeri üretilir." },
          { step: 2, title: "Provenance Kaydı", desc: "Veri hash'i ve kaynak kimliği blokzincirine 'Veri Şeceresi' olarak tescillenir." },
          { step: 3, title: "BI Raporlama", desc: "PowerBI raporu çalışırken veri hash'ini zincirdekiyle karşılaştırır, veri değiştirilmemişse raporu açar." }
        ],
        metrics: { speed: 90, security: 98, costSaving: 80, compliance: 92 }
      },
      {
        id: "mis-4",
        title: "SBT Tabanlı Personel Performans ve KPI Karnesi",
        problem: "Kurumsal sistemlerdeki personel performans değerlendirmeleri (KPI) yöneticilerin kişisel görüşleriyle yönlendirilebilir.",
        whyUse: "Personelin hedefleri ve gerçekleştirdiği başarılar devredilemez Soulbound Token'lar (SBT) ile cüzdanına işlenerek adil kariyer geçmişi sunar.",
        howToDevelop: "ERC-5192 standardıyla çalışana özel performans SBT kartı basılır. Yıl sonu KPI onayları yöneticilerce onchain imzalanır.",
        realWorldExample: "Web3 tabanlı İK platformları (özel cüzdanlar ve SBT rozetleri), çalışan referans ve performans doğrulamasında kullanılmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($14,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Doğru Kariyer Geçmişi, İK Terfi Değerlendirme Sürelerinde %50 Azalma",
          roi: "5 Ay"
        },
        workflow: [
          { step: 1, title: "KPI Hedefleri", desc: "Yazılımcının yıllık hedefi '3 projede sıfır hata ile kod teslimi' olarak zincire yazılır." },
          { step: 2, title: "Hedef Gerçekleşmesi", desc: "Yazılımcı hedefleri tamamladığında QA ekibi onay imzalarını zincire gönderir." },
          { step: 3, title: "SBT Rozet Güncellemesi", desc: "Çalışanın cüzdanındaki performans kartına otomatik olarak 'Başarı Rozeti' işlenir." }
        ],
        metrics: { speed: 88, security: 99, costSaving: 75, compliance: 90 }
      },
      {
        id: "mis-5",
        title: "Merkeziyetsiz Bulut SLA Denetim Defteri",
        problem: "Bulut depolama sağlayıcılarının (AWS, Azure) vadettiği çalışma süresi (SLA - %99.9 Uptime) taahhütlerini bağımsız denetlemek zordur.",
        whyUse: "Bulut sunucu kesinti logları bağımsız ping sensörlerince DLT'ye yazılır; SLA aşılırsa akıllı sözleşme tazminatı otomatik tahsil eder.",
        howToDevelop: "Chainlink Keepers entegreli ping test akıllı sözleşmesi yazılır. Sunucu kesintisinde sigorta veya ceza tazminatları tetiklenir.",
        realWorldExample: "Merkeziyetsiz depolama projeleri (Sia, Storj), veri saklama kanıtları (Proof of Spacetime) ile SLA'leri onchain denetler.",
        costBenefit: {
          setupCost: "Orta ($22,000)",
          operatingCost: "Düşük",
          savingRate: "%100 Şeffaf SLA Denetimi, Bulut Kesinti Hasarlarında %40 Geri Kazanım",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "SLA Sözleşmesi", desc: "Bulut sağlayıcı ile yapılan %99.9 uptime taahhüdü akıllı sözleşmeye kodlanır." },
          { step: 2, title: "Uptime Pingleri", desc: "3 farklı lokasyondaki oracle sunucuları bulut sunucusunu 1 dakikada bir pingler." },
          { step: 3, title: "Otomatik Ceza", desc: "Sunucu 2 saat kapalı kaldığında sözleşme aylık bulut faturasından kesinti yapar." }
        ],
        metrics: { speed: 92, security: 95, costSaving: 85, compliance: 94 }
      },
      {
        id: "mis-6",
        title: "Tedarikçi SLA Performans Skorlama Defteri",
        problem: "Kurumların çalıştığı onlarca tedarikçinin teslimat süreleri ve ürün kaliteleri satın alma departmanlarınca şeffaf izlenememektedir.",
        whyUse: "Tedarikçilerin her teslimat gecikmesi ve kusurlu ürün oranı zincire işlenerek değiştirilemez bir tedarikçi karne skoru üretilir.",
        howToDevelop: "Depo mal kabul sistemindeki gecikme ve fire oranları akıllı sözleşme formüllerine beslenerek on-chain tedarikçi puanı güncellenir.",
        realWorldExample: "Tedarikçi ilişkileri yönetiminde (SRM) blockchain tabanlı objektif performans analitikleri kullanılmaktadır.",
        costBenefit: {
          setupCost: "Orta ($26,000)",
          operatingCost: "Düşük",
          savingRate: "%20 Tedarikçi Teslimat Performans Artışı, Kalite Uyuşmazlıklarında %35 Düşüş",
          roi: "9 Ay"
        },
        workflow: [
          { step: 1, title: "Teslimat Gecikmesi", desc: "Tedarikçi malzemeyi planlanan tarihten 3 gün geç teslim eder." },
          { step: 2, title: "Onchain Skor Güncelleme", desc: "Depo kabul sistemi gecikmeyi onaylar, akıllı sözleşme tedarikçi skorunu düşürür." },
          { step: 3, title: "İhale Seçimi", desc: "Yeni satın alımlarda sistem ihaledeki en yüksek onchain skora sahip tedarikçiyi önerir." }
        ],
        metrics: { speed: 89, security: 96, costSaving: 90, compliance: 85 }
      },
      {
        id: "mis-7",
        title: "Bilgi Yönetim Sistemi Fikri Mülkiyet Havuzu",
        problem: "Şirket içi yenilikçi fikirlerin, patentlerin ve teknik makalelerin ilk kimin tarafından üretildiği organizasyon içinde belirsizleşebilir.",
        whyUse: "Fikirlerin ve makalelerin yazarları, içerik özet hash'ini zincire kaydederek ilk buluş sahibi olduğunu değiştirilemez kılabilir.",
        howToDevelop: "Kurumsal wiki/bilgi bankası (Knowledge Base), her yeni makale eklenmesinde yazarın cüzdan imzasıyla on-chain damga basar.",
        realWorldExample: "Merkeziyetsiz bilim (DeSci) projeleri, makale ve buluş sahipliğini tescil etmek için DLT veri tabanları kullanır.",
        costBenefit: {
          setupCost: "Düşük ($12,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Fikir Sahipliği Tescili, İç İnovasyon Teşviklerinde %40 Artış",
          roi: "5 Ay"
        },
        workflow: [
          { step: 1, title: "Fikir Girişi", desc: "Mühendis yeni bir üretim metodolojisi makalesini sisteme yazar." },
          { step: 2, title: "Kriptografik İmza", desc: "Mühendis cüzdanı ile makale hash'ini onaylar ve onchain tescil eder." },
          { step: 3, title: "Patent Öncelik Hakkı", desc: "Gelecekteki patent davalarında zincirdeki tarih damgası ilk sahiplik kanıtı sayılır." }
        ],
        metrics: { speed: 93, security: 97, costSaving: 80, compliance: 92 }
      },
      {
        id: "mis-8",
        title: "Çoklu Bulut Erişim Yetkilendirme Defteri (IAM)",
        problem: "Kurumların kullandığı AWS, Google Cloud, Azure gibi farklı bulut sistemlerindeki kullanıcı erişim yetkilerinin kontrolü karmaşıktır ve sızıntı yaratır.",
        whyUse: "Tüm bulut erişim yetkileri (Identity & Access Management) tek bir blokzincir IAM sözleşmesinde tutulur, tek noktadan yönetilir.",
        howToDevelop: "Bulut IAM API'leri, kullanıcının cüzdanındaki yetki SBT rozetlerini sorgulayacak şekilde entegre edilir.",
        realWorldExample: "Siber güvenlik mimarilerinde Sıfır Güven (Zero Trust) erişim yetkilerinin DLT ile yönetimi projeleri bulunmaktadır.",
        costBenefit: {
          setupCost: "Yüksek ($42,000)",
          operatingCost: "Orta (API entegrasyon bakımı)",
          savingRate: "%100 Merkezi IAM Denetimi, Yetkisiz Erişim Vakalarında %95 Azalma",
          roi: "12 Ay"
        },
        workflow: [
          { step: 1, title: "Yetki Talebi", desc: "Veri analisti Google Cloud veri tabanına erişmek için talep açar." },
          { step: 2, title: "On-Chain Yetkilendirme", desc: "Yönetici analistin DID adresine geçici 'Veri Erişim SBT'si basar." },
          { step: 3, title: "Bulut Girişi", desc: "Google Cloud, giriş anında analistin cüzdanındaki SBT'yi kontrol ederek erişim verir." }
        ],
        metrics: { speed: 91, security: 99, costSaving: 75, compliance: 96 }
      },
      {
        id: "mis-9",
        title: "Kurumsal Sosyal Sorumluluk Bütçe Takip Defteri",
        problem: "Şirketlerin kurumsal sosyal sorumluluk (KSS) projelerine ayırdığı bağış ve bütçelerin hedeflerine ulaşıp ulaşmadığı denetlenemez.",
        whyUse: "Bağış bütçesi akıllı sözleşme ile doğrudan hedeflenen okul veya çevre derneğinin cüzdanına gider, harcama logları zincirde izlenir.",
        howToDevelop: "Bütçe yönetim sözleşmesi yazılır. Harcama makbuzları ve onay süreçleri onchain şeffaf olarak kamuoyuna açılır.",
        realWorldExample: "Binance Charity ve UNICEF, bağış fonlarının şeffaf ve doğrudan dağıtımı için blockchain cüzdanları kullanmaktadır.",
        costBenefit: {
          setupCost: "Düşük ($15,000)",
          operatingCost: "Çok Düşük",
          savingRate: "%100 Bütçe Şeffaflığı, Kurumsal İtibar ve Güven Oranlarında %45 Artış",
          roi: "6 Ay"
        },
        workflow: [
          { step: 1, title: "KSS Bütçe Kilidi", desc: "Şirket yıllık çevre projesi bütçesini akıllı sözleşmeye yatırır." },
          { step: 2, title: "Fidan Alım Talebi", desc: "Tohum vakfı bütçeden fidan alımı için talepte bulunur ve faturasını zincire ekler." },
          { step: 3, title: "Şeffaf Ödeme", desc: "Sözleşme fidan satıcısına ödemeyi doğrudan yapar; şirket harcamayı anlık denetler." }
        ],
        metrics: { speed: 95, security: 97, costSaving: 88, compliance: 90 }
      },
      {
        id: "mis-10",
        title: "Dijital Varlık Yönetimi (DAM) ve Telif Hakları",
        problem: "Şirketlerin ürettiği medya, görsel ve dijital içeriklerin telif haklarının takibi ve üçüncü taraflara satışı hantaldır.",
        whyUse: "Her dijital medya varlığı NFT olarak tescillenir. Kullanım lisansları ve telif ödemeleri akıllı sözleşmelerle otomatik tahsil edilir.",
        howToDevelop: "Medya dosyaları IPFS'e şifreli atılır. ERC-721 lisans NFT'sini satın alan kullanıcılar dosyanın kilit açma şifresine erişir.",
        realWorldExample: "Adobe, içerik kimliği (Content Authenticity Initiative) doğrulamalarında blockchain veri imzalama standartları kullanmaktadır.",
        costBenefit: {
          setupCost: "Orta ($26,000)",
          operatingCost: "Düşük (Pazar yeri komisyonları)",
          savingRate: "%100 Telif Koruma, Dijital Varlık Lisans Satış Hızında %70 Artış",
          roi: "8 Ay"
        },
        workflow: [
          { step: 1, title: "Medya NFT Kaydı", desc: "Tasarımcı şirketin yeni reklam videosunu lisans NFT'si olarak basar." },
          { step: 2, title: "Lisans Satın Alma", desc: "Distribütör firma reklamı yayınlamak için lisans NFT'sini satın alır." },
          { step: 3, title: "Telif Dağıtımı", desc: "Akıllı sözleşme gelen ödemeyi tasarımcı (%20) ve şirket (%80) hesaplarına split eder." }
        ],
        metrics: { speed: 93, security: 98, costSaving: 85, compliance: 90 }
      }
    ]
  }
];
