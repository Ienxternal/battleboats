// Verify email (GET /api/auth/verifyEmail/:token)
async function verifyEmail(token) {
    const response = await fetch(`/api/auth/verify-email/${token}`, {
        method: 'GET',
    });

    const data = await response.json();
    return data;
}