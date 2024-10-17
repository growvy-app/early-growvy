import { NextResponse } from 'next/server';
import { addContact } from '@/lib/brevo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);

    const { email, name, yesNoAnswer, multipleChoiceAnswers } = body;

    if (!email || !name) {
      console.log('Validation failed: Email or name is missing');
      return NextResponse.json({ message: 'Email and name are required' }, { status: 400 });
    }

    console.log('Attempting to add contact to Brevo...');
    const result = await addContact(email, {
      EMAIL: email,
      NAME: name,
      YES_NO_ANSWER: yesNoAnswer ? 'Yes' : 'No',
      MULTIPLE_CHOICE_1: multipleChoiceAnswers[0] || '',
      MULTIPLE_CHOICE_2: multipleChoiceAnswers[1] || '',
      MULTIPLE_CHOICE_3: multipleChoiceAnswers[2] || '',
      MULTIPLE_CHOICE_4: multipleChoiceAnswers[3] || '',
    });
    console.log('Brevo API response:', JSON.stringify(result, null, 2));

    return NextResponse.json({ message: 'Form submitted successfully', data: result }, { status: 200 });
  } catch (error: unknown) {
    console.error('Detailed error in submit-form route:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      message: 'Error submitting form', 
      error: errorMessage
    }, { status: 500 });
  }
}
