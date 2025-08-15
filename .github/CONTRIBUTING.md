# Contributing to Vite React TypeScript Starter

Thank you for your interest in contributing to our project! This guide will help you understand our development process and how to submit contributions effectively.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally: `git clone https://github.com/your-username/vite-react-typescript-starter.git`
3. **Install dependencies**: `npm install`
4. **Create a branch**: `git checkout -b feature/your-feature-name`
5. **Make your changes** and test them
6. **Submit a pull request**

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Community Guidelines](#community-guidelines)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission

## 🛠️ Development Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** for version control
- A modern code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vite-react-typescript-starter.git
cd vite-react-typescript-starter

# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, run linting (optional)
npm run lint
```

### Environment Setup

1. **Copy environment file**: `cp .env.example .env`
2. **Update environment variables** as needed
3. **Verify setup**: Visit `http://localhost:5173`

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── styles/             # Global styles and themes
├── assets/             # Static assets (images, icons, etc.)
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global CSS imports
```

### File Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`, `useLocalStorage.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Types**: PascalCase (`User.ts`, `ApiResponse.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🎨 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Explicit types, clear interfaces
interface UserProps {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

function UserCard({ id, name, email, isActive = true }: UserProps) {
  // Component implementation
}

// ❌ Bad: Any types, unclear props
function UserCard(props: any) {
  // Implementation
}
```

### React Best Practices

```typescript
// ✅ Good: Functional components with proper typing
import React, { useState, useEffect } from 'react';

interface Props {
  initialCount: number;
}

export function Counter({ initialCount }: Props) {
  const [count, setCount] = useState<number>(initialCount);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={() => setCount(count - 1)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        -
      </button>
      <span className="font-mono text-xl">{count}</span>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        +
      </button>
    </div>
  );
}
```

### CSS/Tailwind Guidelines

```tsx
// ✅ Good: Semantic class names, responsive design
<div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
    Welcome
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Content */}
  </div>
</div>

// ❌ Bad: Inline styles, non-responsive
<div style={{ padding: '20px', textAlign: 'center' }}>
  <h1 style={{ fontSize: '24px', color: '#333' }}>Welcome</h1>
</div>
```

### Code Organization

```typescript
// ✅ Good: Organized imports, clear structure
import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import { Button } from '../components/ui/Button';
import { formatDate } from '../utils/formatDate';
import './UserProfile.css';

interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

export function UserProfile({ user, onUpdate }: Props) {
  // Hooks first
  const [isEditing, setIsEditing] = useState(false);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [user.id]);
  
  // Event handlers
  const handleSave = () => {
    // Handler logic
  };
  
  // Render
  return (
    // JSX
  );
}
```

## 🌿 Git Workflow

### Branch Naming Convention

Use the following format: `[type]/[ticket-number]-[short-description]`

**Types:**
- `feature/` - New features
- `bugfix/` - Bug fixes  
- `hotfix/` - Critical fixes for production
- `chore/` - Maintenance tasks
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

**Examples:**
```bash
feature/123-user-authentication
bugfix/456-fix-login-redirect
chore/789-update-dependencies
docs/101-api-documentation
```

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semicolons)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```bash
feat(auth): add user login functionality
fix(ui): resolve button hover state issue
docs: update contributing guidelines
style: format code with prettier
refactor(api): simplify user data fetching
test(auth): add login component tests
chore: update dependencies to latest versions
```

### Git Workflow Steps

1. **Create feature branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/123-new-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add new feature functionality"
   ```

3. **Keep branch updated**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/123-new-feature
   ```

## 🧪 Testing Guidelines

### Writing Tests

While the starter template doesn't include tests by default, here are guidelines for when you add testing:

```typescript
// Example test structure (if using Vitest/Jest)
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes for variants', () => {
    render(<Button variant="secondary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('bg-gray-200');
  });
});
```

### Testing Checklist

- [ ] Unit tests for components
- [ ] Integration tests for features
- [ ] Accessibility testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

## 🔄 Pull Request Process

### Before Submitting

1. **Run quality checks**
   ```bash
   npm run lint        # Fix any linting errors
   npm run build       # Ensure build succeeds
   npm test           # Run tests (if available)
   ```

2. **Update documentation**
   - Update README if needed
   - Add JSDoc comments for new functions
   - Update CHANGELOG.md

3. **Self-review checklist**
   - [ ] Code follows project conventions
   - [ ] No debugging code left behind
   - [ ] Error handling is appropriate
   - [ ] Performance implications considered
   - [ ] Accessibility standards met

### Pull Request Template

When creating a PR, use our template and ensure:

- **Clear title** describing the changes
- **Detailed description** of what and why
- **Screenshots** for UI changes
- **Testing information** included
- **Breaking changes** documented

### Review Process

1. **Automated checks** must pass (linting, build)
2. **Code review** by at least one maintainer
3. **Testing verification** if applicable
4. **Documentation review** for user-facing changes

### Getting Reviews

- Tag relevant reviewers
- Respond to feedback promptly
- Make requested changes in separate commits
- Re-request review after changes

## 🐛 Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** and FAQ
3. **Try latest version** to see if issue persists
4. **Gather relevant information**

### Bug Report Template

Use our bug report template and include:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (OS, browser, Node version)
- **Screenshots** if applicable
- **Console logs** and error messages

### Feature Request Template

For new features, provide:

- **Problem statement** - what issue does this solve?
- **Proposed solution** - describe your idea
- **User stories** - who benefits and how?
- **Mockups** - visual representation if UI-related
- **Technical considerations** - implementation thoughts

## 🤝 Community Guidelines

### Getting Help

- **Discussions** - For general questions and brainstorming
- **Issues** - For bugs and feature requests
- **Pull Requests** - For code contributions
- **Documentation** - Check README, docs/, and code comments

### Recognition

Contributors are recognized in:
- GitHub contributors section
- CHANGELOG.md for significant contributions
- Special mentions for exceptional contributions

### Mentorship

New contributors can:
- Look for `good-first-issue` labels
- Ask for guidance in discussions
- Pair with experienced contributors
- Attend community calls (if applicable)

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools & Extensions
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## ❓ Questions?

If you have questions about contributing:

1. Check this guide first
2. Search existing issues and discussions  
3. Create a new discussion for general questions
4. Create an issue for specific problems

---

**Thank you for contributing to our project! 🎉**

Every contribution, whether it's code, documentation, testing, or feedback, helps make this project better for everyone.