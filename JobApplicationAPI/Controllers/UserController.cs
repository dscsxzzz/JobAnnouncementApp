using GenericServices;
using JobApplicationAPI.Shared.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Dtos;
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[Authorize(Policy = "UserOnly")]
[ApiController]
[Route("users")]
public class UserController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public UserController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<ActionResult<List<UserReadDto>>> ListUsersAsync([FromQuery] string? name, [FromQuery] int page = 1)
    {
        var users = await _service
            .ReadManyNoTracked<UserReadDto>()
            .ToListAsync();

        users = users
            .Skip((page - 1) * 10)
            .Take(10)
            .ToList();

        if(!string.IsNullOrEmpty(name))
            users = users
                .Where(
                    user => user.Name.Contains(name) || 
                    user.Email.Contains(name) ||
                    user.LastName.Contains(name)
                )
                .ToList();

        return Ok(users);
    }
    [HttpPost]
    public async Task<ActionResult<UserCreateDto>> AddUserAsync([FromBody] UserCreateDto userCreateDto)
    {
        var response = await _service
            .CreateAndSaveAsync(userCreateDto);

        return Ok(response);
    }

}
