# Stage 1: Build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy the JobAppApi folder into the container
COPY . ./
# Restore dependencies
RUN dotnet restore "JobApplicationAPI.csproj"

# Build and publish a release
RUN dotnet publish -c Release -o out ./JobApplicationAPI.csproj

# Stage 2: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "JobApplicationAPI.dll"]