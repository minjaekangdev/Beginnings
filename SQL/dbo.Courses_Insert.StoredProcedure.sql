USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Courses_Insert]
							@Name nvarchar(200)
							,@Description nvarchar(200)
							,@SeasonTermId int
							,@TeacherId int
							,@Id int OUTPUT

/*
		SELECT *
		FROM dbo.Courses


				DECLARE 
							@Name nvarchar(200) = 'CS 101'
							,@Description nvarchar(200) = 'Basic Computer Science Class'
							,@SeasonTermId int = 2
							,@TeacherId int = 1
							,@Id int 

			EXECUTE dbo.Courses_Insert
								@Name
								,@Description
								,@SeasonTermId
								,@TeacherId
								,@Id OUTPUT

		SELECT *
		FROM dbo.Courses

*/

as

BEGIN

			INSERT INTO [dbo].[Courses]
					   ([Name]
					   ,[Description]
					   ,[SeasonTermId]
					   ,[TeacherId])
				 VALUES
					   (@Name
					   ,@Description
					   ,@SeasonTermId
					   ,@TeacherId)

			SET @Id = SCOPE_IDENTITY();


END



GO
