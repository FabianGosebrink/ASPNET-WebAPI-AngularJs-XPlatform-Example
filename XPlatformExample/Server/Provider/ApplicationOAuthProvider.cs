using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;

namespace XPlatformExample.Server.Provider
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return base.ValidateClientAuthentication(context);
        }

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            if (context.UserName == context.Password)
            {
                var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, context.UserName));
                context.Validated(claimsIdentity);
            }

            return base.GrantResourceOwnerCredentials(context);
        }
    }
}
