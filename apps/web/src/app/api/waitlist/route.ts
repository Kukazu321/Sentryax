import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LOOPS_API_KEY;
    
    if (!apiKey) {
      console.error('LOOPS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send to Loops
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        firstName: firstName || undefined,
        source: 'website_waitlist',
      }),
    });

    const data = await response.json();
    console.log('Loops API response:', response.status, data);

    if (!response.ok) {
      // If contact already exists, that's fine
      if (data.message?.includes('already') || data.message?.includes('exists')) {
        return NextResponse.json({ 
          success: true, 
          message: "You're already on the waitlist!" 
        });
      }
      console.error('Loops API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "You're on the list! We'll be in touch soon." 
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
