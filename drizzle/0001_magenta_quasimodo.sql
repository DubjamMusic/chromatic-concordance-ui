CREATE TABLE `mlPredictions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questId` varchar(64) NOT NULL,
	`predictionType` enum('success-probability','recovery-trajectory','engagement-score','recommendation') NOT NULL,
	`inputMetrics` text NOT NULL,
	`prediction` text NOT NULL,
	`confidence` decimal(5,4) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mlPredictions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questId` varchar(64) NOT NULL,
	`questName` varchar(255) NOT NULL,
	`phase` enum('intro','potato','schultz','synapse','complete') NOT NULL DEFAULT 'intro',
	`empathyCharge` int NOT NULL DEFAULT 0,
	`logicCharge` int NOT NULL DEFAULT 0,
	`concordanceLevel` int NOT NULL DEFAULT 0,
	`matrixHealth` int NOT NULL DEFAULT 35,
	`status` enum('in-progress','completed','abandoned') NOT NULL DEFAULT 'in-progress',
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `questProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questRewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questId` varchar(64) NOT NULL,
	`rewardType` enum('xp','ability','cosmetic','badge') NOT NULL,
	`rewardName` varchar(255) NOT NULL,
	`rewardValue` int DEFAULT 0,
	`description` text,
	`claimedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `questRewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`daysSober` int NOT NULL DEFAULT 0,
	`xp` int NOT NULL DEFAULT 0,
	`questsCompleted` int NOT NULL DEFAULT 0,
	`stabilityIndex` decimal(5,2) NOT NULL DEFAULT '0.00',
	`recoveryStatus` enum('stable','at-risk','critical','thriving') NOT NULL DEFAULT 'stable',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userMetrics_id` PRIMARY KEY(`id`)
);
