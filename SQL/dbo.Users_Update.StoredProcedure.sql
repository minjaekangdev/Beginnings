USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Users_Update]
	@FirstName nvarchar(50)
	,@LastName nvarchar(50)
	,@Email nvarchar(50)
	,@Password nvarchar(50)
	,@AvatarUrl nvarchar(128)
	,@TenantId nvarchar(50)
	,@Id int

as

/*
	Declare @Id int = 5; 

	Declare @FirstName nvarchar(50) = 'Minjae2'
			,@LastName nvarchar(50) = 'Kang2'
			,@Email nvarchar(50) = 'minjkang02@gmail.com'
			,@Password nvarchar(50) = 'Password2!'
			,@AvatarUrl nvarchar(128) = 'https://googlemaps.com' 
			,@TenantId nvarchar(50) = '1234190283'

	Select *
	From dbo.Users
	Where Id = @Id


	Execute dbo.Users_Update
							@FirstName
							,@LastName
							,@Email
							,@Password
							,@AvatarUrl
							,@TenantId
							,@Id

	Select *
	From dbo.Users
	Where Id = @Id


*/

BEGIN

		UPDATE [dbo].[Users]
		   SET [FirstName] = @FirstName
			  ,[LastName] = @LastName
			  ,[Email] = @Email
			  ,[Password] = @Password
			  ,[AvatarUrl] = @AvatarUrl
			  ,[TenantId] = @TenantId
			  ,[DateModified] = GETUTCDATE()
		 WHERE id = @Id




END




GO
