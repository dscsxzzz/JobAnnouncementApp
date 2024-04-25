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
    public async Task<ActionResult<List<UserReadDto>>> ListUsersAsync(
        [FromQuery] string? name, [FromQuery] List<int>? skills,
        [FromQuery] int page = 1
    )
    {
        List<UserReadDto> users = new();
        if (!string.IsNullOrEmpty(name))
            users = await _service
                .ReadManyNoTracked<UserReadDto>()
                .Skip((page - 1) * 10)
                .Take(10)
                .Where(
                    user => (user.Name.Contains(name) ||
                    user.LastName.Contains(name))
                )
                .ToListAsync();
        else
            users = await _service
                .ReadManyNoTracked<UserReadDto>()
                .Skip((page - 1) * 10)
                .Take(10)
                .ToListAsync();


        MongoDbFileService db = new MongoDbFileService();
        db.TryConnect();

        return Ok(users);
    }
}
