USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_UpdateV2]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Friends_UpdateV2] 

							@Id int
							,@Title nvarchar(50)
							,@Bio nvarchar(50)
							,@Summary nvarchar(50)
							,@Headline nvarchar(50)
							,@Slug nvarchar(50)
							,@StatusId int
							,@ImageTypeId int
							,@ImageUrl nvarchar(128)
as 

/*
				DECLARE
							@Id int = 7
				
				EXECUTE dbo.Friends_SelectByIdV3 
												@Id

				DECLARE
							@Title nvarchar(50) = 'Teddy Title for Id7'
							,@Bio nvarchar(50) = 'Updated Bio'
							,@Summary nvarchar(50) = 'Updated Summary'
							,@Headline nvarchar(50) = 'Updated Headline for7'
							,@Slug nvarchar(50) = 'Updated Slug for7'
							,@StatusId int = 77777
							,@ImageTypeId int = 7777
							,@ImageUrl nvarchar(128) = 'https://google.com/7777'
							,@UserId int = 7777
							,@TypeId int = 77

				EXECUTE dbo.Friends_UpdateV3
							@Id
							,@Title 
							,@Bio 
							,@Summary 
							,@Headline 
							,@Slug 
							,@StatusId 
							,@ImageTypeId 
							,@ImageUrl 
							,@UserId 
							,@TypeId 

				EXECUTE dbo.Friends_SelectByIdV3 
												@Id 

*/

BEGIN

UPDATE [dbo].[FriendsV2]
						SET [Title] = @Title
						  ,[Bio] = @Bio
						  ,[Summary] = @Summary
						  ,[Headline] = @Headline
						  ,[Slug] = @Slug
						  ,[StatusId] = @StatusId
						  ,[DateModified] = GETUTCDATE()
					 WHERE Id = @Id

UPDATE dbo.Images
					SET 
						TypeId = @ImageTypeId
						,Url = @ImageUrl 
					From	dbo.FriendsV2 as f inner join dbo.Images as i
					ON 
							i.Id = f.PrimaryImageId
					WHERE 
							i.Id = f.PrimaryImageId

	
END
GO
