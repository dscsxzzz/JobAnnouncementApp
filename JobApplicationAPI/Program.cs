using GenericServices.Setup;
using JobApplicationAPI.Shared.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models.Dtos;
using Models.Validation;
using System.Reflection;
using FluentValidation.AspNetCore;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<JobAppContext>(options =>
    options.UseNpgsql("Host=localhost;Database=JobApp;Username=postgres;Password=test"));
builder.Services.GenericServicesSimpleSetup<JobAppContext>(
    Assembly.GetAssembly(typeof(UserReadDto)));
builder.Services.AddFluentValidationAutoValidation()
    .AddValidatorsFromAssemblyContaining(
        typeof(UserReadDto)
    );


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
