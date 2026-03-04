-- meufreelas MySQL Migration Script
-- Run this on your Hostinger MySQL database

CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `emailVerified` DATETIME(3) NULL,
  `image` TEXT NULL,
  `password` VARCHAR(191) NULL,
  `role` ENUM('CLIENT','FREELANCER','ADMIN') NOT NULL DEFAULT 'CLIENT',
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `isVerified` BOOLEAN NOT NULL DEFAULT FALSE,
  `isFeatured` BOOLEAN NOT NULL DEFAULT FALSE,
  `bio` TEXT NULL,
  `phone` VARCHAR(191) NULL,
  `city` VARCHAR(191) NULL,
  `state` VARCHAR(191) NULL,
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  `reviewCount` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `FreelancerProfile` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `userId` VARCHAR(191) NOT NULL,
  `headline` VARCHAR(191) NULL,
  `skills` JSON NULL,
  `portfolio` JSON NULL,
  `hourlyRate` DECIMAL(10,2) NULL,
  `experience` TEXT NULL,
  `education` TEXT NULL,
  `availability` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `FreelancerProfile_userId_key` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ClientProfile` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `userId` VARCHAR(191) NOT NULL,
  `companyName` VARCHAR(191) NULL,
  `website` VARCHAR(191) NULL,
  `industry` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ClientProfile_userId_key` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Category` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `icon` VARCHAR(191) NULL,
  `description` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Project` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `clientId` VARCHAR(191) NOT NULL,
  `categoryId` VARCHAR(191) NULL,
  `status` ENUM('OPEN','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'OPEN',
  `budgetType` ENUM('FIXED','HOURLY') NOT NULL DEFAULT 'FIXED',
  `budgetMin` DECIMAL(10,2) NULL,
  `budgetMax` DECIMAL(10,2) NULL,
  `deadline` DATETIME(3) NULL,
  `skills` JSON NULL,
  `proposalCount` INTEGER NOT NULL DEFAULT 0,
  `viewCount` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Project_slug_key` (`slug`),
  FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Proposal` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `projectId` VARCHAR(191) NOT NULL,
  `freelancerId` VARCHAR(191) NOT NULL,
  `content` TEXT NOT NULL,
  `budget` DECIMAL(10,2) NOT NULL,
  `deliveryDays` INTEGER NOT NULL,
  `status` ENUM('PENDING','ACCEPTED','REJECTED','WITHDRAWN') NOT NULL DEFAULT 'PENDING',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Proposal_projectId_freelancerId_key` (`projectId`, `freelancerId`),
  FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`freelancerId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Conversation` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `participantOneId` VARCHAR(191) NOT NULL,
  `participantTwoId` VARCHAR(191) NOT NULL,
  `lastMessageAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Conversation_participants_key` (`participantOneId`, `participantTwoId`),
  FOREIGN KEY (`participantOneId`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`participantTwoId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Message` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `conversationId` VARCHAR(191) NOT NULL,
  `senderId` VARCHAR(191) NOT NULL,
  `content` TEXT NOT NULL,
  `isRead` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Payment` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `projectId` VARCHAR(191) NOT NULL,
  `clientId` VARCHAR(191) NOT NULL,
  `freelancerId` VARCHAR(191) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `platformFee` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `status` ENUM('PENDING','HELD','RELEASED','REFUNDED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `paymentMethod` VARCHAR(191) NULL,
  `transactionId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`freelancerId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Review` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `projectId` VARCHAR(191) NOT NULL,
  `reviewerId` VARCHAR(191) NOT NULL,
  `revieweeId` VARCHAR(191) NOT NULL,
  `rating` INTEGER NOT NULL,
  `comment` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Review_projectId_reviewerId_key` (`projectId`, `reviewerId`),
  FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reviewerId`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`revieweeId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Notification` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `message` TEXT NOT NULL,
  `isRead` BOOLEAN NOT NULL DEFAULT FALSE,
  `link` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Dispute` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `projectId` VARCHAR(191) NOT NULL,
  `openedById` VARCHAR(191) NOT NULL,
  `reason` TEXT NOT NULL,
  `status` ENUM('OPEN','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
  `resolution` VARCHAR(191) NULL,
  `resolvedAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`openedById`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- NextAuth tables
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `provider` VARCHAR(191) NOT NULL,
  `providerAccountId` VARCHAR(191) NOT NULL,
  `refresh_token` TEXT NULL,
  `access_token` TEXT NULL,
  `expires_at` INTEGER NULL,
  `token_type` VARCHAR(191) NULL,
  `scope` VARCHAR(191) NULL,
  `id_token` TEXT NULL,
  `session_state` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_provider_providerAccountId_key` (`provider`, `providerAccountId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(191) NOT NULL DEFAULT (UUID()),
  `sessionToken` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sessions_sessionToken_key` (`sessionToken`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `verification_tokens` (
  `identifier` VARCHAR(191) NOT NULL,
  `token` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  UNIQUE KEY `verification_tokens_token_key` (`token`),
  UNIQUE KEY `verification_tokens_identifier_token_key` (`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed categories
INSERT IGNORE INTO `Category` (`id`, `name`, `slug`, `icon`, `description`) VALUES
  (UUID(), 'Desenvolvimento Web', 'desenvolvimento-web', '💻', 'Sites, sistemas e aplicações web'),
  (UUID(), 'Design Gráfico', 'design-grafico', '🎨', 'Identidade visual, logos e materiais gráficos'),
  (UUID(), 'Mobile', 'mobile', '📱', 'Apps para iOS e Android'),
  (UUID(), 'Marketing Digital', 'marketing-digital', '📈', 'SEO, redes sociais e campanhas digitais'),
  (UUID(), 'Redação e Conteúdo', 'redacao-conteudo', '✍️', 'Copywriting, blogs e textos'),
  (UUID(), 'Vídeo e Animação', 'video-animacao', '🎬', 'Edição de vídeo, motion graphics e animações'),
  (UUID(), 'Música e Áudio', 'musica-audio', '🎵', 'Trilhas, locução e edição de áudio'),
  (UUID(), 'Data Science', 'data-science', '📊', 'Análise de dados, BI e machine learning'),
  (UUID(), 'DevOps e Cloud', 'devops-cloud', '☁️', 'Infraestrutura, CI/CD e cloud computing'),
  (UUID(), 'Tradução', 'traducao', '🌐', 'Tradução e interpretação de idiomas'),
  (UUID(), 'Consultoria', 'consultoria', '💼', 'Consultoria de negócios e estratégia'),
  (UUID(), 'Fotografia', 'fotografia', '📷', 'Fotografia comercial e edição de imagens');
