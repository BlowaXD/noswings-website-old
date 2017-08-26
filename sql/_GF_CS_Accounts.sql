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

Date: 2017-08-26 17:57:40
*/


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
