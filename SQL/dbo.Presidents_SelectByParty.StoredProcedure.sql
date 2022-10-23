USE [C120_minjkang01_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Presidents_SelectByParty]    Script Date: 10/23/2022 11:04:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Presidents_SelectByParty]
											@PartyAffiliation nvarchar(50)

as 

/*

DECLARE @PartyAffiliation nvarchar(50) = 'Democratic'

EXECUTE dbo.Presidents_SelectByParty @PartyAffiliation



*/


BEGIN

SELECT [Id]
      ,[FirstName]
      ,[LastName]
	  ,[PartyAffiliation]
	  ,[InaugurationDate]
  FROM [dbo].[Presidents]
  WHERE PartyAffiliation = @PartyAffiliation

END

GO
