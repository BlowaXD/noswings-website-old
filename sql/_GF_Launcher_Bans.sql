-- ----------------------------
-- Table structure for _GF_Launcher_Bans
-- ----------------------------
DROP TABLE [dbo].[_GF_Launcher_Bans]
GO
CREATE TABLE [dbo].[_GF_Launcher_Bans] (
[BanId] int NOT NULL IDENTITY(1,1) ,
[Value] varchar(255) NULL ,
)
GO
ALTER TABLE [dbo].[_GF_Launcher_Bans] SET (LOCK_ESCALATION = AUTO)
GO