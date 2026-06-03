import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const initialProgress = {
  lastVisitedRoute: null,
  lastChapterId: null,
  completedChapters: [],
  completedSections: {},
  viewedConcepts: [],
  completedCaseFiles: [],
  completedQuizzes: [],
  totalProgress: 0,
  updatedAt: null
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('conceptExplorerProgress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse progress from local storage", e);
    }
    return initialProgress;
  });

  useEffect(() => {
    localStorage.setItem('conceptExplorerProgress', JSON.stringify({
      ...progress,
      updatedAt: new Date().toISOString()
    }));
  }, [progress]);

  const saveLastVisited = (route, chapterId) => {
    setProgress(prev => ({
      ...prev,
      lastVisitedRoute: route,
      ...(chapterId && { lastChapterId: chapterId })
    }));
  };

  const markSectionCompleted = (chapterId, sectionId) => {
    setProgress(prev => {
      const chapterSections = prev.completedSections[chapterId] || [];
      if (!chapterSections.includes(sectionId)) {
        return {
          ...prev,
          completedSections: {
            ...prev.completedSections,
            [chapterId]: [...chapterSections, sectionId]
          }
        };
      }
      return prev;
    });
  };

  const markChapterCompleted = (chapterId) => {
    setProgress(prev => {
      if (!prev.completedChapters.includes(chapterId)) {
        return {
          ...prev,
          completedChapters: [...prev.completedChapters, chapterId]
        };
      }
      return prev;
    });
  };

  const markConceptViewed = (conceptId) => {
    setProgress(prev => {
      if (!prev.viewedConcepts.includes(conceptId)) {
        return { ...prev, viewedConcepts: [...prev.viewedConcepts, conceptId] };
      }
      return prev;
    });
  };

  const markCaseCompleted = (caseId) => {
    setProgress(prev => {
      if (!prev.completedCaseFiles.includes(caseId)) {
        return { ...prev, completedCaseFiles: [...prev.completedCaseFiles, caseId] };
      }
      return prev;
    });
  };

  const markQuizCompleted = (quizId) => {
    setProgress(prev => {
      if (!prev.completedQuizzes.includes(quizId)) {
        return { ...prev, completedQuizzes: [...prev.completedQuizzes, quizId] };
      }
      return prev;
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem('conceptExplorerProgress');
  };

  const calculateChapterProgress = (chapterId, totalSections) => {
    const completed = progress.completedSections[chapterId]?.length || 0;
    if (totalSections === 0) return 0;
    return Math.round((completed / totalSections) * 100);
  };

  const calculateTotalProgress = () => {
    // Basic calculation: total chapters completed / 6
    const completedChapters = progress.completedChapters.length;
    return Math.round((completedChapters / 6) * 100);
  };

  const value = {
    progress,
    saveLastVisited,
    markSectionCompleted,
    markChapterCompleted,
    markConceptViewed,
    markCaseCompleted,
    markQuizCompleted,
    resetProgress,
    calculateChapterProgress,
    calculateTotalProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useLearningProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useLearningProgress must be used within a ProgressProvider');
  }
  return context;
}
