USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[Animals]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Animals](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
