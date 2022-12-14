USE [C120_minjkang01_gmail]
GO
/****** Object:  Table [sab].[CourseInstructor]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [sab].[CourseInstructor](
	[CourseId] [int] NOT NULL,
	[PersonId] [int] NOT NULL,
 CONSTRAINT [PK_CourseInstructor] PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC,
	[PersonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [sab].[CourseInstructor]  WITH CHECK ADD  CONSTRAINT [FK_CourseInstructor_Course] FOREIGN KEY([CourseId])
REFERENCES [sab].[Course] ([CourseId])
GO
ALTER TABLE [sab].[CourseInstructor] CHECK CONSTRAINT [FK_CourseInstructor_Course]
GO
ALTER TABLE [sab].[CourseInstructor]  WITH CHECK ADD  CONSTRAINT [FK_CourseInstructor_Person] FOREIGN KEY([PersonId])
REFERENCES [sab].[Person] ([PersonId])
GO
ALTER TABLE [sab].[CourseInstructor] CHECK CONSTRAINT [FK_CourseInstructor_Person]
GO
