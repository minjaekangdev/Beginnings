USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Jobs_Insert]
							@Title nvarchar(50)
							,@Description nvarchar(128)
							,@Summary nvarchar(128)
							,@Pay nvarchar(50)
							,@Slug nvarchar(50) 
							,@StatusId int
							,@TechCompanyId int
							,@batchSkills sab.Skills READONLY
							,@batchImages sab.Images READONLY
							,@Id int OUTPUT


as 

/*
		DECLARE @PageIndex int = 0
				,@PageSize int = 10

		EXECUTE dbo.Jobs_Pagination @PageIndex
									,@PageSize
										



		DECLARE		
							@Title nvarchar(50) = 'Google Developer'
							,@Description nvarchar(128) = 'Become a developer for Google!'
							,@Summary nvarchar(128) = 'Google Developer Summary'
							,@Pay nvarchar(50) = '$300,000'
							,@Slug nvarchar(50)  = 'GoogleDev1234'
							,@StatusId int = 4
							,@TechCompanyId int = 11
							,@batchSkills sab.Skills 
							,@batchImages sab.Images
							,@Id int 

		INSERT INTO @batchSkills (name)
			VALUES ('Python') , ('Javascript') 

		INSERT INTO @batchImages (ImageTypeId
								,ImageUrl) 
			VALUES (7777, 'https://google.com/7777') 

		EXECUTE dbo.Jobs_Insert
								@Title
								,@Description
								,@Summary
								,@Pay
								,@Slug
								,@StatusId
								,@TechCompanyId
								,@batchSkills 
								,@batchImages
								,@Id OUTPUT

		EXECUTE dbo.Jobs_Pagination @PageIndex
									,@PageSize


*/


BEGIN

		INSERT INTO [dbo].[Jobs]
				   ([Title]
				   ,[Description]
				   ,[Summary]
				   ,[Pay]
				   ,[Slug]
				   ,[StatusId]
				   ,[TechCompanyId])
			 VALUES
				   (@Title
				   ,@Description
				   ,@Summary
				   ,@Pay
				   ,@Slug
				   ,@StatusId
				   ,@TechCompanyId)
		SET @Id = SCOPE_IDENTITY()

		INSERT INTO dbo.Skills ([Name])
			Select bs.[Name]
			From	@batchSkills as bs
			Where	NOT EXISTS (Select 1 
								From dbo.Skills as s
								Where s.Name = bs.Name)

		INSERT INTO dbo.JobSkills ([JobId]
									,[SkillId])
			Select @Id
					,s.Id
			From	dbo.Skills as s
			WHERE	EXISTS (Select 1 
							FROM @batchSkills as bs
							WHERE s.Name = bs.Name)

		INSERT INTO [dbo].[Images]
           ([TypeId]
           ,[Url])
			Select	bi.ImageTypeId
					,bi.ImageUrl
			from	@batchImages as bi
			where Not Exists (Select 1 
								from dbo.Images as i 
								where i.Url = bi.ImageUrl) 
		INSERT INTO dbo.JobImages 
							(JobId
							,ImageId) 
			Select		@Id
						,i.Id
			From		dbo.Images as i

			Where		(Exists (Select 1
								From @batchImages as bi 
								where bi.ImageUrl = i.Url) 

			)

			

END

GO
