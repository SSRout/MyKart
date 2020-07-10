using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static  IServiceCollection AddSwaggerDocumentation(this IServiceCollection services){
             services.AddSwaggerGen(c=>{
                c.SwaggerDoc("v1", new OpenApiInfo{
                    Title="MyKart API",
                    Version="v1"
                });
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app){
            app.UseSwagger();
            app.UseSwaggerUI(x=>{
                x.SwaggerEndpoint("/swagger/v1/swagger.json","MyKart v1 API");
            });
            return app;
        }
    }
}