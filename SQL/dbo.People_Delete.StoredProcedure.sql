USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[People_Delete]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[People_Delete]
	@Id int
as

/*

	Declare @Id int = 9

	  Select * 
	  From dbo.People
	  WHERE Id = @Id;

	Execute dbo.People_Delete @Id

	 Select *
	  From dbo.People
	  Where ID = @Id;


*/

BEGIN

	  DELETE FROM [dbo].[People]
	  WHERE Id = @Id;

END
GO
