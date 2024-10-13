import { Client } from '@hubspot/api-client'

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_API_KEY })

export async function createOrUpdateContact(email: string, name: string) {
  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        email: email,
        firstname: name.split(' ')[0],
        lastname: name.split(' ')[1] || '',
      },
    })
    return response
  } catch (error) {
    console.error('Error creating or updating HubSpot contact:', error)
  }
}
