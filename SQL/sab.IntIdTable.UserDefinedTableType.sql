USE [C120_minjkang01_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[IntIdTable]    Script Date: 10/23/2022 11:04:09 AM ******/
CREATE TYPE [sab].[IntIdTable] AS TABLE(
	[Data] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Data] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
