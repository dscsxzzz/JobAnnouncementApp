namespace JobApplicationAPI.Shared.Models.UserModels.Dtos;

public partial class UserChangePasswordDto
{
    public string Password { get; set; } = null!;

    public string NewPassword { get; set; } = null!;
}
