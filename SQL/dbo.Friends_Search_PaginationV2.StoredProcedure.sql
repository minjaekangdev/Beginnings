USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Search_PaginationV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Friends_Search_PaginationV2]
											@PageIndex int
											,@PageSize int
											,@Query nvarchar(100)

as 

/*

		DECLARE 
				@PageIndex int = 0
				,@PageSize int = 10
				,@Query nvarchar(100) = 'h'


		EXECUTE dbo.Friends_Search_PaginationV2 
											@PageIndex
											,@PageSize
											,@Query

*/

BEGIN
		DECLARE @offset int = @PageSize * @PageIndex


		SELECT f.[Id]
			  ,f.[Title]
			  ,f.[Bio]
			  ,f.[Summary]
			  ,f.[Headline]
			  ,f.[Slug]
			  ,f.[StatusId]
			  ,i.Id
			  ,i.TypeId
			  ,i.Url
			  ,f.UserId
			  ,f.[DateCreated]
			  ,f.[DateModified]
			  ,[TotalCount] = COUNT(1) OVER()
		  FROM [dbo].[FriendsV2] as f inner join [dbo].Images as i
		  ON f.PrimaryImageId = i.Id
		  WHERE (Title LIKE '%' + @Query + '%')
		  ORDER BY f.Id

		  OFFSET @offset ROWS
		  FETCH NEXT @PageSize ROWS ONLY



END
GO
