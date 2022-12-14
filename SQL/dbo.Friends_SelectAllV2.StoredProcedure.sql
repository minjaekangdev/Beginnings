USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAllV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Friends_SelectAllV2]
	
as

/*


			Execute dbo.Friends_SelectAllV2

*/

BEGIN

			SELECT f.[Id]
				  ,f.[Title]
				  ,f.[Bio]
				  ,f.[Summary]
				  ,f.[Headline]
				  ,f.[Slug]
				  ,f.[StatusId]
				  ,i.Id as ImageId
				  ,i.TypeId as ImageTypeId
				  ,i.Url
				  ,f.[UserId]
				  ,f.[DateCreated]
				  ,f.[DateModified]
			  FROM [dbo].[FriendsV2] as f inner join dbo.Images as i
							on i.Id = f.PrimaryImageId

					


END
GO
