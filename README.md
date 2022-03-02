# LiveResults Total

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Jocke-G/liveresults-total/@angular/core)

![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/Jocke-G/liveresults-total)

[![.github/workflows/docker-image.yml](https://github.com/Jocke-G/liveresults-total/actions/workflows/docker-image.yml/badge.svg)](https://github.com/Jocke-G/liveresults-total/actions/workflows/docker-image.yml)

Fetch results from https://liveresultat.orientering.se/, and displays in other ways.

## Run

### Angular

ng serve

### Docker from Docker Hub

[Docker Hub](https://hub.docker.com/repository/docker/jockeg/liveresults-total)

docker run -p 80:80 jockeg/liveresults-total:latest

### Docker Build & Run

docker build -t liveresults-total .

docker run -p 80:80 liveresults-total
