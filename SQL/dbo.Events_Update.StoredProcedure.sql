USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Events_Update]
							@Name nvarchar(50)
							,@Headline nvarchar(50)
							,@Description nvarchar(128)
							,@Summary nvarchar(128)
							,@Slug nvarchar(50)
							,@StatusId int
							,@DateStart datetime2
							,@DateEnd datetime2
							,@latitude float
							,@longitude float
							,@address nvarchar(128)
							,@zipCode nvarchar(128)
							,@Id int


as


/*
		

				DECLARE		@Name nvarchar(50) = 'EventsUpdate'
							,@Headline nvarchar(50) = 'EventsHeadlineUpdate'
							,@Description nvarchar(128) = 'EventsDescriptionUpdate'
							,@Summary nvarchar(128) = 'EventsSummaryUpdate'
							,@Slug nvarchar(50) = 'EventsSlugUpdate'
							,@StatusId int = 2
							,@DateStart datetime2 = GETUTCDATE()
							,@DateEnd datetime2 = GETUTCDATE()
							,@latitude float = 35.050445556640625
							,@longitude float = -119.33404541015625
							,@address nvarchar(128) = '1199 N Muirfield Rd, Los Angeles CA'
							,@zipCode int = '90058'
							,@Id int = 2


		EXECUTE dbo.Events_Update @Name
								,@Headline
								,@Description
								,@Summary
								,@Slug
								,@StatusId
								,@DateStart
								,@DateEnd
								,@latitude
								,@longitude
								,@address
								,@zipCode
								,@Id


*/

BEGIN

		UPDATE [dbo].[Events]			
		SET	[Name] = @Name
			,[Headline] = @Headline
			,[Description] = @Description
			,[Summary] = @Summary
			,[Slug] = @Slug
			,[StatusId] = @StatusId
			,[DateModified] = GETUTCDATE()
		WHERE Id = @Id

		UPDATE dbo.MetaData
		SET	[dateStart] = @DateStart
			,[dateEnd] = @DateEnd
		FROM dbo.Events as e inner join dbo.MetaData as md
						on e.MetaDataId = md.Id
		WHERE e.Id = @Id


		UPDATE dbo.Locations
		SET [latitude] = @latitude
			,[longitude] = @longitude
			,[address] = @address
			,[zipCode] = @zipCode
		FROM dbo.Events as e inner join dbo.MetaData as md 
				on e.MetaDataId = md.Id inner join dbo.Locations as l
					on md.locationId = l.Id
		WHERE e.Id = @Id

END
GO
