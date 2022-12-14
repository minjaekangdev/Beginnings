USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[TechCompanies_Update]
									@Name nvarchar(50)
									,@Profile nvarchar(50)
									,@Summary nvarchar(50)
									,@Headline nvarchar(50)
									,@ContactInformation nvarchar(50)
									,@Slug nvarchar(50)
									,@StatusId int
									,@batchFriends sab.Friends READONLY
									,@batchTags sab.Tags READONLY
									,@batchImages sab.Images READONLY
									,@batchUrls sab.Urls READONLY
									,@Id int 
as 

/*
				DECLARE @Id int = 11
				EXECUTE dbo.TechCompanies_SelectById @Id



					DECLARE 
							@Name nvarchar(50) = 'TechCo1.1'
							,@Profile nvarchar(50) = 'TechCo1.1Profile'
							,@Summary nvarchar(50) = 'TechCo1.1Summ'
							,@Headline nvarchar(50) = 'TechCo1.1Headline'
							,@ContactInformation nvarchar(50) = 'techco1.1@email.com'
							,@Slug nvarchar(50) = 'myTechCo1.1'
							,@StatusId int = 4
							,@batchFriends sab.Friends 
							,@batchTags sab.Tags 
							,@batchImages sab.Images 
							,@batchUrls sab.Urls
							
					INSERT INTO @batchFriends (FriendId) 
						VALUES	(651) 
					INSERT INTO @batchTags (Tag) 
						VALUES ('TECHCO#1.1') 
					INSERT INTO @batchImages (ImageTypeId
												,ImageUrl) 
						VALUES (77772, 'https://google.com/77771') 
					INSERT INTO @batchUrls (Url) 
						VALUES ('https://google.com/techco11url') 


					EXECUTE dbo.TechCompanies_Update @Name
													,@Profile
													,@Summary
													,@Headline
													,@ContactInformation
													,@Slug
													,@StatusId
													,@batchfriends 
													,@batchTags
													,@batchImages
													,@batchUrls
													,@Id
				
				EXECUTE dbo.TechCompanies_SelectById @Id

*/

BEGIN
		DELETE FROM dbo.FriendTechCompany
		WHERE TechCompany = @Id

		INSERT INTO dbo.FriendTechCompany (FriendId, TechCompany) 
			Select bf.FriendId
					,@Id 
			From @batchFriends as bf 

		INSERT INTO dbo.Tags (Tag)
			Select bt.Tag 
			From @batchTags as bt 
			Where NOT EXISTS (Select 1 
								From dbo.Tags as t
								where t.Tag = bt.Tag) 

		DELETE FROM dbo.TechCompanyTags
		WHERE TechCompanyId = @Id

		INSERT INTO dbo.TechCompanyTags(TechCompanyId, TagId) 
			Select	@Id
					,t.Id 
			From	dbo.Tags as t 
			Where	EXISTS (Select 1
							From	@batchTags as bt
							WHERE bt.Tag = t.Tag)			
									

		INSERT INTO dbo.Urls ([Url])
			Select bu.[url] 
			From @batchUrls as bu
			Where NOT EXISTS (Select 1 
								From dbo.Urls as u
								where u.Url = bu.Url) 

		DELETE FROM dbo.TechCompanyUrls
		WHERE TechCompanyId = @Id

		INSERT INTO dbo.TechCompanyUrls(TechCompanyId, UrlId) 
			Select	@Id
					,u.Id 
			From	dbo.Urls as u 
			Where	EXISTS (Select 1
							From	@batchUrls as bu
							WHERE bu.Url = u.Url)	

		INSERT INTO dbo.Images(TypeId, [Url])
			Select bi.ImageTypeId
					,bi.ImageUrl
			From @batchImages as bi
			Where NOT EXISTS (Select 1 
								From dbo.Images as i
								where bi.ImageUrl = i.[Url]
								AND		bi.ImageTypeId = i.TypeId
								) 

		DELETE FROM dbo.TechCompanyImages
		WHERE TechCompanyId = @Id

		INSERT INTO dbo.TechCompanyImages(TechCompanyId, ImageId) 
			Select	@Id
					,i.Id 
			From	dbo.Images as i
			Where	EXISTS (Select 1
							From	@batchImages as bi
							WHERE bi.ImageTypeId = i.TypeId
							AND		bi.ImageUrl = i.Url)	


		UPDATE [dbo].[TechCompanies]
		   SET [Name] = @Name
			  ,[Profile] = @Profile
			  ,[Summary] = @Summary
			  ,[Headline] = @Headline
			  ,[ContactInformation] = @ContactInformation
			  ,[Slug] = @Slug
			  ,[StatusId] = @StatusId
			  ,[DateModified] = GETUTCDATE()
		 WHERE Id = @Id 


END


GO
