REPOSITORY=/home/ubuntu/deploy-fe/catch-study # 배포된 프로젝트 경로
cd $REPOSITORY # 이 경로로 이동해서 밑에 명령어들을 차례로 실행
yarn build-CI
yes | cp -rf build/* /var/www/html/
sudo service nginx restart