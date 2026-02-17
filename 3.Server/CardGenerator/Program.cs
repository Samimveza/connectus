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

namespace TTGenerator;
public class Program
{
    static void Main(string[] args)
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

        services.AddSingleton<IConfiguration>(configuration);

        InitiateFileGeneration(configuration, services);
    }



    //"" : "DIRECT"
    //1 : "QRCODE"
    //2 : "NFC"

    public static void InitiateFileGeneration(IConfiguration configuration, IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();

        var cardService = serviceProvider.GetService<ICardService>();

        int counter = 1;

        while (counter <= 1000)
        {

            cardService.GenerateNewCard();
            counter += 1;
        }
    }
}