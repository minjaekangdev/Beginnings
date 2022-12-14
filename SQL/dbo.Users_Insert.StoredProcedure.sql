USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Users_Insert]
			@FirstName nvarchar(50)
			,@LastName nvarchar(50)
			,@Email	nvarchar(50)
			,@Password nvarchar(50)
			,@AvatarUrl nvarchar(128)
			,@TenantId nvarchar(50)
			,@Id int OUTPUT


/*
	Declare @Id int = 0; 

	Declare @FirstName nvarchar(50) = 'Billy' 
			,@LastName nvarchar(50) = 'Biller'
			,@Email	nvarchar(50) = 'bibbil@email.com'
			,@Password nvarchar(50) = 'Password1!'
			,@AvatarUrl nvarchar(128) = 'http://google.com'
			,@TenantId nvarchar(50) = '123456789!'
	
	Execute dbo.Users_Insert
							@FirstName 
							,@LastName 
							,@Email	
							,@Password 
							,@AvatarUrl
							,@TenantId
							,@Id OUTPUT

			Select @Id

			Select *
			From dbo.Users
			Where Id = @Id


*/


as

BEGIN

INSERT INTO [dbo].[Users]
           ([FirstName]
           ,[LastName]
           ,[Email]
		   ,[Password]
		   ,[AvatarUrl]
           ,[TenantId])
     VALUES
           (@FirstName 
			,@LastName 
			,@Email	
			,@Password
			,@AvatarUrl
			,@TenantId)

	SET @Id = SCOPE_IDENTITY()


END
GO
