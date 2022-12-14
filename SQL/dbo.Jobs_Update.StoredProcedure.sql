USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Jobs_Update]
						@Title nvarchar(50)
						,@Description nvarchar(128)
						,@Summary nvarchar(128)
						,@Pay nvarchar(50)
						,@Slug nvarchar(50)
						,@StatusId int
						,@TechCompanyId int
						,@batchSkills sab.Skills READONLY
						,@batchImages sab.Images READONLY
						,@Id int

as

/*

Select *
From dbo.Jobs
Where Id = 3


DECLARE					@Title nvarchar(50) = 'TitleUpdate'
						,@Description nvarchar(128) = 'Description Update'
						,@Summary nvarchar(128) = 'Summary Update'
						,@Pay nvarchar(50) = '$150,000'
						,@Slug nvarchar(50) = 'SlugUpdate'
						,@StatusId int = 2
						,@TechCompanyId int = 10
						,@batchSkills sab.Skills
						,@batchImages sab.Images
						,@Id int = 3

						INSERT INTO @batchSkills (Name)
						VALUES ('XML123')
						INSERT INTO @batchSkills (Name)
						VALUES ('HTTP')

						INSERT INTO @batchImages (ImageTypeId, ImageUrl)
						VALUES ('123456', 'https://google.com/901238')

EXECUTE dbo.Jobs_Update
						@Title
						,@Description
						,@Summary
						,@Pay
						,@Slug
						,@StatusId
						,@TechCompanyId
						,@batchSkills
						,@Id
						,@batchImages

Select *
From dbo.Jobs
Where Id = 3


*/

BEGIN

		INSERT INTO dbo.Skills ([Name])
			Select bs.[Name]
			From	@batchSkills as bs
			Where	NOT EXISTS (Select 1 
								From dbo.Skills as s
								Where s.Name = bs.Name)

		DELETE FROM dbo.JobSkills
		WHERE JobId = @Id

		INSERT INTO dbo.JobSkills ([JobId]
									,[SkillId])
			Select @Id
					,s.Id
			From	dbo.Skills as s
			WHERE	EXISTS (Select 1 
							FROM @batchSkills as bs
							WHERE s.Name = bs.Name)

		INSERT dbo.Images (TypeId, Url)
			Select	bi.ImageTypeId
					,ImageUrl
			FROM	@batchImages as bi
			WHERE	NOT EXISTS (Select 1
								From	dbo.Images as i
								Where i.TypeId = bi.ImageTypeId
								AND		i.Url = bi.ImageUrl)

		DELETE FROM dbo.JobImages 
		WHERE		JobId = @Id

		INSERT dbo.JobImages (JobId, ImageId)
		Select	@Id,
				i.Id
		FROM	dbo.Images as i
		WHERE	EXISTS (Select 1
						FROM @batchImages as bi
						WHERE bi.ImageTypeId = i.TypeId
						AND		bi.ImageUrl = i.Url)
			


UPDATE [dbo].[Jobs]
			   SET [Title] = @Title
				  ,[Description] = @Description
				  ,[Summary] = @Summary
				  ,[Pay] = @Pay
				  ,[Slug] = @Slug
				  ,[StatusId] = @StatusId
				  ,[TechCompanyId] = @TechCompanyId
				  ,[DateModified] = GETUTCDATE()
			 WHERE Id = @Id


END
GO
