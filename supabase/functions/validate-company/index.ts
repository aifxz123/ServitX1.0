import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CompanyValidationRequest {
  companyNumber: string
}

interface CompanyData {
  company_name: string
  company_number: string
  company_status: string
  company_type?: string
  date_of_creation?: string
  registered_office_address?: {
    address_line_1?: string
    locality?: string
    postal_code?: string
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { companyNumber }: CompanyValidationRequest = await req.json()

    if (!companyNumber || typeof companyNumber !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Company number is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Format company number (remove spaces, pad with zeros to 8 digits)
    const formattedNumber = companyNumber.replace(/\s/g, '').padStart(8, '0')

    // Validate format (should be 8 digits)
    if (!/^\d{8}$/.test(formattedNumber)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid company number format. Must be 8 digits.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`Validating company number: ${formattedNumber}`)

    // Companies House API configuration
    const apiKey = Deno.env.get('COMPANIES_HOUSE_API_KEY')
    
    if (!apiKey) {
      console.error('COMPANIES_HOUSE_API_KEY environment variable not set')
      return new Response(
        JSON.stringify({ 
          error: 'API configuration error. Please contact support.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    const apiUrl = `https://api.company-information.service.gov.uk/company/${formattedNumber}`
    
    // Create Basic Auth header
    const credentials = btoa(`${apiKey}:`)

    // Call Companies House API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
        'User-Agent': 'Servitex/1.0'
      }
    })

    console.log(`Companies House API response status: ${response.status}`)

    if (!response.ok) {
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ 
            error: 'Company number not found. Please check the number and try again.' 
          }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      } else if (response.status === 401) {
        console.error('Companies House API authentication failed')
        return new Response(
          JSON.stringify({ 
            error: 'API authentication failed. Please contact support.' 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      } else if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Too many requests. Please try again in a moment.' 
          }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      } else {
        const errorText = await response.text()
        console.error(`Companies House API error: ${response.status} - ${errorText}`)
        return new Response(
          JSON.stringify({ 
            error: `API error (${response.status}). Please try again.` 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    const companyData: CompanyData = await response.json()
    console.log(`Company found: ${companyData.company_name} (${companyData.company_status})`)

    // Check if company is active
    if (companyData.company_status !== 'active') {
      return new Response(
        JSON.stringify({ 
          error: `Company is ${companyData.company_status}. Only active companies can register.`,
          companyData: {
            name: companyData.company_name,
            number: companyData.company_number,
            status: companyData.company_status
          }
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Return successful validation
    return new Response(
      JSON.stringify({
        success: true,
        company: {
          name: companyData.company_name,
          number: companyData.company_number,
          status: companyData.company_status,
          type: companyData.company_type,
          dateOfCreation: companyData.date_of_creation,
          address: companyData.registered_office_address
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error: any) {
    console.error('Validation error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error. Please try again.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})