using FluentAssertions.Common;
using GenericServices;
using Microsoft.Extensions.DependencyInjection;

namespace ApiTests
{
    [SetUpFixture]
    public class TestDataSetup : TestBase
    {
        [OneTimeSetUp]
        public async Task OneTimeSetUp() 
        {
            using var scope = ApplicationFactory.Services.CreateScope();
            DatabaseService = scope.ServiceProvider.GetRequiredService<ICrudServicesAsync>();
            var testDataHandler = new TestDataHandler(DatabaseService);

            using var transaction = DatabaseService.Context.Database.BeginTransaction();

            await testDataHandler.CreateUsersSampleDataAsync(TestData.usersToCreate);
            await testDataHandler.CreateCompaniesSampleDataAsync(TestData.companiesToCreate);

            await transaction.CommitAsync();

            testDataHandler.InitializeClearLista();
        }

        [OneTimeTearDown]
        public async Task OneTimeTearDown()
        {
            using var scope = ApplicationFactory.Services.CreateScope();
            DatabaseService = scope.ServiceProvider.GetRequiredService<ICrudServicesAsync>();
            var testDataHandler = new TestDataHandler(DatabaseService);

            await testDataHandler.ClearUsersSampleDataAsync(TestData.usersToClear);
            await testDataHandler.ClearCompaniesSampleDataAsync(TestData.companiesToClear);
        }
    }
}
