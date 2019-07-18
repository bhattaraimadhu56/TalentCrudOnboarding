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
    public class ProductController : Controller
    {
        
            [HttpGet]
            public JsonResult GetAllProducts()
            {
                using (TalentOnboarding_DbContext db = new TalentOnboarding_DbContext())
                {
                    var prodList = db.Products.ToList();
                    return Json(prodList);
                }
            }

            [HttpPost]
            public string CreateProducts(Products prodId)
            {

                using (var db = new TalentOnboarding_DbContext())
                {
                    var checkProducts = db.Products.Any(x => x.ProductName == prodId.ProductName);

                    if (checkProducts)
                    {
                        ModelState.AddModelError("Name", "Name already in Exist , Plz use other name");
                    }
                    if (ModelState.IsValid)
                    {
                        db.Products.Add(prodId);
                        db.SaveChanges();
                        return " Product Added Successfully in our record";
                    }
                    else
                    {
                        return "Sorry! Data upload failure , try again";
                    }
                }


            }



            [HttpPut]
            public string EditProducts(Products prodId)
            {
                try
                {
                    if (ModelState.IsValid)
                    {
                        using (var db = new TalentOnboarding_DbContext())
                        {
                            var checkProducts = db.Products.Where(x => x.Id == prodId.Id).FirstOrDefault();

                            checkProducts.ProductName = prodId.ProductName;
                            checkProducts.Price = prodId.Price;
                            //db.Entry(prodId).State = EntityState.Modified;



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
            public string DeleteProducts(Products std)
            {
                try
                {
                    using (var db = new TalentOnboarding_DbContext())
                    {
                        //var checkProducts = db.Products.Where(x => x.Id == std.Id).FirstOrDefault();             

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