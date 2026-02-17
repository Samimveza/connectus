using System;
using System.Collections.Generic;

namespace Business.Model;

public partial class MytSetting
{
    public string IdMytSetting { get; set; } = null!;

    public string? Merchant { get; set; }

    public string? MerchantId { get; set; }

    public string? AppId { get; set; }

    public string? Apikey { get; set; }

    public string? PublicKey { get; set; }

    public string? PaymentUrl { get; set; }

    public string? CallbackUrl { get; set; }

    public string? NotificationUrl { get; set; }

    public virtual ICollection<Company> Companies { get; set; } = new List<Company>();

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
