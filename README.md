# Vite React TypeScript Starter

A modern, production-ready starter template built with Vite, React 18, TypeScript, and Tailwind CSS. Designed for rapid development with excellent developer experience and optimized build performance.

## 🚀 Features

- ⚡️ **Vite 5** - Next generation frontend tooling with lightning-fast HMR
- ⚛️ **React 18** - Latest React with concurrent features and improved performance
- 🔷 **TypeScript 5** - Full type safety with latest language features
- 🎨 **Tailwind CSS 3** - Utility-first CSS framework for rapid UI development
- 📦 **Lucide React** - Beautiful, customizable SVG icons
- 🔍 **ESLint** - Code quality and consistency with React/TypeScript rules
- 🏗️ **Modern Architecture** - Clean project structure following best practices

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** for version control

## 🛠️ Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vite-react-typescript-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 💻 Development

### Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `dev` | Start development server with hot reload | `npm run dev` |
| `build` | Create production build | `npm run build` |
| `lint` | Run ESLint code analysis | `npm run lint` |
| `preview` | Preview production build locally | `npm run preview` |

### Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Code Quality Checks**
   ```bash
   npm run lint
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 🏗️ Project Structure

```
src/
├── main.tsx          # Application entry point
├── App.tsx           # Root component
├── index.css         # Global styles and Tailwind imports
└── vite-env.d.ts     # Vite type definitions
```

## 🎨 Styling Guidelines

This project uses **Tailwind CSS** for styling. Key principles:

- **Utility-First**: Use Tailwind utility classes for styling
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Custom Components**: Extract repeated patterns into reusable components
- **Design System**: Maintain consistency with Tailwind's design tokens

### Example Component

```tsx
function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Vite React Starter

# Feature Flags
VITE_ENABLE_ANALYTICS=false
```

### TypeScript Configuration

The project uses three TypeScript configurations:

- `tsconfig.json`: Root configuration with project references
- `tsconfig.app.json`: Application code configuration
- `tsconfig.node.json`: Node.js tools configuration

### Tailwind Configuration

Customize Tailwind in `tailwind.config.js`:

```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B'
      }
    }
  }
};
```

## 📦 Dependencies

### Core Dependencies
- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **lucide-react**: ^0.344.0

### Development Dependencies
- **@vitejs/plugin-react**: ^4.3.1
- **typescript**: ^5.5.3
- **tailwindcss**: ^3.4.1
- **eslint**: ^9.9.1

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` directory contains optimized production files ready for deployment.

### Deployment Options

- **Vercel**: Connect your Git repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or use Git integration
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Traditional Hosting**: Upload `dist/` contents to your web server

### Example Vercel Deployment

```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ]
}
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Code Style

- Use TypeScript for all new files
- Follow existing naming conventions
- Run `npm run lint` before committing
- Write meaningful commit messages

### Branch Naming

```
[type]/[ticket-number]-[description]
```

Examples:
- `feature/123-add-user-authentication`
- `bugfix/456-fix-navigation-menu`
- `chore/789-update-dependencies`

### Pull Request Process

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes with appropriate tests
4. Run linting and ensure all checks pass
5. Submit a pull request with a clear description

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Restart TypeScript server in your IDE
# Or check tsconfig.json configurations
```

**Build errors**
```bash
# Check for unused imports or type errors
npm run lint
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons

---

**Happy coding! 🎉**