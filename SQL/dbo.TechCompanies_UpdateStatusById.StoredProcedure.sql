USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[TechCompanies_UpdateStatusById]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[TechCompanies_UpdateStatusById] 
											@Id int
											,@StatusId int

as

/*



DECLARE @Id int = 9
		,@StatusId int  = 4

EXECUTE dbo.TechCompanies_SelectById @Id


EXECUTE dbo.TechCompanies_UpdateStatusbyId @Id
											,@StatusId

EXECUTE dbo.TechCompanies_SelectById @Id

*/


BEGIN

		UPDATE [dbo].[TechCompanies]
		   SET		[StatusId] = @StatusId
					,[DateModified] = GETUTCDATE()
		 WHERE Id = @Id

 END

GO
