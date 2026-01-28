# Vercel Dağıtım ve PostgreSQL Kurulum Rehberi

Bu proje Vercel'e deploy edilmek üzere hazırlanmıştır. Vercel üzerinde kalıcı veri saklamak için Vercel Postgres veya benzeri bir PostgreSQL veritabanı kullanılması gerekmektedir.

## 1. Hazırlık
Projeniz şu an PostgreSQL kullanacak şekilde yapılandırılmıştır.

## 2. Vercel Projesi Oluşturma
1. Vercel dashboard'unuzda "Add New..." -> "Project" seçin.
2. GitHub reponuzu bağlayın.
3. Proje ayarlarında **Environment Variables** kısmına henüz dokunmayın.

## 3. Veritabanı (Vercel Postgres) Kurulumu
1. Vercel proje sayfasında **Storage** sekmesine gidin.
2. "Connect Store" -> "Postgres" seçeneğini seçin.
3. Yeni bir veritabanı oluşturun (Region olarak Frankfurt/Europe önerilir).
4. Oluşturulduktan sonra sol menüden `.env.local` sekmesine gidin.
5. Burada `POSTGRES_PRISMA_URL` ve `POSTGRES_URL_NON_POOLING` gibi değişkenleri göreceksiniz.
6. "Show secret" diyerek `POSTGRES_PRISMA_URL` değerini kopyalayın.

## 4. Environment Variables Ayarlama
Vercel'de **Settings > Environment Variables** kısmına giderek şu değişkenleri ekleyin:

| Key | Value | Açıklama |
|-----|-------|----------|
| `DATABASE_URL` | `...` | Vercel Postgres `POSTGRES_PRISMA_URL` değerini buraya yapıştırın. |
| `NEXTAUTH_SECRET` | `...` | Rastgele uzun bir string (örn: `openssl rand -base64 32`). |
| `NEXTAUTH_URL` | `https://proje-adiniz.vercel.app` | Projenizin canlı URL'i. (Deploy sonrası güncelleyin). |

## 5. Veritabanı Şeması ve Seed (İlk Veri)
Projenizi deploy etmeden önce veya ettikten hemen sonra veritabanı tablolarını oluşturmanız gerekir.

Vercel Build sırasında migration çalıştırmak için `package.json` içindeki `build` komutu şu şekilde ayarlanmıştır (varsayılan):
`"build": "next build"`

**Önerilen Yöntem (Vercel CLI veya Local):**
Bilgisayarınızda `.env` dosyanızdaki `DATABASE_URL`'i Vercel Postgres URL'i ile değiştirip şu komutu çalıştırarak tabloları oluşturabilirsiniz:

```bash
npx prisma migrate deploy
```

Ardından admin kullanıcısını oluşturmak için seed işlemini tetikleyin: (Opsiyonel, admin panelinden de kayıt olabilirsiniz eğer açık ise, ama bu projede admin seed ile geliyor)

```bash
node prisma/seed.js
```

Eğer yerel bilgisayarınızdan Vercel veritabanına erişemiyorsanız, Vercel panelinde "Build Command"i geçici olarak şu şekilde değiştirip bir deploy çıkabilirsiniz:
`npx prisma migrate deploy && node prisma/seed.js && next build`
*(Bu işlemden sonra tekrar `next build` olarak değiştirmeyi unutmayın)*

## 6. Önemli Notlar
- **SQLite vs Postgres:** Proje yerel geliştirmede SQLite, prodüksiyonda PostgreSQL kullanacak şekilde ayarlandıysa `prisma/schema.prisma` dosyasındaki `provider` alanını kontrol edin. Şu an `postgresql` olarak ayarlıdır.
- **Admin Girişi:** Varsayılan admin: `admin@example.com` / `admin123`. Giriş yaptıktan sonra şifrenizi değiştirmeniz önerilir.

---
Made by AMST
