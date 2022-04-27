SELECT u.id, u.name, u.number
FROM `User` u
WHERE u.number = ?
LIMIT 1;
