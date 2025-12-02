import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send to Loops
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        source: 'website_waitlist',
        userGroup: 'beta_waitlist',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If contact already exists, that's fine
      if (data.message?.includes('already exists')) {
        return NextResponse.json({ 
          success: true, 
          message: "You're already on the waitlist!" 
        });
      }
      throw new Error(data.message || 'Failed to subscribe');
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
