USE [C120_minjkang01_gmail]
GO
/****** Object:  UserDefinedTableType [sab].[Images]    Script Date: 10/23/2022 11:04:09 AM ******/
CREATE TYPE [sab].[Images] AS TABLE(
	[ImageTypeId] [int] NULL,
	[ImageUrl] [nvarchar](128) NULL
)
GO
