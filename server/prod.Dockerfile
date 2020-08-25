FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

WORKDIR /forum
COPY . ./

WORKDIR /forum/server
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /server
COPY --from=build-env /forum/server/out .

ENTRYPOINT ["dotnet", "server.dll"]