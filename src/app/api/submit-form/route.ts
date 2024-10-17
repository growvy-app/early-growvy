import { NextResponse } from 'next/server';
import { addContact } from '@/lib/brevo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);

    const { email, name, yesNoAnswer, multipleChoiceAnswers } = body;

    console.log('Attempting to add contact to Brevo...');
    await addContact(email, {
      EMAIL: email,
      NAME: name,
      YES_NO_ANSWER: yesNoAnswer ? 'Yes' : 'No',
      MULTIPLE_CHOICE_1: multipleChoiceAnswers[0],
      MULTIPLE_CHOICE_2: multipleChoiceAnswers[1],
      MULTIPLE_CHOICE_3: multipleChoiceAnswers[2],
      MULTIPLE_CHOICE_4: multipleChoiceAnswers[3],
    });
    console.log('Contact added to Brevo successfully');

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Detailed error in submit-form route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      message: 'Error submitting form', 
      error: errorMessage
    }, { status: 500 });
  }
}
