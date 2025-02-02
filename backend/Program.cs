using GenericServices.Setup;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using JobApplicationAPI.Shared.Database;
using JobApplicationAPI.Shared.Models.UserModels.Dtos;
using System.Text.Json.Serialization;

namespace JobApplicationAPI.Program;

public class Program
{
    static void Main(string[] args)
    {

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

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "JobApplicationProjectIss",
                ValidAudience = "JobApplicationProjectAudience",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JobApplicationProjectSecurityKey")),
            };

            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                    {
                        context.Response.Headers.Add("Token-Expired", "true");
                    }
                    return Task.CompletedTask;
                }
            };
        });

        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin").RequireAuthenticatedUser());
            options.AddPolicy("UserOnly", policy => policy.RequireRole("JobSeeker").RequireAuthenticatedUser());
            options.AddPolicy("CompanyOnly", policy => policy.RequireRole("Company").RequireAuthenticatedUser());
        });


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
    }
}

