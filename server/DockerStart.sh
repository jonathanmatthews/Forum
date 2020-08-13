cd /forum/datamodel
dotnet ef database update
cd /forum/server
dotnet watch run --urls "http://0.0.0.0:5000;https://0.0.0.0:5001"