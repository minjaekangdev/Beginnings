USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_SearchBySlug]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[TechCompanies_SearchBySlug]
										@Query nvarchar(100)
								

as 


/*

		Declare @Query nvarchar(100) = '1.2'
		 

		Execute dbo.TechCompanies_SearchBySlug 
											@Query
										

*/


BEGIN

		SELECT tc.[Id]
			  ,tc.[Name]
			  ,tc.[Profile]
			  ,tc.[Summary]
			  ,tc.[Headline]
			  ,tc.[ContactInformation]
			  ,tc.[Slug]
			  ,tc.StatusId
			  ,Urls = (Select u.Url
						From dbo.Urls as u inner join dbo.TechCompanyUrls as tcu 
									on u.Id = tcu.UrlId
						Where	tc.Id = tcu.TechCompanyId
						FOR JSON AUTO

			  )
			  ,Tags = (Select t.Tag
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
								,f.StatusId
								,f.PrimaryImageId
								,f.UserId
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
		  FROM [dbo].[TechCompanies] as tc

		  WHERE (Slug LIKE '%' + @Query + '%')

		  Order by Id


	
  END

GO
