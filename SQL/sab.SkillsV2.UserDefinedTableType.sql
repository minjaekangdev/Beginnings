USE [C120_minjkang01_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[SkillsV2]    Script Date: 10/23/2022 11:04:09 AM ******/
CREATE TYPE [sab].[SkillsV2] AS TABLE(
	[Id] [int] NOT NULL,
	[Name] [nvarchar](50) NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
