using GenericServices;
using JobApplicationAPI.Services;
using JobApplicationAPI.Shared.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Dtos;
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[ApiController]
[Route("applications")]
public class ApplicationController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public ApplicationController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<ApplicationReadFullDto>>> GetApplicationsAsync()
    {
        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int userId = JwtService.GetJwtUserIdClaim(bearer);

            var apliications = await _service
                .ReadManyNoTracked<ApplicationReadFullDto>()
                .Where(
                    x => x.UserId == userId
                )
                .ToListAsync();

            return Ok(apliications);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [Authorize(Roles = "Employer,Recruiter")]
    [HttpPut]
    public async Task<ActionResult> UpdateApplicationAsync(
        [FromBody] ApplicationUpdateDto applicationUpdateDto    
    )
    {
        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int userId = JwtService.GetJwtUserIdClaim(bearer);

            var apliication = await _service
                .ReadSingleAsync<ApplicationReadFullDto>(
                    x => x.UserId == userId &&
                    x.ApplicationId == applicationUpdateDto.ApplicationId
                );

            if (apliication == default)
                return NotFound("Applcaiiton with specified Id was not found.");

            applicationUpdateDto.ApplicationId = apliication.ApplicationId;
            applicationUpdateDto.UserId = apliication.UserId;
            applicationUpdateDto.JobPostingId = apliication.JobPostingId;
            applicationUpdateDto.DesiredSallaryMin = apliication.DesiredSallaryMin;
            applicationUpdateDto.DesiredSallaryMax = apliication.DesiredSallaryMax;
            applicationUpdateDto.ExperienceYears = apliication.ExperienceYears;
            applicationUpdateDto.WhenCanStart = apliication.WhenCanStart;
            applicationUpdateDto.PreviousWorkPlace = apliication.PreviousWorkPlace;

            await _service.UpdateAndSaveAsync( applicationUpdateDto );

            return Ok("Updated Succesfully!");
        }
        catch (Exception)
        {
            throw;
        }
    }

    [Authorize(Roles = "Employer,Recruiter")]
    [HttpPost]
    public async Task<ActionResult> PostApplicationsAsync(
        [FromBody] ApplicationCreateDto applicationCreateDto    
    )
    {
        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int userId = JwtService.GetJwtUserIdClaim(bearer);

            applicationCreateDto.UserId = userId;

            await _service.CreateAndSaveAsync( applicationCreateDto );

            return Created();
        }
        catch (Exception)
        {
            throw;
        }
    }
}