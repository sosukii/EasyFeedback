pipeline {
  agent any

  environment {
    DEPLOY_DIR = "/var/www/easyfeedback"
  }

  stages {
    stage('STAGE 1: Clone repo') {
      steps {
        echo 'Cloning repository...'
      }
    }

    stage('STAGE 2: Install deps') {
      steps {
        sh 'npm install'
      }
    }

    stage('STAGE 3: Build') {
      steps {
        echo 'start timeout 5 min'
        timeout(time: 5, unit: 'MINUTES') {
          sh 'npm run build'
        }
        echo 'end timeout 5 min'
      }
    }

    stage('STAGE 4: Deploy to server') {
      steps {
        sh 'rm -rf $DEPLOY_DIR/*'
        sh 'cp -r dist/* $DEPLOY_DIR'
      }
    }
  }
}