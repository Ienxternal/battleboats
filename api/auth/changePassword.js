// Change password (PUT /api/auth/changePassword)
async function changePassword(newPassword) {
    const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include your JWT access token here
        },
        body: JSON.stringify(newPassword),
    });

    const data = await response.json();
    return data;
}