USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Friends_Pagination]
								@PageIndex int
								,@PageSize int

as 

/*

			DECLARE @PageIndex int = 0
					,@PageSize int = 10
			
			Execute dbo.Friends_Pagination
											@PageIndex
											,@PageSize

*/


BEGIN

		DECLARE @offset int = @PageIndex * @PageSize

		SELECT [Id]
			  ,[Title]
			  ,[Bio]
			  ,[Summary]
			  ,[Headline]
			  ,[Slug]
			  ,[StatusId]
			  ,[PrimaryImageUrl]
			  ,[DateCreated]
			  ,[DateModified]
			  ,[UserId]
			  ,[TotalCount] = COUNT(1) OVER()

		  FROM [dbo].[Friends]

		  ORDER BY Id


			OFFSET @offSet ROWS
			FETCH NEXT @PageSize ROWS ONLY

END


GO
