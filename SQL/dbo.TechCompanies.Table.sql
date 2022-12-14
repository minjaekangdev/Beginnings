USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[TechCompanies]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompanies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Profile] [nvarchar](50) NOT NULL,
	[Summary] [nvarchar](50) NOT NULL,
	[Headline] [nvarchar](50) NOT NULL,
	[ContactInformation] [nvarchar](50) NULL,
	[Slug] [nvarchar](50) NOT NULL,
	[StatusId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TechCompanies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[TechCompanies] ADD  CONSTRAINT [DF_TechCompanies_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[TechCompanies]  WITH CHECK ADD  CONSTRAINT [FK_TechCompanies_Statuses] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Statuses] ([Id])
GO
ALTER TABLE [dbo].[TechCompanies] CHECK CONSTRAINT [FK_TechCompanies_Statuses]
GO
