USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [flat].[InstructorsOfficesCourses]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [flat].[InstructorsOfficesCourses](
	[PersonId] [int] NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[HireDate] [datetime] NOT NULL,
	[Id] [int] NULL,
	[Name] [nvarchar](50) NULL,
	[Number] [nvarchar](10) NULL,
	[DateAssigned] [datetime] NULL,
	[CourseId] [int] NULL,
	[Title] [nvarchar](100) NULL,
	[Credits] [int] NULL,
	[DepartmentId] [int] NULL
) ON [PRIMARY]
GO
