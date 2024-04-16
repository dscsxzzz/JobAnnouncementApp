using System.Web.Mvc;
using GenericServices;
using GenericServices.PublicButHidden;
using JobApplicationAPI.Shared.Models.Entities;

namespace WebCommon.Database
{
    public class ControllerWithDatabaseAccess : Controller
    {
        private readonly ICrudServices _service;
        private readonly JobAppContext _context;

        public ControllerWithDatabaseAccess(JobAppContext context, ICrudServices service)
        {
            _context = context;
            _service = service;
        }
    }
}
