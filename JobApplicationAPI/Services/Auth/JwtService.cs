using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JobApplicationAPI.Services;

public static class JwtService
{
    public static string GenerateJwtToken(string email, string role, string userId)
    {
        var claims = new List<Claim>
        {
            new (ClaimTypes.Authentication, userId),
            new (ClaimTypes.Email, email),
            new (ClaimTypes.Role, role)
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JobApplicationProjectSecurityKey"));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "JobApplicationProjectIss",
            audience: "JobApplicationProjectAudience",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static string GetJwtRoleClaim(string bearer)
    {
        var jwt = bearer.Substring("Bearer ".Length);

        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtSecurity = tokenHandler.ReadToken(jwt) as JwtSecurityToken;

        string role = jwtSecurity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;

        return role;
    }

    public static int GetJwtUserIdClaim(string bearer)
    {
        var jwt = bearer.Substring("Bearer ".Length);

        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtSecurity = tokenHandler.ReadToken(jwt) as JwtSecurityToken;

        string Id = jwtSecurity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Authentication)?.Value;
        int UserId = Int32.Parse(Id);

        return UserId;
    }
}
