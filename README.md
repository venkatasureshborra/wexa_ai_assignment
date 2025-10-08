# Wexa_AI_Assignment
## Project Description
This is a personal Portfolio web application built with **Next.js**. It showcases projects, skills, and experience in a clean and modern UI. The project is fully containerized using **Docker** and can be deployed locally or on **Kubernetes** using Minikube.  

The repository also includes a **CI/CD pipeline** using **GitHub Actions**, which automatically builds and pushes the Docker image to **GitHub Container Registry (GHCR)** on every push to the `main` branch. Then it automatically fetech the image and deploy to kubernetes using github runners.


Key Features:
- Fast and responsive portfolio website
- Easy to run locally with Docker
- CI/CD automation for Docker image builds
- Kubernetes deployment ready for Minikube


## Setup Instructions
Install **Minikube** and **Docker** on your system by following their official documentation:
- [Docker Installation Guide](https://docs.docker.com/get-docker/)
- [Minikube Installation Guide](https://minikube.sigs.k8s.io/docs/start/)
- [Node Installation ](https://nodejs.org/en/download) # only install if you want try the aplication in local system
### Clone the Repository
```bash
git clone https://github.com/venkatasureshborra/wexa_ai_assignment
cd wexa_ai_assignment
```
### Install Dependencies
```bash
npm ci
```
### Run the App Locally
```bash
npm run dev
```
- Visit: http://localhost:3000
## Docker Setup
### Build the Docker Image
```bash
docker build -t portfolio:latest .
```
### Run the Container
```bash
docker run -d -p 3000:3000 portfolio:latest
```
- Visit: http://IP-of-VM:3000 # if you run it on the VM
### Pushing Docker Images to GitHub Container Registry (GHCR)

#### Create a Personal Access Token (PAT)

To push Docker images to **GitHub Container Registry**, you need a **Personal Access Token (PAT)** with appropriate permissions.

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**  
2. Click **“Generate new token”** → Select **“Generate new token (classic)”**  
3. Under **Scopes**, select:
   - `read:packages`
   - `write:packages`
   - `delete:packages` *(optional)*
   - `repo`
4. Copy the generated token — you’ll need it for authentication.
#### Login to GHCR

Run the following command to log in to GitHub Container Registry:

```bash
echo <YOUR_GHCR_TOKEN> | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
```
Push the Image to GitHub Container Registry
```bash
docker push ghrc.io/<username>/<repo-name>
```
## Kubernetes Deployment (Minikube)
### Start Minikube
```bash
minikube start
```
### Apply Kubernetes Manifests
```bash
kubectl apply -f namespace.yaml
kubectl apply -f k8s/deploy.yaml
kubectl apply -f k8s/service.yaml
```
### Check Resources
```bash
kubectl get pods -n wexa
kubectl get svc -n wexa
```
### Access the Application
After deploying the application, you can access it using the following service information:
```bash
minikube service portfolio-service -n wexa --all
```
It Something like the below output:

│ wexa │ portfolio-svc │ 3000 │ http://10.0.2.15:30001

- Visit: http://10.0.2.15:30001 # if you install minikube on vm ,access it via VM_IP


## GitHub Actions CI/CD

Automate the entire process — from building the Docker image to deploying it into Kubernetes — using **GitHub Actions**.

To run the workflow on your local machine:

1️⃣ Create a folder on your local system to store the GitHub Action self-hosted runner.  
2️⃣ Register and configure the runner by following the official documentation:  
   👉 [GitHub Self-Hosted Runner Setup Guide](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners)

Once configured, the workflow will automatically execute the instructions on your local system whenever code is pushed to the `main` branch.

Example workflow file (`.github/workflows/cicd.yaml`):
- Note: This is my file according to my system configutration
```yaml
name: CI/CD Pipeline_For_Portfolio_app

on:
  push:
    branches:
      - main

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: venkatasureshborra/portfolio

jobs:
  build-deploy:
    runs-on: self-hosted

    steps:
      #Step 1: Checkout repository
      - name: Checkout code
        uses: actions/checkout@v4

      #Step 2: Set up Docker login to GHCR
      - name: Log in to GitHub Container Registry
        run: echo "${{ secrets.GHCR_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
      #Step 3: Generate image version (E.X., v2.0, v2.1, ...)
      - name: Generate image tag
        id: version
        run: |
          VERSION_FILE=version.txt
          if [ ! -f $VERSION_FILE ]; then
            echo "2.0" > $VERSION_FILE
          else
            OLD_VERSION=$(cat $VERSION_FILE)
            NEW_VERSION=$(echo $OLD_VERSION | awk -F. -v OFS=. '{$NF++;print}')
            echo $NEW_VERSION > $VERSION_FILE
          fi
          echo "version=$(cat $VERSION_FILE)" >> $GITHUB_OUTPUT

      #Step 4: Build Docker image
      - name: Build Docker image
        run: |
          docker build -t $REGISTRY/$IMAGE_NAME:v${{ steps.version.outputs.version }} .

      #Step 5: Push image to GHCR
      - name: Push Docker image
        run: |
          docker push $REGISTRY/$IMAGE_NAME:v${{ steps.version.outputs.version }}

      #Step 6: Clean up local Docker images
      - name: Cleanup local images
        run: |
          docker rmi $REGISTRY/$IMAGE_NAME:v${{ steps.version.outputs.version }} || true

      #Step 7: Kubernetes deployment
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/portfolio-app \
            portfolio-cont=$REGISTRY/$IMAGE_NAME:v${{ steps.version.outputs.version }} -n wexa
          kubectl rollout status deployment/portfolio-app -n wexa
```
# Conclusion

This project demonstrates the complete DevOps lifecycle — from local development with Docker to automated deployment on Kubernetes using GitHub Actions.  

The setup ensures:
- Smooth local development using Next.js  
- Containerized deployments with Docker  
- Continuous Integration & Delivery using GitHub Actions  
- Scalable hosting on Kubernetes (Minikube)  

### 🔍 Preview of the Deployed Site

Portfolio Screenshot
<img width="1157" height="809" alt="image" src="https://github.com/user-attachments/assets/0ef8dfe1-a43c-4522-a465-4703ae60678e" />
