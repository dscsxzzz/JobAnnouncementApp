﻿using GenericServices;
using JobApplicationAPI.Services;
using JobApplicationAPI.Services.ListExtension;
using JobApplicationAPI.Shared.Database;
using JobApplicationAPI.Shared.Models.BenefitModels;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.JobPostingModels.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    [FromQuery] int salaryMin = 0,
    [FromQuery] int page = 1
)
    {
        if (page < 1)
            page = 1;

        if (experience == null)
            experience = new List<int> { 1, 2, 3 };

        IQueryable<JobPostingReadDto> query = _service
            .ReadManyNoTracked<JobPostingReadDto>()
            .Where(x => experience.Contains(x.ExperienceId))
            .Where(x => x.SalaryMin <= salaryMin && x.SalaryMax >= salaryMin)
            .Where(x => (x.Hybrid == hybrid) || (x.Remote == remote));

        if (category.HasValue)
        {
            query = query.Where(x => x.CategoryId == category);
        }

        List<JobPostingReadDto> jobPostings = await query
            .Skip((page - 1) * (category.HasValue ? 10 : 20))
            .Take(category.HasValue ? 10 : 20)
            .ToListAsync();

        if (skills != null && skills.Any())
        {
            jobPostings = jobPostings
                .Where(x => x.Skills.Select(s => s.SkillId).Intersect(skills).Any())
                .ToList();
        }

        return Ok(jobPostings);
    }

    //[HttpGet]
    //public async Task<ActionResult<List<JobPostingReadDto>>> ListJobPostingsAsync(
    //    [FromQuery] List<int>? skills = null,
    //    [FromQuery] List<int>? experience = null,
    //    [FromQuery] int? category = null,
    //    [FromQuery] bool hybrid = true,
    //    [FromQuery] bool remote = true,
    //    [FromQuery] int sallaryMin = 0,
    //    [FromQuery] int page = 1
    //)
    //{
    //    if (page < 1)
    //        page = 1;

    //    if(experience == null)
    //        experience = new List<int> { 1, 2, 3 };

    //    List <JobPostingReadDto> jobPostings= new();

    //    if (category == null)
    //    {
    //        jobPostings = await _service
    //            .ReadManyNoTracked<JobPostingReadDto>()
    //            .Where(
    //                x => ListExtensions.IntersectWithFallback(x.Skills.Select(x => x.SkillId), skills).Any()
    //            )
    //            .Where(
    //                x => experience.Contains(x.ExperienceId)
    //            )
    //            .Where(
    //                x => x.SalaryMin <= sallaryMin && x.SalaryMax >= sallaryMin
    //            )
    //            .Where(
    //                x => (x.Hybrid == hybrid) || (x.Remote == remote)
    //            )

    //            .Skip((page - 1) * 20)
    //            .Take(20)
    //            .ToListAsync();
    //    }
    //    else
    //    {
    //        jobPostings = await _service
    //            .ReadManyNoTracked<JobPostingReadDto>()
    //            .Where(
    //                x => x.CategoryId == category
    //            )
    //            .Where(
    //                x => ListExtensions.IntersectWithFallback(x.Skills.Select(x => x.SkillId), skills).Any()
    //            )
    //            .Where(
    //                x => x.SalaryMin > sallaryMin
    //            )
    //            .Where(
    //                x => (x.Hybrid == hybrid) || (x.Remote == remote)
    //            )

    //            .Skip((page - 1) * 10)
    //            .Take(10)
    //            .ToListAsync();
    //    }

    //    return Ok(jobPostings);
    //}

    [Authorize]
    [HttpGet("my-job-postings")]
    public async Task<ActionResult<List<JobPostingReadFullDto>>> ListJobPostingsForOwnerAsync(
        [FromQuery] int page = 1
    )
    {
        string bearer = HttpContext.Request.Headers["Authorization"];

        int companyId = JwtService.GetJwtUserIdClaim(bearer);

        var jobPostings = await _service
            .ReadManyNoTracked<JobPostingReadFullDto>()
            .Where(
                x => x.CompanyId == companyId
            )
            .Skip((page - 1) * 10)
            .Take(10)
            .ToListAsync();

        return Ok(jobPostings);

    }

    [Authorize(Roles ="Company")]
    [HttpPost]
    public async Task<ActionResult> PostJobPostingAsync(
        [FromBody] JobPostingCreateDto jobPostingCreateDto
    )
    {
        try
        {
            string bearer = HttpContext.Request.Headers["Authorization"];

            int companyId = JwtService.GetJwtUserIdClaim(bearer);

            var category = await _service
                .ReadManyNoTracked<Category>()
                .Where(x => x.CategoryId == jobPostingCreateDto.CategoryId)
                .AnyAsync();

            if (!category)
                return Conflict("Category with specified id not found.");

            var skills = await _service
            .ReadManyNoTracked<Skill>()
            .Where(x => jobPostingCreateDto.SkillIds.Contains(x.SkillId))
            .AsTracking()
            .ToListAsync();

            if (skills.Count != jobPostingCreateDto.SkillIds.Count)
                return Conflict("Not All Skill id`s were found");

            var benefits = await _service
            .ReadManyNoTracked<Benefit>()
            .Where(x => jobPostingCreateDto.BenefitIds.Contains(x.BenefitId))
            .AsTracking()
            .ToListAsync();

            if (benefits.Count != jobPostingCreateDto.BenefitIds.Count)
                return Conflict("Not All Benefit id`s were found");

            jobPostingCreateDto.CompanyId = companyId;
            jobPostingCreateDto.Skills = skills;
            jobPostingCreateDto.Benefits = benefits;

            await _service
                .CreateAndSaveAsync(jobPostingCreateDto);

            return Created();
        }
        catch (Exception e)
        {

            throw;
        }
    }

    [Authorize(Roles = "Company")]
    [HttpGet("{Id}")]
    public async Task<ActionResult<JobPostingReadFullDto>> ReadJobPostingAsync(
        [FromRoute] int Id
    )
    {
        string bearer = HttpContext.Request.Headers["Authorization"];

        int companyId = JwtService.GetJwtUserIdClaim(bearer);

        if (Id < 1)
            return BadRequest("Job Posting Id cannot be less than 1.");

        var jobPosting = await _service
            .ReadSingleAsync<JobPostingReadFullDto>(
                x => x.JobPostingId == Id &&
                x.CompanyId == companyId
            );

        return jobPosting == default ? BadRequest("No JobPosting with such id that you can access.") : Ok(jobPosting);
    }
}
