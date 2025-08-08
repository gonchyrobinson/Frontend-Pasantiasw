# Cursor Rules for Internship Management System

This directory contains comprehensive Cursor rules that guide development practices for the React TypeScript internship management system.

## 📋 Rule Files Overview

### 🏗️ **[module-organization.mdc](module-organization.mdc)**

**Always Applied** - Core module structure requirements

- **StyledComponents.tsx**: Centralized styled MUI components with `sx` properties
- **ComponentesGenericos.tsx**: Reusable components with MUI props (elevation, variant, etc.)
- **types/index.ts**: Module-specific TypeScript interfaces and types
- **helpers/[feature]Helpers.ts**: Business logic and pure functions

### 🔧 **[typescript-react-best-practices.mdc](typescript-react-best-practices.mdc)**

**Applied to**: `*.ts`, `*.tsx` files

- Strict TypeScript configuration and typing guidelines
- React functional component patterns and hooks best practices
- Performance optimization with memoization
- Error handling and code quality standards

### 🎨 **[material-ui-styling.mdc](material-ui-styling.mdc)**

**Applied to**: `*.tsx`, `*.ts` files

- MUI theming system and component usage
- Styled components architecture and when to use each approach
- Responsive design patterns with Grid system
- Accessibility and performance considerations

### 📁 **[project-structure.mdc](project-structure.mdc)**

**Always Applied** - File organization and architecture

- Root level structure and main entry points
- Module organization within `src/modules/[ModuleName]/`
- Import organization and naming conventions
- Development workflow and best practices

### 🧪 **[testing-conventions.mdc](testing-conventions.mdc)**

**Applied to**: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files

- Vitest and React Testing Library patterns
- Component, hook, and helper function testing strategies
- Mock patterns and error testing
- Test organization and best practices

### 🌐 **[api-integration.mdc](api-integration.mdc)**

**Applied to**: `*.ts`, `*.tsx` files

- React Query integration and custom API hooks
- Error handling and type safety patterns
- Performance optimization with query keys and caching
- Mutation patterns with optimistic updates

### 📝 **[form-management.mdc](form-management.mdc)**

**Applied to**: `*.tsx`, `*.ts` files

- FormularioGenerico system usage and patterns
- React Hook Form integration and validation
- Multi-step forms and auto-save functionality
- CRUD form patterns and API integration

### 🔗 **[backend-integration.mdc](backend-integration.mdc)**

**Manual Application** - C# backend integration patterns

- C# BaseController architecture and error handling
- Entity, DTO, and Service patterns
- Backend-Frontend type alignment
- Integration checklist and best practices

### 🚀 **[module-generation.mdc](module-generation.mdc)**

**Manual Application** - Complete module creation workflow

- Pre-generation questionnaire for requirements gathering
- Step-by-step backend and frontend file generation
- Standard templates for controllers, services, and components
- Post-generation verification checklist

## 🚀 Getting Started with Rules

### **Rule Application**

1. **Always Applied Rules**: Automatically active for all requests
   - `module-organization.mdc`
   - `project-structure.mdc`

2. **File-Specific Rules**: Applied based on file patterns
   - TypeScript/React files: `typescript-react-best-practices.mdc`, `material-ui-styling.mdc`, `api-integration.mdc`, `form-management.mdc`
   - Test files: `testing-conventions.mdc`

3. **Manual Rules**: Applied when specifically referenced by the user
   - All rules can be manually referenced when needed

### **Using Rules in Development**

The AI assistant will automatically apply these rules when:

- Creating new components or modules
- Refactoring existing code
- Setting up tests
- Implementing API integrations
- Building forms

### **Rule References**

Rules reference actual files in your codebase using the `[filename](mdc:path)` syntax, providing concrete examples of the patterns in action.

## 🔧 Rule Maintenance

### **Updating Rules**

- Modify existing `.mdc` files to update guidelines
- Add new rules for emerging patterns or technologies
- Update file references when project structure changes

### **Adding New Rules**

1. Create new `.mdc` file in this directory
2. Add appropriate frontmatter with `alwaysApply`, `globs`, or `description`
3. Reference relevant files from your codebase
4. Document patterns and best practices

### **Rule Hierarchy**

- **Always Applied**: Core architectural patterns (module organization, project structure)
- **File-Specific**: Technology-specific guidelines (TypeScript, React, MUI, testing)
- **Context-Specific**: Feature-specific patterns (forms, API integration)

## 📚 Key Patterns Enforced

### **Module Structure**

Every module follows the 4-file pattern:

1. **StyledComponents.tsx** - MUI styled components
2. **ComponentesGenericos.tsx** - Reusable business components
3. **types/index.ts** - TypeScript definitions
4. **helpers/[feature]Helpers.ts** - Business logic functions

### **Component Development**

1. Start with functional component implementation
2. Extract styled elements to StyledComponents.tsx
3. Create reusable wrappers in ComponentesGenericos.tsx
4. Define types in types/index.ts
5. Extract business logic to helpers

### **Code Quality**

- Strict TypeScript with proper type definitions
- React best practices with hooks and performance optimization
- Consistent MUI theming and responsive design
- Comprehensive testing with Vitest and React Testing Library
- Type-safe API integration with React Query

## 🎯 Benefits

1. **Consistency**: Enforces uniform code structure across the entire project
2. **Maintainability**: Clear separation of concerns and modular architecture
3. **Type Safety**: Comprehensive TypeScript usage with proper error handling
4. **Performance**: Optimized React patterns and efficient state management
5. **Quality**: Testing standards and code quality practices
6. **Developer Experience**: Clear guidelines reduce decision fatigue and onboarding time

These rules ensure that the internship management system maintains high code quality, consistent architecture, and excellent developer experience throughout its development lifecycle.
