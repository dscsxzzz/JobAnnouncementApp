namespace JobApplicationAPI.Shared.Models.UserModels.Dtos;

public partial class UserLoginDto
{
    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

}
