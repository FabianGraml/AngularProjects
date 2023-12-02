using CovidDashbboardBackend;
using CovidDashbboardBackend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
string swaggerVersion = "v1";
string swaggerTitle = "CovidDashbboardBackend";

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------- ConfigureServices
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<UserDashboardService>();


var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);
var appSettings = appSettingsSection.Get<AppSettings>();
byte[]? key = Encoding.ASCII.GetBytes(appSettings.Secret!);

builder.Services.AddAuthentication(x =>
{
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
	x.RequireHttpsMetadata = false;
	x.SaveToken = true;
	x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(key),
		ValidateIssuer = false,
		ValidateAudience = false,
	};
});

builder.Services.AddSwaggerGen(x =>
{
	x.SwaggerDoc(swaggerVersion, new OpenApiInfo
	{
	  Title = swaggerTitle,
	  Version = swaggerVersion
	});
});

builder.Services.AddCors(options =>
{
	options.AddPolicy(myAllowSpecificOrigins,
		x => x.AllowAnyOrigin()
			  .AllowAnyMethod()
			  .AllowAnyHeader()
	  );
});
// -------------------------------------------- ConfigureServices END

var app = builder.Build();

// -------------------------------------------- Middlewaret pipeline
if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
	Console.WriteLine("******** Swagger enabled: http://localhost:5000/swagger (to set as default route: see launchsettings.json)");
	app.UseSwagger();
	app.UseSwaggerUI(x => x.SwaggerEndpoint( $"/swagger/{swaggerVersion}/swagger.json", swaggerTitle));
}

app.UseCors(myAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();
// -------------------------------------------- Middleware pipeline END

app.Run();
