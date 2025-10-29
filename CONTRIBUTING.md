# Contributing to Y-Ultimate Management Platform

First off, thank you for considering contributing to Y-Ultimate! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing](#testing)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or bun
- Git
- Supabase account (for backend)

### Setting Up Development Environment

1. **Fork the repository**

Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/yultimate-connect.git
cd yultimate-connect
```

3. **Add upstream remote**

```bash
git remote add upstream https://github.com/original-org/yultimate-connect.git
```

4. **Install dependencies**

```bash
npm install
```

5. **Set up environment variables**

Copy the `.env.example` file to `.env.local` and fill in your Supabase credentials:

```bash
# Windows
copy .env.example .env.local

# macOS/Linux
cp .env.example .env.local
```

6. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:8080` to see the app running.

## 🔄 Development Workflow

### 1. Create a branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make your changes

Write clean, readable code following our [coding standards](#coding-standards).

### 3. Test your changes

```bash
# Run linter
npm run lint

# Build to ensure no errors
npm run build
```

### 4. Commit your changes

Follow our [commit guidelines](#commit-guidelines).

### 5. Push to your fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

Go to the original repository and click "New Pull Request".

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new files
- **Avoid `any` types** - use proper typing
- **Use interfaces** for object shapes
- **Enable strict mode** in tsconfig.json

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<UserProfile> => {
  // implementation
};

// ❌ Bad
const getUser = (id: any): any => {
  // implementation
};
```

### React Components

- **Use functional components** with hooks
- **Use TypeScript interfaces** for props
- **Keep components small** (< 200 lines)
- **Extract custom hooks** for complex logic

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};

// ❌ Bad
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### File Organization

```
src/
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   └── Layout.tsx   # Layout components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── lib/             # Utility functions
└── integrations/    # External services
```

### Naming Conventions

- **Components:** PascalCase - `UserProfile.tsx`
- **Hooks:** camelCase with `use` prefix - `useAuth.tsx`
- **Utilities:** camelCase - `formatDate.ts`
- **Constants:** UPPER_SNAKE_CASE - `API_ENDPOINTS.ts`
- **Types/Interfaces:** PascalCase - `UserProfile`, `Tournament`

### Styling

- **Use Tailwind CSS** for styling
- **Follow mobile-first approach**
- **Use shadcn/ui components** when possible
- **Extract repeated classes** into components

```typescript
// ✅ Good - Mobile-first
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Content</div>
</div>

// ❌ Bad - Desktop-first
<div className="flex-row md:flex-col gap-4">
  <div className="w-1/2 md:w-full">Content</div>
</div>
```

## 💬 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples

```bash
feat(tournaments): add live scoring feature

Implement real-time score updates using Supabase subscriptions.
Includes mobile-optimized UI for volunteers.

Closes #123
```

```bash
fix(auth): resolve login redirect issue

Fixed bug where users were not redirected to dashboard after login.

Fixes #456
```

```bash
docs(readme): update installation instructions

Added section on Supabase setup and environment variables.
```

## 🔀 Pull Request Process

### Before Submitting

1. ✅ Code follows our style guidelines
2. ✅ All tests pass (`npm run lint`)
3. ✅ Commit messages follow conventions
4. ✅ Branch is up to date with main
5. ✅ No console errors or warnings
6. ✅ Tested on mobile and desktop

### PR Template

Use this template for your PR description:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
How to test these changes:
1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] My changes generate no new warnings
- [ ] I have tested on mobile and desktop
```

### Review Process

1. A maintainer will review your PR within 48 hours
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged in the release notes

## 📁 Project Structure

```
yultimate-connect/
├── public/              # Static assets
│   ├── favicon.ico
│   ├── manifest.json   # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── hooks/         # Custom hooks
│   │   ├── useAuth.tsx
│   │   ├── useTournaments.ts
│   │   └── ...
│   ├── pages/         # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Tournaments.tsx
│   │   └── ...
│   ├── integrations/  # External services
│   │   └── supabase/
│   ├── lib/           # Utilities
│   └── App.tsx        # Root component
├── supabase/          # Database migrations
│   └── migrations/
├── .env.example       # Environment template
├── package.json
├── vite.config.ts     # Vite configuration
└── README.md
```

## 🧪 Testing

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
npm run preview
```

### Manual Testing Checklist

- [ ] Feature works on Chrome
- [ ] Feature works on Firefox
- [ ] Feature works on Safari
- [ ] Feature works on mobile (iOS & Android)
- [ ] Feature works offline (if applicable)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive design looks good

## 🎨 UI/UX Guidelines

- **Mobile-first design** - Always start with mobile layout
- **Accessibility** - Use semantic HTML and ARIA labels
- **Loading states** - Show skeleton loaders or spinners
- **Error handling** - Display user-friendly error messages
- **Confirmation dialogs** - For destructive actions
- **Toast notifications** - For success/error feedback

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try to reproduce on the latest version
3. Gather system information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
Add screenshots if applicable.

**Environment:**
- OS: [e.g., Windows 11, macOS]
- Browser: [e.g., Chrome 120, Safari 17]
- Device: [e.g., Desktop, iPhone 14]
```

## 💡 Feature Requests

We love feature ideas! Please include:

1. **Use case** - Why is this needed?
2. **Proposed solution** - How should it work?
3. **Alternatives** - Other approaches considered?
4. **Impact** - Who benefits from this?

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## 🙏 Recognition

Contributors will be acknowledged in:
- Release notes
- GitHub contributors page
- Project README

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/your-org/yultimate-connect/discussions)
- 📧 Email: dev@yultimate.org
- 🐛 [Report a bug](https://github.com/your-org/yultimate-connect/issues/new)

---

**Thank you for contributing to Y-Ultimate! 🎉**

Every contribution, no matter how small, makes a difference.

