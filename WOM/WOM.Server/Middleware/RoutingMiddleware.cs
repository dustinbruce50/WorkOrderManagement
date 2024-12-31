using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace WOM.Server.Middleware{
public class RoutingMiddleware{
    private readonly RequestDelegate _next;

    public RoutingMiddleware(RequestDelegate next){
        _next = next;
    }

    public async Task InvokeAsync (HttpContext context){
        var path = context.Request.Path.ToString().ToLower();
        var protectedRoutes = new[] {"/dashboard"};
        
        if(protectedRoutes.Any(route => path.Contains(route))){
            if(!context.Session.TryGetValue("Username", out var value)){
                context.Response.Redirect("/login");
                return;
            }
        }

        await _next(context);
    }
}
}