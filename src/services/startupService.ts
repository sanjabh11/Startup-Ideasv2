import { db } from './firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { StartupIdea, Comment } from '../types';

export const getStartupIdeas = async (): Promise<StartupIdea[]> => {
  const ideasSnapshot = await getDocs(collection(db, 'startupIdeas'));
  return ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StartupIdea));
};

export const getStartupIdea = async (id: string): Promise<StartupIdea> => {
  const ideaDoc = await getDoc(doc(db, 'startupIdeas', id));
  if (!ideaDoc.exists()) {
    throw new Error('Startup idea not found');
  }
  return { id: ideaDoc.id, ...ideaDoc.data() } as StartupIdea;
};

export const addComment = async (ideaId: string, userId: string, text: string): Promise<Comment> => {
  const comment = { userId, text, createdAt: new Date() };
  const ideaRef = doc(db, 'startupIdeas', ideaId);
  await updateDoc(ideaRef, {
    comments: arrayUnion(comment)
  });
  return comment;
};

export const rateIdea = async (ideaId: string, userId: string, rating: number): Promise<StartupIdea> => {
  const ideaRef = doc(db, 'startupIdeas', ideaId);
  const ideaDoc = await getDoc(ideaRef);
  if (!ideaDoc.exists()) {
    throw new Error('Startup idea not found');
  }
  const idea = ideaDoc.data() as StartupIdea;
  const existingRatingIndex = idea.ratings.findIndex(r => r.userId === userId);
  if (existingRatingIndex !== -1) {
    idea.ratings[existingRatingIndex].rating = rating;
  } else {
    idea.ratings.push({ userId, rating });
  }
  const newRating = idea.ratings.reduce((sum, r) => sum + r.rating, 0) / idea.ratings.length;
  await updateDoc(ideaRef, {
    ratings: idea.ratings,
    rating: newRating
  });
  return { ...idea, id: ideaId, rating: newRating };
};

export const generateAISteps = async (title: string, description: string): Promise<string[]> => {
  try {
    const response = await fetch('/.netlify/functions/generateSteps', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate steps');
    }
    
    const data = await response.json();
    return data.steps;
  } catch (error) {
    console.error('Error generating AI steps:', error);
    return [];
  }
};