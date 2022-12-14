USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Users_Pagination]
								@PageIndex int
								,@PageSize int
as

/*
			Declare @PageIndex int = 0
					,@PageSize int = 10

			Execute dbo.Users_Pagination 
										@PageIndex
										,@PageSize


*/


BEGIN

			DECLARE @offset int = @PageIndex * @PageSize
			
			SELECT [Id]
				  ,[FirstName]
				  ,[LastName]
				  ,[Email]
				  ,[Password]
				  ,[AvatarUrl]
				  ,[TenantId]
				  ,[DateCreated]
				  ,[DateModified]
				  ,[TotalCount] = COUNT(1) OVER()
			  FROM [dbo].[Users]
			  ORDER BY Id


			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY

END



GO
