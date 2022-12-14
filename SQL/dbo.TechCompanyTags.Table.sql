USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[TechCompanyTags]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompanyTags](
	[TechCompanyId] [int] NOT NULL,
	[TagId] [int] NOT NULL,
 CONSTRAINT [PK_TechCompanyTags] PRIMARY KEY CLUSTERED 
(
	[TechCompanyId] ASC,
	[TagId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompanyTags]  WITH CHECK ADD  CONSTRAINT [FK_TechCompanyTags_Tags] FOREIGN KEY([TagId])
REFERENCES [dbo].[Tags] ([Id])
GO
ALTER TABLE [dbo].[TechCompanyTags] CHECK CONSTRAINT [FK_TechCompanyTags_Tags]
GO
ALTER TABLE [dbo].[TechCompanyTags]  WITH CHECK ADD  CONSTRAINT [FK_TechCompanyTags_TechCompanies] FOREIGN KEY([TechCompanyId])
REFERENCES [dbo].[TechCompanies] ([Id])
GO
ALTER TABLE [dbo].[TechCompanyTags] CHECK CONSTRAINT [FK_TechCompanyTags_TechCompanies]
GO
