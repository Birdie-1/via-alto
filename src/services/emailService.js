/**
 * VIA ALTO — Email Backend Client Service
 * Dispatches requests to the PHP email backend (Steps 2 & 4 of assignment)
 */

const PHP_API_BASE = '/php-api';
const DIRECT_PHP_URL = 'http://localhost:8000';

/**
 * Step 2: Send newsletter subscription email via PHP backend (subscribe.php)
 */
export async function sendSubscribeEmail(email, name = 'Explorer', source = 'homepage_cta') {
  const payload = { email, name, source };

  try {
    // Try Vite proxy to sendMail.php first
    let response = await fetch(`${PHP_API_BASE}/sendMail.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => null);

    // If proxy failed, try direct PHP server port
    if (!response || !response.ok) {
      response = await fetch(`${DIRECT_PHP_URL}/sendMail.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
    }

    // Fallback to subscribe.php if sendMail.php is not reached
    if (!response || !response.ok) {
      response = await fetch(`${PHP_API_BASE}/subscribe.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
    }

    if (response && response.ok) {
      const data = await response.json();
      console.log('✅ PHP Email Service [sendMail.php]:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.warn('⚠️ PHP Email Service unavailable, using client-side fallback:', err);
  }

  // Graceful fallback if PHP server is not currently running
  return {
    success: true,
    simulated: true,
    message: 'Subscription recorded (offline preview mode)'
  };
}

/**
 * Step 4: Send registration welcome and personalized recommendation email via PHP (register_welcome.php)
 */
export async function sendRegisterWelcomeEmail(user) {
  if (!user || !user.email) return;

  const payload = {
    email: user.email,
    fullName: user.fullName || 'Explorer',
    marketingProfile: user.marketingProfile || {}
  };

  try {
    let response = await fetch(`${PHP_API_BASE}/register_welcome.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => null);

    if (!response || !response.ok) {
      response = await fetch(`${DIRECT_PHP_URL}/register_welcome.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);
    }

    if (response && response.ok) {
      const data = await response.json();
      console.log('✅ PHP Email Service [register_welcome.php]:', data);
      return { success: true, data };
    }
  } catch (err) {
    console.warn('⚠️ PHP Email Service unavailable:', err);
  }

  return { success: true, simulated: true };
}
