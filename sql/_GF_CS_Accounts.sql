-- ----------------------------
-- Table structure for _GF_CS_Accounts
-- ----------------------------
DROP TABLE [dbo].[_GF_CS_Accounts]
GO
CREATE TABLE [dbo].[_GF_CS_Accounts] (
[AccountId] bigint NOT NULL ,
[CashPoints] bigint NOT NULL DEFAULT ((0)) ,
[Permission] tinyint NOT NULL DEFAULT ((0)) 
)


GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[_GF_CS_Accounts]
-- ----------------------------
ALTER TABLE [dbo].[_GF_CS_Accounts] ADD FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([AccountId]) ON DELETE CASCADE ON UPDATE NO ACTION
GO
