using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TalentOnboardingTaskMadhu.Models;

namespace TalentOnboardingTaskMadhu.Controllers
{
    public class CustomerController : Controller
    {
        [HttpGet]
        public JsonResult GetAllCustomers()
        {
            using (TalentOnboarding_DbContext db = new TalentOnboarding_DbContext())
            {
                var cusList = db.Customers.ToList();
                return Json(cusList);
            }
        }

        [HttpPost]
        public string CreateCustomers(Customers cusId)
        {

            using (var db = new TalentOnboarding_DbContext())
            {
                var checkCustomers = db.Customers.Any(x => x.CustomerName == cusId.CustomerName);

                if (checkCustomers)
                {
                    ModelState.AddModelError("Name", "Name already in Exist , Plz use other name");
                }
                if (ModelState.IsValid)
                {
                    db.Customers.Add(cusId);
                    db.SaveChanges();
                    return " Customer Added Successfully in our record";
                }
                else
                {
                    return "Sorry! Data upload failure , try again";
                }
            }


        }



        [HttpPut]
        public string EditCustomers(Customers cusId)
        {

            if (ModelState.IsValid)
            {
                using (var db = new TalentOnboarding_DbContext())
                {
                    var checkCustomers = db.Customers.Where(x => x.Id == cusId.Id).FirstOrDefault();

                    checkCustomers.CustomerName = cusId.CustomerName;
                    checkCustomers.CustomerAddress = cusId.CustomerAddress;
                    //db.Entry(cusId).State = EntityState.Modified;



                    db.SaveChanges();
                    return "Data edited successfully";
                }
            }
            else
            {
                return "Unable to update  ";

            }

        }




        [HttpDelete]
        public string DeleteCustomers(Customers std)
        {
            try
            {
                using (var db = new TalentOnboarding_DbContext())
                {
                    //var checkCustomers = db.Customers.Where(x => x.Id == std.Id).FirstOrDefault();             

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