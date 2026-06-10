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
            migrationBuilder.Sql(@"
                ALTER TABLE ""Questions""
                ADD COLUMN IF NOT EXISTS ""QuestionType"" text NOT NULL DEFAULT 'MultipleChoice';

                ALTER TABLE ""Questions""
                ADD COLUMN IF NOT EXISTS ""ChallengePayloadJson"" text NULL;

                ALTER TABLE ""Questions""
                ADD COLUMN IF NOT EXISTS ""Explanation"" text NULL;

                ALTER TABLE ""Questions""
                ADD COLUMN IF NOT EXISTS ""TimeLimit"" integer NOT NULL DEFAULT 20;

                ALTER TABLE ""Questions""
                ADD COLUMN IF NOT EXISTS ""Difficulty"" text NOT NULL DEFAULT 'Normal';

                UPDATE ""Questions""
                SET ""QuestionType"" = 'MultipleChoice'
                WHERE ""QuestionType"" IS NULL OR ""QuestionType"" = '';
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""ChallengePayloadJson"";
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""QuestionType"";
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""Explanation"";
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""TimeLimit"";
                ALTER TABLE ""Questions"" DROP COLUMN IF EXISTS ""Difficulty"";
            ");
        }
    }
}
