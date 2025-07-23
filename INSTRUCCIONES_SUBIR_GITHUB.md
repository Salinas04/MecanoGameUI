# Instrucciones para Subir Frontend a GitHub

Estas instrucciones te guiarán a través del proceso de subir la carpeta frontend al repositorio de GitHub: https://github.com/Salinas04/MecanoGameUI.git

## 1. Instalar Git

Si Git no está instalado en tu sistema:

1. Descarga Git desde el sitio web oficial: https://git-scm.com/download/win
2. Ejecuta el instalador y sigue el asistente de instalación
3. Usa la configuración predeterminada a menos que tengas preferencias específicas
4. Asegúrate de seleccionar la opción para añadir Git a tu PATH

## 2. Subir la Carpeta Frontend

Después de instalar Git, abre una ventana de PowerShell y ejecuta los siguientes comandos:

```powershell
# Navega a la carpeta frontend
cd "C:\Users\anton\WebstormProjects\mecanogame\MecanoGame\frontend"

# Inicializa un nuevo repositorio Git
git init

# Añade todos los archivos al repositorio
git add .

# Haz commit de los archivos
git commit -m "Commit inicial del frontend de MecanoGame"

# Añade el repositorio remoto
git remote add origin https://github.com/Salinas04/MecanoGameUI.git

# Sube al repositorio remoto
git push -u origin master
```

Si el repositorio ya tiene contenido y quieres forzar la subida:
```powershell
git push -f -u origin master
```

## 3. Verifica la Subida

1. Visita https://github.com/Salinas04/MecanoGameUI.git en tu navegador
2. Confirma que todos los archivos frontend se han subido correctamente