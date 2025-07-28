# GitFlow Quick Reference

## 🚀 Getting Started

### Initialize GitFlow (already done)

```bash
git flow init -d
```

### Check Configuration

```bash
git flow config
```

## 📋 Daily Workflow

### 1. Start a New Feature

```bash
# Ensure you're on develop and up to date
git checkout develop
git pull origin develop

# Start feature
git flow feature start feature-name
```

### 2. Work on Your Feature

```bash
# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Continue working...
git add .
git commit -m "fix: resolve issue in feature"
```

### 3. Finish Feature

```bash
git flow feature finish feature-name
git push origin develop
```

## 🔧 Other GitFlow Commands

### Bug Fixes

```bash
# Start bugfix
git flow bugfix start bugfix-name

# Work and commit...

# Finish bugfix
git flow bugfix finish bugfix-name
```

### Releases

```bash
# Start release
git flow release start 1.0.0

# Update version, changelog, etc.
# Make final commits...

# Finish release
git flow release finish 1.0.0
git push origin master develop
git push origin --tags
```

### Hotfixes (Critical Production Fixes)

```bash
# Start hotfix (creates from master)
git flow hotfix start hotfix-name

# Fix the critical issue
git add .
git commit -m "fix: critical production issue"

# Finish hotfix
git flow hotfix finish hotfix-name
git push origin master develop
git push origin --tags
```

## 📊 Useful Commands

### View Branches

```bash
# All branches
git branch -a

# Current branch
git branch

# GitFlow branches
git flow feature list
```

### Switch Branches

```bash
# Switch to develop
git checkout develop

# Switch to master
git checkout master
```

### Update Branches

```bash
# Update develop
git checkout develop
git pull origin develop

# Update master
git checkout master
git pull origin master
```

## 🎯 Best Practices

### Commit Messages

Use conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Branch Naming

- Features: `feature/user-authentication`
- Bugfixes: `bugfix/login-validation`
- Releases: `release/1.0.0`
- Hotfixes: `hotfix/security-patch`

### Workflow Tips

1. Always start from `develop`
2. Keep features small and focused
3. Test before finishing features
4. Use descriptive branch names
5. Write clear commit messages
6. Create pull requests for review

## 🚨 Emergency Procedures

### Abort Feature

```bash
# If you need to cancel a feature
git flow feature delete feature-name
```

### Keep Feature Branch

```bash
# If you want to keep the branch after finishing
git flow feature finish --keep feature-name
```

### Manual Merge

```bash
# If automatic merge fails
git merge --no-ff feature/feature-name
```

## 📝 Next Steps

1. **Set up branch protection** on GitHub for `master` and `develop`
2. **Configure CI/CD** pipeline
3. **Create your first feature** using the workflow
4. **Set up automated testing** for all branches
5. **Configure deployment** pipeline

## 🔗 Resources

- [GitFlow Documentation](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
