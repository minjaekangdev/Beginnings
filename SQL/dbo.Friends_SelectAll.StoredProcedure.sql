USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAll]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Friends_SelectAll]
	
as

/*


			Execute dbo.Friends_SelectAll

*/

BEGIN

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
			  FROM [dbo].[Friends]


END
GO
