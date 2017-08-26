/*
Navicat SQL Server Data Transfer

Source Server         : NosWingsNew
Source Server Version : 130000
Source Host           : 163.172.106.204:1433
Source Database       : opennos
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 130000
File Encoding         : 65001

Date: 2017-08-26 19:53:18
*/


-- ----------------------------
-- Table structure for _GF_Launcher_ConnectionLog
-- ----------------------------
DROP TABLE [dbo].[_GF_Launcher_ConnectionLog]
GO
CREATE TABLE [dbo].[_GF_Launcher_ConnectionLog] (
[ConnectionId] int NOT NULL IDENTITY(1,1) ,
[AccountName] nvarchar(255) NULL ,
[IpAddress] varchar(32) NULL ,
[MacAddress] varchar(32) NULL ,
[ComputerUserName] varchar(255) NULL 
)


GO
ALTER TABLE [dbo].[_GF_Launcher_ConnectionLog] SET (LOCK_ESCALATION = AUTO)
GO

-- ----------------------------
-- Indexes structure for table _GF_Launcher_ConnectionLog
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table _GF_Launcher_ConnectionLog
-- ----------------------------
ALTER TABLE [dbo].[_GF_Launcher_ConnectionLog] ADD PRIMARY KEY ([ConnectionId])
GO
