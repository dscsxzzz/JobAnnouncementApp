using JobApplicationAPI.Shared.Models.UserModels.Dtos;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text.Json;
using System.Net.Http.Json;

namespace ApiTests
{
    public class AuthTests : TestBase
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task Login_user_returns_ok()
        {
            var url = $"auth/login/user";
            var body = new UserLoginDto
            {
                Email = "dscsxzzz1@gmail.com",
                Password = "Password1@"
            };

            var response = await client.PostAsJsonAsync(url, body);

            Assert.IsNotNull(response);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }

        [Test]
        public async Task Register_user_returns_ok()
        {
            var url = $"auth/register/user";
            var body = new UserCreateDto
            {
                Name = "Andrii",
                LastName = "Krechuniak",
                Email = "nonexistantindbemail1122@gmail.com",
                Password = "Password1@",
                Address = "Address",
                PhoneNumber = "phone122",
                SkillIds = new HashSet<int>() {1}
            };

            var response = await client.PostAsJsonAsync(url, body);

            Assert.IsNotNull(response);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));

            var responseBody = await response.Content.ReadAsStringAsync();

            var user = JsonSerializer.Deserialize<UserCreateDto>(responseBody);

            TestData.usersToClear.Add(user.UserId);
        }

        [Test]
        public async Task Login_company_returns_ok()
        {
            var url = $"auth/login/company";
            var body = new UserLoginDto
            {
                Email = "testcompany1@gmail.com",
                Password = "Password1@"
            };

            var response = await client.PostAsJsonAsync(url, body);

            Assert.IsNotNull(response);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }

        [Test]
        public async Task Login_admin_returns_ok()
        {
            var url = $"auth/login/admin";
            var body = new UserLoginDto
            {
                Email = "adminJobPostingApp@gmail.com",
                Password = "Password1@"
            };

            var response = await client.PostAsJsonAsync(url, body);

            Assert.IsNotNull(response);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }
    }
}