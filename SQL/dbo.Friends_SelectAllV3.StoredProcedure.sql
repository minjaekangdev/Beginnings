USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_SelectAllV3]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Friends_SelectAllV3]
	
as

/*


			Execute dbo.Friends_SelectAllV3

*/

BEGIN

			SELECT f.[Id]
				  ,f.[Title]
				  ,f.[Bio]
				  ,f.[Summary]
				  ,f.[Headline]
				  ,f.[Slug]
				  ,Status = (	SELECT 
										s.Id
										,s.Name
								FROM dbo.Statuses as s
								WHERE s.Id = f.StatusId
								FOR JSON AUTO
				  )
				  ,PrimaryImage = ( SELECT i.Id
														,i.TypeId
														,i.Url
													FROM dbo.Images as i
													 WHERE f.PrimaryImageId = i.Id
													FOR JSON AUTO
								)
				  ,Skills = (
							SELECT	
									s.Id,
									s.Name

							FROM	
									dbo.Skills as s inner join dbo.FriendSkills as fs
												on	s.Id = fs.SkillId
							Where	
									f.Id = fs.FriendId
									
							FOR JSON AUTO
				  )
				  ,f.UserId
				  ,f.[DateCreated]
				  ,f.[DateModified]
			  FROM [dbo].[FriendsV2] as f inner join dbo.Images as i
							on i.Id = f.PrimaryImageId

					


END
GO
