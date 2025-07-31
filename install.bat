@echo off
echo 🚀 Instalando dependencias para React + Vite project...

REM Limpiar cache de npm
echo 🧹 Limpiando cache de npm...
npm cache clean --force

REM Remover node_modules y package-lock.json existentes
echo 🗑️  Removiendo node_modules y package-lock.json existentes...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Instalar dependencias con legacy peer deps
echo 📦 Instalando dependencias...
npm install --legacy-peer-deps

REM Verificar instalación
echo ✅ Verificando instalación...
npm run type-check

echo 🎉 Instalación completada exitosamente!
echo.
echo Comandos disponibles:
echo   npm run dev      - Iniciar servidor de desarrollo
echo   npm run build    - Build para producción
echo   npm run test     - Ejecutar tests
echo   npm run lint     - Ejecutar linting
echo   npm run format   - Formatear código
pause 