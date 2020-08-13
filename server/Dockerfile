FROM mcr.microsoft.com/dotnet/core/sdk:3.1
RUN dotnet tool install --global dotnet-ef
ENV PATH="/root/.dotnet/tools:${PATH}"

EXPOSE 5000
EXPOSE 5001

WORKDIR /forum/server
CMD [ "bash", "DockerStart.sh" ]
