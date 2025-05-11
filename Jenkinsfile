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
        bat 'npm install'
      }
    }

    stage('STAGE 3: Build') {
      steps {
        bat 'quasar build'
      }
    }

    stage('STAGE 4: Deploy to server') {
      steps {
        bat 'rm -rf $DEPLOY_DIR/*'
        bat 'cp -r dist/* $DEPLOY_DIR'
      }
    }
  }
}