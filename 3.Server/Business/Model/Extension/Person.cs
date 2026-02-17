using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Model;


public partial class Person
{
    public Person(string idPerson)
    {
        this.IdPerson = idPerson;
    }

    public Person()
    {
        this.IdPerson = Guid.NewGuid().ToString();
    }
}
