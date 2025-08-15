# Scripts Documentation

Complete reference guide for all available npm scripts in the Vite React TypeScript Starter project.

## 📋 Available Scripts

| Script Name | Purpose | Parameters | Usage Example | Environment |
|-------------|---------|------------|---------------|-------------|
| `dev` | Start development server with hot module replacement | None | `npm run dev` | Development |
| `build` | Create optimized production build | None | `npm run build` | Production |
| `lint` | Run ESLint code analysis and style checks | None | `npm run lint` | All |
| `preview` | Preview production build locally | None | `npm run preview` | Testing |

## 🔍 Detailed Script Analysis

### Development Script (`npm run dev`)

**Purpose**: Launches Vite development server with hot module replacement (HMR) for rapid development.

**Configuration**:
```json
{
  "dev": "vite"
}
```

**Features**:
- ⚡️ Lightning-fast startup and HMR
- 🔄 Automatic browser refresh on file changes
- 📱 Built-in mobile device simulation
- 🔍 Source map support for debugging

**Expected Output**:
```bash
$ npm run dev

  VITE v5.4.2  ready in 328 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Common Issues & Solutions**:

| Issue | Cause | Solution |
|-------|-------|----------|
| Port 5173 already in use | Another process using the port | `lsof -ti:5173 \| xargs kill -9` or use `--port` flag |
| Module not found errors | Missing dependencies | Run `npm install` to install dependencies |
| TypeScript errors in console | Type checking issues | Check `tsconfig.json` and fix type errors |
| Slow initial load | Large dependency tree | Consider code splitting and lazy loading |

**Advanced Usage**:
```bash
# Start on different port
npx vite --port 3000

# Expose to network (for mobile testing)
npx vite --host

# Enable debug mode
DEBUG=vite:* npm run dev
```

---

### Build Script (`npm run build`)

**Purpose**: Creates an optimized production build with minification, tree shaking, and asset optimization.

**Configuration**:
```json
{
  "build": "vite build"
}
```

**Build Process**:
1. 🔍 Type checking with TypeScript
2. 📦 Bundle optimization and tree shaking
3. 🗜️ Minification of JavaScript and CSS
4. 🖼️ Asset optimization and hashing
5. 📁 Output to `dist/` directory

**Expected Output**:
```bash
$ npm run build

vite v5.4.2 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip: 0.30 kB
dist/assets/index-DiwrgTda.css    1.39 kB │ gzip: 0.72 kB
dist/assets/index-BsKv-W3h.js   143.61 kB │ gzip: 46.15 kB
✓ built in 892ms
```

**Output Structure**:
```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].css    # Bundled and minified CSS
│   └── index-[hash].js     # Bundled and minified JavaScript
└── vite.svg               # Static assets
```

**Common Issues & Solutions**:

| Issue | Cause | Solution |
|-------|-------|----------|
| Build fails with TypeScript errors | Type checking failures | Fix TypeScript errors or use `--skipLibCheck` |
| Large bundle size | Unused dependencies | Analyze bundle with `npm run build -- --analyze` |
| Missing assets in build | Incorrect asset imports | Use proper import syntax or public directory |
| Memory errors during build | Large codebase | Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096` |

**Build Analysis**:
```bash
# Analyze bundle size
npx vite-bundle-analyzer dist/assets/*.js

# Build with source maps (for debugging)
npm run build -- --sourcemap
```

---

### Lint Script (`npm run lint`)

**Purpose**: Runs ESLint to analyze code quality, style consistency, and potential bugs.

**Configuration**:
```json
{
  "lint": "eslint ."
}
```

**Linting Rules**:
- ✅ JavaScript ES2020+ standards
- ⚛️ React hooks best practices
- 🔷 TypeScript strict mode compliance
- 🔄 React Fast Refresh compatibility

**Expected Output** (No Issues):
```bash
$ npm run lint
# No output indicates no linting errors
```

**Expected Output** (With Issues):
```bash
$ npm run lint

/src/App.tsx
  5:7  warning  'useState' is defined but never used  @typescript-eslint/no-unused-vars
  8:15 error    Missing return type on function       @typescript-eslint/explicit-function-return-type

✖ 2 problems (1 error, 1 warning)
```

**Auto-fix Options**:
```bash
# Fix auto-fixable issues
npm run lint -- --fix

# Lint specific files
npm run lint src/components/

# Lint with different format
npm run lint -- --format compact
```

**Common Issues & Solutions**:

| Issue | Cause | Solution |
|-------|-------|----------|
| `@typescript-eslint/no-unused-vars` | Unused variables/imports | Remove unused code or prefix with underscore |
| `react-hooks/exhaustive-deps` | Missing useEffect dependencies | Add missing dependencies to dependency array |
| `@typescript-eslint/no-explicit-any` | Using `any` type | Replace with specific types or use type assertions |
| Configuration errors | Invalid ESLint config | Check `eslint.config.js` syntax and dependencies |

---

### Preview Script (`npm run preview`)

**Purpose**: Serves the production build locally for testing before deployment.

**Configuration**:
```json
{
  "preview": "vite preview"
}
```

**Prerequisites**: Must run `npm run build` first to create the `dist/` directory.

**Expected Output**:
```bash
$ npm run preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

**Use Cases**:
- 🧪 Testing production build locally
- 🔍 Verifying asset optimization
- 📱 Cross-browser compatibility testing
- 🚀 Pre-deployment validation

**Common Issues & Solutions**:

| Issue | Cause | Solution |
|-------|-------|----------|
| "dist directory not found" | Build not created | Run `npm run build` first |
| 404 errors for assets | Incorrect base path | Check `base` option in `vite.config.ts` |
| JavaScript errors | Build optimization issues | Check browser console and source maps |

## 🔧 Custom Script Extensions

### Adding New Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "format": "prettier --write .",
    "clean": "rm -rf dist node_modules/.vite"
  }
}
```

### Script Composition

```json
{
  "scripts": {
    "check": "npm run lint && npm run build",
    "deploy": "npm run build && gh-pages -d dist",
    "fresh": "npm run clean && npm install && npm run dev"
  }
}
```

## 📊 Performance Benchmarks

| Script | Typical Duration | Memory Usage | Notes |
|--------|------------------|--------------|-------|
| `dev` | < 1 second | ~150MB | Initial startup |
| `build` | 1-3 seconds | ~300MB | Depends on bundle size |
| `lint` | < 1 second | ~100MB | Varies with codebase size |
| `preview` | < 1 second | ~50MB | Serves static files |

---

## 🚨 Troubleshooting Guide

### General Issues

1. **Clear Cache**: `rm -rf node_modules/.vite`
2. **Reinstall Dependencies**: `rm -rf node_modules package-lock.json && npm install`
3. **Check Node Version**: Ensure Node.js >= 18.0.0
4. **Verify Package.json**: Ensure all scripts are properly defined

### Debug Mode

Enable verbose logging for any script:

```bash
DEBUG=vite:* npm run dev
DEBUG=eslint:* npm run lint
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
- name: Install dependencies
  run: npm ci

- name: Run linting
  run: npm run lint

- name: Build project
  run: npm run build

- name: Preview build
  run: npm run preview &
```