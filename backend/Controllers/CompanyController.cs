using GenericServices;
using JobApplicationAPI.Services;
using JobApplicationAPI.Shared.Database;
using JobApplicationAPI.Shared.Models.CompanyModels;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebCommon.Database;

namespace JobApplicationAPI.Controllers;

[ApiController]
[Route("companies")]
public class CompanyController : ControllerWithDatabaseAccess
{
    private readonly ICrudServicesAsync _service;

    public CompanyController(JobAppContext context, ICrudServicesAsync service) : base(context, service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<CompanyReadDto>>> GetCompaniesAsync(
        [FromQuery] bool haveJobs = true,
        [FromQuery] int page = 1
    )
    {
        if (page < 1)
            page = 1;

        var companies = await _service
            .ReadManyNoTracked<CompanyReadDto>()
            .Where(x => (x.AvailableJobs > 0) == haveJobs)
            .Skip((page - 1) * 10)
            .Take(10)
            .ToListAsync();

        return Ok(companies);
    }

    [HttpGet("{companyId}")]
    public async Task<ActionResult<List<CompanyReadDto>>> GetCompanyAsync(
        [FromRoute] int companyId
    )
    {
        var company = await _service
            .ReadSingleAsync<CompanyReadFullForJobSeekersDto>(companyId);

        return Ok(company);
    }

    [Authorize(Roles = "Company")]
    [HttpPut]
    public async Task<ActionResult<List<CompanyReadDto>>> UpdateCompanyAsync(
        [FromBody] CompanyUpdateDto companyUpdateDto
    )
    {
        string bearer = HttpContext.Request.Headers["Authorization"];

        int companyId = JwtService.GetJwtUserIdClaim(bearer);

        var company = await _service.ReadSingleAsync<Company>(companyId);

        companyUpdateDto.CompanyId = company.CompanyId;

        await _service.UpdateAndSaveAsync(companyUpdateDto);

        return NoContent();
    }
}