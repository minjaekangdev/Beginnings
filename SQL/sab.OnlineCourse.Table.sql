USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [sab].[OnlineCourse]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [sab].[OnlineCourse](
	[CourseId] [int] NOT NULL,
	[URL] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_OnlineCourse] PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
