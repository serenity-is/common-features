using Serenity.Services;
using System;
using System.Collections.Generic;

namespace Serenity.Extensions
{
    public class ExcelImportRequest : ServiceRequest
    {
        public string FileName { get; set; }
    }

    public class ExcelImportResponse : ServiceResponse
    {
        public int Inserted { get; set; }
        public int Updated { get; set; }
        public List<string> ErrorList { get; set; }
    }
}