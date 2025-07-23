# Instructions for Uploading Frontend to GitHub

These instructions will guide you through the process of uploading the frontend folder to the GitHub repository: https://github.com/Salinas04/MecanoGameUI.git

## 1. Install Git

If Git is not installed on your system:

1. Download Git from the official website: https://git-scm.com/download/win
2. Run the installer and follow the installation wizard
3. Use the default settings unless you have specific preferences
4. Make sure to select the option to add Git to your PATH

## 2. Upload the Frontend Folder

After installing Git, open a PowerShell window and run the following commands:

```powershell
# Navigate to the frontend folder
cd "C:\Users\anton\WebstormProjects\mecanogame\MecanoGame\frontend"

# Initialize a new Git repository
git init

# Add all files to the repository
git add .

# Commit the files
git commit -m "Initial commit of MecanoGame frontend"

# Add the remote repository
git remote add origin https://github.com/Salinas04/MecanoGameUI.git

# Push to the remote repository
git push -u origin master
```

If the repository already has content and you want to force push:
```powershell
git push -f -u origin master
```

## 3. Verify the Upload

1. Visit https://github.com/Salinas04/MecanoGameUI.git in your browser
2. Confirm that all frontend files have been successfully uploaded