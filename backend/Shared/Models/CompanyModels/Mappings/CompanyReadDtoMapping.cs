using AutoMapper;
using GenericServices.Configuration;
using JobApplicationAPI.Shared.Models.CompanyModels.Dtos;
using System.Xml;

namespace JobApplicationAPI.Shared.Models.CompanyModels.Mappings;

public class CompanyReadDtoMapping : PerDtoConfig<CompanyReadDto, Company>
{
    public sealed override Action<IMappingExpression<Company, CompanyReadDto>> AlterReadMapping
    {
        get 
        {
            return cfg => cfg
                .ForMember(dto => dto.AvailableJobs,
                test => test.MapFrom(entity => entity.JobPostings.Count));
        }
    }
}