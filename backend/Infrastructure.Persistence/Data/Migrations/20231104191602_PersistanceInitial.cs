using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Persistence.Data.Migrations
{
    /// <inheritdoc />
    public partial class PersistanceInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "request_statuses",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_request_statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "repair_requests",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    ClientId = table.Column<string>(type: "text", nullable: false),
                    OrderId = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ClosedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Motive = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DeviceStatus = table.Column<int>(type: "integer", nullable: false),
                    WarrantyId = table.Column<string>(type: "text", nullable: true),
                    ContactEmailInfo = table.Column<string>(type: "text", nullable: false),
                    StatusId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false)
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
                name: "IX_repair_requests_StatusId",
                schema: "dbo",
                table: "repair_requests",
                column: "StatusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "repair_requests",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "request_statuses",
                schema: "dbo");
        }
    }
}
