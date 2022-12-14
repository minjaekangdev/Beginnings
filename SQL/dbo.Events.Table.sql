USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[Events]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Events](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Headline] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](128) NOT NULL,
	[Summary] [nvarchar](128) NOT NULL,
	[Slug] [nvarchar](50) NOT NULL,
	[StatusId] [int] NOT NULL,
	[MetaDataId] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF_Events_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF_Events_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Events]  WITH CHECK ADD  CONSTRAINT [FK_Events_MetaData1] FOREIGN KEY([MetaDataId])
REFERENCES [dbo].[MetaData] ([Id])
GO
ALTER TABLE [dbo].[Events] CHECK CONSTRAINT [FK_Events_MetaData1]
GO
ALTER TABLE [dbo].[Events]  WITH CHECK ADD  CONSTRAINT [FK_Events_Statuses] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Statuses] ([Id])
GO
ALTER TABLE [dbo].[Events] CHECK CONSTRAINT [FK_Events_Statuses]
GO
