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
    public class StoreController : Controller
    
    {
        [HttpGet]
        public JsonResult GetAllStores()
        {
            using (TalentOnboarding_DbContext db = new TalentOnboarding_DbContext())
            {
                var storeList = db.Stores.ToList();
                return Json(storeList);
            }
        }

        [HttpPost]
        public string CreateStores(Stores storeId)
        {

            using (var db = new TalentOnboarding_DbContext())
            {
                var checkStores = db.Stores.Any(x => x.StoreName == storeId.StoreName);

                if (checkStores)
                {
                    ModelState.AddModelError("Name", "Name already in Exist , Plz use other name");
                }
                if (ModelState.IsValid)
                {
                    db.Stores.Add(storeId);
                    db.SaveChanges();
                    return " Store Added Successfully in our record";
                }
                else
                {
                    return "Sorry! Data upload failure , try again";
                }
            }


        }



        [HttpPut]
        public string EditStores(Stores storeId)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    using (var db = new TalentOnboarding_DbContext())
                    {
                        var checkStores = db.Stores.Where(x => x.Id == storeId.Id).FirstOrDefault();

                        checkStores.StoreName = storeId.StoreName;
                        checkStores.StoreAddress = storeId.StoreAddress;
                        //db.Entry(storeId).State = EntityState.Modified;



                        db.SaveChanges();
                    }
                }
                return "Data edited successfully";
            }
            catch (Exception)
            {
                return "Sorry! Data edition Failure";
            }
        }




        [HttpDelete]
        public string DeleteStores(Stores std)
        {
            try
            {
                using (var db = new TalentOnboarding_DbContext())
                {
                    //var checkStores = db.Stores.Where(x => x.Id == std.Id).FirstOrDefault();             

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