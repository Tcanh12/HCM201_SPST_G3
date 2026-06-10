using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AnimalTheoryRoyale.Migrations
{
    /// <inheritdoc />
    public partial class SeedCharacters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO ""Characters"" (""Id"", ""AnimalType"", ""HitboxSize"", ""IconPath"", ""InitialAmmo"", ""MaxHP"", ""ModelPath"", ""MoveSpeed"", ""Name"", ""SkillCooldown"", ""SkillDescription"", ""SkillDuration"", ""SkillName"")
                VALUES 
                (1, 'Tanker', 2, '', 10, 150, '', 60, 'Voi', 30, '', 0, 'Lá Chắn Đại Ngàn'),
                (2, 'Speedster', 1, '', 8, 80, '', 130, 'Thỏ', 25, '', 0, 'Bứt Tốc'),
                (3, 'Strategist', 1, '', 10, 100, '', 110, 'Cáo', 45, '', 0, 'Mưu Trí'),
                (4, 'Defender', 2, '', 8, 130, '', 65, 'Rùa', 35, '', 0, 'Mai Rùa Bảo Vệ')
                ON CONFLICT (""Id"") DO NOTHING;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Characters",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
