using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimalTheoryRoyale.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionChallengeFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Questions",
                newName: "QuestionType");

            migrationBuilder.Sql("UPDATE \"Questions\" SET \"QuestionType\" = 'MultipleChoice' WHERE \"QuestionType\" IS NULL OR \"QuestionType\" = '';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuestionType",
                table: "Questions",
                newName: "Type");
        }
    }
}
