# 🍕 Domino's Pizza - Online Ordering Platform

Modern, responsive, and multilingual Domino's Pizza online ordering platform. Built with React, Redux, and Vite.

## 🌟 Key Features

### 🛒 Ordering System
- **Shopping Cart** - Add products to cart and modify quantities
- **Product Details** - Size, cut, and dough selection options
- **Half & Half Pizzas** - Two different pizzas half and half
- **Campaigns** - Special offers and packages
- **Order Tracking** - Track your order status

### 🌍 Multilingual Support
- **3 Language Support**: Azerbaijani, English, Russian
- **Automatic Language Detection** - Based on browser language
- **Dynamic Translation** - All texts are translated
- **RTL Support** - For right-to-left languages

### 👤 User System
- **Login/Register** - User registration
- **Profile Management** - Personal information and address
- **Wishlist** - Save your favorite products
- **Order History** - View your past orders

### 📱 Responsive Design
- **Mobile-first** - Optimized for mobile devices
- **Tablet Support** - For medium-sized screens
- **Desktop Optimization** - For large screens
- **Touch-friendly** - For touch devices

### 🗺️ Maps & Location
- **Leaflet Map** - View store locations
- **Address Search** - Find delivery address
- **Store Information** - Working hours and contact details

## 🛠️ Technologies

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation and transition effects

### State Management
- **Redux Toolkit** - Centralized state management
- **React Redux** - React-Redux integration

### Routing & Navigation
- **React Router DOM** - Page navigation
- **React Router** - Route management

### Internationalization
- **i18next** - Internationalization library
- **react-i18next** - React integration
- **i18next-browser-languagedetector** - Automatic language detection

### UI Components
- **Lucide React** - Icons
- **React Icons** - Additional icons
- **React Hot Toast** - Notifications
- **React Toastify** - Toast messages

### Forms & Input
- **React International Phone** - Phone number input
- **Country Flag Icons** - Country flags

### Maps & Location
- **Leaflet** - Map library
- **React Leaflet** - React integration

### Animation & Effects
- **Swiper** - Slider and carousel
- **React Intersection Observer** - Scroll animations
- **Next Themes** - Dark/Light mode support

### Development Tools
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Vite** - Development server

## 📁 Project Structure

```
src/
├── components/          # UI components
│   ├── CartComponents/  # Cart components
│   ├── DealModal/       # Campaign modals
│   ├── HalfHalf/        # Half & Half components
│   └── PizzaModal/      # Pizza modal components
├── pages/              # Pages
│   ├── Home.jsx        # Home page
│   ├── Menu.jsx        # Menu page
│   ├── Cart.jsx        # Cart page
│   └── ProfilePage.jsx # Profile page
├── store/              # Redux store
│   ├── authSlice.js    # User authentication
│   ├── cartSlice.js    # Cart management
│   └── wishlistSlice.js # Wishlist management
├── services/           # API services
│   └── DominoAPI.js    # API calls
├── utils/              # Helper functions
│   ├── localStorage.js # Local storage management
│   └── getLocalizedText.js # Translation functions
├── locals/             # Translation files
│   ├── az.json         # Azerbaijani language
│   ├── en.json         # English language
│   └── ru.json         # Russian language
└── assets/             # Static files
    └── img/            # Images and media
```

## 🚀 Installation and Setup

### Requirements
- Node.js (v16 or newer)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Alimaliyev23/dominospizza.git

# Navigate to project directory
cd dominospizza

# Install dependencies
npm install

# Start development server
npm run dev

# Create production build
npm run build

# Preview build
npm run preview
```

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Build preview
- `npm run lint` - ESLint check

## 🌐 Deployment

The project is configured for Netlify:

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   - API base URL (if required)

3. **Redirects**
   - `public/_redirects` file for SPA routing

## 🔧 Configuration

### API Configuration
API endpoints are configured in `src/services/DominoAPI.js` file.

### Language Configuration
Language configuration in `src/i18n.js` file and translation files in `src/locals/` directory.

### Styling
Styling configuration in `src/index.css` and `tailwind.config.js` files.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- **Primary**: #003752 (Dark blue)
- **Secondary**: #0078BC (Light blue)
- **Accent**: #E31837 (Red)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Yellow)
- **Error**: #EF4444 (Red)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: 2xl, xl, lg, base, sm
- **Body**: base, sm, xs

## 🔒 Security

- **Input Validation** - All inputs are validated
- **XSS Protection** - Cross-site scripting protection
- **CSRF Protection** - Cross-site request forgery protection
- **Secure Headers** - Security headers

## 🧪 Testing

```bash
# Lint check
npm run lint

# Type checking (if TypeScript is used)
npm run type-check
```

## 📈 Performance

- **Code Splitting** - Code splitting by pages
- **Lazy Loading** - Lazy component loading
- **Image Optimization** - Image optimization
- **Bundle Analysis** - Bundle size analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Alimaliyev23**
- GitHub: [@Alimaliyev23](https://github.com/Alimaliyev23)

## 🙏 Acknowledgments

- React team
- Redux team
- Tailwind CSS team
- All open source library authors

---

**Domino's Pizza** - Choose your favorite pizza, order online! 🍕✨
