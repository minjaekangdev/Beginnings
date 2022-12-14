USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[TechCompanyUrls]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TechCompanyUrls](
	[TechCompanyId] [int] NOT NULL,
	[UrlId] [int] NOT NULL,
 CONSTRAINT [PK_TechCompanyUrls_1] PRIMARY KEY CLUSTERED 
(
	[TechCompanyId] ASC,
	[UrlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TechCompanyUrls]  WITH CHECK ADD  CONSTRAINT [FK_TechCompanyUrls_TechCompanies] FOREIGN KEY([TechCompanyId])
REFERENCES [dbo].[TechCompanies] ([Id])
GO
ALTER TABLE [dbo].[TechCompanyUrls] CHECK CONSTRAINT [FK_TechCompanyUrls_TechCompanies]
GO
ALTER TABLE [dbo].[TechCompanyUrls]  WITH CHECK ADD  CONSTRAINT [FK_TechCompanyUrls_Urls] FOREIGN KEY([UrlId])
REFERENCES [dbo].[Urls] ([Id])
GO
ALTER TABLE [dbo].[TechCompanyUrls] CHECK CONSTRAINT [FK_TechCompanyUrls_Urls]
GO
