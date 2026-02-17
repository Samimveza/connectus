using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Common
{
    public class BusinessResponse<T>
    {
        private List<ValidationResult> _validationResults;

        public T Result { get; set; }

        public BusinessLayerException Exception { get; set; }

        public List<ValidationResult> ValidationResults
        {
            get
            {
                if (_validationResults == null)
                {
                    _validationResults = new List<ValidationResult>();
                }

                return _validationResults;
            }
            set
            {
                _validationResults = value;
            }
        }

        public bool HasException()
        {
            return Exception != null;
        }
    }
}
