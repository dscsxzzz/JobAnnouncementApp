using System;
using System.Collections.Generic;

namespace Models.Entities;

public partial class ApplicationStatus
{
    public int ApplicationStatusId { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<Application> Applications { get; set; } = new List<Application>();
}
