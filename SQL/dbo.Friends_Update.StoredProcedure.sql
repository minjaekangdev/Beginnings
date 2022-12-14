USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Friends_Update]
							@Title nvarchar(50)
							,@Bio nvarchar(50)
							,@Summary nvarchar(50)
							,@Headline nvarchar(50)
							,@Slug nvarchar(50)
							,@StatusId int
							,@PrimaryImageUrl nvarchar(128)
							,@Id int 

as

/*
			Declare @Title nvarchar(50) = 'Title here bby'
					,@Bio nvarchar(50) = 'Bio here bby'
					,@Summary nvarchar(50) = 'Summary here bby' 
					,@Headline nvarchar(50) = 'Headline here bby' 
					,@Slug nvarchar(50) = 'Slug here bby' 
					,@StatusId int = 0
					,@PrimaryImageUrl nvarchar(128) = 'Primary image url here bby'
					,@UserId int = 911111
					,@Id int = 3

			Select *
			From dbo.Friends
			WHERE Id = @Id


			Execute dbo.Friends_Update
										@Title
										,@Bio
										,@Summary
										,@Headline
										,@Slug
										,@StatusId
										,@PrimaryImageUrl
										,@UserId
										,@Id
	
			Select *
			From dbo.Friends
			WHERE Id = @Id

*/


BEGIN

				UPDATE [dbo].[Friends]
						SET [Title] = @Title
						  ,[Bio] = @Bio
						  ,[Summary] = @Summary
						  ,[Headline] = @Headline
						  ,[Slug] = @Slug
						  ,[StatusId] = @StatusId
						  ,[PrimaryImageUrl] = @PrimaryImageUrl
						  ,[DateModified] = GETUTCDATE()
					 WHERE Id = @Id


END



GO
