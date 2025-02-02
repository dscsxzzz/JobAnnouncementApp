using JobApplicationAPI.Shared.Models.CompanyModels;
using JobApplicationAPI.Shared.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiTests
{
    public static class TestData
    {
        public static string password = HasherService.HashPassword("Password1@");
        public static List<User> usersToCreate { get; set; } = 
        [
            new()
            {
                UserId = 99991,
                Name = "TestUserForLogin",
                LastName = "Test1",
                Password = password,
                Address = "test",
                Email = "dscsxzzz1@gmail.com",
                PhoneNumber = "Test1"
            },

            new()
            {
                UserId = 99992,
                Name = "Test2",
                LastName = "Test2",
                Password = password,
                Address = "test2",
                Email = "dscsxzzz2@gmail.com",
                PhoneNumber = "Test2"
            },

            new()
            {
                UserId = 99993,
                Name = "AdminTest",
                LastName = "AdminTest",
                Password = password,
                Address = "test3",
                Email = "adminJobPostingApp@gmail.com",
                PhoneNumber = "Test3"
            }
        ];

        public static List<Company> companiesToCreate { get; set; } =
        [
            new()
            {
                CompanyId = 99991,
                Name = "TestCompany1",
                Password = password,
                Address = "test",
                Email = "testcompany1@gmail.com",
                LinkToSite = "Test1"
            },

            new()
            {
                CompanyId = 99992,
                Name = "TestCompany2",
                Password = password,
                Address = "test",
                Email = "testcompany2@gmail.com",
                LinkToSite = "Test1"
            },

            new()
            {
                CompanyId = 99993,
                Name = "TestCompany3",
                Password = password,
                Address = "test",
                Email = "testcompany3@gmail.com",
                LinkToSite = "Test1"
            }
        ];

        public static List<int> usersToClear = new List<int>();
        public static List<int> companiesToClear = new List<int>();
    }
}
