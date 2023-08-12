namespace Serenity.Extensions;

[FormScript(LocalTextPrefix = "Forms.Membership.ForgotPassword.")]
public class ForgotPasswordRequest : ServiceRequest
{
    [Required(true), EmailAddressEditor, DisplayName("E-mail Address"), Placeholder("e-mail")]
    public string Email { get; set; }
}