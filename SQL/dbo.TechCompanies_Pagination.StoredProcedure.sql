USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[TechCompanies_Pagination]
										@PageIndex int
										,@PageSize int

as 


/*

		Declare @PageIndex int = 0
				,@PageSize int = 10

		Execute dbo.TechCompanies_Pagination 
											@PageIndex
											,@PageSize 


*/


BEGIN

		Declare @offset int = @PageSize * @PageIndex

		SELECT tc.[Id]
			  ,tc.[Name]
			  ,tc.[Profile]
			  ,tc.[Summary]
			  ,tc.[Headline]
			  ,tc.[ContactInformation]
			  ,tc.[Slug]
			  ,Status = (Select s.Id
								,s.Name
						From dbo.Statuses as s 
						Where s.Id = tc.StatusId 
						FOR JSON AUTO
			  )
			  ,Urls = (Select	u.Id
								,u.Url
						From dbo.Urls as u inner join dbo.TechCompanyUrls as tcu 
									on u.Id = tcu.UrlId
						Where	tc.Id = tcu.TechCompanyId
						FOR JSON AUTO
			  )
			  ,Tags = (Select	t.Id
								,t.Tag
						From dbo.Tags as t inner join dbo.TechCompanyTags as tct
									on tct.TagId = t.Id
						Where	tct.TechCompanyId = tc.Id 
						FOR JSON AUTO
			  )
			  ,Friends = (Select f.Id
								,f.Title
								,f.Bio
								,f.Summary
								,f.Headline
								,f.Slug
								,Status = (Select st.Id
													,st.Name
											FROM dbo.Statuses as st
											Where st.Id = f.StatusId
											FOR JSON AUTO
								)
								--,f.PrimaryImageId
								,PrimaryImage = ( SELECT i.Id
														,i.TypeId
														,i.Url
													FROM dbo.Images as i inner join dbo.FriendsV2 as f
																on i.Id = f.PrimaryImageId
													 WHERE f.Id = ftc.FriendId
													FOR JSON AUTO
								)
								,Skills = (
											SELECT	
													s.Id as id
													,s.Name

											FROM	
													dbo.Skills as s inner join dbo.FriendSkills as fs
																on	s.Id = fs.SkillId
											Where	
													f.Id = fs.FriendId
									
											FOR JSON AUTO

				)
								,f.DateCreated
								,f.DateModified
						From dbo.FriendsV2 as f inner join dbo.FriendTechCompany as ftc
									on ftc.FriendId = f.Id
						Where ftc.TechCompany = tc.Id
						FOR JSON AUTO
			  )
			  ,Images = (Select	i.Id
								,i.TypeId
								,i.Url
						From dbo.Images as i inner join dbo.TechCompanyImages as tci
									on tci.ImageId = i.Id
						Where	tci.TechCompanyId = tc.Id 
						FOR JSON AUTO
			  )
			  ,tc.[DateCreated]
			  ,tc.[DateModified]
			  ,[TotalCount] = COUNT(1) OVER()
		  FROM [dbo].[TechCompanies] as tc 
		  Order by tc.Id

		  Offset @offset Rows
		  Fetch next @PageSize Rows Only


  END

GO
