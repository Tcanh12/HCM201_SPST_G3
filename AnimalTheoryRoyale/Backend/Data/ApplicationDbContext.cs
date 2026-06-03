using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Models;

namespace AnimalTheoryRoyale.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Character> Characters { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionOption> QuestionOptions { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<RoomSetting> RoomSettings { get; set; }
    public DbSet<GameResult> GameResults { get; set; }
    public DbSet<AnswerLog> AnswerLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Explicit Table Names (Optional but good practice)
        modelBuilder.Entity<User>().ToTable("Users");
        modelBuilder.Entity<Character>().ToTable("Characters");
        modelBuilder.Entity<Topic>().ToTable("Topics");
        modelBuilder.Entity<Question>().ToTable("Questions");
        modelBuilder.Entity<QuestionOption>().ToTable("QuestionOptions");
        modelBuilder.Entity<Room>().ToTable("Rooms");
        modelBuilder.Entity<RoomSetting>().ToTable("RoomSettings");
        modelBuilder.Entity<GameResult>().ToTable("GameResults");
        modelBuilder.Entity<AnswerLog>().ToTable("AnswerLogs");

        // Relationships
        modelBuilder.Entity<Question>()
            .HasOne(q => q.Topic)
            .WithMany(t => t.Questions)
            .HasForeignKey(q => q.TopicId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<QuestionOption>()
            .HasOne(qo => qo.Question)
            .WithMany(q => q.Options)
            .HasForeignKey(qo => qo.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<RoomSetting>()
            .HasOne(rs => rs.Room)
            .WithOne(r => r.Setting)
            .HasForeignKey<RoomSetting>(rs => rs.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<GameResult>()
            .HasOne(gr => gr.Room)
            .WithMany(r => r.Results)
            .HasForeignKey(gr => gr.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<GameResult>()
            .HasOne(gr => gr.User)
            .WithMany(u => u.GameResults)
            .HasForeignKey(gr => gr.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<GameResult>()
            .HasOne(gr => gr.Character)
            .WithMany()
            .HasForeignKey(gr => gr.CharacterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<AnswerLog>()
            .HasOne(al => al.Room)
            .WithMany()
            .HasForeignKey(al => al.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AnswerLog>()
            .HasOne(al => al.User)
            .WithMany()
            .HasForeignKey(al => al.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<AnswerLog>()
            .HasOne(al => al.Question)
            .WithMany()
            .HasForeignKey(al => al.QuestionId)
            .OnDelete(DeleteBehavior.Restrict);

        // Seed initial Characters
        modelBuilder.Entity<Character>().HasData(
            new Character { Id = 1, Name = "Voi", AnimalType = "Tanker", MaxHP = 150, MoveSpeed = 60, HitboxSize = 2, InitialAmmo = 10, SkillName = "Lá Chắn Đại Ngàn", SkillCooldown = 30 },
            new Character { Id = 2, Name = "Thỏ", AnimalType = "Speedster", MaxHP = 80, MoveSpeed = 130, HitboxSize = 1, InitialAmmo = 8, SkillName = "Bứt Tốc", SkillCooldown = 25 },
            new Character { Id = 3, Name = "Cáo", AnimalType = "Strategist", MaxHP = 100, MoveSpeed = 110, HitboxSize = 1, InitialAmmo = 10, SkillName = "Mưu Trí", SkillCooldown = 45 },
            new Character { Id = 4, Name = "Rùa", AnimalType = "Defender", MaxHP = 130, MoveSpeed = 65, HitboxSize = 2, InitialAmmo = 8, SkillName = "Mai Rùa Bảo Vệ", SkillCooldown = 35 }
        );
    }
}
