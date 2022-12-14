USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [dbo].[MetaData]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MetaData](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[dateStart] [datetime2](7) NOT NULL,
	[dateEnd] [datetime2](7) NOT NULL,
	[locationId] [int] NOT NULL,
 CONSTRAINT [PK_metaData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[MetaData]  WITH CHECK ADD  CONSTRAINT [FK_MetaData_Locations1] FOREIGN KEY([locationId])
REFERENCES [dbo].[Locations] ([Id])
GO
ALTER TABLE [dbo].[MetaData] CHECK CONSTRAINT [FK_MetaData_Locations1]
GO
