using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore; 
using System.Collections.Generic; 
using System.Linq; 
using System.Threading.Tasks; 
using WOM.Server.Models;

namespace WOM.Server.Controllers{
    [Route("api/[controller]")]
    [ApiController]
public class WorkOrdersController: ControllerBase{
    private readonly AppDbContext _context;

    public WorkOrdersController(AppDbContext context){
        _context = context;
    }

    [HttpGet("getall")]
    public async Task<ActionResult<IEnumerable<WorkOrder>>> GetWorkOrders(){


        return await _context.WorkOrders.ToListAsync();
    }

    public async Task<ActionResult<WorkOrder>> GetIndividualWorkOrder (int id){

        var workOrder = await _context.WorkOrders.FindAsync(id);
        if(workOrder == null){
            return NotFound();
        }
        else {
            return workOrder;
        }
    }

    [HttpPost("create")]
    public IActionResult AddWorkOrder(WorkOrder workOrder){
        Console.WriteLine("Attempting to add work order");
        Console.WriteLine(workOrder);
         _context.WorkOrders.Add(workOrder);
         _context.SaveChanges();
         return Ok();
    }


    [HttpPut("edit/{id}")]
    public async Task<IActionResult> EditWorkOrder(int id, WorkOrder updatedWorkOrder){
        Console.WriteLine("Attempting to edit work order");
        Console.WriteLine(updatedWorkOrder);

        var existingWorkOrder = await _context.WorkOrders.FindAsync(id);
        if (existingWorkOrder == null){
            return NotFound();
        }

        existingWorkOrder.Title = updatedWorkOrder.Title;
        existingWorkOrder.Description = updatedWorkOrder.Description;
        existingWorkOrder.CostCenter = updatedWorkOrder.CostCenter;
        existingWorkOrder.Status = updatedWorkOrder.Status;
        existingWorkOrder.Priority = updatedWorkOrder.Priority;
        existingWorkOrder.Created = updatedWorkOrder.Created;
        existingWorkOrder.Completed = updatedWorkOrder.Completed;

        try{
            await _context.SaveChangesAsync();
        }
        catch(DbUpdateConcurrencyException){
            if(!_context.WorkOrders.Any(e => e.Id == id)){
                return NotFound();
            }
            else{
                throw;
            }
        }


       
         return NoContent();
    }
}
}
