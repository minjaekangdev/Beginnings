USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Search_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Friends_Search_Pagination] 
											@PageIndex int
											,@PageSize int
											,@Query nvarchar(100)

as

/*
		DECLARE 
				@PageIndex int = 0
				,@PageSize int = 10
				,@Query nvarchar(100) = 'asdf'


		EXECUTE dbo.Friends_Search_Pagination 
											@PageIndex
											,@PageSize
											,@Query

*/

BEGIN
		DECLARE @offset int = @PageSize * @PageIndex



		SELECT [Id]
		  ,[Title]
		  ,[Bio]
		  ,[Summary]
		  ,[Headline]
		  ,[Slug]
		  ,[StatusId]
		  ,[PrimaryImageUrl]
		  ,[UserId]
		  ,[DateCreated]
		  ,[DateModified]
		  ,[TotalCount] = COUNT(1) OVER()
		FROM [dbo].[Friends]

		  WHERE (Title LIKE '%' + @Query + '%')
		  ORDER BY Id

		  OFFSET @offset Rows
		  FETCH NEXT @PageSize ROWS ONLY


END




GO
