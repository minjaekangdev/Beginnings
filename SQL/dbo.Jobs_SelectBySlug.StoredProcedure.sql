USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_SelectBySlug]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Jobs_SelectBySlug]
								@Query nvarchar(100)

as 

/*
DECLARE @Query nvarchar(100) = 'Slug'

EXECUTE dbo.Jobs_SelectBySlug @Query

*/


BEGIN

			SELECT j.[Id]
				  ,j.[Title]
				  ,j.[Description]
				  ,j.[Summary]
				  ,j.[Pay]
				  ,j.[Slug]
				  ,s.Name as Status
				  ,j.TechCompanyId
				  ,Skills = (Select sk.Name
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
				  ,TechCompany = (Select tc.Slug
										,tc.StatusId
										,tc.Name
										,tc.Headline
										,tc.Profile
										,tc.Summary
										,tc.ContactInformation
										,Friends = (Select f.Id
															,f.Bio
															,f.Title
															,f.Summary
															,f.Headline
															,[Name] as StatusId --why is this coming out as st
															,Skills = (Select sks.Id
																				,sks.Name
																		FROM dbo.Skills as sks inner join dbo.FriendSkills as fsk
																				on sks.Id = fsk.SkillId
																		WHERE	f.Id = fsk.FriendId
																		FOR JSON AUTO
															)
															,PrimaryImage = (Select pim.Id
																					,pim.TypeId
																					,pim.Url
																			FROM dbo.Images as pim
																			WHERE pim.Id = f.PrimaryImageId
																			FOR JSON AUTO
																			)
															,f.DateCreated
															,f.DateModified
													FROM dbo.FriendsV2 as f inner join dbo.FriendTechCompany as ftc
																on f.Id = ftc.FriendId inner join dbo.Statuses as st
																	on f.StatusId = st.Id
													WHERE j.TechCompanyId = ftc.TechCompany
													FOR JSON AUTO
													)
										,Images = (Select i.Id
														,i.TypeId
														,i.Url
													From dbo.Images as i inner join dbo.TechCompanyImages as tci
																	on i.Id = tci.ImageId
													WHERE j.TechCompanyId = tci.TechCompanyId
													FOR JSON AUTO

													)
										,Urls =	(Select	u.Id
														,u.Url
												From	dbo.Urls as u inner join dbo.TechCompanyUrls as tcu
																on u.Id = tcu.UrlId
												WHERE j.TechCompanyId = tcu.TechCompanyId
												FOR JSON AUTO
												)
										,Tags = (Select t.Id
														,t.Tag
												From dbo.Tags as t inner join dbo.TechCompanyTags as tct
															on t.Id = tct.TagId
												WHERE j.TechCompanyId = tct.TechCompanyId
												FOR JSON AUTO
												)
								FROM dbo.TechCompanies as tc
								WHERE tc.Id = j.TechCompanyId	
									FOR JSON AUTO
									

				  )
				  ,j.[DateCreated]
				  ,j.[DateModified]
				  ,[TotalCount] = COUNT(1) OVER() 
			  FROM [dbo].[Jobs] as j inner join dbo.Statuses as s
						on j.StatusId = s.Id
			WHERE (j.Slug LIKE '%' + @Query + '%')



END
GO
