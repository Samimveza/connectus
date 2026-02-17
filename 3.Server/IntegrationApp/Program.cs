// See https://aka.ms/new-console-template for more information
using Business.Common;
using Business.Interfaces;
using Business.Model;
using Data.Identity;
using Data.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Service.Common;
using Service;
using Service.Interfaces;
using Service.Log;
using Service.Mail;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using System;
using Business.Dto.Request;
using Service.Extension;
using Newtonsoft.Json;

namespace TTGenerator;
public class Program
{
    static async Task Main(string[] args)
    {
        var services = new ServiceCollection();
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        Data.Dependencies.ConfigureServices(configuration, services);

        services.AddIdentity<ApplicationUser, IdentityRole>(o =>
        {
            o.Password.RequireDigit = true;
            o.Password.RequireLowercase = true;
            o.Password.RequireUppercase = true;
            o.Password.RequireNonAlphanumeric = true;
            o.Password.RequiredLength = 8;

            o.User.RequireUniqueEmail = false;
            o.SignIn.RequireConfirmedEmail = true;
            o.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
        })
        .AddEntityFrameworkStores<AppIdentityDbContext>()
        .AddDefaultTokenProviders();


        services.AddScoped(typeof(IAppLogger<>), typeof(LoggerAdapter<>));
        services.AddScoped<ITokenClaimsService, IdentityTokenClaimService>();

        var key = Encoding.ASCII.GetBytes(AuthorizationConstants.JWT_SECRET_KEY);

        services.AddAuthentication(config =>
        {
            config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(config =>
        {
            config.RequireHttpsMetadata = false;
            config.SaveToken = true;
            config.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        services.AddScoped<Microsoft.AspNetCore.Authentication.IAuthenticationService, AuthenticationService>();
        services.AddScoped<IPersonService, PersonService>();
        services.AddScoped<IGlobalDataService, GlobalDataService>();
        services.AddScoped<IFileService, FileService>();

        services.AddScoped<IPermissionService, PermissionService>();
        services.AddScoped<IMailService, MailService>();
        services.AddScoped<ILogService, LogService>();
        services.AddScoped<IOnboardingService, OnboardingService>();
        services.AddScoped<ICardService, CardService>();
        services.AddScoped<IAnalyticsService, AnalyticsService>();
        services.AddScoped<IIntegrationService, IntegrationService>();
        services.AddScoped<Service.IntegrationGateway.IntegrationGatewayResolver>();
        services.AddHttpClient<Service.IntegrationGateway.CeleroIntegrationGatewayService>();

        services.AddSingleton<IConfiguration>(configuration);

        await IntiateIntegraation(configuration, services);
    }


    public static async

    Task
IntiateIntegraation(IConfiguration configuration, IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();

        var integrationService = serviceProvider.GetService<IIntegrationService>();
        var response = await integrationService.ProcessInitializationAsync(new Business.Dto.Request.Integration.ProcessInitializationRequest()
        {

        });

        //Console.WriteLine(JsonConvert.SerializeObject(response, Formatting.Indented));
    }
}