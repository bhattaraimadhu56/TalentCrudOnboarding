using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TalentOnboardingTaskMadhu.Models;


namespace TalentOnboardingTaskMadhu.Controllers
{
    public class SaleController : Controller
    {

        [HttpGet]
        public JsonResult GetAllSales()
        {
            using (TalentOnboarding_DbContext db = new TalentOnboarding_DbContext())
            {


                //query getting data from database from joining  tables and storing data in mvmlist
                var mvmlist = (from c in db.Customers
                               join sal in db.Sales on c.Id equals sal.CustomerId
                               join p in db.Products on sal.ProductId equals p.Id
                               join s in db.Stores on sal.StoreId equals s.Id
                               select new { sal.Id, c.CustomerName, p.ProductName, s.StoreName, p.Price, sal.DateSold }).ToList();
                return Json(mvmlist);




            }
        }

        [HttpPost]
        public string CreateSales(Sales salId)
        {

            using (var db = new TalentOnboarding_DbContext())
            {

                if (ModelState.IsValid)
                {
                    db.Sales.Add(salId);
                    db.SaveChanges();
                    return " Sale Added Successfully in our record";
                }
                else
                {
                    return "Sorry! Data upload failure , try again";
                }
            }


        }



        [HttpPut]
        public string EditSales(Sales salId)
        {
           
                if (ModelState.IsValid)
                {
                    using (var db = new TalentOnboarding_DbContext())
                    {
                        var checkSales = db.Sales.Where(x => x.Id == salId.Id).FirstOrDefault();
                        //checkSales.Id = salId.Id;
                        checkSales.CustomerId = salId.CustomerId;
                        checkSales.ProductId = salId.ProductId;
                        checkSales.StoreId = salId.StoreId;
                        checkSales.DateSold = salId.DateSold;


                        // db.Entry(salId).State = EntityState.Modified;



                        db.SaveChanges();
                    }
                return "Data edited successfully";
            }
            else
            {
                return "Failure to edit";
            }
            
        }



        [HttpDelete]
        public string DeleteSales(Sales std)
        {
            try
            {
                using (var db = new TalentOnboarding_DbContext())
                {
                    //var checkSales = db.Sales.Where(x => x.Id == std.Id).FirstOrDefault();             

                    db.Entry(std).State = EntityState.Deleted;
                    db.SaveChanges();

                }
                return "Data deleted successfully";
            }
            catch (Exception)
            {
                return "Sorry! Fail to delete the data";
            }

        }




    }
}