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
            migrationBuilder.Sql(@"
                ALTER TABLE ""Questions"" 
                ADD COLUMN IF NOT EXISTS ""ChallengePayloadJson"" text NULL;

                ALTER TABLE ""Questions"" 
                ADD COLUMN IF NOT EXISTS ""Type"" text NOT NULL DEFAULT '';
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""ChallengePayloadJson"";
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""Type"";
            ");
        }
    }
}
