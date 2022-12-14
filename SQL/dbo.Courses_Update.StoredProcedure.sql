USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Courses_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Courses_Update]							
							@Name nvarchar(200)
							,@Description nvarchar(200)
							,@SeasonTermId int
							,@TeacherId int
							,@Id int 

/*

		DECLARE @Id int = 1
		
		EXECUTE dbo_Courses_SelectById @Id

		DECLARE @Name nvarchar(200) = 'update'
				,@Description nvarchar(200) = 'update desc'
				,@SeasonTermId int = 4
				,@TeacherId int = 1

		EXECUTE dbo.Courses_Update @Id
								,@Name
								,@Description
								,@SeasonTermId
								,@TeacherId

		EXECUTE dbo_Courses_SelectById @Id



*/

as

BEGIN

			UPDATE [dbo].[Courses]
			   SET [Name] = @Name
				  ,[Description] = @Description
				  ,[SeasonTermId] = @SeasonTermId
				  ,[TeacherId] = @TeacherId
			 WHERE Id = @Id

END


GO
