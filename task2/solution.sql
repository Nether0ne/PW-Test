SELECT * 
FROM report_keywords 
WHERE userId = 1 AND 
eventDate >= "2020-06-01" AND
eventDate < "2020-07-01" AND 
generatedAtDateTime IN (
  SELECT MAX(generatedAtDateTime) 
  FROM report_keywords 
  WHERE userId = 1 AND 
  eventDate >= "2020-06-01" AND
  eventDate < "2020-07-01" AND 
  GROUP BY eventDate, keywordId
) 
