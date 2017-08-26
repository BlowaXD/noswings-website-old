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

Date: 2017-08-26 19:48:04
*/


-- ----------------------------
-- Table structure for _GF_Launcher_PatchValues
-- ----------------------------
DROP TABLE [dbo].[_GF_Launcher_PatchValues]
GO
CREATE TABLE [dbo].[_GF_Launcher_PatchValues] (
[Id] bigint NOT NULL IDENTITY(1,1) ,
[HashId] bigint NOT NULL ,
[Offset] bigint NOT NULL ,
[Value] varchar(128) NOT NULL 
)


GO

-- ----------------------------
-- Indexes structure for table _GF_Launcher_PatchValues
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table _GF_Launcher_PatchValues
-- ----------------------------
ALTER TABLE [dbo].[_GF_Launcher_PatchValues] ADD PRIMARY KEY ([Id])
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[_GF_Launcher_PatchValues]
-- ----------------------------
ALTER TABLE [dbo].[_GF_Launcher_PatchValues] ADD FOREIGN KEY ([HashId]) REFERENCES [dbo].[_GF_Launcher_Patchs] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
