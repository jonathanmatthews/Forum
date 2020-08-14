# Forum
## Setting up locally
### Option 1
```
cd Forum/server
dotnet user-secrets set connectionString "<SQL server connection string>"
dotnet ef database update
dotnet watch run
```
```
cd Forum/client
npm i
ng serve
```
### Option 2
```
docker-compose up --build --detach
