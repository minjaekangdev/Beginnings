USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[FriendTechCompany]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FriendTechCompany](
	[FriendId] [int] NOT NULL,
	[TechCompany] [int] NOT NULL,
 CONSTRAINT [PK_FriendTechCompany] PRIMARY KEY CLUSTERED 
(
	[FriendId] ASC,
	[TechCompany] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FriendTechCompany]  WITH CHECK ADD  CONSTRAINT [FK_FriendTechCompany_FriendsV2] FOREIGN KEY([FriendId])
REFERENCES [dbo].[FriendsV2] ([Id])
GO
ALTER TABLE [dbo].[FriendTechCompany] CHECK CONSTRAINT [FK_FriendTechCompany_FriendsV2]
GO
ALTER TABLE [dbo].[FriendTechCompany]  WITH CHECK ADD  CONSTRAINT [FK_FriendTechCompany_TechCompanies] FOREIGN KEY([TechCompany])
REFERENCES [dbo].[TechCompanies] ([Id])
GO
ALTER TABLE [dbo].[FriendTechCompany] CHECK CONSTRAINT [FK_FriendTechCompany_TechCompanies]
GO
