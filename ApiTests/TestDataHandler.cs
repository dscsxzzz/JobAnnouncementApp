using GenericServices;
using JobApplicationAPI.Shared.Database;
using JobApplicationAPI.Shared.Models.CompanyModels;
using JobApplicationAPI.Shared.Models.UserModels;
using Microsoft.EntityFrameworkCore;

namespace ApiTests
{
    public class TestDataHandler
    {
        private readonly ICrudServicesAsync _services;
        private readonly JobAppContext _appContext;

        public TestDataHandler(ICrudServicesAsync services)
        {
            _services = services;
            _appContext = (JobAppContext)_services.Context;
        }

        public async Task CreateUsersSampleDataAsync(List<User> users) 
        {
            foreach (var user in users) 
            {
                await _services.CreateAndSaveAsync(user);
            }
        }
        public async Task CreateCompaniesSampleDataAsync(List<Company> companies)
        {
            foreach (var company in companies)
            {
                await _services.CreateAndSaveAsync(company);
            }
        }


        public async Task ClearUsersSampleDataAsync(List<int> users)
        {
            await _appContext.Users
                .Where(x => users
                .Contains(x.UserId))
            .ExecuteDeleteAsync();
        }

        public async Task ClearCompaniesSampleDataAsync(List<int> companies)
        {
            await _appContext.Companies
                .Where(x => companies
                .Contains(x.CompanyId))
            .ExecuteDeleteAsync();
        }

        public void InitializeClearLista() 
        {
            TestData.usersToClear = TestData.usersToCreate.Select(x => x.UserId).ToList();
            TestData.companiesToClear = TestData.companiesToCreate.Select(x => x.CompanyId).ToList();
        }
    }
}
