USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_UpdateV3]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Friends_UpdateV3] 

							@Id int
							,@Title nvarchar(50)
							,@Bio nvarchar(50)
							,@Summary nvarchar(50)
							,@Headline nvarchar(50)
							,@Slug nvarchar(50)
							,@StatusId int
							,@ImageTypeId int
							,@ImageUrl nvarchar(128)
							,@batchSkills sab.Skills READONLY
						
as 

/*
				DECLARE
							@Id int = 1689

				EXECUTE dbo.Friends_SelectByIdV3 @Id
				

				DECLARE
							@Title nvarchar(50) = 'Teddyy Title for Id7'
							,@Bio nvarchar(50) = 'Updated Bio'
							,@Summary nvarchar(50) = 'Updated Summary'
							,@Headline nvarchar(50) = 'Updated Headline for7'
							,@Slug nvarchar(50) = 'Updated Slug for7'
							,@StatusId int = 2
							,@ImageTypeId int = 7778
							,@ImageUrl nvarchar(128) = 'https://static.wikia.nocookie.net/bobsburgerpedia/images/9/94/BobsBurgers_2019_KeyPoses_Bob_1.jpg/'
							,@batchSkills sab.Skills

				INSERT INTO @batchSkills (Name)
				VALUES ('TEST') , ('HTML')

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
							,@batchSkills
							

						

				EXECUTE dbo.Friends_SelectByIdV3 @Id

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
							f.Id = @Id


INSERT INTO dbo.Skills ([Name])
	Select	bs.Name
	FROM	@batchSkills as bs
	WHERE	NOT EXISTS (SELECT 1
						FROM dbo.Skills as s
						WHERE s.Name = bs.Name)

DELETE FROM dbo.FriendSkills 
WHERE		FriendId = @Id
						
INSERT INTO dbo.FriendSkills (FriendId, SkillId)
	SELECT	@Id
			,s.Id
	FROM	dbo.Skills as s
	WHERE	EXISTS (Select 1
					FROM @batchSkills as bs
					WHERE bs.Name = s.Name)



	
END
GO
