SELECT u.id, u.name, u.number
FROM `User` u
WHERE u.id = ?
LIMIT 1;
