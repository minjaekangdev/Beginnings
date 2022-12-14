USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Events_Insert]
							@Name nvarchar(50)
							,@Headline nvarchar(50)
							,@Description nvarchar(128)
							,@Summary nvarchar(128) 
							,@Slug nvarchar(50) 
							,@StatusId int
							,@dateStart datetime2 
							,@dateEnd datetime2
							,@latitude float
							,@longitude float
							,@address nvarchar(128)
							,@zipCode nvarchar(128)
							,@Id int OUTPUT


as

/*
			Select * 
			From dbo.Events

			Select *
			From dbo.Locations

			Select *
			From dbo.MetaData


			DECLARE 		@Name nvarchar(50) = 'Event#1'
							,@Headline nvarchar(50) = 'Event#1Headline'
							,@Description nvarchar(128) = 'Event#1Description'
							,@Summary nvarchar(128) = 'Event#1Summary'
							,@Slug nvarchar(50) = 'Event#1Slug'
							,@StatusId int = 1
							,@dateStart datetime2 = GETUTCDATE() 
							,@dateEnd datetime2 = GETUTCDATE() 
							,@latitude float = 34.0648099
							,@longitude float = -118.2940402
							,@zipCode int = 90020
							,@address nvarchar(128) = '530 S Berendo St Los Angeles, CA'
							,@Id int 
							,@metaDataId int 
							,@locationId int 

			EXECUTE dbo.Events_Insert @Name
									,@Headline
									,@Description
									,@Summary
									,@Slug
									,@StatusId
									,@dateStart
									,@dateEnd
									,@latitude
									,@longitude
									,@zipCode
									,@address
									,@Id OUTPUT
									,@metaData OUTPUT
									,@locationId OUTPUT

			Select * 
			From dbo.Events

			Select *
			From dbo.Locations

			Select *
			From dbo.MetaData


*/

BEGIN
			DECLARE @locationId int
			INSERT INTO dbo.Locations
						(latitude
						,longitude
						,zipCode
						,address) 
				VALUES 
						(@latitude
						,@longitude
						,@zipCode
						,@address)

			SET @locationId = SCOPE_IDENTITY() 

			DECLARE @metaDataId int
			INSERT INTO dbo.MetaData
						(locationId
						,dateStart
						,dateEnd)
				VALUES 
						(@locationId
						,@dateStart
						,@dateEnd)

			SET @metaDataId = SCOPE_IDENTITY()


			INSERT INTO [dbo].[Events]
					   ([Name]
					   ,[Headline]
					   ,[Description]
					   ,[Summary]
					   ,[Slug]
					   ,[StatusId]
					   ,[MetaDataId]
					   )
				 VALUES
					   (@Name
					   ,@Headline
					   ,@Description
					   ,@Summary
					   ,@Slug
					   ,@StatusId
					   ,@metaDataId
						)
			SET @Id = SCOPE_IDENTITY() 

	


END

GO
