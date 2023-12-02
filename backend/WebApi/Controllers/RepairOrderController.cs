using System.Data;
using System.Security.Claims;
using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.RepairOrder.DTOs;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace WebApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RepairOrderController : ControllerBase
{
    private readonly IRepairOrderService _repairOrderService;

    public RepairOrderController(IRepairOrderService repairOrderService)
    {
        _repairOrderService = repairOrderService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRepairOrder(Guid id, [FromQuery] bool includeDetails)
    {
        var order = await _repairOrderService.GetRepairOrder(id, includeDetails);
        return Ok(order);
    }

    [HttpGet("All")]
    public async Task<IActionResult> GetRepairOrders()
    {
        var orders = await _repairOrderService.GetRepairOrders();
        return Ok(orders);
    }

    [HttpGet("Search")]
    public async Task<IActionResult> GetRepairOrdersWithFilters([FromQuery] string? status,
        [FromQuery] string? clientId, [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate,
        [FromQuery] int? limit)
    {
        var orders = await _repairOrderService.GetRepairOrdersWithFilters(status, clientId, fromDate, toDate, limit);
        return Ok(orders);
    }

    [HttpGet("Statuses")]
    public async Task<IActionResult> GetOrderStatuses()
    {
        var statuses = await _repairOrderService.GetOrderStatuses();
        return Ok(statuses);
    }

    [HttpPut("{id}/Diagnose")]
    public async Task<IActionResult> DiagnoseOrder(Guid id, [FromBody] DiagnoseRepairOrder model)
    {
        var user = (ClaimsIdentity)User.Identity!;
        var createdById = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var order = await _repairOrderService.DiagnoseOrder(id, createdById, model);
        return Ok(order);
    }

    [HttpGet("SpareParts")]
    public async Task<IActionResult> GetSpareParts()
    {
        var spareParts = await _repairOrderService.GetSpareParts();
        return Ok(spareParts);
    }

    [HttpGet("Reports/Weekly")]
    public async Task<IActionResult> OrdersWeeklyReport([FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
    {
        var report = await _repairOrderService.OrdersWeeklyReport(fromDate, toDate);
        return Ok(report);
    }

    [HttpGet("Reports/MonthlyByStatus")]
    public async Task<IActionResult> StatusesMonthlyReport([FromQuery] int year, [FromQuery] int month)
    {
        var report = await _repairOrderService.StatusesMonthlyReport(year, month);
        return Ok(report);
    }

    [HttpPut("{id}/Confirmation")]
    public async Task<IActionResult> ResolveConfirmation(Guid id, [FromQuery] bool nextStep)
    {
        await _repairOrderService.ResolveConfirmation(id, nextStep);
        return Ok();
    }

    [HttpPut("{id}/Ready")]
    public async Task<IActionResult> ToReady(Guid id)
    {
        await _repairOrderService.ToReady(id);
        return Ok();
    }

    [HttpGet("DownloadAsExcel")]
    public async Task<IActionResult> DownloadAsExcel([FromQuery] string? status, [FromQuery] string? clientId,
        [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate, [FromQuery] int? limit)
    {
        var orders = (await _repairOrderService.GetRepairOrdersWithFilters(status, clientId, fromDate, toDate, limit)).ToList();

        var dataTable = new DataTable("Reporte de Ordenes de Reparación");
        dataTable.Columns.AddRange(new[]
        {
            new DataColumn("Id"),
            new DataColumn("FechaCreación"),
            new DataColumn("FechaCierre"),
            new DataColumn("FechaLímite"),
            new DataColumn("PorcentajeDeDescuento"),
            new DataColumn("Subtotal"),
            new DataColumn("Total"),
            new DataColumn("ElegibleParaGarantía"),
            new DataColumn("AtendidoPorId"),
            new DataColumn("EstadoDeOrdenId"),
            new DataColumn("EstadoDeOrden")
        });

foreach (var order in orders)
        {
            var row = dataTable.NewRow();
            row["Id"] = order.Id;
            row["FechaCreación"] = order.CreatedAt;
            row["FechaCierre"] = order.ClosedAt;
            row["FechaLímite"] = order.DeadLine;
            row["PorcentajeDeDescuento"] = order.Discount;
            row["Subtotal"] = order.SubTotal;
            row["Total"] = order.Total;
            row["ElegibleParaGarantía"] = order.WarrantyEligible;
            row["AtendidoPorId"] = order.AttendedById;
            row["EstadoDeOrdenId"] = order.StatusId;
            row["EstadoDeOrden"] = order.Status;
            dataTable.Rows.Add(row);
        }

        using var package = new ExcelPackage();

        var worksheet = package.Workbook.Worksheets.Add("Reporte de Ordenes de Reparación");
        worksheet.Cells["A1"].LoadFromDataTable(dataTable, true);
        worksheet.Cells.AutoFitColumns();
        var stream = new MemoryStream();
        await package.SaveAsAsync(stream);

        stream.Position = 0;
        var fileName = $"RepairOrders_{DateTime.Now:yyyyMMddHHmmssfff}.xlsx";
        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
    }
}
