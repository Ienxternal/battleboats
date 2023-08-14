// Reset password (forgot password) (POST /api/auth/resetPassword)
async function resetPassword(email) {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await response.json();
    return data;
  }