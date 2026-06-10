using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimalTheoryRoyale.Migrations
{
    /// <inheritdoc />
    public partial class Phase3_AddQuestionTypeAndPayload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChallengePayloadJson",
                table: "Questions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Questions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChallengePayloadJson",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Questions");
        }
    }
}
