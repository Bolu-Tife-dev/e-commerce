# 🛍️ E-Commerce Store - Next.js

A modern, professional e-commerce application built with **Next.js 14**, **Tailwind CSS**, **JavaScript**, and the **DummyJSON API**.

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse 100+ products with beautiful cards
- **Product Details** - Comprehensive product pages with images, descriptions, and specifications
- **Shopping Cart** - Full-featured cart with quantity management
- **Categories** - Browse products organized by categories
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### 💅 UI/UX
- **Modern Design** - Clean, professional interface with Tailwind CSS
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - Beautiful loading indicators
- **Empty States** - Helpful messages when no data is available

### ⚡ Performance
- **Next.js 14 App Router** - Latest features and optimizations
- **Image Optimization** - Automatic image optimization
- **Server Components** - Improved performance
- **No-Store Caching** - Always fresh data from API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**
```bash
cd e-commerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! Your e-commerce store is now running! 🎉

## 📁 Project Structure

```
e-commerce/
├── app/                        # Next.js App Router
│   ├── layout.js              # Root layout
│   ├── page.js                # Homepage
│   ├── globals.css            # Global styles
│   ├── favicon.ico            # Favicon
│   ├── products/
│   │   ├── page.js            # Products listing
│   │   └── [id]/page.js       # Product detail
│   ├── categories/
│   │   ├── page.js            # Categories listing
│   │   └── [slug]/page.js     # Category products
│   └── cart/
│       └── page.js            # Shopping cart
│
├── components/                 # React components
│   ├── Navbar.js              # Navigation bar
│   ├── Footer.js              # Footer
│   ├── Hero.js                # Hero section
│   ├── ProductCard.js         # Product card
│   ├── ProductGrid.js         # Products grid
│   └── AddToCartButton.js     # Add to cart button
│
├── lib/                        # Utility functions
│   ├── api.js                 # DummyJSON API functions
│   └── supabase.js            # Supabase client (optional)
│
├── public/                     # Static assets
│
├── package.json               # Dependencies
├── next.config.mjs            # Next.js configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
├── postcss.config.mjs         # PostCSS configuration
├── eslint.config.mjs          # ESLint configuration
├── jsconfig.json              # JavaScript configuration
└── .gitignore                 # Git ignore rules
```

## 🎯 Pages

### Homepage (`/`)
- Hero banner with call-to-action
- Featured products grid
- Trust badges and features section

### Products Page (`/products`)
- Complete product listing (100+ products)
- Product count display
- Grid layout with filters

### Product Detail (`/products/[id]`)
- Product image gallery
- Detailed product information
- Add to cart functionality
- Price, ratings, and stock status
- Warranty and shipping information

### Categories Page (`/categories`)
- All product categories
- Category cards with icons
- Navigate to filtered products

### Category Detail (`/categories/[slug]`)
- Products filtered by category
- Category-specific header
- Same grid layout as products page

### Shopping Cart (`/cart`)
- Cart items with thumbnails
- Quantity adjustment
- Item removal
- Order summary with totals
- Tax and shipping calculations
- Empty cart state

## 🎨 Customization

### Change Brand Name

Edit `components/Navbar.js` and `components/Footer.js`:
```javascript
<span className="text-2xl font-bold">YourBrand</span>
```

### Change Colors

Edit `tailwind.config.mjs`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-color',
    700: '#your-color',
    // ... etc
  }
}
```

### Modify Hero Section

Edit `components/Hero.js` to change:
- Heading and subheading text
- Button labels and links
- Background gradient
- Statistics

## 🔌 API Integration

This project uses the [DummyJSON API](https://dummyjson.com) for product data.

### Available API Functions

Located in `lib/api.js`:

```javascript
// Get paginated products
fetchProducts(limit, skip)

// Get single product
fetchProductById(id)

// Get all categories
fetchCategories()

// Get products by category
fetchProductsByCategory(category)

// Search products
searchProducts(query)
```

### API Endpoints Used

```
GET /products?limit=20&skip=0     # Get products with pagination
GET /products/{id}                 # Get single product
GET /products/categories           # Get all categories
GET /products/category/{category}  # Get products by category
GET /products/search?q={query}     # Search products
```

## 💾 Supabase Integration (Optional)

The project includes Supabase setup for database features.

### Setup Steps

1. **Create a Supabase account** at [supabase.com](https://supabase.com)

2. **Create a new project**

3. **Get your credentials**
   - Project URL
   - Anon/Public Key

4. **Create environment file**
```bash
# Create .env.local file
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. **Create cart table** in Supabase SQL Editor:

```sql
CREATE TABLE cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX cart_user_id_idx ON cart(user_id);
```

6. **Enable Row Level Security** (optional):

```sql
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own cart"
  ON cart FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);
```

### Supabase Functions

Located in `lib/supabase.js`:

```javascript
getCart(userId)                    // Get user's cart items
addToCart(userId, productId, qty)  // Add item to cart
removeFromCart(cartItemId)         // Remove cart item
updateCartQuantity(cartItemId, qty)// Update item quantity
clearCart(userId)                  // Clear all cart items
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (if using Supabase)
5. Deploy!

### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy!

### Other Platforms

Compatible with:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting

## 🧪 Testing Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000

# Test features:
✅ Browse products
✅ View product details
✅ Add items to cart
✅ Update cart quantities
✅ Remove cart items
✅ Browse categories
✅ Navigate between pages
```

## 🔧 Troubleshooting

### Port already in use
```bash
npm run dev -- -p 3001
```

### Images not loading
- Check internet connection
- Verify `next.config.mjs` has correct image domains
- Ensure DummyJSON API is accessible

### Cart not persisting
- Check browser localStorage is enabled
- Look for console errors
- Try a different browser

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## 📚 Tech Stack Details

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework | 14.2.5 |
| **React** | UI library | 18.3.1 |
| **Tailwind CSS** | Styling | 3.4.4 |
| **JavaScript** | Programming language | ES6+ |
| **DummyJSON API** | Product data | Latest |
| **Supabase** | Backend (optional) | 2.39.0 |

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DummyJSON API Docs](https://dummyjson.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🌟 Features Roadmap

### Phase 1 (Current)
- ✅ Product listing
- ✅ Product details
- ✅ Shopping cart (localStorage)
- ✅ Categories
- ✅ Responsive design

### Phase 2 (Future)
- [ ] User authentication
- [ ] User profiles
- [ ] Order history
- [ ] Product search
- [ ] Product filters
- [ ] Wishlist
- [ ] Product reviews

### Phase 3 (Advanced)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Real-time updates
- [ ] Multi-currency support

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

If you have any questions or need help:
- Check this README
- Review the code comments
- Check official documentation for each technology

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Product data from [DummyJSON](https://dummyjson.com)
- Icons from [Heroicons](https://heroicons.com)

---

Made with ❤️ using Next.js, Tailwind CSS, JavaScript, and DummyJSON API

**Happy Shopping! 🛍️**