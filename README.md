# 🍕 Domino's Pizza - Online Sifariş Platformu

Modern, responsive və çoxdilli Domino's Pizza online sifariş platformu. React, Redux və Vite istifadə edərək hazırlanmışdır.

## 🌟 Əsas Xüsusiyyətlər

### 🛒 Sifariş Sistemi
- **Səbət funksiyası** - Məhsulları səbətə əlavə edin və miqdarını dəyişin
- **Məhsul detalları** - Ölçü, kəsim, xəmir seçimləri
- **Half & Half pizzalar** - İki fərqli pizza yarım-yarım
- **Kampaniyalar** - Xüsusi təkliflər və paketlər
- **Sifariş izləmə** - Sifarişinizin statusunu izləyin

### 🌍 Çoxdilli Dəstək
- **3 dil dəstəyi**: Azərbaycan, İngilis, Rus
- **Avtomatik dil aşkarlama** - Brauzer dilinə görə
- **Dinamik tərcümə** - Bütün mətnlər tərcümə edilir
- **RTL dəstəyi** - Sağdan sola yazılan dillər üçün

### 👤 İstifadəçi Sistemi
- **Login/Register** - İstifadəçi qeydiyyatı
- **Profil idarəetməsi** - Şəxsi məlumatlar və ünvan
- **Sevimlilər** - Bəyəndiyiniz məhsulları saxlayın
- **Sifariş tarixçəsi** - Keçmiş sifarişlərinizi görün

### 📱 Responsive Dizayn
- **Mobile-first** - Mobil cihazlar üçün optimallaşdırılmış
- **Tablet dəstəyi** - Orta ölçülü ekranlar üçün
- **Desktop optimizasiyası** - Böyük ekranlar üçün
- **Touch-friendly** - Toxunma cihazları üçün

### 🗺️ Xəritə və Lokasiya
- **Leaflet xəritəsi** - Mağaza lokasiyalarını görün
- **Ünvan axtarışı** - Çatdırılma ünvanını tapın
- **Mağaza məlumatları** - İş saatları və əlaqə məlumatları

## 🛠️ Texnologiyalar

### Frontend
- **React 19** - Modern UI kitabxanası
- **Vite** - Sürətli build aləti
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animasiya və keçid effektləri

### State Management
- **Redux Toolkit** - Mərkəzi state idarəetməsi
- **React Redux** - React-Redux inteqrasiyası

### Routing & Navigation
- **React Router DOM** - Səhifə naviqasiyası
- **React Router** - Route idarəetməsi

### Internationalization
- **i18next** - Beynəlxalqlaşdırma kitabxanası
- **react-i18next** - React inteqrasiyası
- **i18next-browser-languagedetector** - Avtomatik dil aşkarlama

### UI Components
- **Lucide React** - İkonlar
- **React Icons** - Əlavə ikonlar
- **React Hot Toast** - Bildirişlər
- **React Toastify** - Toast mesajları

### Forms & Input
- **React International Phone** - Telefon nömrəsi inputu
- **Country Flag Icons** - Ölkə bayraqları

### Maps & Location
- **Leaflet** - Xəritə kitabxanası
- **React Leaflet** - React inteqrasiyası

### Animation & Effects
- **Swiper** - Slider və carousel
- **React Intersection Observer** - Scroll animasiyaları
- **Next Themes** - Dark/Light mode dəstəyi

### Development Tools
- **ESLint** - Kod keyfiyyəti
- **Prettier** - Kod formatlaşdırma
- **Vite** - Development server

## 📁 Layihə Strukturu

```
src/
├── components/          # UI komponentləri
│   ├── CartComponents/  # Səbət komponentləri
│   ├── DealModal/       # Kampaniya modalları
│   ├── HalfHalf/        # Half & Half komponentləri
│   └── PizzaModal/      # Pizza modal komponentləri
├── pages/              # Səhifələr
│   ├── Home.jsx        # Ana səhifə
│   ├── Menu.jsx        # Menyu səhifəsi
│   ├── Cart.jsx        # Səbət səhifəsi
│   └── ProfilePage.jsx # Profil səhifəsi
├── store/              # Redux store
│   ├── authSlice.js    # İstifadəçi autentifikasi
│   ├── cartSlice.js    # Səbət idarəetməsi
│   └── wishlistSlice.js # Sevimlilər idarəetməsi
├── services/           # API xidmətləri
│   └── DominoAPI.js    # API çağırışları
├── utils/              # Yardımçı funksiyalar
│   ├── localStorage.js # Local storage idarəetməsi
│   └── getLocalizedText.js # Tərcümə funksiyaları
├── locals/             # Tərcümə faylları
│   ├── az.json         # Azərbaycan dili
│   ├── en.json         # İngilis dili
│   └── ru.json         # Rus dili
└── assets/             # Statik fayllar
    └── img/            # Şəkillər və media
```

## 🚀 Quraşdırma və İşə Salma

### Tələblər
- Node.js (v16 və ya daha yeni)
- npm və ya yarn

### Quraşdırma
```bash
# Repository-ni klonlayın
git clone https://github.com/Alimaliyev23/dominospizza.git

# Layihə qovluğuna keçin
cd dominospizza

# Dependencies quraşdırın
npm install

# Development server-i işə salın
npm run dev

# Production build yaradın
npm run build

# Build-i preview edin
npm run preview
```

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Build preview
- `npm run lint` - ESLint yoxlama

## 🌐 Deployment

Layihə Netlify üçün hazırlanmışdır:

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   - API base URL (tələb olunarsa)

3. **Redirects**
   - `public/_redirects` faylı SPA routing üçün

## 🔧 Konfiqurasiya

### API Konfiqurasiyası
`src/services/DominoAPI.js` faylında API endpoint-ləri konfiqurasiya edilir.

### Dil Konfiqurasiyası
`src/i18n.js` faylında dil konfiqurasiyası və `src/locals/` qovluğunda tərcümə faylları.

### Styling
`src/index.css` və `tailwind.config.js` fayllarında styling konfiqurasiyası.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Dizayn Sistemi

### Rənglər
- **Primary**: #003752 (Tünd mavi)
- **Secondary**: #0078BC (Açıq mavi)
- **Accent**: #E31837 (Qırmızı)
- **Success**: #10B981 (Yaşıl)
- **Warning**: #F59E0B (Sarı)
- **Error**: #EF4444 (Qırmızı)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: 2xl, xl, lg, base, sm
- **Body**: base, sm, xs

## 🔒 Təhlükəsizlik

- **Input Validation** - Bütün inputlar təsdiqlənir
- **XSS Protection** - Cross-site scripting qorunması
- **CSRF Protection** - Cross-site request forgery qorunması
- **Secure Headers** - Təhlükəsizlik başlıqları

## 🧪 Test

```bash
# Lint yoxlama
npm run lint

# Type checking (TypeScript istifadə edilərsə)
npm run type-check
```

## 📈 Performans

- **Code Splitting** - Səhifələr üzrə kod bölünməsi
- **Lazy Loading** - Lazy komponent yükləməsi
- **Image Optimization** - Şəkil optimizasiyası
- **Bundle Analysis** - Bundle ölçüsü analizi

## 🤝 Töhfə Vermə

1. Fork edin
2. Feature branch yaradın (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request yaradın

## 📄 Lisenziya

Bu layihə MIT lisenziyası altında lisenziyalaşdırılmışdır.

## 👨‍💻 Müəllif

**Alimaliyev23**
- GitHub: [@Alimaliyev23](https://github.com/Alimaliyev23)

## 🙏 Təşəkkürlər

- React komandası
- Redux komandası
- Tailwind CSS komandası
- Bütün açıq mənbə kitabxanaların müəllifləri

---

**Domino's Pizza** - Sevimli pizzanızı seçin, online sifariş edin! 🍕✨