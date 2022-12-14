USE [C120_minjkang01_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[CourseV2]    Script Date: 10/23/2022 11:04:09 AM ******/
CREATE TYPE [sab].[CourseV2] AS TABLE(
	[Id] [int] NOT NULL,
	[Credits] [int] NOT NULL,
	[Title] [varchar](100) NULL,
	[DepId] [int] NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
