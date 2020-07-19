# lambda-askjeeves
Experimental Basecamp chatbot for answering questions from Case's benefits documents.

This project uses AWS Kendra to index items in the `documents` folder. 

# Development Dependencies

* Windows
  - Windows Subsystem for Linux 2 
  - Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
  - NPM will need to be available. Install it within WSL2
* MacOS: 
  - Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
  - Homebrew: [https://brew.sh/](https://brew.sh/)
  - NPM will need to be available: Install it within Homebrew
* Linux: 
  - Docker Desktop is not available for Linux distributions. Just install the docker packages as described here: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
  - NPM will need to be available: Install it within your distro's package manager

After those packages are installed, you will need to do the following:

Change directory to your preferred location to pull the git repository. 
``` 
git clone git@github.com:caseconsulting/lambda-askjeeves.git
cd lambda-askjeeves
npm install
```

At this point, the necessary dependencies for development are installed. 

# Additional setup steps

We will need to have your AWS credentials added to your current user, so you will need to have [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) installed. 

```
aws configure
```

Use your credentials from `cat ~/.aws/credentials` from your AWS WorkSpace.

# Running the project locally

**NOTE**: Unfortunately, we cannot run this project locally within AWS WorkSpaces. If you choose to use AWS workspaces as your primary development location, you will need to deploy the project each time you want to test new code. 

Open two separate tabs in your Terminal application. 

**Server**:  To run the lambda function via `sam-cli`, run the following in tab #1: 
```
docker-compose up --force-recreate sam_app
```

**Client**: To ask the locally-running chatbot questions without going to Basecamp, run the following in tab #2: 
```
./bin/console.js
```

# Deployment to AWS Lambda

To deploy this project to AWS Lambda, you will need to have the AWS CLI set up on the machine you will deploy from. You'll need your IAM credentials in place. If you do not want to set this up on your local machine, you may run the deployment command from your AWS WorkSpace.

When you are ready to deploy new code, run:
```
npm run deploy
```