USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[JobImages]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobImages](
	[JobId] [int] NOT NULL,
	[ImageId] [int] NOT NULL,
 CONSTRAINT [PK_JobImages] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobImages]  WITH CHECK ADD  CONSTRAINT [FK_JobImages_Images] FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[JobImages] CHECK CONSTRAINT [FK_JobImages_Images]
GO
ALTER TABLE [dbo].[JobImages]  WITH CHECK ADD  CONSTRAINT [FK_JobImages_Jobs] FOREIGN KEY([JobId])
REFERENCES [dbo].[Jobs] ([Id])
GO
ALTER TABLE [dbo].[JobImages] CHECK CONSTRAINT [FK_JobImages_Jobs]
GO
