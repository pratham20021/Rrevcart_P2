# Jenkins Setup Guide for Windows

## Quick Setup Steps

### 1. Download Jenkins
```
https://www.jenkins.io/download/
```
- Choose: **Generic Java package (.war)**
- Save to: `e:\Revcart\jenkins.war`

### 2. Start Jenkins
```cmd
cd e:\Revcart
java -jar jenkins.war --httpPort=8080
```

Or run:
```cmd
setup-jenkins.bat
```

### 3. Access Jenkins
Open browser: **http://localhost:8080**

### 4. Get Initial Password
```cmd
type %USERPROFILE%\.jenkins\secrets\initialAdminPassword
```

### 5. Install Suggested Plugins
- Click "Install suggested plugins"
- Wait for installation

### 6. Create Admin User
- Username: admin
- Password: (your choice)
- Email: your-email@example.com

---

## Configure Jenkins for RevCart

### Step 1: Install Required Plugins
**Manage Jenkins → Plugins → Available Plugins**

Install:
- ✅ Docker Pipeline
- ✅ Docker
- ✅ Git
- ✅ Maven Integration
- ✅ NodeJS

### Step 2: Configure Tools
**Manage Jenkins → Tools**

**Maven:**
- Name: `Maven-3.8`
- ✅ Install automatically
- Version: 3.8.6

**NodeJS:**
- Name: `NodeJS-18`
- ✅ Install automatically
- Version: 18.x

### Step 3: Add Credentials
**Manage Jenkins → Credentials → System → Global credentials**

**GitHub Credentials:**
1. Click "Add Credentials"
2. Kind: `Username with password`
3. Username: `pratham20021` (your GitHub username)
4. Password: `<GitHub Personal Access Token>`
5. ID: `github-credentials`
6. Description: `GitHub Access`

**Docker Hub Credentials:**
1. Click "Add Credentials"
2. Kind: `Username with password`
3. Username: `<your-dockerhub-username>`
4. Password: `<your-dockerhub-password>`
5. ID: `dockerhub-credentials`
6. Description: `Docker Hub Access`

### Step 4: Create Pipeline Job
1. **New Item**
2. Name: `RevCart-Pipeline`
3. Type: **Pipeline**
4. Click OK

**Configure Pipeline:**
- Definition: `Pipeline script from SCM`
- SCM: `Git`
- Repository URL: `https://github.com/pratham20021/Rrevcart_P2.git`
- Credentials: Select `github-credentials`
- Branch: `*/master`
- Script Path: `Jenkinsfile`
- Click **Save**

### Step 5: Build Project
1. Click **Build Now**
2. Monitor **Console Output**
3. Wait for success ✅

---

## Troubleshooting

### Jenkins won't start
```cmd
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Use different port
java -jar jenkins.war --httpPort=9090
```

### Can't find initial password
```cmd
# Windows
type %USERPROFILE%\.jenkins\secrets\initialAdminPassword

# Or check Jenkins console output
```

### Docker not found
```cmd
# Install Docker Desktop for Windows
# Download from: https://www.docker.com/products/docker-desktop
```

### Maven/NodeJS not working
- Go to **Manage Jenkins → Tools**
- Ensure "Install automatically" is checked
- Save and rebuild

---

## Quick Commands

**Start Jenkins:**
```cmd
java -jar jenkins.war
```

**Stop Jenkins:**
- Press `Ctrl+C` in Jenkins terminal

**Access Jenkins:**
```
http://localhost:8080
```

**View Logs:**
```cmd
type %USERPROFILE%\.jenkins\jenkins.log
```

---

## Next Steps After Setup

1. ✅ Jenkins running on http://localhost:8080
2. ✅ Plugins installed
3. ✅ Credentials added
4. ✅ Pipeline created
5. ✅ Build successful
6. → Deploy with Docker: `docker-compose up -d`
