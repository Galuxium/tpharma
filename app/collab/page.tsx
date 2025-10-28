import { useState, useEffect } from 'react';
import { client } from '../supabase'; // Your Supabase client
import { useToast } from '@react-tui/toast'; // Optional UI library

interface PresenceUpdate {
  userId: string;
  status: 'online' | 'offline';
  name?: string; // Optional user name
}

interface ContentUpdate {
  contentId: string; // Unique identifier for collaborative content
  content: string | object; // Shared data (e.g., prescription text, patient data)
}

export default function RealtimeCollabPage() {
  const [presence, setPresence] = useState<{ id: string; name: string; status: 'online' | 'offline' }[]>([]);
  const [content, setContent] = useState<string | object>({});
  const toast = useToast();

  // Initialize presence and content on mount
  useEffect(() => {
    const userId = client.auth.user()?.id || 'anonymous';
    const name = client.auth.user()?.email?.split('@')[0] || 'User';

    // Setup presence channel
    const presenceChannel = client.realtime.createChannel('tpharma-presence');
    presenceChannel.on('presence_update', (event) => {
      const { userId, status, name } = event.payload as PresenceUpdate;
      setPresence(prev => 
        prev.map(u => u.id === userId ? { ...u, status, name } : u)
      );
    });

    // Setup content channel
    const contentChannel = client.realtime.createChannel('tpharma-collab');
    contentChannel.on('content_update', (event) => {
      const { contentId, content } = event.payload as ContentUpdate;
      setContent(prevContent => 
        prevContent.contentId === contentId ? content : prevContent
      );
    });

    // Initial presence subscription
    presenceChannel.publish({ userId, status: 'online', name });

    return () => {
      // Cleanup on unmount
      presenceChannel.close();
      contentChannel.close();
      presenceChannel.publish({ userId, status: 'offline' });
    };
  }, []);

  // Handle content editing (example: prescription details form)
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>, contentId: string) => {
    const newContent = e.target.value;
    setContent(prev => ({ ...prev, contentId: e.target.id, content: newContent }));
    
    // Broadcast to others
    client.realtime.createChannel('tpharma-collab').publish({
      contentId: e.target.id,
      content: newContent
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white shadow-lg">
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-center">
          TPharma Real-Time Collaboration
        </h1>
      </div>

      {/* Presence Section */}
      <div className="p-4 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Current Collaborators</h2>
        <ul className="space-y-2">
          {presence.map(user => (
            <li key={user.id} className="p-2 border border-gray-300 rounded">
              <strong>{user.name}</strong> - {user.status === 'online' ? 'Online' : 'Offline'}
            </li>
          ))}
        </ul>
      </div>

      {/* Shared Content Area - Example: Prescription Draft */}
      <div className="mt-8 p-4 border border-gray-200 rounded">
        <h2 className="text-xl font-semibold mb-4">Medical Notes Collaboration</h2>
        
        {/* Example: MultipleEditableFields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['PatientInfo', 'Prescription', 'Dosage'].map((field, index) => (
            <div key={index} className="w-full">
              <h3 className="text-lg font-semibold mb-2">{field}</h3>
              <textarea
                id={field}
                value={content[field] || ''}
                onChange={(e) => handleContentChange(e, field)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>

        {/* Real-time preview */}
        <div className="mt-4 bg-white p-3 rounded">
          <h4 className="text-sm font-semibold">Live Updates:</h4>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      </div>

      {/* AI Assistant Integration (Future State) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        {/* TODO: Implement LLM-powered suggestions here */}
        <p className="text-gray-600">
          Integrate AI suggestions using Supabase ML or OpenAI API
        </p>
      </div>
    </div>
  );
}