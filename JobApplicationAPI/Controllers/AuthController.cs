using GenericServices;
using JobApplicationAPI.Services;
using JobApplicationAPI.Shared.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Dtos;
using Models.Entities;
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public AuthController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> AuthentificateUserAsync(
        [FromBody] UserLoginDto userDto
    )
    {
        var user = await _service
            .ReadSingleAsync<User>(
                x => x.Email == userDto.Email
            );

        if (user == default)
            return NotFound("No User with specified email found");

        var validatePasseotd = HasherService.VerifyPassword(userDto.Password, user.Password);
        var token = JwtService.GenerateJwtToken(user.Email, user.UserStatus);

        return Ok(token);
    }

    [HttpPost("register")]
    public async Task<ActionResult> RegisterUserAsync(
        [FromBody] UserCreateDto userDto
    )
    {
        var userPresentInDb = await _service
            .ReadManyNoTracked<User>()
            .Where(x => x.Email == userDto.Email)
            .AnyAsync();

        if (userPresentInDb)
            return BadRequest("User with specified e-mail already exists");

        var phonePresentInDb = await _service
            .ReadManyNoTracked<User>()
            .Where(x => x.PhoneNumber == userDto.PhoneNumber)
            .AnyAsync();

        if (phonePresentInDb)
            return BadRequest("User with specified phone number already exists");

        await _service.CreateAndSaveAsync(userDto);

        return Ok();
    }
}
