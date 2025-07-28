# GitFlow Workflow Guide

## Overview

This project uses GitFlow, a branching model designed for projects with scheduled release cycles. It provides a robust framework for managing larger projects and is particularly useful for projects that have a planned release cycle.

## Branch Structure

```
master          # Production-ready code
├── develop     # Integration branch for features
├── feature/*   # New features being developed
├── release/*   # Preparing for a new production release
├── hotfix/*    # Critical fixes for production
└── bugfix/*    # Bug fixes for develop branch
```

## Workflow Commands

### Starting a New Feature

```bash
# Create and switch to a new feature branch
git flow feature start feature-name

# Work on your feature...
# Make commits...

# Finish the feature (merges back to develop)
git flow feature finish feature-name
```

### Starting a Bug Fix

```bash
# Create and switch to a new bugfix branch
git flow bugfix start bugfix-name

# Work on your bugfix...
# Make commits...

# Finish the bugfix (merges back to develop)
git flow bugfix finish bugfix-name
```

### Creating a Release

```bash
# Create a release branch
git flow release start 1.0.0

# Make any final adjustments...
# Update version numbers, changelog, etc.

# Finish the release (merges to master and develop)
git flow release finish 1.0.0
```

### Creating a Hotfix

```bash
# Create a hotfix branch (from master)
git flow hotfix start hotfix-name

# Fix the critical issue...
# Make commits...

# Finish the hotfix (merges to master and develop)
git flow hotfix finish hotfix-name
```

## Best Practices

### 1. Feature Development

- Always create feature branches from `develop`
- Keep features small and focused
- Use descriptive branch names (e.g., `feature/user-authentication`)
- Test thoroughly before finishing

### 2. Commit Messages

- Use conventional commit format:
  ```
  feat: add user authentication
  fix: resolve login validation issue
  docs: update README with new features
  style: format code according to standards
  refactor: simplify authentication logic
  test: add unit tests for user service
  chore: update dependencies
  ```

### 3. Pull Requests

- Create pull requests for all feature branches
- Use the GitHub PR template
- Require code review before merging
- Ensure CI/CD passes before merging

### 4. Release Management

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Update CHANGELOG.md with each release
- Tag releases with version numbers
- Create release notes on GitHub

## Current Setup

- **Production Branch**: `master`
- **Development Branch**: `develop`
- **Feature Prefix**: `feature/`
- **Bugfix Prefix**: `bugfix/`
- **Release Prefix**: `release/`
- **Hotfix Prefix**: `hotfix/`
- **Support Prefix**: `support/`

## Example Workflow

### 1. Starting a New Feature

```bash
# Ensure you're on develop and it's up to date
git checkout develop
git pull origin develop

# Start a new feature
git flow feature start user-dashboard

# Work on your feature...
git add .
git commit -m "feat: add user dashboard component"

# Finish the feature
git flow feature finish user-dashboard
git push origin develop
```

### 2. Creating a Release

```bash
# Start a release
git flow release start 1.0.0

# Update version in package.json
# Update CHANGELOG.md
# Make any final adjustments

# Finish the release
git flow release finish 1.0.0

# Push all branches and tags
git push origin master develop
git push origin --tags
```

### 3. Critical Hotfix

```bash
# Start a hotfix (creates from master)
git flow hotfix start security-patch

# Fix the critical issue
git add .
git commit -m "fix: patch security vulnerability in auth"

# Finish the hotfix
git flow hotfix finish security-patch

# Push all branches and tags
git push origin master develop
git push origin --tags
```

## Branch Protection Rules

Set up the following branch protection rules on GitHub:

### Master Branch

- Require pull request reviews
- Require status checks to pass
- Restrict pushes
- Include administrators

### Develop Branch

- Require pull request reviews
- Require status checks to pass
- Restrict pushes
- Include administrators

## CI/CD Integration

The project includes:

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Vitest**: Unit testing

All checks must pass before merging to `develop` or `master`.

## Useful Commands

```bash
# View all branches
git branch -a

# View current branch
git branch

# Switch to develop
git checkout develop

# Update develop from remote
git pull origin develop

# View GitFlow configuration
git flow config

# List all feature branches
git flow feature list

# Delete a feature branch (if not finished)
git flow feature delete feature-name
```

## Troubleshooting

### Common Issues

1. **Merge Conflicts**: Resolve conflicts manually, then continue
2. **Wrong Base Branch**: Always ensure you're branching from the correct base
3. **Forgotten Commits**: Use `git flow feature finish --keep` to keep the branch

### Getting Help

- `git flow help` - Show GitFlow help
- `git flow feature help` - Show feature commands
- `git flow release help` - Show release commands
- `git flow hotfix help` - Show hotfix commands

## Next Steps

1. Set up branch protection rules on GitHub
2. Configure CI/CD pipeline
3. Create issue templates
4. Set up automated testing
5. Configure deployment pipeline
