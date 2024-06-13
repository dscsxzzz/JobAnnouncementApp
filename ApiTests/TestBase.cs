using GenericServices;
using JobApplicationAPI.Program;
using Microsoft.AspNetCore.Mvc.Testing;

namespace ApiTests
{
    public class TestBase: IDisposable
    {
        private bool disposed;

        protected WebApplicationFactory<Program> ApplicationFactory { get; set; }

        protected ICrudServicesAsync DatabaseService { get; set; }

        public string AuthUrl { get; } = "auth";

        protected HttpClient client { get; set; }

        public TestBase() 
        {
            ApplicationFactory = new WebApplicationFactory<Program>();
            client = ApplicationFactory.CreateClient();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    client.Dispose();
                    ApplicationFactory.Dispose();
                }

                disposed = true;
            }
        }
    }
}
