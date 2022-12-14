USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[Jobs]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jobs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](128) NOT NULL,
	[Summary] [nvarchar](128) NOT NULL,
	[Pay] [nvarchar](50) NOT NULL,
	[Slug] [nvarchar](50) NOT NULL,
	[StatusId] [int] NOT NULL,
	[TechCompanyId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[ImageId] [int] NULL,
 CONSTRAINT [PK_Jobs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Jobs] ADD  CONSTRAINT [DF_Jobs_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Jobs]  WITH CHECK ADD  CONSTRAINT [FK_Jobs_TechCompanies] FOREIGN KEY([TechCompanyId])
REFERENCES [dbo].[TechCompanies] ([Id])
GO
ALTER TABLE [dbo].[Jobs] CHECK CONSTRAINT [FK_Jobs_TechCompanies]
GO
