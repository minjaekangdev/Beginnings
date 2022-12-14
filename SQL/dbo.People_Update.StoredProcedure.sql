USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[People_Update]
	@PersonName nvarchar(50)
	,@Age int
	,@UserId nvarchar(128) 
	,@IsASmoker bit
	,@Id int   --No output here b/c id needs to be passed in. must know what id to update
as 

/* ---- Test Code

	Declare @Id int = 6;

	Declare @PersonName nvarchar(50) = 'alsdkf'
		,@Age int = 55
		,@UserId nvarchar(128) = '1123445554444'
		,@IsASmoker bit = 1

	Select *
	From dbo.People
	Where Id = @Id

	Execute dbo.People_Update
							@PersonName
							,@Age
							,@UserId
							,@IsASmoker
							,@Id

	Select *
	From dbo.People
	Where Id = @Id

*/

BEGIN 

	Declare @dateNow datetime2 = GETUTCDATE() 
	

	UPDATE [dbo].[People]
	   SET [Name] = @PersonName
		  ,[Age] = @Age
		  ,[IsSmoker] = @IsASmoker
		  ,[DateModified] = @dateNow
		  ,[UserId] = @UserId
	 WHERE id = @Id

END
GO
