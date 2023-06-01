FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

WORKDIR /src
COPY src/Startup/Startup.csproj Startup/
COPY src/Core/Core.csproj Core/
WORKDIR /src/Startup
RUN dotnet restore

WORKDIR /src
COPY src/ .

WORKDIR /src/Startup
RUN dotnet build "Startup.csproj" -c Release -o /app/build --no-restore
RUN dotnet publish "Startup.csproj" -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS final
EXPOSE 80
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Startup.dll"]