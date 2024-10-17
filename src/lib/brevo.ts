import * as SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.ContactsApi();

// Set the API key
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error('BREVO_API_KEY is not set in the environment variables');
}
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey);

export const addContact = async (email: string, attributes: { [key: string]: string }) => {
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.attributes = attributes;
  createContact.listIds = [3]; // Replace 3 with your actual Waiting List ID (as a number)

  try {
    console.log('Calling Brevo API with:', JSON.stringify({ email, attributes }, null, 2));
    const data = await apiInstance.createContact(createContact);
    console.log('Brevo API response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error calling Brevo API:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};
