USE [C120_minjkang01_gmail]
GO
/****** Object:  View [sab].[vInstructorsOfficesCourses]    Script Date: 10/23/2022 11:04:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




Create view [sab].[vInstructorsOfficesCourses]

	/*

		select *
		From sab.vAllInstructors

	*/
as


	select	p.*
			,s.HireDate
			,o.Name
			,o.Number
			,o.DateAssigned
			,c.Title
			,c.DepartmentId
			,c.Credits
	from	sab.Person p inner join sab.InstructorProfiles s
				on p.PersonId = s.InstructorId
			left outer join sab.OfficeAssignment o
					on o.InstructorId = p.PersonId
			left outer join sab.CourseInstructor ci
					on ci.PersonId = p.PersonId
			left outer join sab.Course c
					on c.CourseId = ci.CourseId
GO
