// Update user profile (PUT /api/auth/profile)
async function updateProfile(updatedProfile) {
    const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include your JWT access token here
        },
        body: JSON.stringify(updatedProfile),
    });

    const data = await response.json();
    return data;
}