@echo off
echo Rebuilding auth-service with CORS fix...

cd microservices\auth-service
call mvn clean package -DskipTests
cd ..\..

echo Stopping auth-service container...
docker-compose stop auth-service

echo Rebuilding auth-service image...
docker-compose build auth-service

echo Starting auth-service...
docker-compose up -d auth-service

echo Done! Auth service is restarting with CORS enabled.
echo Wait 30 seconds for the service to fully start, then test signin/signup.

pause
