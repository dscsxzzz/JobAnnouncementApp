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
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[ApiController]
[Route("job-postings")]
public class JobPostingController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public JobPostingController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobPostingReadDto>>> ListJobPostingsAsync(
        [FromQuery] List<int>? skills = null,
        [FromQuery] List<int>? experience = null,
        [FromQuery] int? category = null,
        [FromQuery] bool hybrid = true,
        [FromQuery] bool remote = true,
        [FromQuery] int sallaryMin = 0,
        [FromQuery] int page = 1
    )
    {
        if (page < 1)
            page = 1;

        if(experience == null)
            experience = new List<int> { 1, 2, 3 };

        List <JobPostingReadDto> jobPostings= new();

        if (category == null)
        {
            jobPostings = await _service
                .ReadManyNoTracked<JobPostingReadDto>()
                .Where(
                    x => ListExtensions.IntersectWithFallback(x.Skills.Select(x => x.SkillId), skills).Any()
                )
                .Where(
                    x => experience.Contains(x.ExperienceId)
                )
                .Where(
                    x => x.SalaryMin <= sallaryMin && x.SalaryMax >= sallaryMin
                )
                .Where(
                    x => (x.Hybrid == hybrid) || (x.Remote == remote)
                )

                .Skip((page - 1) * 20)
                .Take(20)
                .ToListAsync();
        }
        else
        {
            jobPostings = await _service
                .ReadManyNoTracked<JobPostingReadDto>()
                .Where(
                    x => x.CategoryId == category
                )
                .Where(
                    x => ListExtensions.IntersectWithFallback(x.Skills.Select(x => x.SkillId), skills).Any()
                )
                .Where(
                    x => x.SalaryMin > sallaryMin
                )
                .Where(
                    x => (x.Hybrid == hybrid) || (x.Remote == remote)
                )

                .Skip((page - 1) * 10)
                .Take(10)
                .ToListAsync();
        }

        return Ok(jobPostings);
    }

    [Authorize]
    [HttpGet("/my-job-postings")]
    public async Task<ActionResult<List<JobPostingReadDto>>> ListJobPostingsForOwnerAsync(
    )
    {
        string bearer = HttpContext.Request.Headers["Authorization"];

        int userIdClaim = JwtService.GetJwtUserIdClaim(bearer);

        var jobPostings = await _service
            .ReadManyNoTracked<JobPostingReadDto>()
            .Where(
                x => x.UserId == userIdClaim
            )
            .ToListAsync();

        return Ok(jobPostings);

    }

    [Authorize(Roles ="Employer,Recruiter")]
    [HttpPost]
    public async Task<ActionResult> PostJobPostingAsync(
        [FromBody] JobPostingCreateDto jobPostingCreateDto
    )
    {
        try
        {
            var user = await _service
                .ReadManyNoTracked<User>()
                .Where(
                    x => x.CompanyId == jobPostingCreateDto.CompanyId &&
                    x.UserId == jobPostingCreateDto.UserId
                )
                .AnyAsync();

            if (!user)
                return Conflict("You have no permission to post from her/his name.");

            var company = await _service
                .ReadManyNoTracked<Company>()
                .Where(
                    x => x.CompanyId == jobPostingCreateDto.CompanyId &&
                    x.Users.Select(x => x.UserId).Contains(jobPostingCreateDto.UserId)
                )
                .AnyAsync();

            if (!company)
                return Conflict("Company with specified Id was not found or You have no permission to post from its name.");

            var experience = await _service
                .ReadManyNoTracked<Experience>()
                .Where(x => x.ExperienceId == jobPostingCreateDto.ExperienceId)
                .AnyAsync();

            if (!experience)
                return Conflict("Experience with specified id not found.");

            await _service
                .CreateAndSaveAsync(jobPostingCreateDto);

            return Created();
        }
        catch (Exception e)
        {

            throw;
        }
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<JobPostingReadFullDto>> ReadJobPostingAsync(
        [FromRoute] int Id
    )
    {
        if (Id < 1)
            return BadRequest("Job Posting Id cannot be less than 1.");

        var jobPosting = await _service
            .ReadSingleAsync<JobPostingReadFullDto>(Id);

        return Ok(jobPosting);
    }
}
