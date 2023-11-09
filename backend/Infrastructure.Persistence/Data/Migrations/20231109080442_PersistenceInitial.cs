using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Persistence.Data.Migrations
{
    /// <inheritdoc />
    public partial class PersistenceInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "order_statuses",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order_statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "request_statuses",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_request_statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "spare_parts",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Stock = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_spare_parts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "repair_requests",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    PurchaseOrderId = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ClosedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Motive = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DeviceStatus = table.Column<int>(type: "integer", nullable: false),
                    WarrantyId = table.Column<string>(type: "text", nullable: true),
                    ContactEmailInfo = table.Column<string>(type: "text", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false),
                    StatusId = table.Column<Guid>(type: "uuid", nullable: false),
                    RepairOrderId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_repair_requests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_repair_requests_request_statuses_StatusId",
                        column: x => x.StatusId,
                        principalSchema: "dbo",
                        principalTable: "request_statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "repair_orders",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ClosedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DeadLine = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Discount = table.Column<float>(type: "real", nullable: false),
                    SubTotal = table.Column<float>(type: "real", nullable: false),
                    Total = table.Column<float>(type: "real", nullable: false),
                    WarrantyEligible = table.Column<bool>(type: "boolean", nullable: false),
                    AttendedById = table.Column<Guid>(type: "uuid", nullable: true),
                    StatusId = table.Column<Guid>(type: "uuid", nullable: false),
                    RepairRequestId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_repair_orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_repair_orders_order_statuses_StatusId",
                        column: x => x.StatusId,
                        principalSchema: "dbo",
                        principalTable: "order_statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_repair_orders_repair_requests_RepairRequestId",
                        column: x => x.RepairRequestId,
                        principalSchema: "dbo",
                        principalTable: "repair_requests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "diagnoses",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    OfferedService = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Note = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    RepairOrderId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_diagnoses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_diagnoses_repair_orders_RepairOrderId",
                        column: x => x.RepairOrderId,
                        principalSchema: "dbo",
                        principalTable: "repair_orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "diagnoses_spare_parts",
                schema: "dbo",
                columns: table => new
                {
                    DiagnosisId = table.Column<Guid>(type: "uuid", nullable: false),
                    SparePartId = table.Column<Guid>(type: "uuid", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_diagnoses_spare_parts", x => new { x.DiagnosisId, x.SparePartId });
                    table.ForeignKey(
                        name: "FK_diagnoses_spare_parts_diagnoses_DiagnosisId",
                        column: x => x.DiagnosisId,
                        principalSchema: "dbo",
                        principalTable: "diagnoses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_diagnoses_spare_parts_spare_parts_SparePartId",
                        column: x => x.SparePartId,
                        principalSchema: "dbo",
                        principalTable: "spare_parts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "order_statuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("474fb0e1-115d-44d4-9ae0-ba6dec7934da"), "Listo" },
                    { new Guid("52c7c858-ead7-42a0-9400-15f96e7e920c"), "En confirmación" },
                    { new Guid("52ec1a9e-9711-45c4-b824-8ec28b453cb3"), "Esperando diagnóstico" },
                    { new Guid("986a5551-b1d4-442c-9bf4-5f2ee360f4e2"), "En reparación" },
                    { new Guid("e25ebe6b-be50-4d22-805a-44377b4de8ae"), "Cancelado" }
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "request_statuses",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("4f1c8ca2-c62d-444d-b711-0cc386647d83"), "Cancelado" },
                    { new Guid("56626b64-485b-458a-99fb-cdb5b635526e"), "Pendiente" },
                    { new Guid("5bf32584-8ba2-467d-b7a1-e354217e6c3b"), "Solventado" },
                    { new Guid("922ff6a9-ad99-4b78-8826-fc2136829e53"), "En progreso" },
                    { new Guid("a2a674ed-e4ae-4fbc-bb1f-29b5122e1c88"), "Notificado" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_diagnoses_RepairOrderId",
                schema: "dbo",
                table: "diagnoses",
                column: "RepairOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_diagnoses_spare_parts_SparePartId",
                schema: "dbo",
                table: "diagnoses_spare_parts",
                column: "SparePartId");

            migrationBuilder.CreateIndex(
                name: "IX_repair_orders_RepairRequestId",
                schema: "dbo",
                table: "repair_orders",
                column: "RepairRequestId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_repair_orders_StatusId",
                schema: "dbo",
                table: "repair_orders",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_repair_requests_StatusId",
                schema: "dbo",
                table: "repair_requests",
                column: "StatusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "diagnoses_spare_parts",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "diagnoses",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "spare_parts",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "repair_orders",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "order_statuses",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "repair_requests",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "request_statuses",
                schema: "dbo");
        }
    }
}
