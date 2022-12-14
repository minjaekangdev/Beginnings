USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Courses_Pagination]
								@PageIndex int 
								,@PageSize int 


/*

			DECLARE @PageIndex int = 0
					,@PageSize int = 10

			EXECUTE dbo.Courses_Pagination @PageIndex
											,@PageSize



*/

as

BEGIN

			DECLARE @offset int = @PageIndex * @PageSize

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
								WHERE sc.CourseId = c.Id
								FOR JSON AUTO
				  )
				  ,[TotalCount] = COUNT(1) OVER() 
			  FROM [dbo].[Courses] as c
			  ORDER BY Id

			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY

END


GO
