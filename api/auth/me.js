// Get current user (GET /api/auth/me)
async function getCurrentUser() {
    const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`, // Include your JWT access token here
        },
    });

    const data = await response.json();
    return data;
}