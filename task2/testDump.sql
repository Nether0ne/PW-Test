CREATE TABLE `report_keywords` (
  `id` int NOT NULL,
  `userId` int UNSIGNED NOT NULL,
  `eventDate` date NOT NULL,
  `generatedAtDateTime` datetime NOT NULL,
  `keywordId` int UNSIGNED NOT NULL,
  `impressions` int NOT NULL,
  `clicks` int NOT NULL,
  `cost` float NOT NULL,
  `orders` float NOT NULL,
  `sales` float NOT NULL
);

INSERT INTO `report_keywords` (`userId`, `eventDate`, `generatedAtDateTime`, `keywordId`, `impressions`, `clicks`, `cost`, `orders`, `sales`) VALUES
(1, '2020-06-23', '2020-06-24 15:00:00', 1, 10, 0, 0, 0, 0),
(1, '2020-06-23', '2020-06-24 16:00:00', 1, 100, 4, 4.47, 1, 35.99),
(1, '2020-06-24', '2020-06-24 18:00:00', 1, 250, 2, 2.23, 0, 0),
(1, '2020-06-23', '2020-06-24 17:00:00', 2, 500, 24, 10.2, 2, 98.98);

ALTER TABLE `report_keywords`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `report_keywords`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;
