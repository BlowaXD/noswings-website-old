-- ----------------------------
-- Table structure for _GF_Launcher_ConnectionLog
-- ----------------------------
DROP TABLE [dbo].[_GF_Launcher_ConnectionLog]
GO
CREATE TABLE [dbo].[_GF_Launcher_ConnectionLog] (
[ConnectionId] int NOT NULL IDENTITY(1,1) ,
[AccountName] nvarchar(50) NULL ,
[Server] nvarchar(50) NULL ,
[IpAddress] varchar(15) NULL ,
[UUID] varchar(36) NULL ,
[ComputerName] varchar(255) NULL ,
[Date] datetime2(7) NOT NULL DEFAULT (getdate()) ,
)
GO
ALTER TABLE [dbo].[_GF_Launcher_ConnectionLog] SET (LOCK_ESCALATION = AUTO)
GO