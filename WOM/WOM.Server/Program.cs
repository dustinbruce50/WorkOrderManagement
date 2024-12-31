using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WOM.Server.Models;
using WOM.Server.Services;
using WOM.Server.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite("Data Source=wom.db"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<UserService>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
    {
        options.IdleTimeout = TimeSpan.FromMinutes(60);
        options.Cookie.HttpOnly = true;
        options.Cookie.IsEssential = true;
    }
);




builder.Services.AddCors(options => 
    { options.AddPolicy("AllowLocalhost3000", 
        builder => 
            { builder.WithOrigins("https://localhost:3000") 
            .AllowAnyHeader() 
            .AllowAnyMethod() 
            .AllowCredentials();
            });
});

builder.WebHost.ConfigureKestrel(serverOptions => 
{ serverOptions.ListenAnyIP(5203, listenOptions => 
    { listenOptions.UseHttps(); // Use the trusted self-signed certificate 
    }); 
});





var app = builder.Build();

app.UseSession();
app.UseMiddleware<RoutingMiddleware>();

app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalhost3000");
app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();