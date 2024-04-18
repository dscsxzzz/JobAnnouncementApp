using System.Web.Mvc;
using GenericServices;
using JobApplicationAPI.Shared.Database;

namespace WebCommon.Database
{
    public class ControllerWithDatabaseAccess : Controller
    {
        private readonly ICrudServicesAsync _service;
        private readonly JobAppContext _context;

        public ControllerWithDatabaseAccess(JobAppContext context, ICrudServicesAsync service)
        {
            _context = context;
            _service = service;
        }
    }
}
