using GenericServices;
using JobApplicationAPI.Services;
using JobApplicationAPI.Shared.Database;
using JobApplicationAPI.Shared.Models.CompanyModels;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;
using JobApplicationAPI.Shared.Models.Entities;
using JobApplicationAPI.Shared.Models.UserModels;
using JobApplicationAPI.Shared.Models.UserModels.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpPost("login/user")]
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

        var validatePassword = HasherService.VerifyPassword(userDto.Password, user.Password);

        if (!validatePassword)
            return BadRequest("Wrong Password!");

        var token = JwtService.GenerateJwtToken(user.Email, "JobSeeker", Convert.ToString(user.UserId));

        return Ok(new ResponseUser
        {
            token = token,
            user = user
        });
    }

    [HttpPost("register/user")]
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

        var skills = await _service
            .ReadManyNoTracked<Skill>()
            .Where(x => userDto.SkillIds.Contains(x.SkillId))
            .AsTracking()
            .ToListAsync();

        if (skills.Count != userDto.SkillIds.Count)
            return Conflict("Not All skill id`s were found");

        userDto.Password = HasherService.HashPassword(userDto.Password);
        userDto.Skills = skills;

        var response = await _service.CreateAndSaveAsync(userDto);

        return Created(new Uri($"", UriKind.Relative), response);
    }

    [Authorize]
    [HttpPut("/password-change/user")]
    public async Task<ActionResult<string>> ChangeUserPasswordAsync(
        [FromBody] UserChangePasswordDto userDto
    )
    {
        string bearer = HttpContext.Request.Headers["Authorization"];

        int Id = JwtService.GetJwtUserIdClaim(bearer);

        var user = await _service
            .ReadSingleAsync<User>(
                x => x.UserId == Id
            );

        if (user == default)
            return NotFound("No User with specified email found");

        if (user.UserId != Id)
            return StatusCode(403, "You cannot access this.");

        var validatePassword = HasherService.VerifyPassword(userDto.Password, user.Password);

        if (!validatePassword)
            return BadRequest("Wrong Password!");
        
        var hashedNewPassword = HasherService.HashPassword(userDto.NewPassword);

        user.Password = hashedNewPassword;

        await _service.UpdateAndSaveAsync(user);

        return Ok();
    }


    [HttpPost("login/company")]
    public async Task<ActionResult<string>> AuthentificateCompanyAsync(
        [FromBody] CompanyLoginDto companyLoginDto
    )
    {
        var company = await _service
            .ReadSingleAsync<Company>(
                x => x.Email == companyLoginDto.Email
            );

        if (company == default)
            return NotFound("No Company with specified email found");

        var validatePassword = HasherService.VerifyPassword(companyLoginDto.Password, company.Password);

        if (!validatePassword)
            return BadRequest("Wrong Passwrod!");

        var token = JwtService.GenerateJwtToken(company.Email, "Company", Convert.ToString(company.CompanyId));

        return Ok(new ResponseCompany 
        {
            token = token,
            company = company
        });
    }

    [HttpPost("register/company")]
    public async Task<ActionResult> RegisterCompanyAsync(
        [FromBody] CompanyCreateDto companyCreateDto
    )
    {
        var companyPresentInDb = await _service
            .ReadManyNoTracked<Company>()
            .Where(x => x.Email == companyCreateDto.Email)
            .AnyAsync();

        if (companyPresentInDb)
            return BadRequest("Company with specified e-mail already exists");

        var namePresentInDb = await _service
            .ReadManyNoTracked<User>()
            .Where(x => x.PhoneNumber == companyCreateDto.Name)
            .AnyAsync();

        if (namePresentInDb)
            return BadRequest("Company with specified name already exists");

        companyCreateDto.Password = HasherService.HashPassword(companyCreateDto.Password);

        await _service.CreateAndSaveAsync(companyCreateDto);

        return Created();
    }

    [Authorize]
    [HttpPut("/password-change/company")]
    public async Task<ActionResult<string>> ChangeCompanyPasswordAsync(
        [FromBody] CompanyChangePasswordDto passwordDto
    )
    {
        string bearer = HttpContext.Request.Headers["Authorization"];

        int Id = JwtService.GetJwtUserIdClaim(bearer);

        var company = await _service
            .ReadSingleAsync<Company>(
                x => x.CompanyId == Id
            );

        if (company == default)
            return NotFound("No User with specified email found");
        
        if (company.CompanyId != Id)
            return StatusCode(403, "You cannot access this.");


        var validatePassword = HasherService.VerifyPassword(company.Password, passwordDto.Password);

        if (!validatePassword)
            return BadRequest("Wrong Password");

        var hashedNewPassword = HasherService.HashPassword(passwordDto.NewPassword);

        company.Password = hashedNewPassword;

        await _service.UpdateAndSaveAsync(company);

        return Ok();
    }

    private class ResponseCompany
    {
        public string token { get; set; }

        public Company company { get; set; }
    }

    private class ResponseUser
    {
        public string token { get; set; }

        public User user { get; set; }
    }
}


