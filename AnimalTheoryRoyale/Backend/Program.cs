using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Data;
using AnimalTheoryRoyale.Hubs;
using AnimalTheoryRoyale.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS for Frontend (allow LAN access)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.SetIsOriginAllowed(_ => true) // Allow any origin for LAN play
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Listen on all interfaces for LAN play
builder.WebHost.UseUrls("http://0.0.0.0:5000");

// Add SignalR
builder.Services.AddSignalR();

// Register GameEngine as a Singleton so the GameHub can access the same state
builder.Services.AddSingleton<GameEngine>();
// Register GameEngine as a HostedService to run the background loop
builder.Services.AddHostedService(provider => provider.GetRequiredService<GameEngine>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Disabled for LAN play

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

// Map SignalR Hub
app.MapHub<GameHub>("/gamehub");

app.Run();
