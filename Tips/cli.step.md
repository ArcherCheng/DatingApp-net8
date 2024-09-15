# Dotnet Cli

1. dotnet --info
2. dotnet -h
3. dotnet new -h
4. dotnet new list
5. dotnet new sln
6. dotnet new webapi -h
7. dotnet new webapi -controllers -n API
8. dotnet sln add API
9. dotnet sln list
10. code .
11. cd api
12. dotnet run
13. dotnet dev-certs https
14. dotnet run
15. dotnet watch
16. dotnet tool list -g
17. dotnet new tool-manifest # if you are setting up this repo
    dotnet tool install --local dotnet-ef --version 8.0.8
18. dotnet ef
19. dotnet ef migrations add InitialCreate -o Data/Migrations
20. dotnet ef database -h
21. dotnet new gitignore --force
22. dotnet ef migrations add addUsersPasswordHash
23. dotnet ef database update

### Angular Cli

1. node --version

   install node.js
2. npm install -g @angular/cli@18.2.4
3. ng version
4. ng new client
5. ng serve
6. npm start
7. npm i ngx-bootstrap bootstrap font-awesome --save
8. use admin cmd
9. use admin cmd mode
10. choco install mkcert
11. mkcert -install
12. md ssl
13. cd ssl
14. mkcert localhost
15. open angular.json
16. angular.json => "serve": {
    "options": {
    "ssl": true,
    "sslKey": "./ssl/localhost-key.pem",
    "sslCert": "./ssl/localhost.pem"
    },,,,}
17.
