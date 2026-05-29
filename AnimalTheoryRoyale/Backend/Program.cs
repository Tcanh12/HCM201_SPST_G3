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

// Configure Entity Framework Core with PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString))
{
    connectionString = connectionString.Trim(' ', '"', '\'');
    if (connectionString.StartsWith("postgres://") || connectionString.StartsWith("postgresql://"))
    {
        var uri = new Uri(connectionString);
        var userInfo = uri.UserInfo.Split(':');
        var builderDb = new Npgsql.NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port > 0 ? uri.Port : 5432,
            Database = uri.LocalPath.TrimStart('/'),
            Username = userInfo[0],
            Password = userInfo.Length > 1 ? userInfo[1] : "",
            SslMode = Npgsql.SslMode.Prefer
        };
        connectionString = builderDb.ConnectionString;
    }
}
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

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
builder.Services.AddSignalR().AddMessagePackProtocol();

// Register GameEngine as a Singleton so the GameHub can access the same state
builder.Services.AddSingleton<GameEngine>();
// Register GameEngine as a HostedService to run the background loop
builder.Services.AddHostedService(provider => provider.GetRequiredService<GameEngine>());

var app = builder.Build();

// Auto-migrate database on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred migrating the DB.");
    }
}

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
