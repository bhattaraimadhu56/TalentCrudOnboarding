using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentOnboardingTaskMadhu.Models;

namespace TalentOnboardingTaskMadhu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly TalentOnboarding_DbContext db;

        public CustomersController(TalentOnboarding_DbContext context)
        {
            db = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customers>>> GetCustomers()
        {
            return await db.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customers>> GetCustomers(int id)
        {
            var customers = await db.Customers.FindAsync(id);

            if (customers == null)
            {
                return NotFound();
            }

            return customers;
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomers(int id, Customers customers)
        {
            if (id != customers.Id)
            {
                return BadRequest();
            }

            db.Entry(customers).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customers
        [HttpPost]
        public async Task<ActionResult<Customers>> PostCustomers(Customers customers)
        {
            db.Customers.Add(customers);
            await db.SaveChangesAsync();

            return CreatedAtAction("GetCustomers", new { id = customers.Id }, customers);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customers>> DeleteCustomers(int id)
        {
            var customers = await db.Customers.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customers);
            await db.SaveChangesAsync();

            return customers;
        }

        private bool CustomersExists(int id)
        {
            return db.Customers.Any(e => e.Id == id);
        }
    }
}
