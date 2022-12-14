USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[TechCompanies_Insert]
								@Name nvarchar(50) 
								,@Profile nvarchar(50)
								,@Summary nvarchar(50)
								,@Headline nvarchar(50)
								,@ContactInformation nvarchar(50)
								,@Slug nvarchar(50)
								,@StatusId int			--number from 1-4
								,@batchFriends sab.Friends READONLY
								,@batchTags sab.Tags READONLY 
								,@batchImages sab.Images READONLY
								,@batchUrls sab.Urls READONLY
								,@Id int OUTPUT



as 
/*
						Select *
			From dbo.TechCompanies

					DECLARE 
							@Name nvarchar(50) = 'TechCo1'
							,@Profile nvarchar(50) = 'TechCo1Profile'
							,@Summary nvarchar(50) = 'TechCo1Summ'
							,@Headline nvarchar(50) = 'TechCo1Headline'
							,@ContactInformation nvarchar(50) = 'techco1@email.com'
							,@Slug nvarchar(50) = 'myTechCo1'
							,@StatusId int = 1
							,@batchFriends sab.Friends 
							,@batchTags sab.Tags 
							,@batchImages sab.Images 
							,@batchUrls sab.Urls
							,@CompanyId int 
							
					INSERT INTO @batchFriends (FriendId) 
						VALUES	(8) 
					INSERT INTO @batchTags (Tag) 
						VALUES ('TECHCO#1') 
					INSERT INTO @batchImages (ImageTypeId
												,ImageUrl) 
						VALUES (7777, 'https://google.com/7777') 
					INSERT INTO @batchUrls (Url) 
						VALUES ('https://google.com/techco1url') 


					EXECUTE dbo.TechCompanies_Insert @Name
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
													,@CompanyId OUTPUT
			Select *
			From dbo.TechCompanies


*/

BEGIN

INSERT INTO [dbo].[Images]
           ([TypeId]
           ,[Url])
	Select bi.ImageTypeId
			,bi.ImageUrl
     from  @batchImages as bi
	 where Not Exists (Select 1 
						from dbo.Images as i 
						where i.Url = bi.ImageUrl) 



INSERT INTO [dbo].[Urls]
           ([Url])
     Select	bu.Url
	 FROM	@batchUrls as bu
	 Where	Not Exists (Select 1
						From dbo.Urls as u
						Where bu.Url = u.Url)

INSERT INTO	dbo.Tags (Tag)
		Select bt.Tag
		FROM	@batchTags as bt
		Where	NOT Exists (Select 1
							from dbo.Tags as t
							where t.tag = bt.Tag) 

INSERT INTO [dbo].[TechCompanies]
				   (Name
				   ,Profile
				   ,Summary
				   ,Headline
				   ,contactInformation
				   ,Slug
				   ,StatusId
				   )
			 VALUES(	
					@Name
				   	,@Profile 
					,@Summary 
					,@Headline 
					,@ContactInformation 
					,@Slug 
					,@StatusId 
				   )

		SET @Id = SCOPE_IDENTITY(); 


INSERT INTO dbo.TechCompanyImages 
					(TechCompanyId
					,ImageId) 
Select		@Id
			,i.Id
From		dbo.Images as i

Where		(Exists (Select 1
					From @batchImages as bi 
					where bi.ImageUrl = i.Url) 

			)


Insert into dbo.TechCompanyUrls 
						(TechCompanyId, 
						UrlId)
Select		@Id
			,u.Id
From		dbo.Urls as u
			
Where		(Exists (Select 1
					From	@batchUrls as bu
					Where	bu.Url = u.Url) 
)

Insert into	dbo.TechCompanyTags
						(TechCompanyId,
						TagId)
Select		@Id
			,t.Id
From		dbo.Tags as t

Where		(Exists (Select 1 
					From @batchTags as bt
					Where bt.Tag= t.Tag)
			) 

Insert into dbo.FriendTechCompany
					(TechCompany
					,FriendId) 
Select		@Id,
			f.Id
From		dbo.FriendsV2 as f
Where		(Exists (Select 1
					From @batchFriends as bf 
					Where bf.FriendId = f.Id) 
			) 





END


GO
