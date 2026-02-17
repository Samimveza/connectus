using Business.Common;
using Business.Interfaces;
using Data.Identity;
using Data.Interfaces;
using Data.Logging;
using Data.Source;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PublicApi;
using PublicApi.Authorization;
using Service;
using Service.Authentication;
using Service.Common;
using Service.Extension;
using Service.Interfaces;
using Service.Log;
using Service.Mail;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

Data.Dependencies.ConfigureServices(builder.Configuration, builder.Services);

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(o =>
{
    o.Password.RequireDigit = false;
    o.Password.RequireLowercase = false;
    o.Password.RequireUppercase = false;
    o.Password.RequireNonAlphanumeric = false;

    o.User.RequireUniqueEmail = false;
    o.SignIn.RequireConfirmedEmail = true;
    o.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
})
.AddEntityFrameworkStores<AppIdentityDbContext>()
.AddDefaultTokenProviders()
 .AddTokenProvider<EmailConfirmationTokenProvider<ApplicationUser>>("emailconfirmation");
//builder.Services.Configure<DataProtectionTokenProviderOptions>(opt =>
//    opt.TokenLifespan = TimeSpan.FromHours(2));
builder.Services.Configure<EmailConfirmationTokenProviderOptions>(opt =>
    opt.TokenLifespan = TimeSpan.FromDays(3));

//.AddTokenProvider<EmailConfirmationTokenProvider<ApplicationUser>>("emailconfirmation");

//builder.Services.Configure<EmailConfirmationTokenProviderOptions>(opt =>
//    opt.TokenLifespan = TimeSpan.FromDays(3));

//builder.Services.AddDataProtection()
//    .SetApplicationName("ExchangeApp");

//builder.Services.AddDataProtection(options =>
//{
//    options.ApplicationDiscriminator = "ExchangeApp";
//});

//builder.Services.AddDataProtection()
//     .SetApplicationName("Exchange")
//    .PersistKeysToFileSystem(new DirectoryInfo(@"C:\Projects\digitalafrica\Exchange\Exchange\PublicApi\keys"));

builder.Services.AddHttpContextAccessor();


builder.Services.AddScoped(typeof(IAppLogger<>), typeof(LoggerAdapter<>));
builder.Services.AddScoped<ITokenClaimsService, IdentityTokenClaimService>();

var key = Encoding.ASCII.GetBytes(AuthorizationConstants.JWT_SECRET_KEY);

builder.Services.AddAuthentication(config =>
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

const string CORS_POLICY = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORS_POLICY,
        corsPolicyBuilder =>
        {
            corsPolicyBuilder.AllowAnyOrigin();
            corsPolicyBuilder.AllowAnyHeader();
            corsPolicyBuilder.AllowAnyMethod();
            corsPolicyBuilder.WithExposedHeaders("Content-Disposition");
        });
});

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<IGlobalDataService, GlobalDataService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();


builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<ILogService, LogService>();
builder.Services.AddScoped<IOnboardingService, OnboardingService>();
builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();
builder.Services.AddScoped<IIntegrationService, IntegrationService>();
builder.Services.AddScoped<Service.IntegrationGateway.IntegrationGatewayResolver>();
builder.Services.AddHttpClient<Service.IntegrationGateway.CeleroIntegrationGatewayService>();

builder.Services.AddScoped<IStructureService, StructureService>();

builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IShopProductCategoryService, ShopProductCategoryService>();
builder.Services.AddScoped<IStructureAttributeService, StructureAttributeService>();
builder.Services.AddScoped<IStructureOptionService, StructureOptionService>();
builder.Services.AddScoped<IStructureProductService, StructureProductService>();



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    c.EnableAnnotations();
    c.SchemaFilter<CustomSchemaFilters>();
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
            });
});
var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var scopedProvider = scope.ServiceProvider;
    try
    {
        //var catalogContext = scopedProvider.GetRequiredService<CatalogContext>();
        //await CatalogContextSeed.SeedAsync(catalogContext, app.Logger);

        //var userManager = scopedProvider.GetRequiredService<UserManager<ApplicationUser>>();
        //var roleManager = scopedProvider.GetRequiredService<RoleManager<IdentityRole>>();
        //var identityContext = scopedProvider.GetRequiredService<AppIdentityDbContext>();
        //await AppIdentityDbContextSeed.SeedAsync(identityContext, userManager, roleManager);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "An error occurred seeding the DB.");
    }
}


app.UseCors(CORS_POLICY);

app.UseAuthorization();

app.MapControllers();

// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
// specifying the Swagger JSON endpoint.
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.Run();
