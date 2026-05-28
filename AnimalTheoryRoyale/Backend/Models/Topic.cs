namespace AnimalTheoryRoyale.Models;

public class Topic
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // Navigation Properties
    public ICollection<Question> Questions { get; set; } = new List<Question>();
}
