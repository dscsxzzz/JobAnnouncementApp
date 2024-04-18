using GenericServices;
using JobApplicationAPI.Shared.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Dtos;
using Models.Entities;
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[ApiController]
[Route("user-statuses")]
public class UserStatusController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public UserStatusController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<UserStatus>> AddUserAsync([FromBody] UserStatus userCreateDto)
    {
        var response = await _service
            .CreateAndSaveAsync(userCreateDto);

        return Ok(response);
    }

}
