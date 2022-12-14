USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_PaginationV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Friends_PaginationV2]
									@PageIndex int
									,@PageSize int
									
as 

/*

			DECLARE @PageIndex int = 0
					,@PageSize int = 10
			
			Execute dbo.Friends_PaginationV2 
											@PageIndex
											,@PageSize

*/


BEGIN

			DECLARE @offset int = @PageSize * @PageIndex

			SELECT f.Id
					,f.Title
					,f.Bio
					,f.Summary
					,f.Headline
					,f.Slug
					,f.StatusId
					,i.Id as ImageId
					,i.TypeId as ImageTypeId
					,i.Url as ImageUrl
					,f.UserId
					,f.DateCreated
					,f.DateModified
					,[TotalCount] = COUNT(1) OVER() 
			  FROM [dbo].[FriendsV2] as f inner join [dbo].Images as i
			  ON	f.PrimaryImageId = i.Id
			  ORDER BY f.Id

			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY


END
GO
