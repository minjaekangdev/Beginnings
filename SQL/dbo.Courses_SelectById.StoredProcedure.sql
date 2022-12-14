USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_SelectById]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Courses_SelectById]
							@Id int

/*
		DECLARE @Id int = 1

		EXECUTE dbo.Courses_SelectById 
										@Id

*/

as

BEGIN


			SELECT c.[Id]
				  ,c.[Name]
				  ,c.[Description]
				  ,SeasonTerm = (SELECT st.Term
								FROM	dbo.SeasonTerms as st
								WHERE	st.Id = c.SeasonTermId
				  )
				  ,Teacher = (	SELECT	t.[Name]
								FROM	dbo.Teachers as t
								WHERE	t.Id = c.TeacherId
				  )
				  ,Students = (SELECT	s.Id
										,s.Name
								FROM dbo.Students as s inner join dbo.StudentCourses as sc
											on s.Id = sc.StudentId
								WHERE sc.CourseId = @Id
								FOR JSON AUTO
				  )
			  FROM [dbo].[Courses] as c
			  WHERE c.Id = @Id


END



GO
