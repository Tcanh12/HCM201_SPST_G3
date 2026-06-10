import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data paths
const DATA_DIR = path.join(__dirname, '../src/data');

// Import data
// Note: using dynamic import for js files, or reading json directly
async function validateData() {
  let hasErrors = false;
  let hasWarnings = false;

  const error = (msg) => {
    console.error(`❌ ${msg}`);
    hasErrors = true;
  };
  
  const warn = (msg) => {
    console.warn(`⚠ ${msg}`);
    hasWarnings = true;
  };

  try {
    // Read JSON files
    const chapters = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'chapters.json'), 'utf-8'));
    const caseFiles = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'caseFiles.json'), 'utf-8'));

    // Read JS files via string parsing (since they are ES modules and running this as a script might have module issues)
    // We'll use dynamic import since we set "type": "module" in package.json
    const { canonicalConcepts } = await import(pathToFileURL(path.join(DATA_DIR, 'canonicalConcepts.js')).href);
    const { lessons } = await import(pathToFileURL(path.join(DATA_DIR, 'lessons.js')).href);
    const { reviewQuestions } = await import(pathToFileURL(path.join(DATA_DIR, 'reviewQuestions.js')).href);
    
    // Build sets for quick lookup
    const chapterIds = new Set(chapters.map(c => c.id));
    const conceptIds = new Set(canonicalConcepts.map(c => c.id));
    const lessonIds = new Set(lessons.map(l => l.lessonId));
    const caseIds = new Set(caseFiles.map(c => c.id));
    const questionIds = new Set(reviewQuestions.map(q => q.id));

    // 1. Check duplicate canonical concepts
    const seenConcepts = new Set();
    for (const concept of canonicalConcepts) {
      if (seenConcepts.has(concept.id)) {
        error(`Duplicate conceptId in canonicalConcepts: ${concept.id}`);
      }
      seenConcepts.add(concept.id);
      if (concept.requiresVerification === undefined) {
        warn(`requiresVerification missing in concept ${concept.id}`);
      }
    }

    // 2. Validate lessons
    const seenLessons = new Set();
    for (const lesson of lessons) {
      if (seenLessons.has(lesson.lessonId)) {
        error(`Duplicate lessonId: ${lesson.lessonId}`);
      }
      seenLessons.add(lesson.lessonId);

      if (!chapterIds.has(lesson.chapterId)) {
        error(`Invalid chapterId in lesson ${lesson.lessonId}: ${lesson.chapterId}`);
      }

      for (const conceptId of lesson.conceptIds || []) {
        if (!conceptIds.has(conceptId)) {
          error(`Missing conceptId: ${conceptId} in lesson ${lesson.lessonId}`);
        }
      }

      if (lesson.requiresVerification === undefined) {
        warn(`requiresVerification missing in lesson ${lesson.lessonId}`);
      }

      if (!lesson.title || !lesson.coreTheory) {
        error(`Lesson missing required fields: ${lesson.lessonId}`);
      }
    }

    // 3. Validate case files
    const seenCases = new Set();
    for (const c of caseFiles) {
      if (seenCases.has(c.id)) {
        error(`Duplicate caseId: ${c.id}`);
      }
      seenCases.add(c.id);

      for (const chapterId of c.chapterIds || []) {
        if (!chapterIds.has(chapterId)) {
          error(`Invalid chapterId in case ${c.id}: ${chapterId}`);
        }
      }

      for (const conceptId of c.conceptIds || []) {
        if (!conceptIds.has(conceptId)) {
          error(`Missing conceptId: ${conceptId} in caseFiles.json > ${c.id}`);
        }
      }

      if (!c.situation || !c.analysis || !c.lesson) {
        error(`Case missing situation, analysis or lesson: ${c.id}`);
      }

      if (c.requiresVerification === undefined) {
        warn(`requiresVerification missing in case ${c.id}`);
      }
    }

    // 4. Validate review questions
    const seenQuestions = new Set();
    for (const q of reviewQuestions) {
      if (seenQuestions.has(q.id)) {
        error(`Duplicate questionId: ${q.id}`);
      }
      seenQuestions.add(q.id);

      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        error(`Quiz does not have a valid correctAnswer: ${q.id}`);
      }

      if (!q.explanation) {
        error(`Question missing explanation: ${q.id}`);
      }

      for (const conceptId of q.conceptIds || []) {
        if (!conceptIds.has(conceptId)) {
          error(`Missing conceptId: ${conceptId} in question ${q.id}`);
        }
      }

      if (!chapterIds.has(q.chapterId)) {
        error(`Invalid chapterId in question ${q.id}: ${q.chapterId}`);
      }

      if (q.requiresVerification === undefined) {
        warn(`requiresVerification missing in question ${q.id}`);
      }
    }

    // 5. Additional Validation Rules
    
    // Concept Map Constraints
    if (canonicalConcepts.length <= 1) {
      error(`Concept map must have more than 1 node.`);
    }
    const rootNode = canonicalConcepts.find(c => c.level === 0);
    if (!rootNode) {
      error(`Concept map must have a root node (level 0).`);
    }
    const chapterNodes = canonicalConcepts.filter(c => c.level === 1);
    if (chapterNodes.length < 6) {
      error(`Concept map must have at least 6 chapter nodes (level 1).`);
    }

    for (const c of canonicalConcepts) {
      if (!c.id || !c.title || !c.chapterId || !c.shortDescription || (!c.definition && !c.explanation) || !c.whyImportant) {
        error(`Concept missing required fields (id, title, chapterId, shortDescription, definition/explanation, whyImportant): ${c.id}`);
      }
    }

    // Timeline Constraints
    const { timelineEvents } = await import(pathToFileURL(path.join(DATA_DIR, 'timelineData.js')).href);
    if (timelineEvents.length < 12) {
      error(`Timeline must have at least 12 events. Current count: ${timelineEvents.length}`);
    }

    for (const e of timelineEvents) {
      if (!e.id || !e.period || !e.title || !e.shortDescription || !e.historicalContext || !e.problem || !e.ideologicalDevelopment || !e.impact || !e.learningValue) {
        error(`Timeline event missing required fields: ${e.id}`);
      }
      for (const cid of e.relatedConceptIds || []) {
        if (!conceptIds.has(cid)) {
          error(`Timeline event ${e.id} references missing conceptId: ${cid}`);
        }
      }
      if (e.requiresVerification === undefined) {
        warn(`requiresVerification missing in timeline event ${e.id}`);
      }
    }

    // Visual Learning Constraints
    const chaptersVisualMap = {};
    for (const l of lessons) {
      if (!chaptersVisualMap[l.chapterId]) chaptersVisualMap[l.chapterId] = [];
      if (l.visualLearning && Array.isArray(l.visualLearning)) {
        chaptersVisualMap[l.chapterId].push(...l.visualLearning);
        
        for (const vl of l.visualLearning) {
          if (!vl.id || !vl.chapterId || !vl.type || !vl.title || !vl.purpose || !vl.learningValue || !vl.keyTakeaways) {
            error(`Visual learning item missing required fields (id, chapterId, type, title, purpose, learningValue, keyTakeaways): ${vl.id}`);
          }
          if (vl.requiresVerification === undefined) {
            warn(`requiresVerification missing in visual learning item ${vl.id}`);
          }
          if (vl.relatedConceptIds) {
            for (const cid of vl.relatedConceptIds) {
              if (!conceptIds.has(cid)) {
                error(`Visual learning item ${vl.id} references missing conceptId: ${cid}`);
              }
            }
          }
        }
      }
    }

    for (let i = 1; i <= 6; i++) {
      const chapterId = `chuong-${i}`;
      const count = chaptersVisualMap[chapterId]?.length || 0;
      if (count < 3) {
        error(`Chapter ${chapterId} must have at least 3 visual learning items. Found: ${count}`);
      }
    }


    if (hasErrors) {
      console.log("\n❌ Knowledge data validation failed");
      process.exit(1);
    } else if (hasWarnings) {
      console.log("\n⚠ Knowledge data validation passed with warnings");
      process.exit(0);
    } else {
      console.log("\n✅ Knowledge data validation passed");
      process.exit(0);
    }

  } catch (err) {
    console.error("Failed to run validation:", err);
    process.exit(1);
  }
}

validateData();
