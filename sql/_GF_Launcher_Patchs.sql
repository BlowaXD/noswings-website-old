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

Date: 2017-08-26 19:47:42
*/


-- ----------------------------
-- Table structure for _GF_Launcher_Patchs
-- ----------------------------
DROP TABLE [dbo].[_GF_Launcher_Patchs]
GO
CREATE TABLE [dbo].[_GF_Launcher_Patchs] (
[Id] bigint NOT NULL IDENTITY(1,1) ,
[Hash] varchar(32) NOT NULL ,
[Ip] varchar(32) NOT NULL ,
[Port] smallint NULL ,
[Multiclient] bit NULL 
)


GO

-- ----------------------------
-- Indexes structure for table _GF_Launcher_Patchs
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table _GF_Launcher_Patchs
-- ----------------------------
ALTER TABLE [dbo].[_GF_Launcher_Patchs] ADD PRIMARY KEY ([Id])
GO
