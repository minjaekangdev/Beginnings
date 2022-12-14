USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[Friends]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Friends](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Bio] [nvarchar](50) NOT NULL,
	[Summary] [nvarchar](50) NOT NULL,
	[Headline] [nvarchar](50) NOT NULL,
	[Slug] [nvarchar](50) NOT NULL,
	[StatusId] [int] NOT NULL,
	[PrimaryImageUrl] [nvarchar](128) NOT NULL,
	[UserId] [int] NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Friends] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Friends] ADD  CONSTRAINT [DF_Friends_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
