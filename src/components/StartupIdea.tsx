import React from 'react';
import { useParams } from 'react-router-dom';

const StartupIdea: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Startup Idea Details</h2>
      <p>Details for startup idea with ID: {id} will be displayed here.</p>
    </div>
  );
};

export default StartupIdea;