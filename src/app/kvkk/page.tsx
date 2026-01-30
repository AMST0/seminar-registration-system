/**
 * KVKK Aydınlatma Metni Sayfası
 * Made by AMST → https://ataberkdudu.info
 * 
 * 6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmıştır.
 * Kaynak: https://www.kvkk.gov.tr
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Seminer Kayıt Sistemi',
  description: '6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-stone-900 text-white py-4 sm:py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-4 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Geri Dön
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-2">
            6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="bg-white shadow-sm">
          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 text-stone-700 text-sm sm:text-base leading-relaxed">
            
            {/* Giriş */}
            <section>
              <p className="text-stone-600">
                İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10. maddesi ile 
                Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ kapsamında 
                veri sorumlusu sıfatıyla tarafımızca hazırlanmıştır.
              </p>
            </section>

            {/* Veri Sorumlusu */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                1. Veri Sorumlusu
              </h2>
              <p>
                Kişisel verileriniz; veri sorumlusu olarak, seminer kayıt sistemi yönetimi tarafından aşağıda 
                açıklanan kapsamda işlenebilecektir. KVKK uyarınca veri sorumlusu, kişisel verilerin işleme 
                amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden 
                sorumlu olan gerçek veya tüzel kişidir.
              </p>
            </section>

            {/* İşlenen Kişisel Veriler */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                2. İşlenen Kişisel Veriler
              </h2>
              <p className="mb-3">
                Seminer kayıt işlemleri kapsamında aşağıdaki kişisel verileriniz işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası</li>
                <li><strong>İşlem Bilgileri:</strong> Kayıt tarihi ve saati</li>
              </ul>
            </section>

            {/* İşleme Amaçları */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                3. Kişisel Verilerin İşlenme Amaçları
              </h2>
              <p className="mb-3">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Seminer kayıt işlemlerinin gerçekleştirilmesi</li>
                <li>Seminer ile ilgili bilgilendirme yapılması</li>
                <li>Seminer organizasyonunun planlanması ve yönetilmesi</li>
                <li>Katılımcı listelerinin oluşturulması</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </section>

            {/* Hukuki Sebepler */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri
              </h2>
              <p className="mb-3">
                Kişisel verileriniz, KVKK'nın 5. maddesi kapsamında aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Açık Rıza:</strong> Seminer kaydı sırasında KVKK aydınlatma metnini onaylayarak 
                  açık rızanızı vermektesiniz.
                </li>
                <li>
                  <strong>Sözleşmenin İfası:</strong> Seminer hizmetinin sunulabilmesi için gerekli olan 
                  kişisel verilerin işlenmesi.
                </li>
                <li>
                  <strong>Meşru Menfaat:</strong> Seminer organizasyonunun etkin bir şekilde yürütülmesi 
                  için gerekli işlemler.
                </li>
              </ul>
            </section>

            {/* Aktarım */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                5. Kişisel Verilerin Aktarılması
              </h2>
              <p>
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda; 
                seminer organizatörlerine, yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına 
                aktarılabilecektir. Verileriniz yurt dışına aktarılmamaktadır.
              </p>
            </section>

            {/* Saklama Süresi */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                6. Kişisel Verilerin Saklanma Süresi
              </h2>
              <p>
                Kişisel verileriniz, işleme amaçlarının gerektirdiği süre boyunca ve her halükarda 
                yasal saklama süreleri boyunca muhafaza edilecektir. Seminer kayıt verileri, seminer 
                tarihinden itibaren <strong>1 (bir) yıl</strong> süreyle saklanacak ve bu sürenin sonunda 
                güvenli bir şekilde silinecek veya anonim hale getirilecektir.
              </p>
            </section>

            {/* Haklar */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                7. İlgili Kişinin Hakları
              </h2>
              <p className="mb-3">
                KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>Düzeltme, silme veya yok etme işlemlerinin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            {/* Başvuru */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                8. Başvuru Yöntemi
              </h2>
              <p className="mb-3">
                Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi tespit edici gerekli bilgiler ile 
                KVKK'nın 11. maddesinde belirtilen haklardan hangisini kullanmayı talep ettiğinize ilişkin 
                açıklamalarınızı içeren talebinizi aşağıdaki yöntemlerle iletebilirsiniz:
              </p>
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <p className="text-sm">
                  <strong>E-posta:</strong> Seminer kayıt sayfasında belirtilen iletişim e-posta adresine 
                  "Kişisel Verilerin Korunması Kanunu Bilgi Talebi" konulu e-posta göndererek başvurabilirsiniz.
                </p>
              </div>
            </section>

            {/* Güncelleme */}
            <section>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide mb-3 border-l-4 border-rose-500 pl-3">
                9. Aydınlatma Metninin Güncellenmesi
              </h2>
              <p>
                İşbu aydınlatma metni, yasal düzenlemeler ve veri işleme politikalarımızdaki değişiklikler 
                doğrultusunda güncellenebilir. Güncel metin her zaman bu sayfada yayınlanacaktır.
              </p>
            </section>

            {/* Footer Note */}
            <section className="pt-6 border-t border-stone-200">
              <p className="text-xs text-stone-500 text-center">
                Bu metin, 6698 Sayılı Kişisel Verilerin Korunması Kanunu ve ilgili mevzuat kapsamında 
                hazırlanmıştır. Daha fazla bilgi için{' '}
                <a 
                  href="https://www.kvkk.gov.tr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  www.kvkk.gov.tr
                </a>
                {' '}adresini ziyaret edebilirsiniz.
              </p>
              <p className="text-xs text-stone-400 text-center mt-2">
                Son güncelleme: Ocak 2026
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[10px] uppercase tracking-widest">© 2026 Seminer Kayıt Sistemi</p>
          <a
            href="https://ataberkdudu.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-stone-500 hover:text-rose-400 transition-colors uppercase tracking-widest"
          >
            Made by AMST
          </a>
        </div>
      </footer>
    </div>
  );
}
