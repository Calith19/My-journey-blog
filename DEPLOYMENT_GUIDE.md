# Academic Portfolio - Deployment Guide

A professional academic portfolio website built with React, designed for easy deployment to static hosting platforms like Netlify, Vercel, or GitHub Pages.

## 🚀 Quick Deployment

### Deploy to Netlify (Recommended)

1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Option A: Drag & Drop Deployment**
   ```bash
   cd frontend
   yarn build
   ```
   Then drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

3. **Option B: CLI Deployment**
   ```bash
   cd frontend
   yarn deploy:netlify
   ```

4. **Option C: Git Integration**
   - Push your code to GitHub
   - Connect GitHub repo to Netlify
   - Set build command: `yarn build`
   - Set publish directory: `build`

### Deploy to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Option A: CLI Deployment**
   ```bash
   cd frontend
   yarn build
   vercel --prod
   ```

3. **Option B: Git Integration**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Auto-deploys on every commit

### Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd frontend
   yarn add --dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "yarn build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   yarn deploy
   ```

## 🛠 Local Development

### Prerequisites
- Node.js 16+ 
- Yarn package manager

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd academic-portfolio

# Navigate to frontend
cd frontend

# Install dependencies
yarn install

# Start development server
yarn start
```

Your site will be available at `http://localhost:3000`

### Build for Production
```bash
# Create optimized production build
yarn build

# Test the production build locally
yarn serve
```

## 📝 Customization Guide

### 1. Personal Information
Edit `/frontend/src/data/portfolio.json`:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "bio": "Your professional bio...",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, State"
  }
}
```

### 2. Academic Background
Update the `academic` array in `portfolio.json`:

```json
{
  "academic": [
    {
      "degree": "Ph.D. in Computer Science",
      "field": "Machine Learning",
      "institution": "Stanford University",
      "year": "2020-2024",
      "gpa": "3.9/4.0"
    }
  ]
}
```

### 3. Blog Posts
Edit `/frontend/src/data/blog.json`:

```json
{
  "posts": [
    {
      "id": "unique-slug",
      "title": "Your Blog Post Title",
      "category": "Research|Personal|Industry|News",
      "date": "2024-12-20T00:00:00.000Z",
      "excerpt": "Brief description...",
      "content": "Full blog post content...",
      "tags": ["tag1", "tag2"],
      "author": "Your Name"
    }
  ]
}
```

### 4. Styling & Branding
- **Logo**: Update in `/frontend/src/components/Layout.jsx`
- **Colors**: Modify Tailwind config in `/frontend/tailwind.config.js`
- **Fonts**: Update in `/frontend/src/index.css`

### 5. Images
- Place images in `/frontend/public/images/`
- Update image paths in your data files
- Recommended: profile photo at `/frontend/public/images/profile.jpg`

## 🔧 Advanced Configuration

### Environment Variables
For production builds, you can add environment variables:

**`.env.production`**:
```
REACT_APP_SITE_URL=https://yoursite.com
REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

### SEO Optimization
Update `/frontend/public/index.html`:
- Title and meta description
- Open Graph tags
- Twitter Card tags

### Analytics Integration
Add Google Analytics or other tracking:

1. Install gtag:
   ```bash
   yarn add gtag
   ```

2. Add to your components as needed

### Custom Domain Setup

**For Netlify**:
1. Go to Domain settings in Netlify dashboard
2. Add your custom domain
3. Update DNS records as instructed

**For Vercel**:
1. Go to Domains in Vercel dashboard  
2. Add your domain
3. Configure DNS records

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── _redirects          # Netlify routing
│   └── images/             # Static images
├── src/
│   ├── components/         # Reusable UI components
│   ├── data/              # JSON data files
│   │   ├── portfolio.json  # Personal & academic data
│   │   └── blog.json      # Blog posts
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   └── App.js
├── netlify.toml           # Netlify configuration
└── package.json
```

## 🚨 Common Issues

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### Routing Issues on Netlify/Vercel
Ensure you have:
- `_redirects` file in public folder
- `netlify.toml` configuration
- SPA routing enabled

### Performance Optimization
- Use `yarn build` for production (never `yarn start`)
- Enable gzip compression in hosting settings
- Optimize images before adding them

## 📱 Mobile Responsiveness

The site is fully responsive and tested on:
- Desktop (1920px+)
- Tablet (768px - 1024px) 
- Mobile (320px - 767px)

## 🔒 Security Considerations

For static sites:
- No server-side vulnerabilities
- All data is client-side only
- Contact form uses frontend validation only
- Consider adding a serverless function for contact form processing

## 📊 Performance

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

## 🆘 Support

If you encounter issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed (`yarn install`)
3. Verify your JSON files have valid syntax
4. Test locally before deploying (`yarn start`)

---

**Your professional academic portfolio is ready for the world!** 🎓✨