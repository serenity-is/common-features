using System.IO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;

namespace Serenity.Extensions;

/// <summary>
/// Default implementation of <see cref="IElevationHandler"/>
/// </summary>
public class DefaultElevationHandler : BaseRequestHandler, IElevationHandler
{
    public const int ElevationTokenDuration = 15;
    
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly IDataProtectionProvider dataProtectionProvider;
    private readonly ISystemClock systemClock;

    private DateTimeOffset UtcNow => systemClock?.UtcNow ?? DateTime.UtcNow;

    public DefaultElevationHandler(IRequestContext context, IHttpContextAccessor httpContextAccessor,
        IDataProtectionProvider dataProtectionProvider, ISystemClock systemClock = null)
        : base(context)
    {
        this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        this.dataProtectionProvider = dataProtectionProvider ?? throw new ArgumentNullException(nameof(dataProtectionProvider));
        this.systemClock = systemClock;
    }

    /// <inheritdoc />
    public void AppendElevationTokenToCookies()
    {
        if (httpContextAccessor.HttpContext is null)
            throw new ArgumentNullException(nameof(httpContextAccessor.HttpContext));
        
        var userId = Convert.ToInt32(httpContextAccessor.HttpContext.User.GetIdentifier() ?? throw new ArgumentNullException(nameof(User)));
        
        byte[] bytes;
        using (var ms = new MemoryStream())
        using (var bw = new BinaryWriter(ms))
        {
            bw.Write(UtcNow.AddMinutes(ElevationTokenDuration).DateTime.ToBinary());
            bw.Write(userId);
            bw.Flush();
            bytes = ms.ToArray();
        }

        var token = Convert.ToBase64String(
            dataProtectionProvider.CreateProtector("Elevation").Protect(bytes));

        httpContextAccessor.HttpContext.Response.Cookies.Append("ElevationToken", token, new CookieOptions()
        {
            SameSite = SameSiteMode.Lax,
            Secure = true,
            HttpOnly = true,
            Expires = UtcNow.AddMinutes(ElevationTokenDuration)
        });
    }

    /// <inheritdoc />
    public void ValidateElevationToken()
    {
        if (httpContextAccessor.HttpContext is null)
            throw new ArgumentNullException(nameof(httpContextAccessor.HttpContext));
        
        var token = httpContextAccessor.HttpContext?.Request.Cookies["ElevationToken"];

        if (token is null)
            throw new ValidationError("RequiresElevation", "Token not found");
        
        var currentUserId = Convert.ToInt32(httpContextAccessor.HttpContext.User.GetIdentifier() ?? throw new ArgumentNullException(nameof(User)));
        
        int userId;
        try
        {
            var bytes = dataProtectionProvider.CreateProtector("Elevation")
                .Unprotect(Convert.FromBase64String(token));

            using var ms = new MemoryStream(bytes);
            using var br = new BinaryReader(ms);
            var dt = DateTime.SpecifyKind(DateTime.FromBinary(br.ReadInt64()), DateTimeKind.Utc);
            
            if (dt < UtcNow)
                throw new ValidationError("Token expired");

            userId = br.ReadInt32();
        }
        catch (ValidationError)
        {
            throw;
        }
        catch (Exception)
        {
            throw new ValidationError("Invalid elevation token");
        }

        if (currentUserId != userId)
            throw new ValidationError("Invalid elevation token");
    }

    /// <inheritdoc />
    public void DeleteToken()
    {
        if (httpContextAccessor.HttpContext is null)
            throw new ArgumentNullException(nameof(httpContextAccessor.HttpContext));

        httpContextAccessor.HttpContext.Response.Cookies.Delete("ElevationToken");
    }
}