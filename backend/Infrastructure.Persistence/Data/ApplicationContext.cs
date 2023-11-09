using System.Reflection;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Data;

public class ApplicationContext: DbContext
{
    #region DbSets
    DbSet<RepairRequest> RepairRequests { get; set; }
    DbSet<RequestStatus> RequestStatuses { get; set; }
    DbSet<RepairOrder> RepairOrders { get; set; }
    DbSet<OrderStatus> OrderStatuses { get; set; }
    DbSet<Diagnosis> Diagnoses { get; set; }
    DbSet<SparePart> SpareParts { get; set; }
    DbSet<DiagnosisSparePart> RepairOrderSpareParts { get; set; }
    #endregion

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasDefaultSchema("dbo");

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}