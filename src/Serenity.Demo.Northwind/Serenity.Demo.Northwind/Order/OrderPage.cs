﻿using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace Serenity.Demo.Northwind
{
    [PageAuthorize(typeof(Entities.OrderRow))]
    public class OrderController : Controller
    {
        [Route("Serenity.Demo.Northwind/Order")]
        public ActionResult Index()
        {
            return View(MVC.Views.Order.OrderIndex);
        }
    }
}
