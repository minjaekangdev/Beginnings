USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Friends_PaginationV3]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Friends_PaginationV3]
								@PageIndex int
								,@PageSize int
							

as 

/*
	DECLARE 
		@PageIndex int = 0
		,@PageSize int = 10


	EXECUTE dbo.Friends_PaginationV3
								@PageIndex
								,@PageSize


*/

BEGIN
		DECLARE @offset int = @PageIndex * @PageSize
				
		
		SELECT	
				f.Id
				,f.[Title]
				,f.[Bio]
				,f.[Summary]
				,f.[Headline]
				,f.[Slug]
				,Status = (Select s.Id
								,s.Name
							From dbo.Statuses as s
							Where s.Id = f.StatusId
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
									s.Name

							FROM	
									dbo.Skills as s inner join dbo.FriendSkills as fs
												on	s.Id = fs.SkillId
							Where	
									f.Id = fs.FriendId
									
							FOR JSON AUTO
							
				)
				,f.[UserId]
				,f.[DateCreated]
				,f.[DateModified]
				,[TotalCount] = COUNT(1) OVER()

		FROM	
				dbo.FriendsV2 as f inner join dbo.Images as i
		ON	
				f.PrimaryImageId = i.Id
		ORDER BY f.Id

			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY

END
GO
