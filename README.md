# 🚀 Motivational Quote Generator - DevOps Pipeline Demo

A beautiful, production-ready quote generator application demonstrating a complete DevOps CI/CD pipeline using modern tools and best practices.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Step-by-Step Deployment Guide](#step-by-step-deployment-guide)
  - [1. AWS Setup](#1-aws-setup)
  - [2. Local Development Setup](#2-local-development-setup)
  - [3. GitHub Repository Setup](#3-github-repository-setup)
  - [4. Terraform Configuration](#4-terraform-configuration)
  - [5. GitHub Actions Secrets](#5-github-actions-secrets)
  - [6. Deploy the Application](#6-deploy-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

---

## 🎯 Overview

This project demonstrates a complete DevOps pipeline for deploying a Node.js web application to AWS EC2 using Infrastructure as Code (Terraform) and automated CI/CD (GitHub Actions). The application is a beautiful motivational quote generator with multiple categories and an interactive user interface.

**What This Pipeline Does:**
1. **Infrastructure Provisioning** - Terraform creates AWS resources (EC2, Security Groups)
2. **Continuous Integration** - GitHub Actions builds and tests the application
3. **Continuous Deployment** - Automated deployment to EC2 with Nginx reverse proxy
4. **Health Monitoring** - Automated health checks to verify deployment

---

## 🏗️ Architecture

```
┌─────────────┐
│   GitHub    │
│ Repository  │
└──────┬──────┘
       │ git push
       ↓
┌─────────────────┐
│ GitHub Actions  │
│   (CI/CD)       │
└────┬────────────┘
     │
     ├─→ Terraform ──→ AWS (Provision Infrastructure)
     │
     ├─→ Build & Test
     │
     └─→ Deploy ──→ EC2 Instance
                    │
                    ├─→ Node.js App (Port 3000)
                    │
                    └─→ Nginx (Port 80)
                         │
                         ↓
                    Internet Users
```

---

## 🛠️ Tech Stack

### **Infrastructure & DevOps**
- **AWS EC2** - Virtual server hosting
- **Terraform** - Infrastructure as Code
- **GitHub Actions** - CI/CD automation
- **Nginx** - Reverse proxy and web server

### **Application**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Vanilla JavaScript** - Frontend
- **HTML5/CSS3** - Modern UI

---

## ✨ Features

### **Application Features**
- 🎨 Beautiful gradient UI with smooth animations
- 📚 5 quote categories (Motivational, Success, Inspiration, Technology, DevOps)
- 🎲 Random quote generation
- 📤 Share functionality (native share API + clipboard)
- 🎉 Celebration effects
- ⌨️ Keyboard shortcuts (G/Space to generate, S to share)
- 📊 Live statistics tracking
- 📱 Fully responsive design

### **DevOps Features**
- 🏗️ Infrastructure as Code with Terraform
- 🔄 Automated CI/CD pipeline
- 🚀 Zero-downtime deployments
- ✅ Automated health checks
- 📦 Artifact management
- 🔐 Secure secrets management
- 🌐 Nginx reverse proxy configuration

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed and configured:

### **Required Tools**
- [Git](https://git-scm.com/downloads) (v2.0+)
- [Node.js](https://nodejs.org/) (v18.0+)
- [npm](https://www.npmjs.com/) (v9.0+)
- [Terraform](https://www.terraform.io/downloads) (v1.0+)
- [AWS CLI](https://aws.amazon.com/cli/) (v2.0+)

### **Required Accounts**
- AWS Account with appropriate permissions
- GitHub Account

### **Required Knowledge**
- Basic understanding of Git and GitHub
- Familiarity with command line/terminal
- Basic AWS knowledge (EC2, Security Groups)
- Understanding of CI/CD concepts

---

## 📖 Step-by-Step Deployment Guide

### **1. AWS Setup**

#### 1.1 Create an AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Sign up for a new account or sign in
3. Complete account verification

#### 1.2 Create an IAM User for Terraform
1. Navigate to **IAM** → **Users** → **Create user**
2. User name: `terraform-user`
3. Select **Attach policies directly**
4. Attach the following policies:
   - `AmazonEC2FullAccess`
   - `AmazonVPCFullAccess`
5. Click **Create user**

#### 1.3 Generate Access Keys
1. Click on the created user
2. Go to **Security credentials** tab
3. Click **Create access key**
4. Choose **Command Line Interface (CLI)**
5. Check the confirmation box
6. Click **Create access key**
7. **IMPORTANT:** Save both:
   - Access Key ID
   - Secret Access Key
   (You won't be able to see the secret again!)

#### 1.4 Create an EC2 Key Pair
1. Go to **EC2** → **Key Pairs** → **Create key pair**
2. Name: `devops-pipeline-key` (or your preferred name)
3. Key pair type: **RSA**
4. Private key file format: **.pem**
5. Click **Create key pair**
6. Save the `.pem` file securely on your computer
7. Set proper permissions (Mac/Linux):
   ```bash
   chmod 400 ~/Downloads/devops-pipeline-key.pem
   ```

---

### **2. Local Development Setup**

#### 2.1 Clone or Create Project Directory
```bash
# Create a new directory for your project
mkdir quote-generator-pipeline
cd quote-generator-pipeline

# Initialize git
git init
```

#### 2.2 Set Up Project Files
Create the following directory structure:
```
quote-generator-pipeline/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars.example
├── server.js
├── package.json
├── nginx.conf
├── .gitignore
└── README.md
```

#### 2.3 Copy All Project Files
Copy all the files you downloaded into their respective locations in the project structure above.

#### 2.4 Test Application Locally
```bash
# Install dependencies
npm install

# Start the server
npm start

# Open browser to http://localhost:3000
```

You should see the quote generator running locally!

---

### **3. GitHub Repository Setup**

#### 3.1 Create a New GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click **New repository**
3. Repository name: `quote-generator-pipeline`
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README (we have one already)
6. Click **Create repository**

#### 3.2 Push Your Code to GitHub
```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: DevOps pipeline with quote generator"

# Add remote repository (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/quote-generator-pipeline.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

### **4. Terraform Configuration**

#### 4.1 Configure Terraform Variables
1. Copy the example file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edit `terraform.tfvars`:
   ```hcl
   aws_region    = "us-east-1"  # Your preferred region
   project_name  = "devops-pipeline-demo"
   environment   = "dev"
   instance_type = "t3.micro"
   key_name      = "devops-pipeline-key"  # Name of your EC2 key pair
   ami_id        = "ami-0866a3c8686eaeeba"  # Ubuntu 22.04 LTS (us-east-1)
   ```

3. **IMPORTANT:** Never commit `terraform.tfvars` to GitHub (it's in .gitignore)

#### 4.2 Update AMI ID for Your Region
If you're not using `us-east-1`, find the correct Ubuntu 22.04 AMI:

1. Go to [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/locator/ec2/)
2. Search for: `22.04 LTS`
3. Filter by your region
4. Copy the AMI ID for **64-bit (x86)**
5. Update `ami_id` in your `terraform.tfvars`

#### 4.3 Test Terraform Locally (Optional)
```bash
# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Preview changes
terraform plan

# DO NOT run 'terraform apply' yet - let GitHub Actions handle it
```

---

### **5. GitHub Actions Secrets**

Configure the following secrets in your GitHub repository:

#### 5.1 Navigate to Repository Settings
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

#### 5.2 Add Required Secrets

**Secret 1: AWS_ACCESS_KEY_ID**
- Name: `AWS_ACCESS_KEY_ID`
- Value: Your AWS access key from step 1.3

**Secret 2: AWS_SECRET_ACCESS_KEY**
- Name: `AWS_SECRET_ACCESS_KEY`
- Value: Your AWS secret access key from step 1.3

**Secret 3: AWS_KEY_NAME**
- Name: `AWS_KEY_NAME`
- Value: `devops-pipeline-key` (your EC2 key pair name)

**Secret 4: EC2_SSH_PRIVATE_KEY**
- Name: `EC2_SSH_PRIVATE_KEY`
- Value: Contents of your `.pem` file
  
  To get the contents:
  ```bash
  # Mac/Linux
  cat ~/Downloads/devops-pipeline-key.pem
  
  # Copy the ENTIRE output including:
  # -----BEGIN RSA PRIVATE KEY-----
  # ... all the lines ...
  # -----END RSA PRIVATE KEY-----
  ```
  Paste the entire content into the secret value field.

---

### **6. Deploy the Application**

#### 6.1 Trigger Deployment
The pipeline automatically runs when you push to the `main` branch:

```bash
# Make a small change to trigger deployment
git add .
git commit -m "Trigger deployment"
git push origin main
```

#### 6.2 Monitor the Deployment
1. Go to your GitHub repository
2. Click **Actions** tab
3. Click on the latest workflow run
4. Watch the progress of all three jobs:
   - ✅ Terraform Infrastructure
   - ✅ Build & Test Application  
   - ✅ Deploy to EC2

**Expected Duration:** 3-5 minutes

#### 6.3 Retrieve Your Application URL
After successful deployment:
1. Scroll to the bottom of the **Deploy to EC2** job
2. Look for **Display Deployment Info**
3. Copy the Application URL (e.g., `http://54.123.45.67`)
4. Open it in your browser!

🎉 **Your application is now live!**

---

## 📁 Project Structure

```
quote-generator-pipeline/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
│
├── public/                     # Frontend files
│   ├── index.html             # HTML structure
│   ├── styles.css             # Beautiful styling
│   └── app.js                 # Frontend JavaScript
│
├── main.tf                    # Main Terraform configuration
├── variables.tf               # Terraform variables
├── outputs.tf                 # Terraform outputs
├── terraform.tfvars.example   # Example variables file
│
├── server.js                  # Express.js backend
├── package.json               # Node.js dependencies
├── nginx.conf                 # Nginx configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # This file!
```

---

## 🔌 API Endpoints

### **GET /api/quotes/random**
Get a random quote from a specific category or all categories.

**Query Parameters:**
- `category` (optional): `all`, `motivational`, `success`, `inspiration`, `technology`, `devops`

**Example:**
```bash
curl http://YOUR-IP/api/quotes/random?category=motivational
```

**Response:**
```json
{
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs"
}
```

### **GET /api/quotes/categories**
Get all available quote categories.

**Example:**
```bash
curl http://YOUR-IP/api/quotes/categories
```

**Response:**
```json
["motivational", "success", "inspiration", "technology", "devops"]
```

### **GET /api/quotes/:category**
Get all quotes from a specific category.

**Example:**
```bash
curl http://YOUR-IP/api/quotes/devops
```

### **GET /api/health**
Health check endpoint.

**Example:**
```bash
curl http://YOUR-IP/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "Quote Generator API is running",
  "timestamp": "2024-02-18T12:00:00.000Z"
}
```

---

## 🔧 Troubleshooting

### **Issue: GitHub Actions Fails on Terraform Apply**

**Possible Causes:**
- AWS credentials are incorrect
- IAM user lacks necessary permissions
- Key pair name doesn't match

**Solution:**
1. Verify all GitHub secrets are correct
2. Check IAM user has `AmazonEC2FullAccess` policy
3. Ensure `AWS_KEY_NAME` matches your EC2 key pair name exactly

---

### **Issue: Deployment Fails with SSH Connection Error**

**Possible Causes:**
- EC2_SSH_PRIVATE_KEY secret is incorrect
- EC2 instance not ready yet
- Security group blocking SSH

**Solution:**
1. Verify the entire `.pem` file content is in the secret
2. Check EC2 instance is running in AWS console
3. Verify security group allows SSH (port 22) from 0.0.0.0/0

---

### **Issue: Application Not Accessible in Browser**

**Possible Causes:**
- Nginx not configured correctly
- Node.js app not running
- Security group blocking HTTP traffic

**Solution:**
1. SSH into EC2:
   ```bash
   ssh -i devops-pipeline-key.pem ubuntu@YOUR-IP
   ```

2. Check Node.js app status:
   ```bash
   sudo systemctl status quote-app
   ```

3. Check Nginx status:
   ```bash
   sudo systemctl status nginx
   ```

4. View logs:
   ```bash
   sudo journalctl -u quote-app -n 50
   sudo tail -f /var/log/nginx/quote-app-error.log
   ```

---

### **Issue: Health Check Fails**

**Possible Causes:**
- Application crashed
- Port 3000 not accessible
- Nginx misconfigured

**Solution:**
1. Check if app is running:
   ```bash
   curl localhost:3000/api/health
   ```

2. Restart the application:
   ```bash
   sudo systemctl restart quote-app
   sudo systemctl restart nginx
   ```

---

### **Issue: Terraform State Lock**

**Possible Causes:**
- Previous workflow didn't complete
- Concurrent deployments

**Solution:**
1. Wait for previous deployment to complete
2. If stuck, manually unlock (advanced):
   ```bash
   terraform force-unlock LOCK_ID
   ```

---

## 🎓 Additional Resources

### **Learning Materials**
- [Terraform Documentation](https://www.terraform.io/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Express.js Guide](https://expressjs.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)

### **AWS Cost Considerations**
- **t3.micro instance**: ~$7-8/month (eligible for free tier)
- **Data transfer**: First 1GB/month free
- **Elastic IP** (if you attach one): ~$3.6/month when not associated

**Cost Saving Tips:**
- Use AWS Free Tier (first 12 months)
- Stop EC2 instances when not in use
- Use `terraform destroy` to remove all resources:
  ```bash
  terraform destroy
  ```

### **Security Best Practices**
1. ✅ Never commit `.pem` files or `terraform.tfvars`
2. ✅ Use GitHub Secrets for sensitive data
3. ✅ Regularly rotate AWS access keys
4. ✅ Restrict security group rules to specific IPs when possible
5. ✅ Enable AWS CloudWatch for monitoring
6. ✅ Set up billing alerts in AWS

---

## 🎉 What's Next?

### **Enhance the Application**
- [ ] Add user authentication
- [ ] Implement database for custom quotes
- [ ] Add admin panel for managing quotes
- [ ] Create mobile app version

### **Improve the Pipeline**
- [ ] Add automated testing (Jest, Mocha)
- [ ] Implement blue-green deployment
- [ ] Add monitoring with CloudWatch
- [ ] Set up auto-scaling
- [ ] Configure HTTPS with SSL/TLS
- [ ] Add environment staging (dev, staging, prod)

### **Advanced DevOps**
- [ ] Implement Docker containerization
- [ ] Use Kubernetes for orchestration
- [ ] Add Prometheus + Grafana monitoring
- [ ] Set up ELK stack for logging
- [ ] Implement Infrastructure testing (Terratest)

---

## 📄 License

This project is licensed under the MIT License - feel free to use it for learning and teaching!

---

## 👨‍💻 About

Created for **DevOps Academy** to demonstrate a complete CI/CD pipeline for aspiring DevOps engineers.

**Built with ❤️ using:**
- Node.js • Express • AWS • Terraform • GitHub Actions • Nginx

---

## 🤝 Contributing

Found a bug or want to improve this project? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you have questions or need help:
- Open an issue in the GitHub repository
- Contact the DevOps Academy team

---

**Happy Deploying! 🚀**