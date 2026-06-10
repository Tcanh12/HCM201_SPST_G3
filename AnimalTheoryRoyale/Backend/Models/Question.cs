namespace AnimalTheoryRoyale.Models;

public class Question
{
    public int Id { get; set; }
    public int TopicId { get; set; }
    public Topic? Topic { get; set; }
    public string Difficulty { get; set; } = "Easy"; // Easy, Medium, Hard
    public string Content { get; set; } = string.Empty;
    public string Explanation { get; set; } = string.Empty;
    public int BaseScore { get; set; }
    public int PenaltyHP { get; set; }
    public int TimeLimit { get; set; } // in seconds

    // Phase 3 Extensions: Support for multi-type challenges
    public string QuestionType { get; set; } = "MultipleChoice"; // MultipleChoice, TrueFalse, FillBlank, CaseStudy, etc.
    public string? ChallengePayloadJson { get; set; } // JSON string for complex question payload (e.g. blanks array, matching pairs)

    // Navigation Properties
    public ICollection<QuestionOption> Options { get; set; } = new List<QuestionOption>();
}
