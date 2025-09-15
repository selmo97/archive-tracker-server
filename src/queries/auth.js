const AUTH_QUERY = `
SELECT id, email, username, is_admin, password_hash
FROM users
WHERE email = $1
`;

module.exports = { AUTH_QUERY };
