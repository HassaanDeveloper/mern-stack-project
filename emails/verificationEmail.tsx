import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Container,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Your verification code is {otp}</Preview>
  
        <Section
          style={{
            backgroundColor: '#f9fafb',
            padding: '40px 0',
            fontFamily: 'Roboto, Verdana, sans-serif',
          }}
        >
          <Container
            style={{
              backgroundColor: '#ffffff',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <Heading
              as="h2"
              style={{ color: '#2e7d32', marginBottom: '10px', fontSize: '24px' }}
            >
              Hello {username},
            </Heading>
  
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              Thank you for signing up! Please use the verification code below to complete your registration:
            </Text>
  
            <Text
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                color: '#2e7d32',
                backgroundColor: '#e8f5e9',
                padding: '15px',
                textAlign: 'center',
                borderRadius: '8px',
                marginBottom: '30px',
              }}
            >
              {otp}
            </Text>
  
            <Text style={{ fontSize: '14px', color: '#666' }}>
              If you didn’t request this code, you can safely ignore this email.
            </Text>
  
            <Text style={{ fontSize: '14px', color: '#999', marginTop: '30px' }}>
              — The Expense Tracker Team
            </Text>
          </Container>
        </Section>
      </Html>
    );
  }
  