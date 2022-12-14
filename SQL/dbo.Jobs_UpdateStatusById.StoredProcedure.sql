USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Jobs_UpdateStatusById]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Jobs_UpdateStatusById]
									@StatusId int
									,@Id int

as

/*
Select *
From dbo.Jobs 
Where Id = 3


DECLARE @StatusId int = 2
		,@Id int = 3


EXECUTE dbo.Jobs_UpdateStatusById @StatusId
									,@Id

Select *
From dbo.Jobs 
Where Id = 3
*/


UPDATE [dbo].[Jobs]
			   SET 
				  [StatusId] = @StatusId
				  ,[DateModified] = GETUTCDATE()
			 WHERE Id = @Id
GO
