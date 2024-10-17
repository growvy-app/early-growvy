import * as SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.ContactsApi();

// Set the API key
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export const addContact = async (email: string, attributes: { [key: string]: string }) => {
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.attributes = attributes;
  createContact.listIds = [3]; // Replace 3 with your actual Waiting List ID (as a number)

  try {
    console.log('Calling Brevo API with:', { email, attributes });
    const data = await apiInstance.createContact(createContact);
    console.log('Brevo API response:', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Detailed error calling Brevo API:', error);
    throw error;
  }
};
