using GenericServices;
using JobApplicationAPI.Services;
using JobApplicationAPI.Services.ListExtension;
using JobApplicationAPI.Shared.Database;
using JobApplicationAPI.Shared.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public UserController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<UserReadDto>>> GetUserAsync(
    )
    {
        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int userId = JwtService.GetJwtUserIdClaim(bearer);

            var user = await _service
                .ReadSingleAsync<UserReadDto>(userId);

            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<UserUpdateDto>> UpdateUserAsync(
        [FromBody] UserUpdateDto userDto
    )
    {
        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int userId = JwtService.GetJwtUserIdClaim(bearer);

            var user = await _service
                .ReadSingleAsync<UserReadDto>(userDto.UserId);

            if (user == default)
                return NotFound("User with speicified id not found.");

            if (user.UserId != userId)
                return StatusCode(403, "You cannot access this.");

            await _service.UpdateAndSaveAsync(userDto);

            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [Authorize]
    [HttpDelete("{userId}")]
    public async Task<ActionResult> DeleteUserAsync(
        [FromRoute] int userId
    )
    {
        if (userId < 1)
            return BadRequest("User Id cannot be less than 1.");

        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int userIdClaim = JwtService.GetJwtUserIdClaim(bearer);
            var isAdmin = JwtService.GetJwtRoleClaim(bearer) == "Admin";

            var user = await _service
                .ReadSingleAsync<UserReadDto>(userId);

            if (user == default)
                return NotFound("User with specified id not found.");

            if (userId == userIdClaim || !isAdmin)
                return StatusCode(403, "You cannot access this.");

            await _service.DeleteAndSaveAsync<User>(userId);

            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
