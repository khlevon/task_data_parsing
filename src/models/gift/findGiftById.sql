SELECT g.id, g.name, g.fromId
FROM `Gift` g
WHERE g.id = ?
LIMIT 1;
