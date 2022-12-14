USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[Presidents]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Presidents](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[InaugurationDate] [datetime2](7) NOT NULL,
	[FirstYearInOffice] [int] NOT NULL,
	[LastYearInOffice] [int] NOT NULL,
	[PartyAffiliation] [nvarchar](50) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Presidents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Presidents] ADD  CONSTRAINT [DF_Presidents_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Presidents] ADD  CONSTRAINT [DF_Presidents_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
