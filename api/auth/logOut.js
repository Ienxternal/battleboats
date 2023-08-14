// User logout (POST /api/auth/logout)
async function logOut() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`, // Include your JWT access token here
        },
    });

    const data = await response.json();
    return data;
}