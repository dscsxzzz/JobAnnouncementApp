using System;
using System.Collections.Generic;

namespace Models.Entities;

public partial class UserStatus
{
    public int UserStatusId { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
