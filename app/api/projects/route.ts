// app/api/projects/route.ts
import { z } from 'zod';
import type { NextRequest, NextResponse } from 'next.server';

// Define Project type
interface Project {
  id: string;
  name: string;
  idea: string;
  status: 'pending' | 'active' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  clerkId?: string; // For association with authenticated user
}

// Zod validation schema for POST requests
const createProjectSchema = z.object({
  name: z.string().min(3).max(50).describe('Project name (3-50 chars)'),
  idea: z.string().min(10).describe('Pharmacy concept/design idea'),
  status: z.enum(['pending', 'active', 'completed']).optional().default('pending'),
  clerkId: z.string().uuid().optional().describe('Supabase clerk ID from authentication')
});

// Handle GET request
export async function GET(request: NextRequest) {
  // This would typically fetch from Supabase/Prisma
  // For now, mock data
  const mockProjects: Project[] = [
    {
      id: 'p1',
      name: 'PharmEasy',
      idea: 'Smart pharmacy management system',
      status: 'active',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-12-01')
    }
  ];

  return NextResponse.json(mockProjects, { status: 200 });
}

// Handle POST request
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json();
    
    // Validate input
    const validated = createProjectSchema.parse(body);
    
    // This would typically save to Supabase/Prisma
    const newProject: Project = {
      id: uuid(), // You'd implement UUID generation
      ...validated,
      status: validated.status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Return created project
    return NextResponse.json(newProject, {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    // Handle validation or parsing errors
    return NextResponse.json(
      { error: error.message },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}