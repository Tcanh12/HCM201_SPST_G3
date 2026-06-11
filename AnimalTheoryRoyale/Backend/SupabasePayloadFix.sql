-- Cập nhật dữ liệu cũ để tránh lỗi NOT NULL
UPDATE "Questions"
SET "ChallengePayloadJson" = '{}'
WHERE "ChallengePayloadJson" IS NULL;

-- Đảm bảo có default value trong tương lai
ALTER TABLE "Questions"
ALTER COLUMN "ChallengePayloadJson" SET DEFAULT '{}';
