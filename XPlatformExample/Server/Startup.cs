using System;
using XPlatformExample.Server.Models;
using XPlatformExample.Server.Services;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System.Collections.Generic;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Ninject;
using Ninject.Web.Common;
using WebApiContrib.IoC.Ninject;
using XPlatformExample.Server.App_Start;
using XPlatformExample.Server.Provider;
using XPlatformExample.Server.Repositories;

[assembly: OwinStartup(typeof(XPlatformExample.Server.Startup))]

namespace XPlatformExample.Server
{
    public class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
            var config = new HttpConfiguration
            {
                DependencyResolver = new NinjectResolver(CreateKernel())
            };
            
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            
            config.MapHttpAttributeRoutes();
            
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            app.Map("/signalr", map =>
            {
                map.UseCors(CorsOptions.AllowAll);
                map.RunSignalR();
            });

            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                AllowInsecureHttp = true
            };

            app.UseOAuthBearerTokens(OAuthOptions);
            app.UseWebApi(config);
        }

        public static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();

            kernel.Bind<IPersonRepository>().ToConstant(new PersonRepository());

            return kernel;
        }
    }
}
