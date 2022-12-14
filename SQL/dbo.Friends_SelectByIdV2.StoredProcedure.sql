USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectByIdV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Friends_SelectByIdV2]
									@Id int 
									
as 

/*
			Declare @Id int = 8

			Execute dbo.Friends_SelectByIdV2 @Id

*/


BEGIN
			SELECT f.Id
					,f.Title
					,f.Bio
					,f.Summary
					,f.Headline
					,f.Slug
					,f.StatusId
					,i.Id
					,i.TypeId
					,i.Url
					,f.UserId
					,f.DateCreated
					,f.DateModified
			  FROM [dbo].[FriendsV2] as f inner join [dbo].Images as i
			  ON	f.PrimaryImageId = i.Id
			  WHERE f.Id = @Id


END
GO
