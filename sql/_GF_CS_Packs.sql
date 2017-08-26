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

Date: 2017-08-26 19:45:26
*/


-- ----------------------------
-- Table structure for _GF_CS_Packs
-- ----------------------------
DROP TABLE [dbo].[_GF_CS_Packs]
GO
CREATE TABLE [dbo].[_GF_CS_Packs] (
[PackId] int NOT NULL IDENTITY(1,1) ,
[CategoryId] smallint NULL ,
[Type] smallint NULL ,
[Price] int NULL ,
[Name] varchar(60) NULL ,
[Description] varchar(255) NULL 
)


GO

-- ----------------------------
-- Indexes structure for table _GF_CS_Packs
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table _GF_CS_Packs
-- ----------------------------
ALTER TABLE [dbo].[_GF_CS_Packs] ADD PRIMARY KEY ([PackId])
GO

-- ----------------------------
-- Foreign Key structure for table [dbo].[_GF_CS_Packs]
-- ----------------------------
ALTER TABLE [dbo].[_GF_CS_Packs] ADD FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[_GF_CS_Categories] ([CategoryId]) ON DELETE NO ACTION ON UPDATE NO ACTION
GO
