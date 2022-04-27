SELECT o.id, o.date, o.description, o.userId, o.giftId
FROM `Order` o
WHERE o.id = ?
LIMIT 1;
