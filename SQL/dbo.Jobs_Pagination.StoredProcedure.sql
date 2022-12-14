USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Pagination]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Jobs_Pagination]
								@PageIndex int
								,@PageSize int

as

/*

DECLARE @PageIndex int = 0
		,@PageSize int = 10

EXECUTE dbo.Jobs_Pagination @PageIndex
							,@PageSize

*/

BEGIN
			DECLARE @offset int = @PageIndex * @PageSize

			SELECT j.[Id]
				  ,j.[Title]
				  ,j.[Description]
				  ,j.[Summary]
				  ,j.[Pay]
				  ,j.[Slug]
				  ,Status = (Select s.Id
									,s.Name
							From dbo.Statuses as s
							Where s.Id = j.StatusId
							FOR JSON AUTO

				  )
				  ,Skills = (Select sk.Id
									,sk.Name
							FROM dbo.Skills as sk inner join dbo.JobSkills as js
									on sk.Id = js.SkillId
							Where js.JobId = j.Id
							FOR JSON AUTO

				  )
				  ,Images = (Select	i.Id
								,i.TypeId
								,i.Url
						From dbo.Images as i inner join dbo.JobImages as ji
									on ji.ImageId = i.Id
						Where	ji.JobId = j.Id 
								
						FOR JSON AUTO
			  )
				  ,TechCompany = (Select tc.Id
										,tc.Name
										,tc.Profile
										,tc.Summary
										,tc.Headline
										,tc.ContactInformation
										,tc.Slug
										,StatusId = (Select	s.Id
															,s.Name
													From dbo.Statuses as s
													WHERE s.Id = tc.StatusId
													FOR JSON AUTO
										 )
										,Urls = (Select u.Id 
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
															,Status = (	Select st.Id
																				,st.Name
																		from dbo.Statuses as st
																		where st.Id = f.StatusId
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
										,tc.[DateCreated]
										,tc.[DateModified]
								FROM dbo.TechCompanies as tc
								WHERE tc.Id = j.TechCompanyId	
									FOR JSON AUTO
									

				  )
				  ,j.[DateCreated]
				  ,j.[DateModified]
				  ,[TotalCount] = COUNT(1) OVER() 
			  FROM [dbo].[Jobs] as j inner join dbo.Statuses as s
						on j.StatusId = s.Id
			  ORDER BY Id

			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY

END

GO
